import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomSafeareaView from '@components/atoms/CustomSafeareaView';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppSelector} from '@store/reduxHook';
import {selectCartItems} from './api/slice';
import {navigate} from '@navigation/NavigatonUtil';
import {ROUTES} from '@navigation/Routes';
import {Colors, Symbols} from '@utils/Constants';
import OrderItem from './atoms/OrderItem';
import PlaceOrderButton from './atoms/PlaceOrderButton';

const Cart = () => {
  const carts = useAppSelector(selectCartItems);
  const user = useAppSelector(state => state.account.user) as any;

  const onPressShopNow = () => {
    navigate(ROUTES.CATEGORIES);
  };

  const renderItem = ({item}: any) => <OrderItem item={item} />;

  return (
    <CustomSafeareaView>
      <View style={styles.container}>
        <Text style={styles.heading}>My Cart</Text>
        <Text style={styles.number}>
          Deliver to : {user?.phone ? user?.phone : Symbols.Map}
        </Text>
        <Text style={styles.address}>
          {user?.address ? user?.address : 'Login first to place your orders'}
        </Text>
      </View>
      {carts.length > 0 ? (
        <FlatList
          data={carts}
          renderItem={renderItem}
          keyExtractor={item => item?._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={onPressShopNow}>
            <Text style={styles.showNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {carts.length > 0 && <PlaceOrderButton />}
    </CustomSafeareaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 5,
    borderColor: '#F0F2F5',
  },
  heading: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  number: {
    fontWeight: '500',
  },
  address: {
    color: '#666',
    marginTop: 3,
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: Colors.active,
    padding: 10,
  },
  showNowText: {
    fontSize: RFValue(12),
    color: '#fff',
    fontWeight: '500',
  },
});
