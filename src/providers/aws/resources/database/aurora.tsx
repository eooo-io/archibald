import type { ResourceProps, ResourceType } from '../../../../types/providers';

const AuroraCluster: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource aurora-cluster" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/aurora.svg" alt="Aurora Cluster" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Aurora Cluster'}</h3>
        <p>Engine: {config.engine as string}</p>
        <p>Version: {config.engineVersion as string}</p>
        <p>Instances: {(config.instances as Array<unknown>)?.length || 0}</p>
        <p>Writer Instance: {config.writerInstance as string}</p>
        <p>Database: {config.databaseName as string}</p>
        <p>Port: {config.port as number || 3306}</p>
      </div>
    </div>
  );
};

export const auroraCluster: ResourceType = {
  id: 'aurora-cluster',
  name: 'Aurora Cluster',
  category: 'database',
  description: 'Amazon Aurora DB Cluster',
  icon: '/icons/aws/aurora.svg',
  component: AuroraCluster,
};
