import type { ResourceProps, ResourceType } from '../../../../types/providers';

const LambdaFunction: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource lambda-function" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/lambda.svg" alt="Lambda Function" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Lambda Function'}</h3>
        <p>Runtime: {config.runtime as string}</p>
        <p>Memory: {config.memory as number}MB</p>
      </div>
    </div>
  );
};

export const lambdaFunction: ResourceType = {
  id: 'lambda-function',
  name: 'Lambda Function',
  category: 'compute',
  description: 'AWS Lambda Serverless Function',
  icon: '/icons/aws/lambda.svg',
  component: LambdaFunction,
};
