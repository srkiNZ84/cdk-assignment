# cdk-assignment

## Instructions

Write a CDK application that:

- Includes an ECR repository for storing application images
- Hosts the sample application (from `src`) in AWS
- Defines a VPC for the new resources to reside within

There is no need to deploy the application to AWS. It is enough for `npm run cdk synth` to complete without errors.

Also include:

- A Dockerfile that can be used to build an image for this application
- A GitHub Actions workflow that builds the Docker image and uploads it to the ECR repo

Be prepared to discuss your design choices, particularly around networking, security, and availability during the interview.
