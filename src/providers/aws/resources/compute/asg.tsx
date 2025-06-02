import type { ResourceProps, ResourceType } from '../../../../types/providers';

const AutoScalingGroup: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource auto-scaling-group" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/auto-scaling.svg" alt="Auto Scaling Group" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'Auto Scaling Group'}</h3>
        <p>Min Size: {config.minSize as number}</p>
        <p>Max Size: {config.maxSize as number}</p>
        <p>Desired: {config.desiredCapacity as number}</p>
        <p>Instance Type: {config.instanceType as string}</p>
        <p>Subnets: {(config.subnets as Array<unknown>)?.length || 0}</p>
      </div>
    </div>
  );
};

export const autoScalingGroup: ResourceType = {
  id: 'auto-scaling-group',
  name: 'Auto Scaling Group',
  category: 'compute',
  description: 'AWS Auto Scaling Group for EC2 Instances',
  icon: '/icons/aws/auto-scaling.svg',
  component: AutoScalingGroup,
};
