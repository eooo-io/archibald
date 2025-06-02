import type { ResourceProps, ResourceType } from '../../../../types/providers';

const ElastiCacheCluster: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource elasticache-cluster" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/elasticache.svg" alt="ElastiCache Cluster" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'ElastiCache Cluster'}</h3>
        <p>Engine: {config.engine as string}</p>
        <p>Version: {config.engineVersion as string}</p>
        <p>Node Type: {config.nodeType as string}</p>
        <p>Nodes: {config.numNodes as number}</p>
      </div>
    </div>
  );
};

export const elasticacheCluster: ResourceType = {
  id: 'elasticache-cluster',
  name: 'ElastiCache Cluster',
  category: 'database',
  description: 'Amazon ElastiCache Cluster',
  icon: '/icons/aws/elasticache.svg',
  component: ElastiCacheCluster,
};
