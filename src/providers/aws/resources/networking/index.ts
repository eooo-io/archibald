import type { ResourceType } from '../../../../types/providers';
import { cloudFront } from './cloudfront';
import { internetGateway } from './internet-gateway';
import { loadBalancer } from './load-balancer';
import { routeTable } from './route-table';
import { route53 } from './route53';
import { securityGroup } from './security-group';
import { subnet } from './subnet';
import { vpc } from './vpc';

export const networkingResources: ResourceType[] = [
  vpc,
  subnet,
  internetGateway,
  routeTable,
  securityGroup,
  loadBalancer,
  cloudFront,
  route53,
];
