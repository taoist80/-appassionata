#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { DnsStack } from "../lib/dns-stack";
import { SiteStack } from "../lib/site-stack";

const app = new cdk.App();

// CloudFront ACM certificates must live in us-east-1, so we pin both stacks
// there for simplicity (Route 53 is global regardless).
const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" };

const domainName = "appassionata-piano.pro";

// Route 53 hosted zone for the whole domain. Deploy this FIRST, then delegate
// the domain's nameservers at Porkbun to the ones it outputs.
const dns = new DnsStack(app, "AppassionataDnsStack", {
  env,
  domainName,
  description: "Appassionata — Route 53 hosted zone (delegate Porkbun NS here)",
});

// The custom domain (cert + alias records) is gated behind `-c domain=on` so the
// site can go live on the CloudFront URL before NS delegation has propagated.
const enableDomain = app.node.tryGetContext("domain") === "on";

new SiteStack(app, "AppassionataSiteStack", {
  env,
  domainName,
  zone: dns.zone,
  enableDomain,
  crossRegionReferences: true,
  description: "Appassionata — S3 + CloudFront static site (demo)",
});
