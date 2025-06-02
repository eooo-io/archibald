import type { ResourceProps, ResourceType } from '../../../../types/providers';

const CloudFront: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource cloudfront" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/cloudfront.svg" alt="CloudFront Distribution" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'CloudFront Distribution'}</h3>
        <p>Domain: {config.domain as string}</p>
        <p>Origins: {(config.origins as Array<unknown>)?.length || 0}</p>
        <p>SSL: {config.certificate as string || 'Default'}</p>
      </div>
    </div>
  );
};

export const cloudFront: ResourceType = {
  id: 'cloudfront',
  name: 'CloudFront Distribution',
  category: 'networking',
  description: 'AWS CloudFront Content Delivery Network',
  icon: '/icons/aws/cloudfront.svg',
  component: CloudFront,
};
