import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  color?: string;
  size?: number;
  name: string;
  iconFamily:
    | 'Ionicons'
    | 'MaterialIcons'
    | 'FontAwesome'
    | 'MaterialCommunityIcons';
}

const Icon: FC<IconProps> = ({color, size, name, iconFamily}) => {
  return (
    <>
      {iconFamily === 'Ionicons' && (
        <Ionicons name={name} size={size} color={color} />
      )}
      {iconFamily === 'MaterialIcons' && (
        <MaterialIcons name={name} size={size} color={color} />
      )}
      {iconFamily === 'FontAwesome' && (
        <FontAwesome name={name} size={size} color={color} />
      )}
      {iconFamily === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons name={name} size={size} color={color} />
      )}
    </>
  );
};

export default Icon;
