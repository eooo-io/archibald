import type { ResourceProps, ResourceType } from '../../../../types/providers';

const RouteTable: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource route-table" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/route-table.svg" alt="Route Table" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Route Table'}</h3>
        <p>VPC: {config.vpcId as string}</p>
        <p>Routes: {(config.routes as Array<unknown>)?.length || 0}</p>
      </div>
    </div>
  );
};

export const routeTable: ResourceType = {
  id: 'route-table',
  name: 'Route Table',
  category: 'networking',
  description: 'AWS VPC Route Table',
  icon: '/icons/aws/route-table.svg',
  component: RouteTable,
};
