import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {loginOrSignup} from '../api/api';
import {setData} from '../api/slice';
import {navigate} from '@navigation/NavigatonUtil';
import {ROUTES} from '@navigation/Routes';
import {clearCart} from '@modules/cart/api/slice';
import {modalStyles} from '@styles/modalStyles';
import Icon from '@components/atoms/Icon';
import {Colors} from '@utils/Constants';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({visible, onClose}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.account.user) as any;
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleLogin = async () => {
    const data = await loginOrSignup(number, address);
    if (data) {
      dispatch(setData(data));
      onClose();
    } else {
      Alert.alert('There was an error');
    }
  };

  useEffect(() => {
    if (user?.phone) {
      setNumber(user?.phone);
      setAddress(user?.address);
    }
  }, [user]);

  const handleLogout = async () => {
    onClose();
    navigate(ROUTES.HOME);
    setAddress('');
    setNumber('');
    await dispatch(clearCart());
    await dispatch(setData(null));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={modalStyles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={modalStyles.keyboardAvoidingView}>
            <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
              <View style={modalStyles.modalContent}>
                <TouchableOpacity
                  style={modalStyles.closeIcon}
                  onPress={onClose}>
                  <Icon
                    size={20}
                    color="#fff"
                    name="close"
                    iconFamily="Ionicons"
                  />
                </TouchableOpacity>
                <Text style={modalStyles.title}>
                  Login in for the best experience
                </Text>
                <Text style={modalStyles.subTitle}>
                  Enter your phone number tp proceed
                </Text>

                <TextInput
                  style={modalStyles.input}
                  placeholder="Enter your phone number"
                  value={number}
                  onChangeText={setNumber}
                  maxLength={10}
                  keyboardType="number-pad"
                  placeholderTextColor={'#ccc'}
                />
                <TextInput
                  style={modalStyles.textareainput}
                  placeholder="Enter your address here"
                  value={address}
                  onChangeText={setAddress}
                  textAlignVertical="top"
                  multiline
                  placeholderTextColor={'#ccc'}
                />

                <View style={modalStyles.buttonContainer}>
                  <TouchableOpacity
                    style={modalStyles.button}
                    onPress={handleLogin}>
                    <Text style={modalStyles.buttonText}>
                      {!user ? 'Login' : 'Save'}
                    </Text>
                    {user && (
                      <TouchableOpacity
                        onPress={handleLogout}
                        style={[modalStyles.button, styles.logoutBtn]}>
                        <Text
                          style={[modalStyles.buttonText, styles.logoutText]}>
                          Logout
                        </Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: 'transparent',
    borderColor: Colors.active,
    borderWidth: 1,
  },
  logoutText: {
    color: Colors.active,
  },
});

export default LoginModal;
