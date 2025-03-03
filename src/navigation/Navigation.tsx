import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ROUTES} from './Routes';
import Splash from '@modules/onBoard';
import {navigationRef} from './NavigatonUtil';
import MainNavigator from './MainNavigator';
import Products from '@modules/products';
import Cart from '@modules/cart';
import PaymentSuccess from '@modules/PaymentSuccess';
import ARViewer from '@modules/ar_viewer';

const stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={ROUTES.SPLASH}>
        <stack.Screen name={ROUTES.SPLASH} component={Splash} />
        <stack.Screen name={ROUTES.MAINNAVIGATOR} component={MainNavigator} />
        <stack.Screen name={ROUTES.PRODUCTS} component={Products} />
        <stack.Screen name={ROUTES.CART} component={Cart} />
        <stack.Screen name={ROUTES.ARVIEWER} component={ARViewer} />
        <stack.Screen name={ROUTES.PAYMENTSUCCESS} component={PaymentSuccess} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
