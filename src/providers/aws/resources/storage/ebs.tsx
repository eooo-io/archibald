import type { ResourceProps, ResourceType } from '../../../../types/providers';

const EBSVolume: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource ebs-volume" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/ebs.svg" alt="EBS Volume" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'EBS Volume'}</h3>
        <p>Size: {config.size as number}GB</p>
        <p>Type: {config.volumeType as string}</p>
        <p>IOPS: {config.iops as number}</p>
      </div>
    </div>
  );
};

export const ebsVolume: ResourceType = {
  id: 'ebs-volume',
  name: 'EBS Volume',
  category: 'storage',
  description: 'Amazon Elastic Block Store (EBS) Volume',
  icon: '/icons/aws/ebs.svg',
  component: EBSVolume,
};
