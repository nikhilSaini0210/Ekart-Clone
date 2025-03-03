import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {FONTS, screenWidth} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from '@components/atoms/Icon';
import {navigate} from '@navigation/NavigatonUtil';
import {ROUTES} from '@navigation/Routes';

interface VerticalListProps {
  data: any;
}

const VerticalList: FC<VerticalListProps> = ({data}) => {
  const onSelect = () => {
    navigate(ROUTES.CATEGORIES);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.absoluteView, {backgroundColor: data?.bgColor}]} />
      <Text style={styles.hadingText}>{data?.title}</Text>

      <Pressable style={[styles.button, {backgroundColor: data?.btnColor}]}>
        <Text style={styles.buttonText}>Explore More</Text>
        <Icon
          size={16}
          color="#ffffff"
          name="arrow-forward-sharp"
          iconFamily="Ionicons"
        />
      </Pressable>

      <FlatList
        data={data?.data}
        numColumns={2}
        keyExtractor={item => item?.id}
        renderItem={({item}) => (
          <Pressable style={styles.itemContainer} onPress={onSelect}>
            <Image source={{uri: item?.image_uri}} style={styles.image} />
            <Text style={styles.productText}>{item?.title}</Text>
            <Text style={styles.subTitle}>{item?.subTitle}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentConatiner}
      />
    </View>
  );
};

export default VerticalList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  absoluteView: {
    width: screenWidth,
    height: 180,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  hadingText: {
    fontSize: RFValue(16),
    fontFamily: FONTS.heading,
    color: '#222',
  },
  button: {
    padding: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 10,
    marginVertical: 15,
  },
  buttonText: {
    fontWeight: '400',
    color: '#ffffff',
    fontSize: RFValue(12),
  },
  itemContainer: {
    width: '48%',
    margin: 5,
    height: 220,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productText: {
    fontFamily: FONTS.heading,
    color: '#222',
    fontSize: RFValue(14),
    marginTop: 4,
  },
  subTitle: {
    fontWeight: '400',
    color: '#222',
    fontSize: RFValue(10),
  },
  contentConatiner: {
    paddingBottom: 10,
  },
});
