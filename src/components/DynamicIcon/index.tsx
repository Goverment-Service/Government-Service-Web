import React from 'react';
import {
  Bot,
  Briefcase,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  ShieldCheck,
  UserRound,
  type LucideProps,
} from 'lucide-react';
import type {FeatureIcon} from '@site/src/data/generated/features';

// Feature icons come from src/data/features/*.md; the rest are used by the
// home page's platform cards.
const registry: Record<FeatureIcon | 'Bot' | 'Briefcase' | 'Building2' | 'UserRound', React.ComponentType<LucideProps>> = {
  Bot,
  Briefcase,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  ShieldCheck,
  UserRound,
};

export type IconName = keyof typeof registry;

type Props = LucideProps & {
  name: IconName;
};

export default function DynamicIcon({name, ...rest}: Props): React.ReactElement {
  const Icon = registry[name];
  return <Icon {...rest} />;
}
