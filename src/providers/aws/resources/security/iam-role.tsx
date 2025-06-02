import type { ResourceProps, ResourceType } from '../../../../types/providers';

const IAMRole: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource iam-role" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/iam.svg" alt="IAM Role" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'IAM Role'}</h3>
        <p>Service: {config.service as string}</p>
        <p>Policies: {(config.policies as Array<unknown>)?.length || 0}</p>
      </div>
    </div>
  );
};

export const iamRole: ResourceType = {
  id: 'iam-role',
  name: 'IAM Role',
  category: 'security',
  description: 'AWS Identity and Access Management (IAM) Role',
  icon: '/icons/aws/iam.svg',
  component: IAMRole,
};
