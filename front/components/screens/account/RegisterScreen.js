import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import RegisterForm from '../../internos/RegisterForm'
//Importa keyboardscrollview para que el teclado no tape el formulario
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const RegisterScreen = () => {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Image
        source={require('../../../assets/PortadaWebBlack.png')}
        resizeMode='contain'
        style={styles.image}
      />
      <RegisterForm />
    </KeyboardAwareScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  image : {
    width: '100%',
    height: 150,
    marginBottom: 10,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  
})