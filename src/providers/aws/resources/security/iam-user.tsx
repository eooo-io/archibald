import type { ResourceProps, ResourceType } from '../../../../types/providers';

const IAMUser: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource iam-user" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/iam-user.svg" alt="IAM User" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'IAM User'}</h3>
        <p>Path: {config.path as string || '/'}</p>
        <p>Groups: {(config.groups as Array<unknown>)?.length || 0}</p>
        <p>Policies: {(config.policies as Array<unknown>)?.length || 0}</p>
        <p>Access Keys: {(config.accessKeys as Array<unknown>)?.length || 0}</p>
        <p>MFA Enabled: {config.mfaEnabled ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export const iamUser: ResourceType = {
  id: 'iam-user',
  name: 'IAM User',
  category: 'security',
  description: 'AWS Identity and Access Management (IAM) User',
  icon: '/icons/aws/iam-user.svg',
  component: IAMUser,
};
