import type { ResourceProps, ResourceType } from '../../../../types/providers';

const WAFWebACL: React.FC<ResourceProps> = ({ id, config }) => {
  return (
    <div className="resource waf-web-acl" data-id={id}>
      <div className="resource-icon">
        <img src="/icons/aws/waf.svg" alt="WAF Web ACL" />
      </div>
      <div className="resource-info">
        <h3>{config.name as string || 'WAF Web ACL'}</h3>
        <p>Scope: {config.scope as string}</p>
        <p>Rules: {(config.rules as Array<unknown>)?.length || 0}</p>
        <p>Default Action: {config.defaultAction as string}</p>
      </div>
    </div>
  );
};

export const wafWebACL: ResourceType = {
  id: 'waf-web-acl',
  name: 'WAF Web ACL',
  category: 'security',
  description: 'AWS WAF Web Access Control List',
  icon: '/icons/aws/waf.svg',
  component: WAFWebACL,
};
