import {View, ViewStyle, StyleSheet, SafeAreaView} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {Colors} from '@utils/Constants';

interface CustomSafeareaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeareaView: FC<CustomSafeareaViewProps> = ({children, style}) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default CustomSafeareaView;
