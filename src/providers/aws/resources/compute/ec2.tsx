import type { ResourceProps, ResourceType } from '../../../../types/providers';

const EC2Instance: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource ec2-instance" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/ec2.svg" alt="EC2 Instance" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'EC2 Instance'}</h3>
        <p>Type: {config.instanceType as string}</p>
      </div>
    </div>
  );
};

export const ec2Instance: ResourceType = {
  id: 'ec2-instance',
  name: 'EC2 Instance',
  category: 'compute',
  description: 'Amazon Elastic Compute Cloud (EC2) Instance',
  icon: '/icons/aws/ec2.svg',
  component: EC2Instance,
};
