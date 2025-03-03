import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {
  addItem,
  removeItem,
  selectItemCountById,
} from '@modules/cart/api/slice';
import {Colors} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from '@components/atoms/Icon';

interface UniversalAddProps {
  item: any;
}

const UniversalAdd: FC<UniversalAddProps> = ({item}) => {
  const count = useAppSelector(selectItemCountById(item?._id));
  const dispatch = useAppDispatch();

  const bgColor = useMemo(
    () => (count === 0 ? '#fff' : Colors.active),
    [count],
  );

  const onPressAdd = () => {
    dispatch(addItem(item));
  };

  const onPressRemove = () => {
    dispatch(removeItem(item));
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      {count === 0 ? (
        <TouchableOpacity onPress={onPressAdd} style={styles.add}>
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={onPressRemove}>
            <Icon
              color="#fff"
              name="minus"
              iconFamily="MaterialCommunityIcons"
              size={RFValue(14)}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{count}</Text>
          <TouchableOpacity onPress={onPressAdd}>
            <Icon
              color="#fff"
              name="plus"
              iconFamily="MaterialCommunityIcons"
              size={RFValue(14)}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UniversalAdd;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.active,
    width: 65,
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  addText: {
    color: Colors.active,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    fontSize: RFValue(12),
  },
});
