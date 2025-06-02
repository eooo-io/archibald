import type { ResourceProps, ResourceType } from '../../../../types/providers';

const RDSInstance: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource rds-instance" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/rds.svg" alt="RDS Instance" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'RDS Instance'}</h3>
        <p>Engine: {config.engine as string}</p>
        <p>Version: {config.engineVersion as string}</p>
        <p>Size: {config.instanceClass as string}</p>
        <p>Storage: {config.allocatedStorage as number}GB</p>
      </div>
    </div>
  );
};

export const rdsInstance: ResourceType = {
  id: 'rds-instance',
  name: 'RDS Instance',
  category: 'database',
  description: 'Amazon Relational Database Service (RDS) Instance',
  icon: '/icons/aws/rds.svg',
  component: RDSInstance,
};
