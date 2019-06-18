# An ECS Fargate example using a pre-existing VPC and Subnets

## Setup

```
$ pulumi config set existingVpcId vpc-abc123
$ pulumi config set existingSubnetIds subnet-abc123,subnet-def456
```

## Execution

```
$ pulumi up
Previewing update (dev):

     Type                                                        Name                                Plan
 +   pulumi:pulumi:Stack                                         pulumi-aws-ts-ecs-existing-vpc-dev  create
 +   ├─ awsx:x:ec2:Vpc                                           main                                create
 +   │  ├─ awsx:x:ec2:Subnet                                     main-public-0                       create
 +   │  ├─ awsx:x:ec2:Subnet                                     main-public-1                       create
 >   │  ├─ aws:ec2:Subnet                                        main-public-0                       read...
 >   │  └─ aws:ec2:Subnet                                        main-public-1                       read
 +   ├─ awsx:x:elasticloadbalancingv2:ApplicationLoadBalancer    net-lb                              create
 +   │  ├─ awsx:x:elasticloadbalancingv2:ApplicationTargetGroup  web                                 create
 +   │  └─ awsx:x:elasticloadbalancingv2:ApplicationListener     web                                 create
 +   │     ├─ awsx:x:ec2:IngressSecurityGroupRule                web-external-0-ingress              create
 +   │     └─ awsx:x:ec2:EgressSecurityGroupRule                 web-external-0-egress               create
 >   │  ├─ aws:ec2:Subnet                                        main-public-0                       read
 +   │  ├─ awsx:x:ec2:Subnet                                     default-vpc-public-0                create
 +   │  ├─ awsx:x:ec2:Subnet                                     default-vpc-public-1                create
 >   │  ├─ aws:ec2:Subnet                                        default-vpc-public-0                read
 >   │  ├─ aws:ec2:Subnet                                        default-vpc-public-0                read
 +   │     │  └─ aws:ec2:SecurityGroupRule                       web-external-0-ingress              create
 +   ├─ awsx:x:ecs:Cluster                                       main                                create
 +   ├─ awsx:x:ecs:Cluster                                       main                                create
 +   ├─ awsx:x:ecs:Cluster                                       main                                create
 +   │  ├─ awsx:x:ec2:SecurityGroup                              main                                create
 +   │  ├─ awsx:x:ec2:SecurityGroup                              main                                create
 +   │  ├─ awsx:x:ec2:SecurityGroup                              main                                create
 +   │  │  └─ aws:elasticloadbalancingv2:Listener                web                                 create
 +   │  │  │  └─ aws:ec2:SecurityGroupRule                       main-ssh                            create
 +   │  │  ├─ awsx:x:ec2:EgressSecurityGroupRule                 main-egress                         create
 +   │  │  │  └─ aws:ec2:SecurityGroupRule                       main-egress                         create
 +   │  │  ├─ awsx:x:ec2:IngressSecurityGroupRule                main-containers                     create
 +   │  │  │  └─ aws:ec2:SecurityGroupRule                       main-containers                     create
 +   │  │  └─ aws:ec2:SecurityGroup                              main                                create
 +   │  └─ aws:ecs:Cluster                                       main                                create
 +   ├─ awsx:x:ecs:FargateTaskDefinition                         app-svc                             create
 +   │  ├─ aws:iam:Role                                          app-svc-execution                   create
 +   │  ├─ aws:cloudwatch:LogGroup                               app-svc                             create
 +   │  ├─ aws:iam:Role                                          app-svc-task                        create
 +   │  ├─ aws:iam:RolePolicyAttachment                          app-svc-execution-9a42f520          create
 +   │  ├─ aws:iam:RolePolicyAttachment                          app-svc-task-32be53a2               create
 +   │  ├─ aws:iam:RolePolicyAttachment                          app-svc-task-fd1a00e5               create
 +   │  └─ aws:ecs:TaskDefinition                                app-svc                             create
 +   ├─ awsx:x:ecs:FargateService                                app-svc                             create
 +   │  └─ aws:ecs:Service                                       app-svc                             create
 >   ├─ aws:ec2:Vpc                                              main                                read
 >   └─ aws:ec2:Vpc                                              default-vpc                         read

Resources:
    + 37 to create

Do you want to perform this update?
  yes
> no
  details
```
