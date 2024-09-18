import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import {
  fillEntryRecord,
  getCurrentUser,
  getVehicleById,
  getLastEntryRecord,
  updateExitRecord,
  getVehicleTypeById,
  updateSpaces,
} from "../functions/actions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import FocusSymbol from "./FocusSymbol";
import { BASE_URL } from "../../utils/helpers";
import Loading from "../functions/Loading";

const LectorQR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false); // Para controlar el modal de error
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
  const [sound, setSound] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [nameUser, setNameUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      requestCameraPermission();
      preloadSound(); // Pre-cargar sonido al enfocar la pantalla
      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [sound])
  );

  useFocusEffect(
    useCallback(() => {
      requestCameraPermission();
      return () => {
        setHasPermission(null);
      };
    }, [])
  );

  const enfocar = () => {
    setHasPermission(null);
    requestCameraPermission();
    resetScanner();
    
  };
  
  const preloadSound = async () => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: `${BASE_URL}/sounds/scan.mp3` },
      { shouldPlay: false }
    );
    setSound(newSound);
  };

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  //funcion para obtener el tipo de vehiculo por id
  const obtenerTipoVehiculo = async (id) => {
    try {
      const response = await getVehicleTypeById(id);
      if (response) {
        return response;
      }
    } catch (error) {
      console.error("Error al obtener el tipo de vehículo:", error);
      return null;
    }
  };


  // funcion para obtener el nombre del usuario actual
  const obtenerUsuarioActual = async () => {
    try {
      const response = await getCurrentUser();
      if (response) {
        setNameUser(response.name);
        return response.name;
      }
    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
      return null;
    }
  };

  const entryRegister = async () => {
    setLoading(true);
    await obtenerUsuarioActual();
    // Obtener la fecha y hora actuales
    const currentDate = new Date();
    const entryDate = currentDate.toISOString().split("T")[0];
    const entryTime = currentDate.toLocaleTimeString("en-US", {
      hour12: false,
    });
    let response;
    let responseSpaces;
    const lastEntry = await getLastEntryRecord(scannedData.id);
    if (lastEntry && lastEntry.exitDate === null) {
      // Si el vehículo ya está registrado y no ha salido
      setErrorMessage("El vehículo ya está registrado y no ha salido.");
      Alert.alert("¡Atención!", "El vehículo ya está registrado y no ha salido.");
      setShowError(true); // Mostrar modal de error
      resetScanner();
    } else {
      // Si el vehículo no ha salido, registrar la entrada
      response = await fillEntryRecord({
        entryDate: entryDate,
        exitDate: null,
        entryTime: entryTime,
        exitTime: null,
        idVehicle: scannedData.id,
        idUser: scannedData.idUser,
        nameAdmin: nameUser,
      });
      // console.log("response", response);
      // si el message de response es igual a "Error de red" entonces mostrar el mensaje de error
      if (response.message === "Error de red") {
        setErrorMessage("Error de red");
        Alert.alert("¡Atención!", "Error de red, vuelve a leer el código QR.");
        setShowError(true); // Mostrar modal de error
        resetScanner();
        return;
      }
      
      // console.log("response", response);
      // Actualizar la cantidad de espacios disponibles
      const vehicleType = await obtenerTipoVehiculo(scannedData.idType);
      if (!vehicleType) {
        console.error("Tipo de vehículo no encontrado");
        return;
      }
      const newSpaces = vehicleType.spaces - 1;
      responseSpaces = await updateSpaces(vehicleType.id, newSpaces);
    }
    if (response && responseSpaces) {
      console.log("Entrada registrada con éxito");
      Alert.alert("Éxito", "Entrada registrada con éxito");



      resetScanner();
    }
    resetScanner();
  };

  const exitRegister = async () => {
    setLoading(true);
    await obtenerUsuarioActual();
    // Obtener la fecha y hora actuales
    const currentDate = new Date();
    const exitDate = currentDate.toISOString().split("T")[0];
    const exitTime = currentDate.toLocaleTimeString("en-US", {
      hour12: false,
    });
    let response;
    let responseSpaces;
    const lastEntry = await getLastEntryRecord(scannedData.id); // Obtener el último registro de entrada
    if (!lastEntry) {
      // Si no hay registros de entrada
      setErrorMessage("El vehículo no tiene registros de entrada.");
      Alert.alert("¡Atención!", "El vehículo no tiene registros de entrada.");
      setShowError(true); // Mostrar modal de error
      resetScanner();
    }
    if (lastEntry.exitDate && lastEntry.exitTime) {
      // Si el vehículo ya salió
      setErrorMessage("El vehículo ya salió.");
      Alert.alert("¡Atención!", "El vehículo ya salió.");
      setShowError(true); // Mostrar modal de error
      resetScanner();
      return;
    } else{
      // Si el vehículo no ha salido, registrar la salida
      response = await updateExitRecord(lastEntry.id, {
        ...lastEntry,
        exitDate: exitDate,
        exitTime: exitTime,
        nameAdmin: nameUser,
      });
      // si el message de response es igual a "Error de red" entonces mostrar el mensaje de error
      if (response.message === "Error de red") {
        setErrorMessage("Error de red");
        Alert.alert("¡Atención!", "Error de red, vuelve a leer el código QR.");
        setShowError(true); // Mostrar modal de error
        resetScanner();
        return;
      }
      // Actualizar la cantidad de espacios disponibles
      const vehicleType = await obtenerTipoVehiculo(scannedData.idType);
      if (!vehicleType) {
        console.error("Tipo de vehículo no encontrado");
        return;
      }
      const newSpaces = vehicleType.spaces + 1;
      responseSpaces = await updateSpaces(vehicleType.id, newSpaces);
      if (response && responseSpaces) {
        console.log("Salida registrada con éxito");
        Alert.alert("Éxito", "Salida registrada con éxito");
        resetScanner();
        return;
      }
    }
    resetScanner();
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (!scanned) {
      setScanned(true);

      try {
        // Intentar parsear el dato escaneado como JSON
        const parsedData = JSON.parse(data);

        // Validar que el QR tiene los campos esperados
        if (parsedData.id && parsedData.plate && parsedData.mark) {
          setScannedData(parsedData); // Guardar los datos parseados
          playSound();
          // console.log("Datos escaneados: ", parsedData);

          // Asignar detalles específicos del vehículo a los estados correspondientes
          setVehicleDetails({
            id: parsedData.id,
            plate: parsedData.plate,
            mark: parsedData.mark,
            color: parsedData.color,
            nameUser: parsedData.nameUser,
            type: parsedData.type,
          });

          setShowConfirmation(true);
          setLoading(false); // Asegúrate de que `loading` se maneje correctamente
          
        } else {
          // Si los campos no son los esperados, mostrar un mensaje de error
          throw new Error("El QR escaneado no es válido para esta aplicación.");
        }
      } catch (error) {
        // console.log("Error al parsear el QR escaneado: ", error);
        setErrorMessage("El código QR escaneado no es válido.");
        setShowError(true); // Mostrar modal de error
        setScanned(false); // Resetear el escáner
      }
    }
  };

  const resetScanner = () => {
    setLoading(false);
    setScanned(false);
    setShowConfirmation(false);
    setScannedData(null);
    setShowError(false); // Resetear el mensaje de error si estaba activo
    //recargar la pantalla
    requestCameraPermission();
  };

  if (hasPermission === null) {
    return <Text style={styles.permisocamera}>Solicitando permiso para acceder a la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.permisocameraDenegado}>Permiso denegado para acceder a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Escanea el código QR</Text>

    <Loading isVisible={loading} text="Cargando..." />

      {/* Modal de Confirmación de Vehículo */}
<Modal visible={showConfirmation} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* Botón de Cerrar */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={resetScanner}
      >
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
      {vehicleDetails && (
        <>
          <Text style={styles.modalTitle}>Detalles del vehículo</Text>
          <Text style={styles.detailText}>
            ID: {vehicleDetails.id}
          </Text>
          <Text style={styles.negrita}><Text style={styles.detailText}>
            {vehicleDetails.type}
          </Text></Text>
          <Text style={styles.detailText}>
            Modelo: {vehicleDetails.mark}
          </Text>
          <Text style={styles.detailText}>
            Placa: <Text style={styles.negrita}>{vehicleDetails.plate}</Text>
          </Text>
          <Text style={styles.detailText}>
            Color: {vehicleDetails.color}
          </Text>
          <Text style={styles.detailText}>
            Propietario: <Text style={styles.negrita}>{vehicleDetails.nameUser}</Text>
          </Text>
          
  
        </>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.entryRegister}
          onPress={entryRegister}
        >
          <Text style={styles.buttonText}>Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.exitRegister}
          onPress={exitRegister}
        >
          <Text style={styles.buttonText}>Salida</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  </View>
</Modal>

{/* Modal de Error */}
<Modal visible={showError} transparent={true} animationType="fade">
  <View style={styles.errorModalContainer}>
    <View style={styles.errorModalContent}>
      <Text style={styles.errorTitle}>Error</Text>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.errorButton}
        onPress={resetScanner}
      >
        <Text style={styles.errorButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      {/* Escáner de QR */}
      <View style={styles.scannerContainer}>
        <Animated.View style={[styles.barcodeScanner, { flex: 1 }]}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <FocusSymbol />
        </Animated.View>
      </View>
      {/* Boton para enfocar con estilos*/}
      <TouchableOpacity
        style={styles.enfocarbutton}
        onPress={enfocar}
      >
        <Text style={styles.enfocar}>Enfocar</Text>
        <Icon name="camera" type="material-community" size={30} color="#fff" />
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scannerContainer: {
    flex: 1,
    alignItems: "center",
  },
  barcodeScanner: {
    height: 300,
    width: 500,
  },
  // Estilos para el modal de error
  errorModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  errorModalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ffcccc",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "#d32f2f",
    marginBottom: 20,
    textAlign: "center",
  },
  errorButton: {
    backgroundColor: "#d32f2f",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  errorButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // Otros estilos que ya tenías
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a4a4a", // Color de título definido
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#e6e6e6", // Línea debajo del título
    paddingBottom: 10,
  },
  detailText: {
    fontSize: 18,
    color: "#666",
    marginVertical: 8, // Más espacio entre los textos
    paddingHorizontal: 10,
    textAlign: "center",
    width: "100%", // Texto centrado y ocupa todo el ancho
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
  entryRegister: {
    backgroundColor: "#94b43b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: "45%", // Ancho relativo para los botones
  },
  exitRegister: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: "45%", // Ancho relativo para los botones
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  negrita: {
    fontWeight: "bold",
    //MAYUSCULAS
    textTransform: "uppercase",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#f44336", // Color del fondo del botón
    borderRadius: 15, // Hacer el botón redondeado
    padding: 10, // Espaciado interno del botón
    zIndex: 1, // Asegura que el botón esté por encima de otros elementos
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  enfocar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  enfocarbutton: {
    backgroundColor: "#94b43b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: "45%", // Ancho relativo para los botones
    bottom: 20,
  },
  permisocamera: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#94b43b",
    textAlign: "center",
    
  },
  permisocameraDenegado: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f44336",
  },
  
  
});

export default LectorQR;
