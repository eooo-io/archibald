import {
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    Switch,
    Text,
    Textarea,
    Tooltip,
    VStack
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaInfoCircle } from 'react-icons/fa';
import type { Node } from 'reactflow';
import type {
    APIGatewayProperties,
    AutoScalingGroupProperties,
    DynamoDBProperties,
    EC2Properties,
    EFSProperties,
    ElastiCacheProperties,
    ElementProperties,
    IAMRoleProperties,
    InternetGatewayProperties,
    KMSKeyProperties,
    LambdaProperties,
    LoadBalancerProperties,
    RDSProperties,
    Route53Properties,
    S3Properties,
    SecurityGroupProperties,
    SNSProperties,
    SQSProperties,
    SubnetProperties,
    VPCProperties,
} from '../types/ElementProperties';
import type { SecurityGroupRule } from '../utils/validation';
import { validateProperties } from '../utils/validation';
import SecurityGroupRulesEditor from './SecurityGroupRulesEditor';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onUpdateProperties: (nodeId: string, properties: ElementProperties) => void;
}

export const PropertiesPanel = ({ selectedNode, onUpdateProperties }: PropertiesPanelProps) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [copiedProperties, setCopiedProperties] = useState<ElementProperties | null>(null);

  const handlePropertyChange = useCallback(
    (key: string, value: string | number | boolean | SecurityGroupRule[]) => {
      if (!selectedNode) return;

      const updatedProperties = {
        ...selectedNode.data.properties,
        [key]: value,
      };

      onUpdateProperties(selectedNode.id, updatedProperties);
    },
    [selectedNode, onUpdateProperties]
  );

  useEffect(() => {
    if (selectedNode) {
      const errors = validateProperties(selectedNode.data.label, selectedNode.data.properties);
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
    }
  }, [selectedNode]);

  const handleCopyProperties = useCallback(() => {
    if (!selectedNode) return;
    setCopiedProperties(selectedNode.data.properties);
  }, [selectedNode]);

  const handlePasteProperties = useCallback(() => {
    if (!selectedNode || !copiedProperties) return;
    if (selectedNode.data.label === copiedProperties.name) {
      onUpdateProperties(selectedNode.id, {
        ...copiedProperties,
        name: selectedNode.data.properties.name,
      });
    }
  }, [selectedNode, copiedProperties, onUpdateProperties]);

  if (!selectedNode) {
    return (
      <Box p={4}>
        <Text color="gray.500">Select an element to view its properties</Text>
      </Box>
    );
  }

  const properties = selectedNode.data.properties as ElementProperties;
  const elementType = selectedNode.data.label;

  const renderEC2Properties = (props: EC2Properties) => (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={validationErrors.includes('Invalid IP address')}>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Instance Name</Text>
            <Tooltip label="The name tag of the EC2 instance">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Instance Type</Text>
            <Tooltip label="The EC2 instance type that determines CPU, memory, and networking capacity">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Select
          value={props.instanceType}
          onChange={(e) => handlePropertyChange('instanceType', e.target.value)}
        >
          <option value="t2.micro">t2.micro (1 vCPU, 1 GiB RAM)</option>
          <option value="t2.small">t2.small (1 vCPU, 2 GiB RAM)</option>
          <option value="t2.medium">t2.medium (2 vCPU, 4 GiB RAM)</option>
          <option value="t3.micro">t3.micro (2 vCPU, 1 GiB RAM)</option>
          <option value="t3.small">t3.small (2 vCPU, 2 GiB RAM)</option>
          <option value="t3.medium">t3.medium (2 vCPU, 4 GiB RAM)</option>
        </Select>
      </FormControl>
      <FormControl isInvalid={validationErrors.includes('Invalid IP address')}>
        <FormLabel>
          <HStack spacing={1}>
            <Text>IP Address</Text>
            <Tooltip label="Private IPv4 address of the instance">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.ipAddress}
          onChange={(e) => handlePropertyChange('ipAddress', e.target.value)}
          placeholder="10.0.0.10"
        />
        <FormErrorMessage>Invalid IP address format</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={validationErrors.includes('Invalid hostname')}>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Hostname</Text>
            <Tooltip label="DNS hostname of the instance">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.hostname}
          onChange={(e) => handlePropertyChange('hostname', e.target.value)}
          placeholder="ec2-instance.internal"
        />
        <FormErrorMessage>Invalid hostname format</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Operating System</Text>
            <Tooltip label="The operating system running on the instance">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Select
          value={props.operatingSystem}
          onChange={(e) => handlePropertyChange('operatingSystem', e.target.value)}
        >
          <option value="Amazon Linux 2">Amazon Linux 2</option>
          <option value="Ubuntu 20.04">Ubuntu 20.04</option>
          <option value="Windows Server 2019">Windows Server 2019</option>
          <option value="Red Hat Enterprise Linux 8">Red Hat Enterprise Linux 8</option>
        </Select>
      </FormControl>
      <FormControl isInvalid={validationErrors.includes('Invalid AMI ID format')}>
        <FormLabel>
          <HStack spacing={1}>
            <Text>AMI ID</Text>
            <Tooltip label="Amazon Machine Image ID">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.ami}
          onChange={(e) => handlePropertyChange('ami', e.target.value)}
          placeholder="ami-12345678"
        />
        <FormErrorMessage>Invalid AMI ID format</FormErrorMessage>
      </FormControl>
    </VStack>
  );

  const renderRDSProperties = (props: RDSProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Database Name</Text>
            <Tooltip label="The name of the initial database to be created">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Engine</Text>
            <Tooltip label="The database engine to be used">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Select
          value={props.engine}
          onChange={(e) => handlePropertyChange('engine', e.target.value)}
        >
          <option value="MySQL">MySQL</option>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MariaDB">MariaDB</option>
          <option value="Oracle">Oracle</option>
          <option value="SQL Server">SQL Server</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Version</Text>
            <Tooltip label="The version of the database engine">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.version}
          onChange={(e) => handlePropertyChange('version', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Instance Type</Text>
            <Tooltip label="The compute and memory capacity of the database instance">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Select
          value={props.instanceType}
          onChange={(e) => handlePropertyChange('instanceType', e.target.value)}
        >
          <option value="db.t3.micro">db.t3.micro</option>
          <option value="db.t3.small">db.t3.small</option>
          <option value="db.t3.medium">db.t3.medium</option>
          <option value="db.r5.large">db.r5.large</option>
          <option value="db.r5.xlarge">db.r5.xlarge</option>
        </Select>
      </FormControl>
      <FormControl isInvalid={validationErrors.includes('Invalid port number')}>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Port</Text>
            <Tooltip label="The port number on which the database accepts connections">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <NumberInput
          value={props.port}
          onChange={(_, value) => handlePropertyChange('port', value)}
        >
          <NumberInputField />
        </NumberInput>
        <FormErrorMessage>Port must be between 0 and 65535</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Username</Text>
            <Tooltip label="Master username for the database instance">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.username}
          onChange={(e) => handlePropertyChange('username', e.target.value)}
        />
      </FormControl>
    </VStack>
  );

  const renderVPCProperties = (props: VPCProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>VPC Name</Text>
            <Tooltip label="The name tag of the VPC">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl isInvalid={validationErrors.includes('Invalid CIDR block')}>
        <FormLabel>
          <HStack spacing={1}>
            <Text>CIDR Block</Text>
            <Tooltip label="The IPv4 network range for the VPC, in CIDR notation">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.cidrBlock}
          onChange={(e) => handlePropertyChange('cidrBlock', e.target.value)}
          placeholder="10.0.0.0/16"
        />
        <FormErrorMessage>Invalid CIDR block format</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Region</Text>
            <Tooltip label="The AWS region where the VPC will be created">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Select
          value={props.region}
          onChange={(e) => handlePropertyChange('region', e.target.value)}
        >
          <option value="us-east-1">US East (N. Virginia)</option>
          <option value="us-west-2">US West (Oregon)</option>
          <option value="eu-west-1">EU (Ireland)</option>
          <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
          <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
        </Select>
      </FormControl>
    </VStack>
  );

  const renderS3Properties = (props: S3Properties) => (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={validationErrors.includes('Invalid bucket name')}>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Bucket Name</Text>
            <Tooltip label="Globally unique S3 bucket name">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.bucketName}
          onChange={(e) => handlePropertyChange('bucketName', e.target.value)}
          placeholder="my-unique-bucket-name"
        />
        <FormErrorMessage>Invalid bucket name format</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Region</Text>
            <Tooltip label="The AWS region where the bucket will be created">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Select
          value={props.region}
          onChange={(e) => handlePropertyChange('region', e.target.value)}
        >
          <option value="us-east-1">US East (N. Virginia)</option>
          <option value="us-west-2">US West (Oregon)</option>
          <option value="eu-west-1">EU (Ireland)</option>
          <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
          <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
        </Select>
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">
          <HStack spacing={1}>
            <Text>Versioning</Text>
            <Tooltip label="Enable versioning to preserve, retrieve, and restore every version of every object">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Switch
          isChecked={props.versioning}
          onChange={(e) => handlePropertyChange('versioning', e.target.checked)}
        />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">
          <HStack spacing={1}>
            <Text>Encryption</Text>
            <Tooltip label="Enable server-side encryption for objects">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Switch
          isChecked={props.encryption}
          onChange={(e) => handlePropertyChange('encryption', e.target.checked)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Access Control</Text>
            <Tooltip label="Default access control for the bucket">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Select
          value={props.accessControl}
          onChange={(e) => handlePropertyChange('accessControl', e.target.value)}
        >
          <option value="private">Private</option>
          <option value="public-read">Public Read</option>
          <option value="public-read-write">Public Read/Write</option>
          <option value="authenticated-read">Authenticated Read</option>
        </Select>
      </FormControl>
    </VStack>
  );

  const renderSecurityGroupProperties = (props: SecurityGroupProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Security Group Name</Text>
            <Tooltip label="The name of the security group">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Description</Text>
            <Tooltip label="A description for the security group">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Textarea
          value={props.description}
          onChange={(e) => handlePropertyChange('description', e.target.value)}
        />
      </FormControl>
      <Divider />
      <SecurityGroupRulesEditor
        rules={props.inboundRules || []}
        isInbound={true}
        onChange={(rules) => handlePropertyChange('inboundRules', rules)}
      />
      <Divider />
      <SecurityGroupRulesEditor
        rules={props.outboundRules || []}
        isInbound={false}
        onChange={(rules) => handlePropertyChange('outboundRules', rules)}
      />
    </VStack>
  );

  const renderInternetGatewayProperties = (props: InternetGatewayProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Gateway Name</Text>
            <Tooltip label="The name tag of the Internet Gateway">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack spacing={1}>
            <Text>Description</Text>
            <Tooltip label="A description for the Internet Gateway">
              <Box display="inline-block">
                <FaInfoCircle />
              </Box>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Textarea
          value={props.description}
          onChange={(e) => handlePropertyChange('description', e.target.value)}
        />
      </FormControl>
    </VStack>
  );

  const renderAutoScalingGroupProperties = (props: AutoScalingGroupProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Instance Type</FormLabel>
        <Input
          value={props.instanceType}
          onChange={(e) => handlePropertyChange('instanceType', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Minimum Size</FormLabel>
        <NumberInput
          value={props.minSize}
          onChange={(_, value) => handlePropertyChange('minSize', value)}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Maximum Size</FormLabel>
        <NumberInput
          value={props.maxSize}
          onChange={(_, value) => handlePropertyChange('maxSize', value)}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Desired Capacity</FormLabel>
        <NumberInput
          value={props.desiredCapacity}
          onChange={(_, value) => handlePropertyChange('desiredCapacity', value)}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
    </VStack>
  );

  const renderLambdaProperties = (props: LambdaProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Function Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Runtime</FormLabel>
        <Select
          value={props.runtime}
          onChange={(e) => handlePropertyChange('runtime', e.target.value)}
        >
          <option value="nodejs18.x">Node.js 18.x</option>
          <option value="nodejs16.x">Node.js 16.x</option>
          <option value="python3.9">Python 3.9</option>
          <option value="python3.8">Python 3.8</option>
          <option value="java11">Java 11</option>
          <option value="dotnet6">.NET 6</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Memory (MB)</FormLabel>
        <NumberInput
          value={props.memorySize}
          onChange={(_, value) => handlePropertyChange('memorySize', value)}
          min={128}
          max={10240}
          step={64}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Timeout (seconds)</FormLabel>
        <NumberInput
          value={props.timeout}
          onChange={(_, value) => handlePropertyChange('timeout', value)}
          min={1}
          max={900}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Handler</FormLabel>
        <Input
          value={props.handler}
          onChange={(e) => handlePropertyChange('handler', e.target.value)}
          placeholder="index.handler"
        />
      </FormControl>
    </VStack>
  );

  const renderDynamoDBProperties = (props: DynamoDBProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Table Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Partition Key</FormLabel>
        <Input
          value={props.partitionKey}
          onChange={(e) => handlePropertyChange('partitionKey', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Sort Key</FormLabel>
        <Input
          value={props.sortKey}
          onChange={(e) => handlePropertyChange('sortKey', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Read Capacity Units</FormLabel>
        <NumberInput
          value={props.readCapacity}
          onChange={(_, value) => handlePropertyChange('readCapacity', value)}
          min={1}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Write Capacity Units</FormLabel>
        <NumberInput
          value={props.writeCapacity}
          onChange={(_, value) => handlePropertyChange('writeCapacity', value)}
          min={1}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
    </VStack>
  );

  const renderElastiCacheProperties = (props: ElastiCacheProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Cluster Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Engine</FormLabel>
        <Select
          value={props.engine}
          onChange={(e) => handlePropertyChange('engine', e.target.value)}
        >
          <option value="redis">Redis</option>
          <option value="memcached">Memcached</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Node Type</FormLabel>
        <Input
          value={props.nodeType}
          onChange={(e) => handlePropertyChange('nodeType', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Number of Nodes</FormLabel>
        <NumberInput
          value={props.numNodes}
          onChange={(_, value) => handlePropertyChange('numNodes', value)}
          min={1}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Port</FormLabel>
        <NumberInput
          value={props.port}
          onChange={(_, value) => handlePropertyChange('port', value)}
          min={1024}
          max={65535}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
    </VStack>
  );

  const renderSubnetProperties = (props: SubnetProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Subnet Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>CIDR Block</FormLabel>
        <Input
          value={props.cidrBlock}
          onChange={(e) => handlePropertyChange('cidrBlock', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Availability Zone</FormLabel>
        <Input
          value={props.availabilityZone}
          onChange={(e) => handlePropertyChange('availabilityZone', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Public Subnet</FormLabel>
        <Switch
          isChecked={props.isPublic}
          onChange={(e) => handlePropertyChange('isPublic', e.target.checked)}
        />
      </FormControl>
    </VStack>
  );

  const renderRoute53Properties = (props: Route53Properties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Record Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Domain Name</FormLabel>
        <Input
          value={props.domainName}
          onChange={(e) => handlePropertyChange('domainName', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Record Type</FormLabel>
        <Select
          value={props.recordType}
          onChange={(e) => handlePropertyChange('recordType', e.target.value)}
        >
          <option value="A">A</option>
          <option value="AAAA">AAAA</option>
          <option value="CNAME">CNAME</option>
          <option value="MX">MX</option>
          <option value="TXT">TXT</option>
          <option value="NS">NS</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>TTL (seconds)</FormLabel>
        <NumberInput
          value={props.ttl}
          onChange={(_, value) => handlePropertyChange('ttl', value)}
          min={0}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
    </VStack>
  );

  const renderLoadBalancerProperties = (props: LoadBalancerProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Load Balancer Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Select
          value={props.type}
          onChange={(e) => handlePropertyChange('type', e.target.value)}
        >
          <option value="application">Application Load Balancer</option>
          <option value="network">Network Load Balancer</option>
          <option value="classic">Classic Load Balancer</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Scheme</FormLabel>
        <Select
          value={props.scheme}
          onChange={(e) => handlePropertyChange('scheme', e.target.value)}
        >
          <option value="internet-facing">Internet Facing</option>
          <option value="internal">Internal</option>
        </Select>
      </FormControl>
    </VStack>
  );

  const renderIAMRoleProperties = (props: IAMRoleProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Role Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Service</FormLabel>
        <Input
          value={props.service}
          onChange={(e) => handlePropertyChange('service', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Trust Relationship</FormLabel>
        <Textarea
          value={props.trustRelationship}
          onChange={(e) => handlePropertyChange('trustRelationship', e.target.value)}
        />
      </FormControl>
    </VStack>
  );

  const renderKMSKeyProperties = (props: KMSKeyProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Key Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Key Usage</FormLabel>
        <Select
          value={props.keyUsage}
          onChange={(e) => handlePropertyChange('keyUsage', e.target.value)}
        >
          <option value="ENCRYPT_DECRYPT">Encrypt/Decrypt</option>
          <option value="SIGN_VERIFY">Sign/Verify</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Key Spec</FormLabel>
        <Input
          value={props.keySpec}
          onChange={(e) => handlePropertyChange('keySpec', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Key Rotation</FormLabel>
        <Switch
          isChecked={props.rotation}
          onChange={(e) => handlePropertyChange('rotation', e.target.checked)}
        />
      </FormControl>
    </VStack>
  );

  const renderEFSProperties = (props: EFSProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>File System Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Performance Mode</FormLabel>
        <Select
          value={props.performanceMode}
          onChange={(e) => handlePropertyChange('performanceMode', e.target.value)}
        >
          <option value="generalPurpose">General Purpose</option>
          <option value="maxIO">Max I/O</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Throughput Mode</FormLabel>
        <Select
          value={props.throughputMode}
          onChange={(e) => handlePropertyChange('throughputMode', e.target.value)}
        >
          <option value="bursting">Bursting</option>
          <option value="provisioned">Provisioned</option>
        </Select>
      </FormControl>
      {props.throughputMode === 'provisioned' && (
        <FormControl>
          <FormLabel>Provisioned Throughput (MiB/s)</FormLabel>
          <NumberInput
            value={props.provisionedThroughput}
            onChange={(_, value) => handlePropertyChange('provisionedThroughput', value)}
            min={0}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
      )}
    </VStack>
  );

  const renderSQSProperties = (props: SQSProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Queue Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Queue Type</FormLabel>
        <Select
          value={props.queueType}
          onChange={(e) => handlePropertyChange('queueType', e.target.value)}
        >
          <option value="standard">Standard Queue</option>
          <option value="fifo">FIFO Queue</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Delay Seconds</FormLabel>
        <NumberInput
          value={props.delaySeconds}
          onChange={(_, value) => handlePropertyChange('delaySeconds', value)}
          min={0}
          max={900}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Message Retention Period (seconds)</FormLabel>
        <NumberInput
          value={props.retentionPeriod}
          onChange={(_, value) => handlePropertyChange('retentionPeriod', value)}
          min={60}
          max={1209600}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Visibility Timeout (seconds)</FormLabel>
        <NumberInput
          value={props.visibilityTimeout}
          onChange={(_, value) => handlePropertyChange('visibilityTimeout', value)}
          min={0}
          max={43200}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>
    </VStack>
  );

  const renderSNSProperties = (props: SNSProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Topic Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Protocol</FormLabel>
        <Select
          value={props.protocol}
          onChange={(e) => handlePropertyChange('protocol', e.target.value)}
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="http">HTTP</option>
          <option value="https">HTTPS</option>
          <option value="lambda">Lambda</option>
          <option value="sqs">SQS</option>
        </Select>
      </FormControl>
    </VStack>
  );

  const renderAPIGatewayProperties = (props: APIGatewayProperties) => (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>API Name</FormLabel>
        <Input
          value={props.name}
          onChange={(e) => handlePropertyChange('name', e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Endpoint Type</FormLabel>
        <Select
          value={props.endpointType}
          onChange={(e) => handlePropertyChange('endpointType', e.target.value)}
        >
          <option value="edge">Edge Optimized</option>
          <option value="regional">Regional</option>
          <option value="private">Private</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>API Type</FormLabel>
        <Select
          value={props.apiType}
          onChange={(e) => handlePropertyChange('apiType', e.target.value)}
        >
          <option value="rest">REST API</option>
          <option value="http">HTTP API</option>
          <option value="websocket">WebSocket API</option>
        </Select>
      </FormControl>
    </VStack>
  );

  const renderProperties = () => {
    switch (elementType) {
      case 'EC2 Instance':
        return renderEC2Properties(properties as EC2Properties);
      case 'Auto Scaling Group':
        return renderAutoScalingGroupProperties(properties as AutoScalingGroupProperties);
      case 'Lambda Function':
        return renderLambdaProperties(properties as LambdaProperties);
      case 'RDS Database':
        return renderRDSProperties(properties as RDSProperties);
      case 'DynamoDB Table':
        return renderDynamoDBProperties(properties as DynamoDBProperties);
      case 'ElastiCache Cluster':
        return renderElastiCacheProperties(properties as ElastiCacheProperties);
      case 'VPC':
        return renderVPCProperties(properties as VPCProperties);
      case 'Subnet':
        return renderSubnetProperties(properties as SubnetProperties);
      case 'Route 53':
        return renderRoute53Properties(properties as Route53Properties);
      case 'Load Balancer':
        return renderLoadBalancerProperties(properties as LoadBalancerProperties);
      case 'Security Group':
        return renderSecurityGroupProperties(properties as SecurityGroupProperties);
      case 'IAM Role':
        return renderIAMRoleProperties(properties as IAMRoleProperties);
      case 'KMS Key':
        return renderKMSKeyProperties(properties as KMSKeyProperties);
      case 'S3 Bucket':
        return renderS3Properties(properties as S3Properties);
      case 'EFS File System':
        return renderEFSProperties(properties as EFSProperties);
      case 'SQS Queue':
        return renderSQSProperties(properties as SQSProperties);
      case 'SNS Topic':
        return renderSNSProperties(properties as SNSProperties);
      case 'Internet Gateway':
        return renderInternetGatewayProperties(properties as InternetGatewayProperties);
      case 'API Gateway':
        return renderAPIGatewayProperties(properties as APIGatewayProperties);
      default:
        return null;
    }
  };

  return (
    <Box p={4} borderLeft="1px solid" borderColor="gray.200" width="300px" height="100%" overflowY="auto">
      <HStack justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="medium">
          {elementType} Properties
        </Text>
        <HStack>
          <Tooltip label="Copy properties">
            <Button
              size="sm"
              onClick={handleCopyProperties}
              leftIcon={<FaCopy />}
            >
              Copy
            </Button>
          </Tooltip>
          {copiedProperties && copiedProperties.name === elementType && (
            <Tooltip label="Paste properties">
              <Button
                size="sm"
                onClick={handlePasteProperties}
                colorScheme="blue"
              >
                Paste
              </Button>
            </Tooltip>
          )}
        </HStack>
      </HStack>
      <Divider mb={4} />
      {renderProperties()}
    </Box>
  );
};

export default PropertiesPanel;
