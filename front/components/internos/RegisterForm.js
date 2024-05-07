import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { Input, Button, Icon } from 'react-native-elements';
import { useState } from 'react'
import axios from 'axios'
import { validateEmail } from '../../utils/helpers';
import {set, size} from 'lodash'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../functions/Loading';
import { BASE_URL } from '../../utils/helpers';


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorName, setErrorName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRepeatPassword, setErrorRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();
    
    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
        
    }

    const handleRegister = () => {
        if (validateData()) {
            setLoading(true);
            // Primero, verifica si el correo electrónico ya existe
            axios.get(`${BASE_URL}/api/users/email/${formData.email}`)
                .then(response => {
                    if (response.data.exists) {
                        // El correo electrónico ya existe, muestra un error
                        setErrorEmail('El correo electrónico ya existe');
                        setLoading(false);
                        // console.log('El correo electrónico ya existe en la base de datos');
                    } else {
                        // El correo electrónico no existe, procede con el registro
                        axios.post(`${BASE_URL}/api/users`, formData)
                            .then(response => {
                                Alert.alert('Usuario registrado con éxito, ya puedes iniciar sesión');
                                navigation.navigate('LoginScreen');
                                console.log('Usuario registrado con éxito', response.data);
                                // navigation.navigate('PerfilScreen')
                            })
                            .catch(error => {
                                console.log('Error al registrar usuario', error);
                                setLoading(false);
                            });
                            setLoading(false);
                    }
                })
                .catch(error => {
                    console.log('Error al verificar el correo electrónico', error);
                    setLoading(false);
                });
        } else {
            return;
        }
    }
   

    const validateData = () => {
        setErrorName('');
        setErrorLastName('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorRepeatPassword('');
        let isValid = true;

        if (size(formData.name) < 1) {
            setErrorName('Debes ingresar un nombre');
            isValid = false;
        }
        if (size(formData.last_name) < 1) {
            setErrorLastName('Debes ingresar un apellido');
            isValid = false;
        }
        if (!validateEmail(formData.email)) {
            setErrorEmail('Debes ingresar un correo electrónico válido');
            isValid = false;
        }
        if (size(formData.password) < 6) {
            setErrorPassword('Debes ingresar una contraseña de al menos 6 caracteres');
            isValid = false;
        }
        if (formData.password !== formData.repeatPassword) {
            setErrorRepeatPassword('Las contraseñas no coinciden');
            isValid = false;
        }
        return isValid;
    }
    


    

  return (
    <View>
        <Text style={{color: '#94b43b', fontSize: 20, textAlign: 'center', marginTop: 20}}>Registrarse</Text>
        <Input 
            placeholder='Nombre'
            containerStyle={styles.input}
            onChange={(e) => onChange(e, 'name')}
            errorMessage={errorName}
            defaultValue={formData.name}
            />
        <Input 
            placeholder='Apellidos'
            containerStyle={styles.input}
            onChange={(e) => onChange(e, 'last_name')}
            errorMessage={errorLastName}
            defaultValue={formData.last_name}
            />
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
        <Input
            placeholder='Repetir contraseña'
            password={true}
            secureTextEntry={showPassword ? false : true}
            onChange={(e) => onChange(e, 'repeatPassword')}
            containerStyle={styles.input}
            errorMessage={errorRepeatPassword}
            defaultValue={formData.repeatPassword}
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
            title='Registrar Nuevo Usuario'
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={handleRegister}
        />
        <Loading 
            isVisible={loading}
            text='Creando cuenta...'
            timeout={10000}

        />
    </View>
    
  )
  
}
const defaultFormValues  = () => {
    return { name: '', last_name: '', email: '', password: '', repeatPassword: '' }
}

export default RegisterForm

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