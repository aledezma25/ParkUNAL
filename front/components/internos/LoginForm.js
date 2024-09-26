import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { Input, Icon, Button } from 'react-native-elements';
import { useState } from 'react';
import { validateEmail } from '../../utils/helpers';
import Loading from '../functions/Loading';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { isEmpty, set } from 'lodash';
import { BASE_URL } from '../../utils/helpers';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const handleLogin = () => {
    if (validateData()) {
      setLoading(true);
      axios
        .post(`${BASE_URL}/api/login`, {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          Alert.alert('Bienvenido', 'Inicio de sesión correcto.');

          const token = response.data.token;
          console.log('Su token es: ', { token });

          // Almacena el token en AsyncStorage
          AsyncStorage.setItem('token', token);

          // Navega al componente
          navigation.navigate('AccountScreen');

          setLoading(false);
          setFormData(defaultFormValues());
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert('Contraseña incorrecta. Inténtalo de nuevo.');
            navigation.navigate('LoginScreen');
            console.log(error);
            setLoading(false);
          } else {
            Alert.alert('Error', 'Error al iniciar sesión. Inténtalo de nuevo.');
            navigation.navigate('LoginScreen');
            console.log(error);
            setLoading(false);
          }
        });
    } else {
      return;
    }
  };

  const validateData = () => {
    setErrorEmail('');
    setErrorPassword('');
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail('Debes ingresar un correo electrónico válido');
      isValid = false;
    }
    if (isEmpty(formData.password)) {
      setErrorPassword('Debes ingresar tu contraseña');
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Input
        placeholder='Correo electrónico'
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        onChange={(e) => onChange(e, 'email')}
        keyboardType='email-address'
        errorMessage={errorEmail}
        defaultValue={formData.email}
        leftIcon={
          <Icon
            type='material-community'
            name='email-outline'
            color='#94b43b'
            size={24}
          />
        }
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#c2c2c2',
        }}
      />
      <Input
        placeholder='Contraseña'
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, 'password')}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        leftIcon={
          <Icon
            type='material-community'
            name='lock-outline'
            color='#94b43b'
            size={24}
          />
        }
        rightIcon={
          <Icon
            type='material-community'
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            color='#c2c2c2'
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title='Iniciar sesión'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        titleStyle={styles.btnText}
        onPress={handleLogin}
      />
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        
      </TouchableOpacity>
      <Loading isVisible={loading} text='Iniciando sesión...' timeout={10000} />
    </View>
  );
}

const defaultFormValues = () => {
  return { email: '', password: '' };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  title: {
    color: '#94b43b',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  btnContainer: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  btn: {
    backgroundColor: '#94b43b',
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#333',
  },
  registerLink: {
    color: '#94b43b',
    fontWeight: 'bold',
  },
});
