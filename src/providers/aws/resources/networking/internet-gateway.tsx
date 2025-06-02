import type { ResourceProps, ResourceType } from '../../../../types/providers';

const InternetGateway: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource internet-gateway" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/internet-gateway.svg" alt="Internet Gateway" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Internet Gateway'}</h3>
        <p>VPC: {config.vpcId as string}</p>
        <p>State: {config.state as string || 'attached'}</p>
      </div>
    </div>
  );
};

export const internetGateway: ResourceType = {
  id: 'internet-gateway',
  name: 'Internet Gateway',
  category: 'networking',
  description: 'AWS VPC Internet Gateway',
  icon: '/icons/aws/internet-gateway.svg',
  component: InternetGateway,
};
