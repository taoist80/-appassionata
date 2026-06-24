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

// The custom domain (ACM cert + apex/www alias records) is ON by default now
// that the zone is delegated and live. A plain `cdk deploy` therefore keeps the
// domain — pass `-c domain=off` ONLY to deploy without it (e.g. before NS
// delegation). (Previously this defaulted off, so a flagless deploy tore the
// domain down; default-on prevents that footgun.)
const enableDomain = app.node.tryGetContext("domain") !== "off";

new SiteStack(app, "AppassionataSiteStack", {
  env,
  domainName,
  zone: dns.zone,
  enableDomain,
  crossRegionReferences: true,
  description: "Appassionata — S3 + CloudFront static site (demo)",
});
