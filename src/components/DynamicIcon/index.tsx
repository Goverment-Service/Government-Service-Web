import React from 'react';
import {
  Calendar,
  Building2,
  GraduationCap,
  UserRound,
  UsersRound,
  BookOpen,
  CalendarCheck,
  UserCog,
  Waves,
  KeyRound,
  IdCard,
  History,
  Languages,
  Briefcase,
  House,
  Trophy,
  FileText,
  Shuffle,
  CalendarClock,
  Bell,
  BarChart3,
  Flag,
  Bot,
  type LucideProps,
} from 'lucide-react';
import type {FeatureIcon} from '@site/src/data/generated/features';

const registry: Record<FeatureIcon, React.ComponentType<LucideProps>> = {
  Calendar,
  Building2,
  GraduationCap,
  UserRound,
  UsersRound,
  BookOpen,
  CalendarCheck,
  UserCog,
  Waves,
  KeyRound,
  IdCard,
  History,
  Languages,
  Briefcase,
  House,
  Trophy,
  FileText,
  Shuffle,
  CalendarClock,
  Bell,
  BarChart3,
  Flag,
  Bot,
};

type Props = LucideProps & {
  name: FeatureIcon;
};

export default function DynamicIcon({name, ...rest}: Props): React.ReactElement {
  const Icon = registry[name];
  return <Icon {...rest} />;
}
