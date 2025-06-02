import type { ResourceProps, ResourceType } from '../../../../types/providers';

const EFSFileSystem: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource efs-filesystem" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/efs.svg" alt="EFS File System" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'EFS File System'}</h3>
        <p>Performance Mode: {config.performanceMode as string}</p>
        <p>Throughput Mode: {config.throughputMode as string}</p>
        <p>Mount Targets: {(config.mountTargets as Array<unknown>)?.length || 0}</p>
      </div>
    </div>
  );
};

export const efsFileSystem: ResourceType = {
  id: 'efs-filesystem',
  name: 'EFS File System',
  category: 'storage',
  description: 'Amazon Elastic File System (EFS)',
  icon: '/icons/aws/efs.svg',
  component: EFSFileSystem,
};
