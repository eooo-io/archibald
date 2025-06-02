import type { ResourceProps, ResourceType } from '../../../../types/providers';

const KMSKey: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource kms-key" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/kms.svg" alt="KMS Key" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'KMS Key'}</h3>
        <p>Type: {config.keyType as string || 'Symmetric'}</p>
        <p>Usage: {config.keyUsage as string || 'ENCRYPT_DECRYPT'}</p>
        <p>Rotation: {config.enableKeyRotation ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
};

export const kmsKey: ResourceType = {
  id: 'kms-key',
  name: 'KMS Key',
  category: 'security',
  description: 'AWS Key Management Service (KMS) Key',
  icon: '/icons/aws/kms.svg',
  component: KMSKey,
};
