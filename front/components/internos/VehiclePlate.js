import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { string } from 'prop-types';


const VehiclePlate = ({ plateNumber }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/plate.png')} style={styles.backgroundImage} />
      <Text style={styles.plateText}>{plateNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  backgroundImage: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain', 
  },
  plateText: {
    position: 'absolute',
    // top: 40, // Posición vertical del texto
    width: 100, // Ancho del texto
    color: '#000', // Color del texto
    fontSize: 18, // Tamaño del texto
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    zIndex: 1, // Asegura que el texto esté encima de la imagen
  },
});

export default VehiclePlate;
