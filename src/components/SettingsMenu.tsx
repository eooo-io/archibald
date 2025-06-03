import {
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import type { CloudProviderSettings } from '../types/Settings';
import { defaultSettings, SETTINGS_STORAGE_KEY } from '../types/Settings';

interface SettingsMenuProps {
  onSettingsChange: (settings: CloudProviderSettings) => void;
}

export const SettingsMenu = ({ onSettingsChange }: SettingsMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [settings, setSettings] = useState<CloudProviderSettings>(defaultSettings);

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      onSettingsChange(parsedSettings);
    } else {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
      onSettingsChange(defaultSettings);
    }
  }, [onSettingsChange]);

  // Handle provider toggle
  const handleToggle = useCallback((provider: keyof CloudProviderSettings) => {
    const newSettings = {
      ...settings,
      [provider]: !settings[provider],
    };
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    onSettingsChange(newSettings);
  }, [settings, onSettingsChange]);

  // Reset settings to default
  const handleReset = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
    onSettingsChange(defaultSettings);
  }, [onSettingsChange]);

  return (
    <>
      <IconButton
        aria-label="Settings"
        icon={<FaCog />}
        onClick={onOpen}
        size="sm"
        variant="ghost"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="aws-toggle" mb="0" flex="1">
                  AWS
                </FormLabel>
                <Switch
                  id="aws-toggle"
                  isChecked={settings.aws}
                  onChange={() => handleToggle('aws')}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="gcp-toggle" mb="0" flex="1">
                  Google Cloud Platform
                </FormLabel>
                <Switch
                  id="gcp-toggle"
                  isChecked={settings.gcp}
                  onChange={() => handleToggle('gcp')}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="azure-toggle" mb="0" flex="1">
                  Microsoft Azure
                </FormLabel>
                <Switch
                  id="azure-toggle"
                  isChecked={settings.azure}
                  onChange={() => handleToggle('azure')}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="openshift-toggle" mb="0" flex="1">
                  Red Hat OpenShift
                </FormLabel>
                <Switch
                  id="openshift-toggle"
                  isChecked={settings.openshift}
                  onChange={() => handleToggle('openshift')}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleReset}>
              Reset to Default
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsMenu;
