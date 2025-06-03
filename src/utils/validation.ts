import type { EC2Properties, ElementProperties, RDSProperties, S3Properties, VPCProperties } from '../types/ElementProperties';

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
    case 'VPC': {
      const props = properties as VPCProperties;
      if (props.cidrBlock && !isValidCIDR(props.cidrBlock)) {
        errors.push('Invalid CIDR block');
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
    case 'S3 Bucket': {
      const props = properties as S3Properties;
      if (props.bucketName && !isValidBucketName(props.bucketName)) {
        errors.push('Invalid bucket name');
      }
      break;
    }
  }

  return errors;
};
