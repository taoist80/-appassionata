import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as route53 from "aws-cdk-lib/aws-route53";

interface DnsStackProps extends cdk.StackProps {
  domainName: string;
}

/**
 * The public hosted zone for the whole domain. Deployed on its own so its
 * nameservers can be delegated at Porkbun before any ACM cert tries to
 * DNS-validate against it.
 */
export class DnsStack extends cdk.Stack {
  public readonly zone: route53.PublicHostedZone;

  constructor(scope: Construct, id: string, props: DnsStackProps) {
    super(scope, id, props);

    this.zone = new route53.PublicHostedZone(this, "Zone", {
      zoneName: props.domainName,
      comment: "Appassionata studio site — delegate Porkbun NS to these servers",
    });

    // Google Search Console domain verification — pass the token via context:
    //   cdk deploy AppassionataDnsStack -c gscToken=<token>
    const gscToken = this.node.tryGetContext("gscToken") as string | undefined;
    if (gscToken) {
      new route53.TxtRecord(this, "SearchConsoleVerify", {
        zone: this.zone, // apex TXT
        values: [`google-site-verification=${gscToken}`],
      });
    }

    new cdk.CfnOutput(this, "NameServers", {
      value: cdk.Fn.join(" , ", this.zone.hostedZoneNameServers ?? []),
      description:
        "Set the domain's nameservers at Porkbun to exactly these (full delegation)",
    });
    new cdk.CfnOutput(this, "HostedZoneId", {
      value: this.zone.hostedZoneId,
    });
  }
}
