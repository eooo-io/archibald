import type { APIGatewayProperties, AutoScalingGroupProperties, DynamoDBProperties, EC2Properties, EFSProperties, ElastiCacheProperties, ElementProperties, LambdaProperties, RDSProperties, Route53Properties, S3Properties, SNSProperties, SQSProperties, SubnetProperties, VPCProperties } from '../types/ElementProperties';

// IP address validation
export const isValidIPv4 = (ip: string): boolean => {
  const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!pattern.test(ip)) return false;
  return ip.split('.').every(num => {
    const n = parseInt(num, 10);
    return n >= 0 && n <= 255;
  });
};

// CIDR block validation
export const isValidCIDR = (cidr: string): boolean => {
  const [ip, prefix] = cidr.split('/');
  if (!ip || !prefix) return false;
  if (!isValidIPv4(ip)) return false;
  const prefixNum = parseInt(prefix, 10);
  return prefixNum >= 0 && prefixNum <= 32;
};

// Port validation
export const isValidPort = (port: number): boolean => {
  return port >= 0 && port <= 65535;
};

// DNS hostname validation
export const isValidHostname = (hostname: string): boolean => {
  const pattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return pattern.test(hostname) && hostname.length <= 255;
};

// AMI ID validation
export const isValidAMI = (ami: string): boolean => {
  return /^ami-[a-f0-9]{8,17}$/.test(ami);
};

// Bucket name validation
export const isValidBucketName = (name: string): boolean => {
  const pattern = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
  return pattern.test(name) && !name.includes('..') && !name.includes('.-') && !name.includes('-.');
};

// Database name validation
export const isValidDatabaseName = (name: string): boolean => {
  return /^[a-zA-Z][a-zA-Z0-9_]{0,63}$/.test(name);
};

// Security group rule validation
export interface SecurityGroupRule {
  protocol: string;
  port: number | string;
  source: string;
  description?: string;
}

export const isValidSecurityGroupRule = (rule: SecurityGroupRule): boolean => {
  if (rule.protocol !== 'tcp' && rule.protocol !== 'udp' && rule.protocol !== 'icmp' && rule.protocol !== '-1') {
    return false;
  }

  if (typeof rule.port === 'number') {
    if (!isValidPort(rule.port)) return false;
  } else if (typeof rule.port === 'string') {
    if (!rule.port.match(/^\d+(-\d+)?$/)) return false;
    const [start, end] = rule.port.split('-').map(Number);
    if (!isValidPort(start) || (end && !isValidPort(end))) return false;
  }

  if (!rule.source.match(/^((\d{1,3}\.){3}\d{1,3}\/\d{1,2}|sg-[a-f0-9]{8,17})$/)) {
    return false;
  }

  if (rule.description && rule.description.length > 255) {
    return false;
  }

  return true;
};

// Validate properties based on element type
export const validateProperties = (elementType: string, properties: ElementProperties): string[] => {
  const errors: string[] = [];

  switch (elementType) {
    case 'EC2 Instance': {
      const props = properties as EC2Properties;
      if (props.ipAddress && !isValidIPv4(props.ipAddress)) {
        errors.push('Invalid IP address');
      }
      if (props.hostname && !isValidHostname(props.hostname)) {
        errors.push('Invalid hostname');
      }
      if (props.ami && !isValidAMI(props.ami)) {
        errors.push('Invalid AMI ID format');
      }
      break;
    }
    case 'Auto Scaling Group': {
      const props = properties as AutoScalingGroupProperties;
      if (props.minSize && props.minSize < 0) {
        errors.push('Minimum size cannot be negative');
      }
      if (props.maxSize && props.maxSize < props.minSize!) {
        errors.push('Maximum size must be greater than minimum size');
      }
      if (props.desiredCapacity && (props.desiredCapacity < props.minSize! || props.desiredCapacity > props.maxSize!)) {
        errors.push('Desired capacity must be between minimum and maximum size');
      }
      break;
    }
    case 'Lambda Function': {
      const props = properties as LambdaProperties;
      if (props.memorySize && (props.memorySize < 128 || props.memorySize > 10240)) {
        errors.push('Memory size must be between 128MB and 10240MB');
      }
      if (props.timeout && (props.timeout < 1 || props.timeout > 900)) {
        errors.push('Timeout must be between 1 and 900 seconds');
      }
      break;
    }
    case 'VPC': {
      const props = properties as VPCProperties;
      if (props.cidrBlock && !isValidCIDR(props.cidrBlock)) {
        errors.push('Invalid CIDR block');
      }
      break;
    }
    case 'Subnet': {
      const props = properties as SubnetProperties;
      if (props.cidrBlock && !isValidCIDR(props.cidrBlock)) {
        errors.push('Invalid CIDR block');
      }
      break;
    }
    case 'Route 53': {
      const props = properties as Route53Properties;
      if (props.ttl && props.ttl < 0) {
        errors.push('TTL cannot be negative');
      }
      break;
    }
    case 'RDS Database': {
      const props = properties as RDSProperties;
      if (props.port && !isValidPort(props.port)) {
        errors.push('Invalid port number');
      }
      if (props.databaseName && !isValidDatabaseName(props.databaseName)) {
        errors.push('Invalid database name');
      }
      break;
    }
    case 'DynamoDB Table': {
      const props = properties as DynamoDBProperties;
      if (props.readCapacity && props.readCapacity < 0) {
        errors.push('Read capacity cannot be negative');
      }
      if (props.writeCapacity && props.writeCapacity < 0) {
        errors.push('Write capacity cannot be negative');
      }
      break;
    }
    case 'ElastiCache Cluster': {
      const props = properties as ElastiCacheProperties;
      if (props.port && !isValidPort(props.port)) {
        errors.push('Invalid port number');
      }
      if (props.numNodes && props.numNodes < 1) {
        errors.push('Number of nodes must be at least 1');
      }
      break;
    }
    case 'S3 Bucket': {
      const props = properties as S3Properties;
      if (props.bucketName && !isValidBucketName(props.bucketName)) {
        errors.push('Invalid bucket name');
      }
      break;
    }
    case 'EFS File System': {
      const props = properties as EFSProperties;
      if (props.provisionedThroughput && props.provisionedThroughput < 0) {
        errors.push('Provisioned throughput cannot be negative');
      }
      break;
    }
    case 'SQS Queue': {
      const props = properties as SQSProperties;
      if (props.delaySeconds && (props.delaySeconds < 0 || props.delaySeconds > 900)) {
        errors.push('Delay seconds must be between 0 and 900');
      }
      if (props.retentionPeriod && (props.retentionPeriod < 60 || props.retentionPeriod > 1209600)) {
        errors.push('Retention period must be between 60 seconds and 14 days');
      }
      if (props.visibilityTimeout && (props.visibilityTimeout < 0 || props.visibilityTimeout > 43200)) {
        errors.push('Visibility timeout must be between 0 and 12 hours');
      }
      break;
    }
    case 'SNS Topic': {
      const props = properties as SNSProperties;
      if (props.topicName && !isValidTopicName(props.topicName)) {
        errors.push('Invalid topic name');
      }
      break;
    }
    case 'API Gateway': {
      const props = properties as APIGatewayProperties;
      if (props.stages && props.stages.some(stage => !isValidStageName(stage))) {
        errors.push('Invalid stage name');
      }
      break;
    }
  }

  return errors;
};

// Additional validation functions
const isValidTopicName = (name: string): boolean => {
  return /^[a-zA-Z0-9-_]{1,256}$/.test(name);
};

const isValidStageName = (name: string): boolean => {
  return /^[a-zA-Z0-9-_]{1,128}$/.test(name);
};
