import type { ResourceProps, ResourceType } from '../../../../types/providers';

const DynamoDBTable: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource dynamodb-table" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/dynamodb.svg" alt="DynamoDB Table" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'DynamoDB Table'}</h3>
        <p>Partition Key: {config.partitionKey as string}</p>
        <p>Sort Key: {config.sortKey as string || 'None'}</p>
        <p>Capacity: {config.capacityMode as string || 'On-Demand'}</p>
      </div>
    </div>
  );
};

export const dynamodbTable: ResourceType = {
  id: 'dynamodb-table',
  name: 'DynamoDB Table',
  category: 'database',
  description: 'Amazon DynamoDB Table',
  icon: '/icons/aws/dynamodb.svg',
  component: DynamoDBTable,
};
