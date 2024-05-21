import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { getVehicleTypes } from '../functions/actions';

const CuposIcon = () => {
  const [spaces, setSpaces] = useState({
    cars: 0,
    motorcycles: 0,
    bicycles: 0,
  });

  const fetchSpaces = useCallback(async () => {
    try {
      const vehicleTypes = await getVehicleTypes();
      const carsType = vehicleTypes.find((type) => type.name === 'Carro');
      const motorcyclesType = vehicleTypes.find((type) => type.name === 'Moto');
      const bicyclesType = vehicleTypes.find((type) => type.name === 'Bicicleta');
      
      setSpaces({
        cars: carsType ? carsType.spaces : 0,
        motorcycles: motorcyclesType ? motorcyclesType.spaces : 0,
        bicycles: bicyclesType ? bicyclesType.spaces : 0,
      });
    } catch (error) {
      console.error('Error fetching vehicle types:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSpaces();
    }, [fetchSpaces])
  );

  return (
    <View style={styles.cuposContainer}>
      <Text style={styles.cuposText}>Cupos Disponibles:</Text>
      <View style={styles.iconContainer}>
        <View style={styles.iconItem}>
          <Icon name="car" type="font-awesome" color="#000" />
          <Text style={styles.cuposTextIcon}>{spaces.cars}</Text>
        </View>
        <View style={styles.iconItem}>
          <Icon name="motorcycle" type="font-awesome" color="#000" />
          <Text style={styles.cuposTextIcon}>{spaces.motorcycles}</Text>
        </View>
        <View style={styles.iconItem}>
          <Icon name="bicycle" type="font-awesome" color="#000" />
          <Text style={styles.cuposTextIcon}>{spaces.bicycles}</Text>
        </View>
      </View>
    </View>
  );
};

export default CuposIcon;

const styles = StyleSheet.create({
  cuposContainer: {
    padding: 20,
  },
  cuposText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#616161',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconItem: {
    width: 110,
    height: 80,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cuposTextIcon: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
