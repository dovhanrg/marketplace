import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function Button({ className = '', ...props }: TouchableOpacityProps & { className?: string }) {
  return <TouchableOpacity className={className} {...props} />;
}