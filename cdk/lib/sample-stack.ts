import {Stack, StackProps} from 'aws-cdk-lib'
import {Repository} from 'aws-cdk-lib/aws-ecr'
import {Vpc} from 'aws-cdk-lib/aws-ec2'
import {Construct} from 'constructs'
import {IpAddresses} from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export class SampleStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    new Repository(this, 'Repo');

    const vpc = new Vpc(this, 'Vpc', {
      ipAddresses: IpAddresses.cidr('10.0.0.0/16')
    });

    // TODO: Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'EcsCluster', { 
      vpc,
      enableFargateCapacityProviders: true 
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition');

    taskDefinition.addContainer('Container', {
      image: ecs.ContainerImage.fromRegistry('nginx'),
      memoryLimitMiB: 512,
      cpu: 256
    });

    const service = new ecs.FargateService(this, 'Service', {
      cluster,
      taskDefinition,
      minHealthyPercent: 100
    });
  }
}
