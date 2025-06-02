import type { ResourceProps, ResourceType } from '../../../../types/providers';

const Subnet: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource subnet" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/subnet.svg" alt="Subnet" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Subnet'}</h3>
        <p>CIDR: {config.cidrBlock as string}</p>
        <p>Type: {config.type as string}</p>
        <p>AZ: {config.availabilityZone as string}</p>
      </div>
    </div>
  );
};

export const subnet: ResourceType = {
  id: 'subnet',
  name: 'Subnet',
  category: 'networking',
  description: 'AWS VPC Subnet',
  icon: '/icons/aws/subnet.svg',
  component: Subnet,
};
