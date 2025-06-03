import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Switch,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { CloudProviderSettings } from '../types/Settings';
import { defaultSettings, SETTINGS_STORAGE_KEY } from '../types/Settings';

const Links = [
  { name: 'Home', to: '/' },
];

const NavLink = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <Link
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
);

export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const menuBg = useColorModeValue('white', 'gray.700');
  const menuHoverBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const [settings, setSettings] = useState<CloudProviderSettings>(defaultSettings);

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
    }
  }, []);

  // Handle provider toggle
  const handleToggle = useCallback((provider: keyof CloudProviderSettings) => {
    const newSettings = {
      ...settings,
      [provider]: !settings[provider],
    };
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
  }, [settings]);

  return (
    <Box bg={bg} px={4} boxShadow="sm">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Image
              src={useColorModeValue('/logo.svg', '/logo-white.svg')}
              alt="Archibald Logo"
              h="40px"
            />
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.to}>
                {link.name}
              </NavLink>
            ))}
            <Menu>
              <MenuButton
                as={Link}
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
              >
                Providers
              </MenuButton>
              <MenuList bg={menuBg} borderColor={borderColor}>
                <MenuItem closeOnSelect={false} _hover={{ bg: menuHoverBg }}>
                  <Flex justify="space-between" align="center" width="100%" gap={4}>
                    <Text fontSize="sm">AWS</Text>
                    <Switch
                      isChecked={settings.aws}
                      onChange={() => handleToggle('aws')}
                      colorScheme="blue"
                    />
                  </Flex>
                </MenuItem>
                <MenuItem closeOnSelect={false} _hover={{ bg: menuHoverBg }}>
                  <Flex justify="space-between" align="center" width="100%" gap={4}>
                    <Text fontSize="sm">Google Cloud Platform</Text>
                    <Switch
                      isChecked={settings.gcp}
                      onChange={() => handleToggle('gcp')}
                      colorScheme="blue"
                    />
                  </Flex>
                </MenuItem>
                <MenuItem closeOnSelect={false} _hover={{ bg: menuHoverBg }}>
                  <Flex justify="space-between" align="center" width="100%" gap={4}>
                    <Text fontSize="sm">Microsoft Azure</Text>
                    <Switch
                      isChecked={settings.azure}
                      onChange={() => handleToggle('azure')}
                      colorScheme="blue"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem closeOnSelect={false} _hover={{ bg: menuHoverBg }}>
                  <Flex justify="space-between" align="center" width="100%" gap={4}>
                    <Text fontSize="sm">Red Hat OpenShift</Text>
                    <Switch
                      isChecked={settings.openshift}
                      onChange={() => handleToggle('openshift')}
                      colorScheme="blue"
                    />
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>

        <IconButton
          size={'md'}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          aria-label={'Toggle Color Mode'}
          onClick={toggleColorMode}
          variant="ghost"
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.to}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navigation;
