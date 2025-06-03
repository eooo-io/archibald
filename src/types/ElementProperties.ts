import type { SecurityGroupRule } from '../utils/validation';

export interface BaseElementProperties {
  name: string;
  description?: string;
}

export interface EC2Properties extends BaseElementProperties {
  instanceType?: string;
  ipAddress?: string;
  hostname?: string;
  operatingSystem?: string;
  ami?: string;
  securityGroups?: string[];
}

export interface RDSProperties extends BaseElementProperties {
  engine?: string;
  version?: string;
  instanceType?: string;
  port?: number;
  username?: string;
  databaseName?: string;
}

export interface VPCProperties extends BaseElementProperties {
  cidrBlock?: string;
  region?: string;
  availabilityZones?: string[];
}

export interface SecurityGroupProperties extends BaseElementProperties {
  inboundRules?: SecurityGroupRule[];
  outboundRules?: SecurityGroupRule[];
}

export interface S3Properties extends BaseElementProperties {
  bucketName?: string;
  region?: string;
  versioning?: boolean;
  encryption?: boolean;
  accessControl?: 'private' | 'public-read' | 'public-read-write' | 'authenticated-read';
}

export interface InternetGatewayProperties extends BaseElementProperties {
  attachedVPCs?: string[];
}

export type ElementProperties =
  | EC2Properties
  | RDSProperties
  | VPCProperties
  | SecurityGroupProperties
  | S3Properties
  | InternetGatewayProperties;

export const getDefaultProperties = (elementType: string): ElementProperties => {
  const base = { name: elementType };

  switch (elementType) {
    case 'EC2 Instance':
      return {
        ...base,
        instanceType: 't2.micro',
        operatingSystem: 'Amazon Linux 2',
      };
    case 'RDS Database':
      return {
        ...base,
        engine: 'MySQL',
        version: '8.0',
        port: 3306,
      };
    case 'VPC':
      return {
        ...base,
        cidrBlock: '10.0.0.0/16',
      };
    case 'Security Group':
      return {
        ...base,
        inboundRules: [],
        outboundRules: [],
      };
    case 'S3 Bucket':
      return {
        ...base,
        versioning: false,
        encryption: true,
        accessControl: 'private',
      };
    case 'Internet Gateway':
      return {
        ...base,
        attachedVPCs: [],
      };
    default:
      return base;
  }
};
