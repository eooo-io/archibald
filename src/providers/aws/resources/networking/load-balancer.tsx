import type { ResourceProps, ResourceType } from '../../../../types/providers';

const LoadBalancer: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource load-balancer" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/load-balancer.svg" alt="Load Balancer" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Load Balancer'}</h3>
        <p>Type: {config.type as string || 'application'}</p>
        <p>Scheme: {config.scheme as string || 'internet-facing'}</p>
        <p>Targets: {(config.targetGroups as Array<unknown>)?.length || 0}</p>
      </div>
    </div>
  );
};

export const loadBalancer: ResourceType = {
  id: 'load-balancer',
  name: 'Load Balancer',
  category: 'networking',
  description: 'AWS Elastic Load Balancer',
  icon: '/icons/aws/load-balancer.svg',
  component: LoadBalancer,
};
