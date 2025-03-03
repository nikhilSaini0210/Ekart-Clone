import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS, screenWidth} from '@utils/Constants';
import {navigate} from '@navigation/NavigatonUtil';
import {ROUTES} from '@navigation/Routes';

interface AnimatedHorizontalListProps {
  data: any;
}

const AnimatedHorizontalList: FC<AnimatedHorizontalListProps> = ({data}) => {
  const onSelect = () => {
    navigate(ROUTES.CATEGORIES);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{data?.title}</Text>

      <FlatList
        data={data?.data}
        keyExtractor={item => item?.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Pressable key={index} style={styles.imgContainer} onPress={onSelect}>
            <Image source={{uri: item?.image_uri}} style={styles.image} />
          </Pressable>
        )}
        contentContainerStyle={styles.listContainer}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default AnimatedHorizontalList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  imgContainer: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.6,
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.heading,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
});
