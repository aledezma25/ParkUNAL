import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements';
import { addVehicle, getVehicleTypes, getCurrentUser } from '../functions/actions'; 
import { Picker } from '@react-native-picker/picker';

export default function AddVehicleForm({ setShowModal, toastRef, onReload }) {
  const [newVehicle, setNewVehicle] = useState({
    mark: '',
    idTypes: '',
    idUser: '',
    color: '',
    plate: '',
    image: '',
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const fetchVehicleTypes = async () => {
    try {
      const typesData = await getVehicleTypes();
      setVehicleTypes(typesData);
    } catch (error) {
      console.error('Error al obtener los tipos de vehículos:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setNewVehicle({ ...newVehicle, idUser: currentUser.id });
        }
      } catch (error) {
        console.error('Error al obtener el usuario', error);
      }
    };

    fetchData();
  }, []);

  const handleVehicleTypeChange = (itemValue) => {
    setNewVehicle((prevState) => ({
      ...prevState,
      idTypes: itemValue,
      plate: itemValue === 'Bicicleta' ? 'NO' : prevState.plate,
    }));
  };

  const validateForm = () => {
    const { plate, idTypes, color, mark } = newVehicle;
    let isValid = true;
    let errors = {};

    if (!mark) {
      errors.mark = 'La marca es obligatoria';
      isValid = false;
    }
    if (!plate) {
      errors.plate = 'La placa es obligatoria';
      isValid = false;
    }
    if (!idTypes) {
      errors.idTypes = 'El tipo de vehículo es obligatorio';
      isValid = false;
    }
    if (!color) {
      errors.color = 'El color es obligatorio';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await addVehicle(newVehicle);
    setLoading(false);

    if (result.success) {
      setShowModal(false);
      if (toastRef && toastRef.current) {
        toastRef.current.show('Vehículo añadido correctamente', 2000);
      } else {
        console.warn('toastRef no está definido o no tiene la propiedad current');
      }
      if (onReload) {
        onReload(); // Recarga la lista de vehículos
      }
    } else {
      setError(result.error || {});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Vehículo</Text>

      <Input
        placeholder="Marca"
        containerStyle={styles.input}
        value={newVehicle.mark}
        onChangeText={(text) => setNewVehicle({ ...newVehicle, mark: text })}
        errorMessage={error.mark}
        rightIcon={{
          type: 'material-community',
          name: 'car',
          color: '#c2c2c2',
        }}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={newVehicle.idTypes}
          onValueChange={handleVehicleTypeChange}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un tipo" value="" />
          {vehicleTypes.map((type) => (
            <Picker.Item key={type.id} label={type.name} value={type.id} />
          ))}
        </Picker>
      </View>
      <Input
        placeholder="Color"
        containerStyle={styles.input}
        value={newVehicle.color}
        onChangeText={(text) => setNewVehicle({ ...newVehicle, color: text })}
        errorMessage={error.color}
        rightIcon={{
          type: 'material-community',
          name: 'palette-outline',
          color: '#c2c2c2',
        }}
      />
      <Input
        placeholder="Placa"
        containerStyle={styles.input}
        value={newVehicle.plate}
        onChangeText={(text) => setNewVehicle({ ...newVehicle, plate: text })}
        errorMessage={error.plate}
        rightIcon={{
          type: 'material-community',
          name: 'card-text-outline',
          color: '#c2c2c2',
        }}
      />

      <Button
        title="Agregar Vehículo"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={onSubmit}
        loading={loading}
      />
      <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
        <Icon name="close" type="material-community" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#94b43b',
  },
  pickerContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#c2c2c2',
    marginBottom: 30,
  },
  picker: {
    height: 50,
    color: '#c2c2c2',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#94b43b',
    borderRadius: 20,
    padding: 5,
  },
});
