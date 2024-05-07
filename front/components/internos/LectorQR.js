import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableOpacity, Animated, Easing } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { fillEntryRecord, getCurrentUser, getVehicleById } from '../functions/actions';

const LectorQR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // Estado para mostrar mensaje de éxito

  const scannerSize = useRef(new Animated.Value(300)).current; // Tamaño inicial del escáner

  useFocusEffect(
    useCallback(() => {
      requestCameraPermission();
      return () => {
        setHasPermission(null);
      };
    }, [])
  );

  // Función para obtener el vehiculo por id
  const obtenerVehiculo = async (vehicleId) => {
    try {
      const response = await getVehicleById(vehicleId);
      return response;
    } catch (error) {
      console.error('Error al obtener el vehículo:', error);
      return null;
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setScannedData(data);
      setShowConfirmation(true);
      animateScanner(); // Llamar a la función para animar el escáner
    }
  };

  const animateScanner = () => {
    Animated.sequence([
      Animated.timing(scannerSize, {
        toValue: 550, // Tamaño más grande al escanear
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(scannerSize, {
        toValue: 500, // Volver al tamaño original
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const confirmRegistration = async () => {
    try {
      // Obtener la fecha actual
      const currentDate = new Date();
      const entryDate = currentDate.toISOString().split('T')[0];

      // Obtener la hora actual 
      const entryTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
      // Obtener el vehículo por id
      const vehicle = await obtenerVehiculo(scannedData);
      if (!vehicle) {
        console.error('No se ha encontrado el vehículo');
        return;
      }


      // Llamamos a la función fillEntryRecord con los datos necesarios
      const response = await fillEntryRecord({
        entryDate: entryDate,
        exitDate: null, // Puedes ajustar según tus necesidades
        entryTime: entryTime,
        exitTime: null, // Puedes ajustar según tus necesidades
        idVehicle: scannedData, // El id capturado del código QR
        //id del usuario pero respecto al vehiculo
        idUser: vehicle.idUser,
      });
      
      // Mostrar mensaje de éxito
      setSuccessMessage('Registro de entrada realizado con éxito');

      // Reiniciar estados y ocultar modal después de unos segundos
      setTimeout(() => {
        setScanned(false);
        setShowConfirmation(false);
        setSuccessMessage(null); // Limpiar mensaje de éxito
      }, 1000);
    } catch (error) {
      console.error('Error al llenar el registro de entrada:', error);
      // Puedes mostrar un mensaje de error aquí si lo necesitas
    }
  };
  
  const cancelRegistration = () => {
    setScanned(false); // Reiniciar el estado de scanned al cancelar el registro
    setShowConfirmation(false); // Ocultar el modal de confirmación
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para acceder a la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permiso denegado para acceder a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Escanea el código QR</Text>
      </View>
      <Modal visible={loading} transparent={true}>
        <View style={styles.modalContainer}>
        </View>
      </Modal>
      <Modal visible={showConfirmation} transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>¿Deseas registrar la lectura del código QR?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmRegistration}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelRegistration}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.scannerContainer}>
        <Animated.View style={[styles.barcodeScanner, { height: scannerSize, width: scannerSize }]}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      </View>
      {successMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,

  },
  barcodeScanner: {
    height: 500,
    width: 500,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 550,
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  confirmButton: {
    backgroundColor: '#94b43b',
    padding: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  successMessage: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  successText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LectorQR;
