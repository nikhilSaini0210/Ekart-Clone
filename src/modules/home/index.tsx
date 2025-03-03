import {Platform, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {screenHeight} from '@utils/Constants';
import MenuHeader from './molecules/MenuHeader';
import SearchBar from './molecules/SearchBar';
import MainList from './templates/MainList';

const Home = () => {
  const insets = useSafeAreaInsets();
  const insetsHeight = useMemo(
    () => (Platform.OS === 'android' ? insets.top : 0),
    [insets.top],
  );
  const scrollYGlobal = useSharedValue(0);
  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollYGlobal.value,
      [0, 100],
      [0, -100],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY}],
    };
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: insetsHeight,
        }}
      />
      <Animated.View style={[moveUpStyle]}>
        <View>
          <MenuHeader scrollY={scrollYGlobal} />
          <SearchBar />
        </View>
      </Animated.View>
      <Animated.View style={[moveUpStyle, {height: screenHeight}]}>
        <MainList scrollY={scrollYGlobal} />
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
