import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

interface SiteStackProps extends cdk.StackProps {
  domainName: string;
  zone: route53.IHostedZone;
  /** When true, attach the ACM cert + apex/www alias records. */
  enableDomain: boolean;
}

/**
 * Static site: a private S3 bucket served through CloudFront with Origin Access
 * Control, SPA-friendly 403/404 rewrites, and the built `dist/` uploaded +
 * invalidated on every deploy. The custom domain is optional (see props).
 */
export class SiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SiteStackProps) {
    super(scope, id, props);
    const { domainName, zone, enableDomain } = props;
    const wwwName = `www.${domainName}`;

    const bucket = new s3.Bucket(this, "SiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      // Demo: tear everything down cleanly with `cdk destroy`.
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    let certificate: acm.ICertificate | undefined;
    if (enableDomain) {
      certificate = new acm.Certificate(this, "Cert", {
        domainName,
        subjectAlternativeNames: [wwwName],
        validation: acm.CertificateValidation.fromDns(zone),
      });
    }

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      comment: "Appassionata studio site (demo)",
      defaultRootObject: "index.html",
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      domainNames: enableDomain ? [domainName, wwwName] : undefined,
      certificate,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },
      // SPA: client-side routes must fall back to index.html.
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });

    new s3deploy.BucketDeployment(this, "DeploySite", {
      sources: [
        s3deploy.Source.asset(path.join(__dirname, "..", "..", "dist")),
      ],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });

    if (enableDomain) {
      const target = route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      );
      new route53.ARecord(this, "AliasApex", {
        zone,
        target,
        recordName: domainName,
      });
      new route53.AaaaRecord(this, "AliasApexAAAA", {
        zone,
        target,
        recordName: domainName,
      });
      new route53.ARecord(this, "AliasWww", {
        zone,
        target,
        recordName: wwwName,
      });
      new route53.AaaaRecord(this, "AliasWwwAAAA", {
        zone,
        target,
        recordName: wwwName,
      });
    }

    new cdk.CfnOutput(this, "DistributionDomain", {
      value: distribution.distributionDomainName,
    });
    new cdk.CfnOutput(this, "SiteUrl", {
      value: enableDomain
        ? `https://${domainName}`
        : `https://${distribution.distributionDomainName}`,
    });
    new cdk.CfnOutput(this, "BucketName", { value: bucket.bucketName });
  }
}
