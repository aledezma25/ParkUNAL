import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

const AddMessage = () => {
  const [mensaje, setMensaje] = useState('');

  const handleEnviarMensaje = () => {
    if (mensaje.trim() === '') {
      Alert.alert('Advertencia', 'Por favor, ingresa un mensaje antes de enviar.');
      return;
    }
    
    // Aquí iría la lógica para enviar el mensaje a tu backend
    console.log('Mensaje enviado:', mensaje);
    Alert.alert('Éxito', 'Tu mensaje ha sido enviado.');
    setMensaje(''); // Limpiar el campo de entrada
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu mensaje aquí..."
        value={mensaje}
        onChangeText={setMensaje}
      />
      <Button
        title="Enviar Mensaje"
        onPress={handleEnviarMensaje}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default AddMessage;
