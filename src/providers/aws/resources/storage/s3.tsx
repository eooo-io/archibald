import type { ResourceProps, ResourceType } from '../../../../types/providers';

const S3Bucket: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource s3-bucket" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/s3.svg" alt="S3 Bucket" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'S3 Bucket'}</h3>
        <p>Region: {config.region as string}</p>
        <p>Access: {config.access as string || 'Private'}</p>
        <p>Versioning: {config.versioning ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
};

export const s3Bucket: ResourceType = {
  id: 's3-bucket',
  name: 'S3 Bucket',
  category: 'storage',
  description: 'Amazon Simple Storage Service (S3) Bucket',
  icon: '/icons/aws/s3.svg',
  component: S3Bucket,
};
