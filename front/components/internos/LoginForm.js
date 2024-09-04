import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { Input, Icon, Button} from 'react-native-elements'
import { useState } from 'react'
import { validateEmail } from '../../utils/helpers';
import Loading from '../functions/Loading';
import { useNavigation } from '@react-navigation/native'
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
        setFormData({ ...formData, [type]: e.nativeEvent.text })
        
    }

    const handleLogin = () => {
        if (validateData()) {
            setLoading(true);
            axios.post(`${BASE_URL}/api/login`, {
                email: formData.email,
                password: formData.password,
            })
            .then((response) => {
                Alert.alert('Bienvenido', 'Inicio de sesión correcto.');
                
                const token = response.data.token;
                console.log('Su token es: ', {token});
                
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
    
}

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
        
    }

  return (
    <View>
        <Text style={{color: '#94b43b', fontSize: 20, textAlign: 'center', marginTop: 20}}>Iniciar sesión</Text>
        <Input 
            placeholder='Correo electrónico'
            containerStyle={styles.input}
            onChange={(e) => onChange(e, 'email')}
            keyboardType='email-address'
            errorMessage={errorEmail}
            defaultValue={formData.email}
            rightIcon={{
                type: 'material-community',
                name: 'at',
                color: '#c2c2c2'
            }}
            />
        <Input
            placeholder='Contraseña'
            password={true}
            secureTextEntry={showPassword ? false : true}
            onChange={(e) => onChange(e, 'password')}
            containerStyle={styles.input}
            errorMessage={errorPassword}
            defaultValue={formData.password}
            rightIcon={
                <Icon
                type='material-community'
                name= {showPassword ? 'eye-off-outline' : 'eye-outline'}
                color= '#c2c2c2'
                onPress={() => setShowPassword(!showPassword)}
                />
            }
            />
        <Button 
            title='Iniciar sesión'
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={handleLogin}
        />
        <Loading 
            isVisible={loading}
            text='Iniciando sesión...'
            timeout={10000}

        />

    </View>
  )
}
const defaultFormValues  = () => {
    return { email: '', password: '' }
}

const styles = StyleSheet.create({
    
    input: {
        width: '100%',
        marginTop: 20,

    }
    ,
    btnContainer: {
        marginTop: 20,
        width: '45%',
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: '#94b43b'
    }
})