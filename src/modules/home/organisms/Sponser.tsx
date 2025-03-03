import {Image, Pressable, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {navigate} from '@navigation/NavigatonUtil';
import {ROUTES} from '@navigation/Routes';
import {screenWidth} from '@utils/Constants';

interface SponserProps {
  data: any;
}

const Sponser: FC<SponserProps> = ({data}) => {
  const onSelect = () => {
    navigate(ROUTES.CATEGORIES);
  };

  return (
    <Pressable style={styles.container} onPress={onSelect}>
      <Image style={styles.img} source={{uri: data?.data?.[0]?.image_uri}} />
    </Pressable>
  );
};

export default Sponser;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    height: 80,
    width: screenWidth - 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
});
