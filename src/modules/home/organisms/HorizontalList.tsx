import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {screenWidth} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '@navigation/NavigatonUtil';
import {ROUTES} from '@navigation/Routes';

interface HorizontalListProps {
  data: any;
}

const HorizontalList: FC<HorizontalListProps> = ({data}) => {
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
        renderItem={({item}) => (
          <Pressable onPress={onSelect}>
            <Image source={{uri: item?.image_uri}} style={styles.image} />
          </Pressable>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  image: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.6,
    marginRight: 12,
    borderRadius: 15,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  textStyle: {
    fontSize: RFValue(14),
    fontWeight: '800',
    margin: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
});
