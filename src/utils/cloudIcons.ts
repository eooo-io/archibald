import type { IconType } from 'react-icons';
import {
    FaAws,
    FaCloud,
    FaCube
} from 'react-icons/fa';
import { SiGooglecloud, SiRedhatopenshift } from 'react-icons/si';
import type { CloudProvider } from '../types/CloudComponents';

const providerIcons: Record<CloudProvider, IconType> = {
  AWS: FaAws,
  GCP: SiGooglecloud,
  OpenShift: SiRedhatopenshift,
  Azure: FaCloud,
  Custom: FaCube,
};

export const getCloudIcon = (provider: CloudProvider): IconType => {
  return providerIcons[provider] || providerIcons.Custom;
}; 