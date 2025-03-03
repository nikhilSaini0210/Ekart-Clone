import Icon from '@components/atoms/Icon';
import {FC} from 'react';

interface TabIconProps {
  focused: boolean;
  size: number;
  color: string;
}

export const HomeIcon: FC<TabIconProps> = ({focused, size, color}) => {
  return (
    <Icon
      name={focused ? 'home' : 'home-outline'}
      size={size}
      color={color}
      iconFamily="Ionicons"
    />
  );
};

export const CategoriesIcon: FC<TabIconProps> = ({focused, size, color}) => {
    return (
      <Icon
        name={focused ? 'grid' : 'grid-outline'}
        size={size}
        color={color}
        iconFamily="Ionicons"
      />
    );
  };

  export const AccountIcon: FC<TabIconProps> = ({focused, size, color}) => {
    return (
      <Icon
        name={focused ? 'person' : 'person-outline'}
        size={size}
        color={color}
        iconFamily="Ionicons"
      />
    );
  };

  export const CartIcon: FC<TabIconProps> = ({focused, size, color}) => {
    return (
      <Icon
        name={focused ? 'cart' : 'cart-outline'}
        size={size}
        color={color}
        iconFamily="MaterialCommunityIcons"
      />
    );
  };
