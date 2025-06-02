import type { ResourceProps, ResourceType } from '../../../../types/providers';

const SNSTopic: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource sns-topic" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/sns.svg" alt="SNS Topic" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'SNS Topic'}</h3>
        <p>Type: {config.topicType as string || 'Standard'}</p>
        <p>Subscriptions: {(config.subscriptions as Array<unknown>)?.length || 0}</p>
        <p>Encryption: {config.encryption as string || 'None'}</p>
      </div>
    </div>
  );
};

export const snsTopic: ResourceType = {
  id: 'sns-topic',
  name: 'SNS Topic',
  category: 'integration',
  description: 'Amazon Simple Notification Service (SNS) Topic',
  icon: '/icons/aws/sns.svg',
  component: SNSTopic,
};
