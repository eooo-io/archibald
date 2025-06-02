import type { ResourceProps, ResourceType } from '../../../../types/providers';

const VPC: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource vpc" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/vpc.svg" alt="VPC" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'VPC'}</h3>
        <p>CIDR: {config.cidrBlock as string}</p>
        <p>Region: {config.region as string}</p>
      </div>
    </div>
  );
};

export const vpc: ResourceType = {
  id: 'vpc',
  name: 'Virtual Private Cloud',
  category: 'networking',
  description: 'Amazon Virtual Private Cloud (VPC)',
  icon: '/icons/aws/vpc.svg',
  component: VPC,
};
