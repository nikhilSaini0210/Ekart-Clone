import {View, StyleSheet} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface DotsProps {
  active: number;
  index: number;
}

const Dots: FC<DotsProps> = ({active, index}) => {
  const dotWidth = useMemo(() => (active === index ? 35 : 20), [active, index]);

  const progress = useSharedValue(0);

  useEffect(() => {
    if (active === index) {
      progress.value = withRepeat(
        withTiming(1, {duration: 3000}),
        1,
        false,
        () => {
          progress.value = 0;
        },
      );
    } else {
      progress.value = 0;
    }
  }, [active, index, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={[{width: dotWidth}, styles.dotConatiner]}>
      <Animated.View style={[styles.dot, animatedStyle]} />
    </View>
  );
};

export default Dots;

const styles = StyleSheet.create({
  dotConatiner: {
    height: 4,
    borderRadius: 50,
    backgroundColor: '#DFDFDF',
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  dot: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 50,
  },
});
