import {Stack, StackProps} from 'aws-cdk-lib'
import {Repository} from 'aws-cdk-lib/aws-ecr'
import {Vpc} from 'aws-cdk-lib/aws-ec2'
import {Construct} from 'constructs'
import {IpAddresses} from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class SampleStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    const repo = new Repository(this, 'Repo');

    const vpc = new Vpc(this, 'Vpc', {
      ipAddresses: IpAddresses.cidr('10.0.0.0/16')
    });

    const cluster = new ecs.Cluster(this, 'EcsCluster', { 
      vpc,
      enableFargateCapacityProviders: true 
    });

    // Create execution role for ECS Fargate to pull images from ECR
    const executionRole = new iam.Role(this, 'ExecutionRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy')
      ]
    });

    // Grant ECR permissions to the execution role
    repo.grantPull(executionRole);

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition', {
      executionRole
    });

    taskDefinition.addContainer('Container', {
      image: ecs.ContainerImage.fromRegistry(repo.repositoryUri),
      memoryLimitMiB: 512,
      portMappings: [{
        containerPort: 3000
      }],
      cpu: 256
    });

    new ecs.FargateService(this, 'Service', {
      cluster,
      taskDefinition,
      minHealthyPercent: 100
    });
  }
}
