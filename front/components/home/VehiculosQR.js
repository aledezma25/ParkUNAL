import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Image, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getCurrentUser } from '../functions/actions';
import { getVehicles } from '../functions/actions';
import Loading from '../functions/Loading';
import AddVehicleForm from '../internos/AddVehicleForm';
import VehiclePlate from '../internos/VehiclePlate';
import Modal from '../functions/Modal';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import { getVehicleTypes, deleteVehicle } from '../functions/actions';
import EditVehicleForm from '../internos/EditVehicleForm';
import QRCode from 'react-native-qrcode-svg';

import { Share } from 'react-native';
import ViewShot from 'react-native-view-shot';






export default function VehiculosQR() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Estado para el modal de edición

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastRef = useRef();
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Estado para el vehículo seleccionado
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para el mensaje de confirmación
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrText, setQrText] = useState('');
  const logoFromFile = require('../../assets/parkun.png');
  const qrViewRef = useRef();
  const [vehicleMark, setVehicleMark] = useState("");


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

  
  //funcion para compartir QR
  const handleShareQR = async () => {
    try {
      const result = await Share.share({
        message: 'Código QR del vehículo '+ '*'+ qrText + '*',
        url: qrText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Actividad compartida:', result.activityType);
        } else {
          console.log('Compartido');
        }
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };


  
  

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            const { success, vehicles: vehiclesData, error } = await getVehicles();
            if (success) {
              const userVehicles = vehiclesData.filter(vehicle => vehicle.idUser === currentUser.id);
              setVehicles(userVehicles);
              
              const vehicleMark = userVehicles.map((vehicle) => vehicle.mark);
              setVehicleMark(vehicleMark);
             
            } else {
              console.error(error);
            }
          } else {
            navigation.navigate('LoginScreen');
          }
        } catch (error) {
          console.error('Error al obtener el usuario o vehículos', error);
        }
        setLoading(false);
      };
      fetchData();
    }, [])
  );

  const reloadVehicles = async () => {
    setLoading(true);
    try {
      const { success, vehicles: vehiclesData, error } = await getVehicles();
      if (success) {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const userVehicles = vehiclesData.filter(vehicle => vehicle.idUser === currentUser.id);
          setVehicles(userVehicles);
        }
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error('Error al recargar vehículos:', error);
    }
    setLoading(false);
  };


  const handleAddVehicle = () => {
    setShowModal(true);
  }
  const handleShowQRModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    const vehicleMark = vehicle.mark;
    setVehicleMark(vehicleMark);
    setQrText(vehicle.id.toString()); // Aquí puedes ajustar el texto del QR según lo que necesites
    setShowQRModal(true);
  };
  

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowEditModal(true);
  }

  const handleDeleteVehicle = async (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowConfirmation(true); // Mostrar mensaje de confirmación
  };

  const confirmDeleteVehicle = async () => {
    setShowConfirmation(false); // Ocultar mensaje de confirmación
    try {
      const response = await deleteVehicle(selectedVehicle.id);
      if (response.success) {
        toastRef.current.show('Vehículo eliminado correctamente');
        reloadVehicles();
      } else {
        toastRef.current.show('Error al eliminar el vehículo');
      }
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      toastRef.current.show('Error al eliminar el vehículo');
    }
  };
  const renderVehicleItem = ({ item, index }) => (
    <View style={styles.vehicleItem}>
    <View
      style={[styles.vehicleItem, index % 2 === 0 ? styles.evenItem : styles.oddItem]}
      // onPress={() => handleEditVehicle(item)}
    >
      {/* <Image source={{ uri: item.image }} style={styles.vehicleImage} /> */}
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleTextMark}>{item.mark}</Text>
        <Text style={styles.vehicleTextColor}>
          <Icon
            name="palette"
            type="material-community"
            color="#ccc"
            size={20}
            containerStyle={{ position: 'absolute', right: 10 }}
          />
          {item.color}</Text>
        <Text style={styles.vehicleTextType}> 
        {/* Icono dependiendo el tipo de vehiculo 1= car, 2= motorbike, 3= bicycle */}
        <Icon
          name={item.idTypes === 1 ? 'car' : item.idTypes === 2 ? 'motorcycle' : 'bicycle'}
          type="font-awesome"
          color="#ccc"
          size={40}
          containerStyle={{ position: 'absolute', right: 10}}

        />
        </Text>
        <VehiclePlate plateNumber={item.plate} />
        {/* Boton para editar vehiculo */}
        {/* Boton para generar QR */}
        <Icon
          name="qrcode"
          type="material-community"
          color="#94b43b"
          containerStyle={{ position: 'absolute', right: 110 }}
          onPress={() => handleShowQRModal(item)}
          size={40}
        />

        <Icon
          name="pencil"
          type="material-community"
          color="#00a680"
          containerStyle={{ position: 'absolute', right: 60 }}
          onPress={() => handleEditVehicle(item)}
          size={40}
        />
        {/* Boton para eliminar */}
        <Icon
          name="delete"
          type="material-community"
          color="#f00"
          containerStyle={{ position: 'absolute', right: 10 }}
          onPress={() => handleDeleteVehicle(item)}
          size={40}

        />
        

      </View>
      {/* <Icon name="chevron-right" type="material-community" color="#ccc" size={24} /> */}
      
    </View>
    
    </View>

  );

  return (
    <View style={styles.container}>
      {/* Toast Container */}
      <View style={styles.toastContainer}>
        <Toast ref={toastRef} position="top" opacity={0.9} />
      </View>

      {/* Vehicle List */}
      <FlatList
        data={vehicles}
        renderItem={renderVehicleItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <Text style={styles.emptyText}>No hay vehículos registrados</Text>}
      />

      {/* Add Vehicle Button */}
      <Button
        title="Agregar Vehículo"
        containerStyle={styles.addButton}
        buttonStyle={styles.addButton}
        onPress={handleAddVehicle}
        icon={<Icon name="plus" type="material-community" color="#fff" />}
      />
      {/* Delete Confirmation Modal */}
      <Modal isVisible={showConfirmation} setVisible={setShowConfirmation}>
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>¿Estás seguro de que deseas eliminar este vehículo?</Text>
          <View style={styles.confirmationButtons}>
            <Button title="Cancelar" onPress={() => setShowConfirmation(false)}  buttonStyle={styles.cancelarButton}/>
            <Button title="Eliminar" onPress={confirmDeleteVehicle} buttonStyle={styles.deleteButton} />
          </View>
        </View>
      </Modal>

      {/* Add Vehicle Modal */}
      <Modal isVisible={showModal} setVisible={setShowModal}>
        <AddVehicleForm setShowModal={setShowModal} toastRef={toastRef} onReload={reloadVehicles} />
      </Modal>
       {/* Edit Vehicle Modal */}
       <Modal isVisible={showEditModal} setVisible={setShowEditModal}>
        <EditVehicleForm vehicle={selectedVehicle} setShowModal={setShowEditModal} toastRef={toastRef} onReload={reloadVehicles} />
      </Modal>
      {/* QR Modal */}
      <Modal isVisible={showQRModal} setVisible={setShowQRModal}>
        <View style={styles.qrModalContent}>
          <Text style={styles.qrModalTitle}>Código QR del Vehículo:</Text>
          <Text style={styles.vehicleMark}>{vehicleMark}</Text>
          <ViewShot ref={qrViewRef} options={{ format: 'png', quality: 1 }}>
            <QRCode
              value={qrText}
              size={200}
              logo={logoFromFile}
              logoSize={40}
            />
          </ViewShot>
        </View>
        <Icon 
          name="close"
          type="material-community"
          color="#94b43b"
          containerStyle={{ position: 'absolute', top: 10, right: 10 }}
          onPress={() => setShowQRModal(false)}
          size={40}
        />
        <View style={styles.qrModalContent}>
        <View style={styles.message}>
        <Text style={styles.text1}>Muestre este código QR al vigilante para 
        que pueda escanearlo.</Text>
      </View>
        
        {/* <Icon
          name="download"
          type="material-community"
          color="#94b43b"
          onPress={() => console.log('Descargar QR')}
          containerStyle={{ position: 'absolute', bottom: 10, left: 10}}

          size={50}
        />
        <Icon
          name="share"
          type="material-community"
          color="#94b43b"
          onPress={() => handleShareQR()}
          containerStyle={{ position: 'absolute', bottom: 10, right: 10}}
          size={50}
        /> */}
        </View>
        
      </Modal>

      {/* Loading Indicator */}
      <Loading isVisible={loading} text="Cargando vehículos..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10, // Espacio horizontal alrededor del contenedor
    marginTop: 20, // Margen superior para separar del borde superior
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, // Aumenta el espacio vertical entre elementos
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  evenItem: {
    backgroundColor: '#f9f9f9',
  },
  oddItem: {
    backgroundColor: '#fff',
  },
  vehicleImage: {
    width: 80, // Ajusta el tamaño de la imagen del vehículo
    height: 80, // Ajusta el tamaño de la imagen del vehículo
    borderRadius: 40, // Ajusta el borde para que sea circular
    marginRight: 20, // Espacio a la derecha de la imagen
  },
  vehicleInfo: {
    flex: 1,
    paddingLeft: 10, // Espacio a la derecha del contenedor
  },
  vehicleTextMark: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vehicleTextType: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5, // Espacio inferior para separar el texto
    position: 'absolute',
    right: 10, // Mover el texto a la derecha
    bottom: 10, // Mover el texto a la parte inferior

  },
  vehicleTextColor: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5, // Espacio inferior para separar el texto
    //mover el texto a la derecha inferior
    
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#94b43b',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%', // Ancho completo del botón
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  confirmationContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deleteButton: {
    backgroundColor: '#f00',
  },
  cancelarButton: {
    backgroundColor: '#94b43b',
  },
  qrModalContent: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',

  },
  qrModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    margin: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  text1: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
  vehicleMark: {
    color: '#94b43b',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 50,
    //alinear al centro
    textAlign: 'center',

  },
 


});
  




