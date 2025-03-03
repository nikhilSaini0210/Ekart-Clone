import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '@store/reduxHook';
import {getOrderByUserId} from './api/api';
import CustomSafeareaView from '@components/atoms/CustomSafeareaView';
import {orderStyles} from '@styles/orderStyles';
import LoginModal from './molecules/LoginModal';
import {formatDate, Symbols} from '@utils/Constants';

const Account = () => {
  const route = useRoute();
  const routeData = route?.params as any;
  const user = useAppSelector(state => state.account.user) as any;
  const [isVisible, setIsVisible] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const onPressUpdateAndLogin = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const renderItem = ({item}: any) => (
    <View style={orderStyles.orderContainer}>
      <Image
        source={{uri: item?.product?.image_uri}}
        style={orderStyles.image}
      />
      <View style={orderStyles.orderDetails}>
        <Text
          style={
            orderStyles.itemName
          }>{`${item?.quantity} ${Symbols.Multiply} ${item?.product?.name}`}</Text>
        <Text style={orderStyles.price}>
          {Symbols.RS}
          {item?.product?.price}
        </Text>
      </View>
    </View>
  );

  const fectchOrder = useCallback(async () => {
    const data = await getOrderByUserId(user?._id);
    if (data) {
      setOrders(data);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fectchOrder();
    } else {
      setOrders([]);
    }
  }, [fectchOrder, user]);

  useEffect(() => {
    if (routeData?.isRefresh && user) {
      fectchOrder();
    }
  }, [fectchOrder, routeData, user]);

  return (
    <>
      <CustomSafeareaView>
        <View style={orderStyles.container}>
          <Text style={orderStyles.heading}>
            {user ? user?.phone : 'Acount'}
          </Text>
          <View style={orderStyles.flexRow}>
            <Text style={orderStyles.subHeading}>
              {user ? user?.address : 'Log in to get exclusive orders'}
            </Text>
            <TouchableOpacity
              style={orderStyles.btn}
              onPress={onPressUpdateAndLogin}>
              <Text style={orderStyles.btnText}>
                {user ? 'Update' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={orderStyles.listContainer}>
          <Text style={orderStyles.heading}>Your Orders</Text>
          <FlatList
            data={orders}
            keyExtractor={item => item?._id?.toString()}
            renderItem={({item}) => (
              <View style={orderStyles.order}>
                <FlatList
                  data={item?.items}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={renderItem}
                  scrollEnabled={false}
                />
                <Text style={orderStyles.address}>{item?.address}</Text>
                <Text style={orderStyles.deliveryDate}>
                  Delivery by: {formatDate(item?.deliveryDate)}
                </Text>
                <View style={orderStyles.statusContainer}>
                  <Text style={orderStyles.statusText}>{item?.status}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View>
                <Text style={orderStyles.emptyText}>
                  {!user
                    ? 'LOGIN TO PLACE YOUR ORDERS'
                    : 'THERE ARE NO NEW ORDERS'}
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </CustomSafeareaView>
      {isVisible && <LoginModal onClose={onClose} visible={isVisible} />}
    </>
  );
};

export default Account;
