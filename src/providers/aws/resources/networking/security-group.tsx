import type { ResourceProps, ResourceType } from '../../../../types/providers';

const SecurityGroup: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource security-group" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/security-group.svg" alt="Security Group" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Security Group'}</h3>
        <p>VPC: {config.vpcId as string}</p>
        <p>Rules: {
          ((config.ingressRules as Array<unknown>)?.length || 0) +
          ((config.egressRules as Array<unknown>)?.length || 0)
        }</p>
      </div>
    </div>
  );
};

export const securityGroup: ResourceType = {
  id: 'security-group',
  name: 'Security Group',
  category: 'networking',
  description: 'AWS VPC Security Group',
  icon: '/icons/aws/security-group.svg',
  component: SecurityGroup,
};
