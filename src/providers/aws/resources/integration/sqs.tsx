import type { ResourceProps, ResourceType } from '../../../../types/providers';

const SQSQueue: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource sqs-queue" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/sqs.svg" alt="SQS Queue" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'SQS Queue'}</h3>
        <p>Type: {config.queueType as string || 'Standard'}</p>
        <p>Delay: {config.delaySeconds as number || 0}s</p>
        <p>Retention: {config.messageRetentionPeriod as number || 345600}s</p>
        <p>Visibility: {config.visibilityTimeout as number || 30}s</p>
      </div>
    </div>
  );
};

export const sqsQueue: ResourceType = {
  id: 'sqs-queue',
  name: 'SQS Queue',
  category: 'integration',
  description: 'Amazon Simple Queue Service (SQS) Queue',
  icon: '/icons/aws/sqs.svg',
  component: SQSQueue,
};
