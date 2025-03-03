import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import UniversalAdd from '@modules/products/atoms/UniversalAdd';
import {Symbols} from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

interface OrderItemProps {
  item: any;
}

const OrderItem: FC<OrderItemProps> = ({item}) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item?.image_uri}} style={styles.img} />
        <UniversalAdd item={item} />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item?.name}</Text>
        <Text style={styles.itemDetails}>
          {Symbols.RS}
          {item?.price} {Symbols.Multiply} {item?.quantity}{' '}
        </Text>
        <Text style={styles.itemTotal}>
          Total: {Symbols.RS}
          {item?.totalPrice}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 5,
    borderColor: '#F0F2F5',
    padding: 10,
  },
  imageContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    borderWidth: 1,
    height: 90,
    borderColor: '#ccc',
    width: '100%',
    marginBottom: 10,
  },
  itemContainer: {
    width: '70%',
  },
  itemName: {
    fontSize: RFValue(12),
    color: '#000',
    fontWeight: '500',
  },
  itemDetails: {
    fontSize: RFValue(10),
    color: '#666',
    marginTop: 4,
  },
  itemTotal: {
    fontSize: RFValue(12),
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },
});
