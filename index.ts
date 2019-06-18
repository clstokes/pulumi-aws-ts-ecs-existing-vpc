import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const config = new pulumi.Config();
const existingVpcId = config.require("existingVpcId")
const existingSubnetIds = config.require("existingSubnetIds").split(",");

const vpc = awsx.ec2.Vpc.fromExistingIds("main", {
    vpcId: existingVpcId,
    publicSubnetIds: existingSubnetIds,
});

const cluster = new awsx.ecs.Cluster("main", {
    vpc: vpc
});

const alb = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer("net-lb", {
    external: true,
    securityGroups: cluster.securityGroups,
});

const web = alb.createListener("web", {
    port: 80,
    external: true
});

const appService = new awsx.ecs.FargateService("app-svc", {
    cluster: cluster,
    taskDefinitionArgs: {
        container: {
            image: "nginx",
            cpu: 102 /*10% of 1024*/,
            memory: 50 /*MB*/,
            portMappings: [web],
        },
    },
    desiredCount: 5,
});

export const url = web.endpoint.hostname;
