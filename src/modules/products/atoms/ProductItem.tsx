import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {navigate} from '@navigation/NavigatonUtil';
import Icon from '@components/atoms/Icon';
import {RFValue} from 'react-native-responsive-fontsize';
import UniversalAdd from './UniversalAdd';
import {ROUTES} from '@navigation/Routes';

interface ProductItemProps {
  isOdd: any;
  item: any;
}

const ProductItem: FC<ProductItemProps> = ({isOdd, item}) => {
  const marginRightProduct = React.useMemo(() => (isOdd ? 0 : 10), [isOdd]);


  return (
    <View style={[styles.productCard, {marginRight: marginRightProduct}]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item?.image_uri}} style={styles.productImage} />
        {/* {item?.ar_uri && ( */}
          <TouchableOpacity
            style={styles.button3d}
            onPress={() =>
              navigate(ROUTES.ARVIEWER, {
                uri: item?.ar_uri,
              })
            }>
            <Icon
              name="cube-scan"
              iconFamily="MaterialCommunityIcons"
              size={20}
              color="#000"
            />
          </TouchableOpacity>
         {/* )} */}
      </View>
      <View style={styles.productContent}>
        <Text numberOfLines={1} style={styles.productName}>
          {item?.name}
        </Text>
        <Text numberOfLines={2} style={styles.productDesc}>
          {item?.description}
        </Text>
        <Text style={styles.productPrice}>
          <Text style={styles.priceStyle}>₹{item?.price + 599}</Text> ₹
          {item?.price}
        </Text>
        <View style={styles.flexRow}>
          <View style={styles.hotDealContainer}>
            <Text style={styles.hotDealText}>Hot Deal</Text>
          </View>
          <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    width: '48%',
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: '#F7F7F7',
    width: '100%',
    height: 240,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button3d: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
    elevation: 5,
    zIndex: 1,
  },
  productContent: {
    paddingHorizontal: 10,
  },
  productName: {
    fontSize: RFValue(10),
    marginTop: 10,
  },
  productDesc: {
    fontSize: RFValue(9),
    color: '#555',
    textAlign: 'left',
    marginTop: 5,
  },
  productPrice: {
    fontSize: RFValue(10),
    color: '#000',
    marginTop: 10,
    fontWeight: '500',
  },
  priceStyle: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotDealContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#E7F9EC',
  },
  hotDealText: {
    fontSize: RFValue(10),
    color: '#35AB4F',
    fontWeight: '700',
  },
});
