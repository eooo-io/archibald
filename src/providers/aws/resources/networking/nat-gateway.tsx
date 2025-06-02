import type { ResourceProps, ResourceType } from '../../../../types/providers';

const NATGateway: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource nat-gateway" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/nat-gateway.svg" alt="NAT Gateway" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'NAT Gateway'}</h3>
        <p>Subnet: {config.subnetId as string}</p>
        <p>Type: {config.type as string || 'Public'}</p>
        <p>Elastic IP: {config.elasticIp as string}</p>
        <p>State: {config.state as string || 'available'}</p>
      </div>
    </div>
  );
};

export const natGateway: ResourceType = {
  id: 'nat-gateway',
  name: 'NAT Gateway',
  category: 'networking',
  description: 'AWS NAT Gateway for outbound internet access',
  icon: '/icons/aws/nat-gateway.svg',
  component: NATGateway,
};
