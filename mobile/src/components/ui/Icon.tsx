import React from 'react';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type IconLibrary = 'ionicons' | 'feather' | 'material';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  library?: IconLibrary;
}

export default function Icon({ name, size = 24, color = '#ffffff', library = 'feather' }: IconProps) {
  switch (library) {
    case 'ionicons':
      return <Ionicons name={name as any} size={size} color={color} />;
    case 'material':
      return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
    case 'feather':
    default:
      return <Feather name={name as any} size={size} color={color} />;
  }
}

// Elegant icon presets for ELOURA
export const Icons = {
  // Navigation
  home: (props: Partial<IconProps>) => <Icon name="home" {...props} />,
  compass: (props: Partial<IconProps>) => <Icon name="compass" {...props} />,
  messageCircle: (props: Partial<IconProps>) => <Icon name="message-circle" {...props} />,
  user: (props: Partial<IconProps>) => <Icon name="user" {...props} />,
  
  // Actions
  heart: (props: Partial<IconProps>) => <Icon name="heart" {...props} />,
  send: (props: Partial<IconProps>) => <Icon name="send" {...props} />,
  plus: (props: Partial<IconProps>) => <Icon name="plus" {...props} />,
  search: (props: Partial<IconProps>) => <Icon name="search" {...props} />,
  filter: (props: Partial<IconProps>) => <Icon name="filter" {...props} />,
  
  // Social
  users: (props: Partial<IconProps>) => <Icon name="users" {...props} />,
  globe: (props: Partial<IconProps>) => <Icon name="globe" {...props} />,
  calendar: (props: Partial<IconProps>) => <Icon name="calendar" {...props} />,
  mapPin: (props: Partial<IconProps>) => <Icon name="map-pin" {...props} />,
  
  // Media
  camera: (props: Partial<IconProps>) => <Icon name="camera" {...props} />,
  image: (props: Partial<IconProps>) => <Icon name="image" {...props} />,
  mic: (props: Partial<IconProps>) => <Icon name="mic" {...props} />,
  video: (props: Partial<IconProps>) => <Icon name="video" {...props} />,
  
  // Status
  checkCircle: (props: Partial<IconProps>) => <Icon name="check-circle" {...props} />,
  star: (props: Partial<IconProps>) => <Icon name="star" {...props} />,
  award: (props: Partial<IconProps>) => <Icon name="award" {...props} />,
  shield: (props: Partial<IconProps>) => <Icon name="shield" {...props} />,
  
  // Utility
  settings: (props: Partial<IconProps>) => <Icon name="settings" {...props} />,
  bell: (props: Partial<IconProps>) => <Icon name="bell" {...props} />,
  lock: (props: Partial<IconProps>) => <Icon name="lock" {...props} />,
  eye: (props: Partial<IconProps>) => <Icon name="eye" {...props} />,
  moreVertical: (props: Partial<IconProps>) => <Icon name="more-vertical" {...props} />,
  
  // Navigation arrows
  arrowLeft: (props: Partial<IconProps>) => <Icon name="arrow-left" {...props} />,
  arrowRight: (props: Partial<IconProps>) => <Icon name="arrow-right" {...props} />,
  chevronRight: (props: Partial<IconProps>) => <Icon name="chevron-right" {...props} />,
  
  // Premium
  crown: (props: Partial<IconProps>) => <Icon name="crown" library="material" {...props} />,
  sparkles: (props: Partial<IconProps>) => <Icon name="sparkles" library="ionicons" {...props} />,
  flame: (props: Partial<IconProps>) => <Icon name="flame" library="ionicons" {...props} />,
};

