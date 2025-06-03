import type { SecurityGroupRule } from '../utils/validation';

export interface BaseElementProperties {
  name: string;
  description?: string;
}

// Compute
export interface EC2Properties extends BaseElementProperties {
  instanceType?: string;
  ipAddress?: string;
  hostname?: string;
  operatingSystem?: string;
  ami?: string;
  securityGroups?: string[];
}

export interface AutoScalingGroupProperties extends BaseElementProperties {
  minSize?: number;
  maxSize?: number;
  desiredCapacity?: number;
  instanceType?: string;
  subnets?: string[];
}

export interface LambdaProperties extends BaseElementProperties {
  runtime?: string;
  memorySize?: number;
  timeout?: number;
  handler?: string;
}

// Database
export interface RDSProperties extends BaseElementProperties {
  engine?: string;
  version?: string;
  instanceType?: string;
  port?: number;
  username?: string;
  databaseName?: string;
}

export interface DynamoDBProperties extends BaseElementProperties {
  tableName?: string;
  partitionKey?: string;
  sortKey?: string;
  readCapacity?: number;
  writeCapacity?: number;
}

export interface ElastiCacheProperties extends BaseElementProperties {
  engine?: 'redis' | 'memcached';
  nodeType?: string;
  numNodes?: number;
  port?: number;
}

// Networking
export interface VPCProperties extends BaseElementProperties {
  cidrBlock?: string;
  region?: string;
  availabilityZones?: string[];
}

export interface SubnetProperties extends BaseElementProperties {
  cidrBlock?: string;
  availabilityZone?: string;
  isPublic?: boolean;
}

export interface Route53Properties extends BaseElementProperties {
  domainName?: string;
  recordType?: string;
  ttl?: number;
}

export interface LoadBalancerProperties extends BaseElementProperties {
  type?: 'application' | 'network' | 'classic';
  scheme?: 'internet-facing' | 'internal';
  subnets?: string[];
}

// Security
export interface SecurityGroupProperties extends BaseElementProperties {
  inboundRules?: SecurityGroupRule[];
  outboundRules?: SecurityGroupRule[];
}

export interface IAMRoleProperties extends BaseElementProperties {
  service?: string;
  policies?: string[];
  trustRelationship?: string;
}

export interface KMSKeyProperties extends BaseElementProperties {
  keyUsage?: 'ENCRYPT_DECRYPT' | 'SIGN_VERIFY';
  keySpec?: string;
  rotation?: boolean;
}

// Storage
export interface S3Properties extends BaseElementProperties {
  bucketName?: string;
  region?: string;
  versioning?: boolean;
  encryption?: boolean;
  accessControl?: 'private' | 'public-read' | 'public-read-write' | 'authenticated-read';
}

export interface EFSProperties extends BaseElementProperties {
  performanceMode?: 'generalPurpose' | 'maxIO';
  throughputMode?: 'bursting' | 'provisioned';
  provisionedThroughput?: number;
}

// Integration
export interface SQSProperties extends BaseElementProperties {
  queueType?: 'standard' | 'fifo';
  delaySeconds?: number;
  retentionPeriod?: number;
  visibilityTimeout?: number;
}

export interface SNSProperties extends BaseElementProperties {
  topicName?: string;
  subscribers?: string[];
  protocol?: 'email' | 'sms' | 'http' | 'https' | 'lambda' | 'sqs';
}

// Gateway
export interface InternetGatewayProperties extends BaseElementProperties {
  attachedVPCs?: string[];
}

export interface APIGatewayProperties extends BaseElementProperties {
  endpointType?: 'edge' | 'regional' | 'private';
  apiType?: 'rest' | 'http' | 'websocket';
  stages?: string[];
}

export type ElementProperties =
  | EC2Properties
  | AutoScalingGroupProperties
  | LambdaProperties
  | RDSProperties
  | DynamoDBProperties
  | ElastiCacheProperties
  | VPCProperties
  | SubnetProperties
  | Route53Properties
  | LoadBalancerProperties
  | SecurityGroupProperties
  | IAMRoleProperties
  | KMSKeyProperties
  | S3Properties
  | EFSProperties
  | SQSProperties
  | SNSProperties
  | InternetGatewayProperties
  | APIGatewayProperties;

export const getDefaultProperties = (elementType: string): ElementProperties => {
  const base = { name: elementType };

  switch (elementType) {
    case 'EC2 Instance':
      return {
        ...base,
        instanceType: 't2.micro',
        operatingSystem: 'Amazon Linux 2',
      };
    case 'Auto Scaling Group':
      return {
        ...base,
        minSize: 1,
        maxSize: 3,
        desiredCapacity: 2,
        instanceType: 't2.micro',
      };
    case 'Lambda Function':
      return {
        ...base,
        runtime: 'nodejs18.x',
        memorySize: 128,
        timeout: 30,
      };
    case 'RDS Database':
      return {
        ...base,
        engine: 'MySQL',
        version: '8.0',
        port: 3306,
      };
    case 'DynamoDB Table':
      return {
        ...base,
        readCapacity: 5,
        writeCapacity: 5,
      };
    case 'ElastiCache Cluster':
      return {
        ...base,
        engine: 'redis',
        nodeType: 'cache.t3.micro',
        numNodes: 1,
        port: 6379,
      };
    case 'VPC':
      return {
        ...base,
        cidrBlock: '10.0.0.0/16',
      };
    case 'Subnet':
      return {
        ...base,
        cidrBlock: '10.0.0.0/24',
        isPublic: false,
      };
    case 'Route 53':
      return {
        ...base,
        ttl: 300,
      };
    case 'Load Balancer':
      return {
        ...base,
        type: 'application',
        scheme: 'internet-facing',
      };
    case 'Security Group':
      return {
        ...base,
        inboundRules: [],
        outboundRules: [],
      };
    case 'IAM Role':
      return {
        ...base,
        policies: [],
      };
    case 'KMS Key':
      return {
        ...base,
        keyUsage: 'ENCRYPT_DECRYPT',
        rotation: true,
      };
    case 'S3 Bucket':
      return {
        ...base,
        versioning: false,
        encryption: true,
        accessControl: 'private',
      };
    case 'EFS File System':
      return {
        ...base,
        performanceMode: 'generalPurpose',
        throughputMode: 'bursting',
      };
    case 'SQS Queue':
      return {
        ...base,
        queueType: 'standard',
        delaySeconds: 0,
        retentionPeriod: 345600,
        visibilityTimeout: 30,
      };
    case 'SNS Topic':
      return {
        ...base,
        protocol: 'email',
        subscribers: [],
      };
    case 'Internet Gateway':
      return {
        ...base,
        attachedVPCs: [],
      };
    case 'API Gateway':
      return {
        ...base,
        endpointType: 'edge',
        apiType: 'rest',
        stages: ['dev', 'prod'],
      };
    default:
      return base;
  }
};
