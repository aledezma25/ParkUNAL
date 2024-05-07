import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import LoginForm from '../../internos/LoginForm'
//Importa keyboardscrollview para que el teclado no tape el formulario
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const LoginScreen = () => {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('../../../assets/PortadaWebBlack.png')}
        resizeMode='contain'
        style={styles.image}
      />
      <View style={styles.container}>
        <LoginForm />
        <CreateAccount />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default LoginScreen

function CreateAccount() {
  const navigation = useNavigation();
  return (
      <Text style={styles.register}
            onPress={() => navigation.navigate('RegisterScreen')}
      >
        ¿Aún no tienes una cuenta? {" "}
      <Text style={styles.btnRegister}>
        Regístrate</Text>
      </Text>
  )
}

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
    // marginHorizontal: 40,
    marginTop: 30,
  },
  register: {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  btnRegister: {
    color: '#94b43b',
    fontWeight: 'bold'
  }
})
