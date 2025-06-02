import type { ResourceProps, ResourceType } from '../../../../types/providers';

const EKSCluster: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource eks-cluster" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/eks.svg" alt="EKS Cluster" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'EKS Cluster'}</h3>
        <p>Version: {config.version as string}</p>
        <p>Node Groups: {(config.nodeGroups as Array<unknown>)?.length || 0}</p>
      </div>
    </div>
  );
};

export const eksCluster: ResourceType = {
  id: 'eks-cluster',
  name: 'EKS Cluster',
  category: 'compute',
  description: 'Amazon Elastic Kubernetes Service (EKS) Cluster',
  icon: '/icons/aws/eks.svg',
  component: EKSCluster,
};
