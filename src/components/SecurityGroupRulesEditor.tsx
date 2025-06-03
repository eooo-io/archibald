import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Select,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { FaInfoCircle, FaPlus, FaTrash } from 'react-icons/fa';
import type { SecurityGroupRule } from '../utils/validation';
import { isValidSecurityGroupRule } from '../utils/validation';

interface SecurityGroupRulesEditorProps {
  rules: SecurityGroupRule[];
  isInbound: boolean;
  onChange: (rules: SecurityGroupRule[]) => void;
}

export const SecurityGroupRulesEditor = ({
  rules,
  isInbound,
  onChange,
}: SecurityGroupRulesEditorProps) => {
  const [newRule, setNewRule] = useState<SecurityGroupRule>({
    protocol: 'tcp',
    port: '',
    source: '',
    description: '',
  });
  const [error, setError] = useState<string>('');

  const handleAddRule = useCallback(() => {
    if (!isValidSecurityGroupRule(newRule)) {
      setError('Invalid rule configuration');
      return;
    }

    onChange([...rules, newRule]);
    setNewRule({
      protocol: 'tcp',
      port: '',
      source: '',
      description: '',
    });
    setError('');
  }, [newRule, rules, onChange]);

  const handleRemoveRule = useCallback(
    (index: number) => {
      const updatedRules = [...rules];
      updatedRules.splice(index, 1);
      onChange(updatedRules);
    },
    [rules, onChange]
  );

  const sourceLabel = isInbound ? 'Source' : 'Destination';
  const sourcePlaceholder = isInbound ? '0.0.0.0/0 or sg-xxxxxx' : '0.0.0.0/0';
  const sourceTooltip = isInbound
    ? 'Enter CIDR block (e.g., 0.0.0.0/0) or security group ID'
    : 'Enter CIDR block (e.g., 0.0.0.0/0) for the destination';

  return (
    <Box>
      <Text fontSize="md" fontWeight="medium" mb={2}>
        {isInbound ? 'Inbound Rules' : 'Outbound Rules'}
      </Text>
      <Table size="sm" mb={4}>
        <Thead>
          <Tr>
            <Th>Protocol</Th>
            <Th>Port</Th>
            <Th>{sourceLabel}</Th>
            <Th>Description</Th>
            <Th width="50px"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {rules.map((rule, index) => (
            <Tr key={index}>
              <Td>{rule.protocol}</Td>
              <Td>{rule.port}</Td>
              <Td>{rule.source}</Td>
              <Td>{rule.description}</Td>
              <Td>
                <IconButton
                  aria-label="Remove rule"
                  icon={<FaTrash />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleRemoveRule(index)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <VStack spacing={3} align="stretch">
        <HStack>
          <FormControl>
            <FormLabel fontSize="sm">
              <HStack spacing={1}>
                <Text>Protocol</Text>
                <Tooltip label="Select the protocol for this rule">
                  <Box display="inline-block">
                    <FaInfoCircle />
                  </Box>
                </Tooltip>
              </HStack>
            </FormLabel>
            <Select
              size="sm"
              value={newRule.protocol}
              onChange={(e) =>
                setNewRule({ ...newRule, protocol: e.target.value })
              }
            >
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
              <option value="icmp">ICMP</option>
              <option value="-1">All Traffic</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">
              <HStack spacing={1}>
                <Text>Port</Text>
                <Tooltip label="Enter a port number or range (e.g., 80 or 80-443)">
                  <Box display="inline-block">
                    <FaInfoCircle />
                  </Box>
                </Tooltip>
              </HStack>
            </FormLabel>
            <Input
              size="sm"
              value={newRule.port}
              onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
              placeholder="80 or 80-443"
            />
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <FormLabel fontSize="sm">
              <HStack spacing={1}>
                <Text>{sourceLabel}</Text>
                <Tooltip label={sourceTooltip}>
                  <Box display="inline-block">
                    <FaInfoCircle />
                  </Box>
                </Tooltip>
              </HStack>
            </FormLabel>
            <Input
              size="sm"
              value={newRule.source}
              onChange={(e) => setNewRule({ ...newRule, source: e.target.value })}
              placeholder={sourcePlaceholder}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">Description</FormLabel>
            <Input
              size="sm"
              value={newRule.description}
              onChange={(e) =>
                setNewRule({ ...newRule, description: e.target.value })
              }
              placeholder="Rule description"
            />
          </FormControl>
        </HStack>

        <FormControl isInvalid={!!error}>
          <Button
            leftIcon={<FaPlus />}
            size="sm"
            onClick={handleAddRule}
            colorScheme="blue"
          >
            Add Rule
          </Button>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default SecurityGroupRulesEditor;
