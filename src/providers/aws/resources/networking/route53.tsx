import type { ResourceProps, ResourceType } from '../../../../types/providers';

const Route53: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource route53" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/route53.svg" alt="Route 53" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Route 53'}</h3>
        <p>Domain: {config.domainName as string}</p>
        <p>Type: {config.type as string || 'Public'}</p>
        <p>Records: {(config.records as Array<unknown>)?.length || 0}</p>
      </div>
    </div>
  );
};

export const route53: ResourceType = {
  id: 'route53',
  name: 'Route 53',
  category: 'networking',
  description: 'AWS Route 53 DNS Service',
  icon: '/icons/aws/route53.svg',
  component: Route53,
};
