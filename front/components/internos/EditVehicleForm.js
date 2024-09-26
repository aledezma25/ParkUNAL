import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { editVehicle } from '../functions/actions';
import { getVehicleTypes } from '../functions/actions';
// Importar picker
import { Picker } from '@react-native-picker/picker';



const EditVehicleForm = ({ vehicle, setShowModal, toastRef, onReload }) => {
  const [formData, setFormData] = useState({
    mark: vehicle.mark,
    idTypes: vehicle.idTypes,
    color: vehicle.color,
    plate: vehicle.plate,
    image: vehicle.image,   


  });
  const [vehicleTypes, setVehicleTypes] = useState([]);


  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    // Cargar los tipos de vehículos al montar el componente
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


  const handleSubmit = async () => {
    try {
      const { mark, idTypes, color, plate, image } = formData;


      const updatedVehicle = { ...vehicle, mark, plate, color, image, idTypes}; 
      const response = await editVehicle(updatedVehicle);
      if (response.success) {
        toastRef.current.show('Vehículo actualizado correctamente');
        setShowModal(false);
        onReload(); // Recargar la lista de vehículos
      } else {
        toastRef.current.show('Error al actualizar el vehículo');
      }
    } catch (error) {
      console.error('Error al actualizar vehículo:', error);
      toastRef.current.show('Error al actualizar el vehículo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Vehículo</Text>
      <Input
        style={styles.input}
        placeholder="Marca"
        value={formData.mark}
        onChangeText={(text) => handleInputChange('mark', text)}
        rightIcon={{
            type: 'material-community',
            name: 'car',
            color: '#c2c2c2',
          }}
        
      />
      <View style={styles.pickerContainer}>
        <Picker
            selectedValue={formData.idTypes}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
                handleInputChange('idTypes', itemValue)
            }>
            {vehicleTypes.map((type) => (
                <Picker.Item key={type.id} label={type.name} value={type.id} />
            ))}

        </Picker>
        </View>
        <Input
        style={styles.input}
        placeholder="Color"
        value={formData.color}
        onChangeText={(text) => handleInputChange('color', text)}
        rightIcon={{
            type: 'material-community',
            name: 'palette',
            color: '#c2c2c2',
          }}
        />
      <Input
        style={styles.input}
        placeholder="Placa"
        value={formData.plate}
        onChangeText={(text) => handleInputChange('plate', text)}
        rightIcon={{
            type: 'material-community',
            name: 'card-text-outline',
            color: '#c2c2c2',
          }}
      />
        
        {/* <Input
        style={styles.input}
        placeholder="Imagen"
        value={formData.image}
        onChangeText={(text) => handleInputChange('image', text)}
        rightIcon={{
            type: 'material-community',
            name: 'image',
            color: '#c2c2c2',
          }}
        /> */}

      <Button
        title="Guardar Cambios"
        containerStyle={styles.saveButtonContainer}
        buttonStyle={styles.saveButton}
        onPress={handleSubmit}
      />
      <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
        <Icon name="close" type="material-community" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
};

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
  saveButtonContainer: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#94b43b',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#94b43b',
    borderRadius: 20,
    padding: 5,
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
});

export default EditVehicleForm;
