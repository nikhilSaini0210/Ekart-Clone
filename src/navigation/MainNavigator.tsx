import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '@utils/Constants';
import {Platform} from 'react-native';
import Home from '@modules/home';
import {ROUTES} from './Routes';
import Categories from '@modules/categories';
import Account from '@modules/account';
import Cart from '@modules/cart';
import {AccountIcon, CartIcon, CategoriesIcon, HomeIcon} from './TabIcons';
import {useAppSelector} from '@store/reduxHook';
import {selectTotalItemsInCart} from '@modules/cart/api/slice';

const Tab = createBottomTabNavigator();

const MainNavigator: FC = () => {
  const count = useAppSelector(selectTotalItemsInCart);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.active,
        tabBarInactiveTintColor: Colors.inactive,
        lazy: true,
        tabBarStyle: {
          paddingTop: Platform.OS === 'ios' ? 10 : 0,
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          title:'Home',
          tabBarIcon: ({focused, color, size}) => (
            <HomeIcon focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.CATEGORIES}
        component={Categories}
        options={{
          title:'Categories',
          tabBarIcon: ({focused, color, size}) => (
            <CategoriesIcon focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.ACCOUNT}
        component={Account}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AccountIcon focused={focused} color={color} size={size} />
          ),
          title: 'Account',
        }}
      />
      <Tab.Screen
        name={ROUTES.CART}
        component={Cart}
        options={{
          title:'Cart',
          tabBarIcon: ({focused, color, size}) => (
            <CartIcon focused={focused} color={color} size={size} />
          ),
          tabBarBadge: count > 0 ? count : undefined,
          tabBarBadgeStyle: {
            width: 16,
            height: 16,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
