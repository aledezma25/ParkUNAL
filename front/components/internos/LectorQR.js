import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useCallback } from "react";
import { Audio } from "expo-av"; // Importa Audio de expo-av
import { useFocusEffect } from "@react-navigation/native";
import {
  fillEntryRecord,
  getCurrentUser,
  getVehicleById,
  getLastEntryRecord,
  updateExitRecord,
  getVehicleTypeById,
} from "../functions/actions";
import FocusSymbol from "./FocusSymbol";
//importar switch
import { Switch } from "react-native";
import { updateSpaces, getVehicleTypes } from "../functions/actions";
import { BASE_URL } from "../../utils/helpers";

const LectorQR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // Estado para mostrar mensaje de éxito
  const [registerMode, setRegisterMode] = useState("entry"); // Por defecto, se registra una entrada
  const [errorMessage, setErrorMessage] = useState("");
  const [sound, setSound] = useState(null);
  const [vehicleMark, setVehicleMark] = useState("");

  useFocusEffect(
    useCallback(() => {
      requestCameraPermission();
      return () => {
        setHasPermission(null);
      };
    }, [])
  );

   // Función para cargar y reproducir el sonido
   const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri: `${BASE_URL}/sounds/scan.mp3` }  // Asegúrate de que esta ruta sea correcta
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  };

  // Cleanup: Unload sound from memory when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Desmontar el sonido para liberar memoria
        }
      : undefined;
  }, [sound]);

  // Función para obtener el vehiculo por id
  const obtenerVehiculo = async (vehicleId) => {
    try {
      const response = await getVehicleById(vehicleId);
      setVehicleMark(response.mark);
      return response;
    } catch (error) {
      console.error("Error al obtener el vehículo:", error);
      return null;
    }
  };

  // funcion para obtener el nombre del usuario actual
  const obtenerUsuarioActual = async () => {
    try {
      const response = await getCurrentUser();
      return response.name;
      
    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
      return null;
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setScannedData(data);
      playSound(); // Reproduce el sonido      
      setShowConfirmation(true);
    }
  };

  const confirmRegistration = async () => {
    try {
      const types = await getVehicleTypes(scannedData);
      // Obtener la fecha y hora actuales
      const currentDate = new Date();
      const entryDate = currentDate.toISOString().split("T")[0];
      const entryTime = currentDate.toLocaleTimeString("en-US", {
        hour12: false,
      });

      // Obtener el vehículo escaneado
      const vehicle = await obtenerVehiculo(scannedData);
      if (!vehicle) {
        console.error("No se encontró el vehículo escaneado");
        return;
      }

      let response;
      let responseSpaces;

      if (registerMode === "entry") {
        // Verificar si ya existe una entrada sin fecha de salida para este vehículo
        const lastEntry = await getLastEntryRecord(scannedData);
        if (lastEntry && !lastEntry.exitDate && !lastEntry.exitTime) {
          // Mostrar mensaje de error
          setErrorMessage("Ya existe una entrada pendiente para este vehículo");

          // Programar la limpieza del mensaje después de 5 segundos (5000 milisegundos)
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);

          return;
        }
        // Registro de entrada
        response = await fillEntryRecord({
          entryDate: entryDate,
          exitDate: null,
          entryTime: entryTime,
          exitTime: null,
          idVehicle: scannedData,
          idUser: vehicle.idUser,
          nameAdmin: await obtenerUsuarioActual(),
        });
        const vehicleType = await getVehicleTypeById(vehicle.idTypes);
        if (!vehicleType) {
          console.error("No se encontró el tipo de vehículo");
          return; // O maneja el error de otra forma según tu flujo
        }

        // Calcular los nuevos espacios
        const newSpaces = vehicleType.spaces - 1; // Restar un espacio


        // Actualizar los espacios disponibles en la base de datos con la funcion updateSpaces
        responseSpaces = await updateSpaces(vehicle.idTypes, newSpaces);

      } else {

        // Registro de salida (actualización de la última entrada) 
        const lastEntry = await getLastEntryRecord(scannedData); // Implementa esta función para obtener la última entrada del vehículo
        if (!lastEntry) {
          //mensaje de que aun no se ha registrado una entrada
          setErrorMessage("No se ha registrado una entrada para este vehículo");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
          return;
        }
        
        if (lastEntry.exitDate && lastEntry.exitTime) {
          // Mostrar mensaje de error si ya existe una salida registrada
          setErrorMessage("Este vehículo ya ha registrado una salida");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
          return;
        }

        // Actualizar la entrada con la fecha y hora de salida
        response = await updateExitRecord(lastEntry.id, {
          ...lastEntry,
          exitDate: entryDate,
          exitTime: entryTime,
          nameAdmin: await obtenerUsuarioActual(),
        });
        const vehicleType = await getVehicleTypeById(vehicle.idTypes);
        if (!vehicleType) {
          console.error("No se encontró el tipo de vehículo");
          return; // O maneja el error de otra forma según tu flujo
        }

        // Calcular los nuevos espacios
        const newSpaces = vehicleType.spaces + 1; // Sumar un espacio


        // Actualizar los espacios disponibles en la base de datos con la funcion updateSpaces
        responseSpaces = await updateSpaces(vehicle.idTypes, newSpaces);
      }

      // Mostrar mensaje de éxito
      setSuccessMessage(
        registerMode === "entry"
          ? "Registro de entrada realizado con éxito"
          : "Registro de salida realizado con éxito"
      );

      // Reiniciar estados y ocultar modal después de unos segundos
      setTimeout(() => {
        setScanned(false);
        setShowConfirmation(false);
        setSuccessMessage(null);
      }, 1000);
      setErrorMessage("");
    } catch (error) {
      console.error("Error al llenar el registro:", error);
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

      <View style={styles.modeSwitch}>
        <Text style={styles.switchText}>Registro:</Text>
        <TouchableOpacity
          onPress={() => setRegisterMode("entry")}
          style={[
            styles.switchOption,
            registerMode === "entry" && styles.switchOptionSelected,
          ]}
        >
          <Text
            style={[
              styles.switchOptionText,
              registerMode === "entry" && styles.switchOptionTextSelected,
            ]}
          >
            Entrada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRegisterMode("exit")}
          style={[
            styles.switchOption,
            registerMode === "exit" && styles.switchOptionSelected,
          ]}
        >
          <Text
            style={[
              styles.switchOptionText,
              registerMode === "exit" && styles.switchOptionTextSelected,
            ]}
          >
            Salida
          </Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <View style={styles.errorMessage}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      <Modal visible={loading} transparent={true}>
        <View style={styles.modalContainer}></View>
      </Modal>
      <Modal visible={showConfirmation} transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            ¿Deseas registrar la lectura del vehiculo {vehicleMark}?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmRegistration}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelRegistration}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.scannerContainer}>
        <Animated.View style={[styles.barcodeScanner, { flex: 1 }]}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <FocusSymbol />
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  titleContainer: {
    padding: 20,
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
  modalContainer: {
    flex: 1,
    // justifyContent: "center",
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 550,
  },
  modalText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  confirmButton: {
    backgroundColor: "#94b43b",
    padding: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  successMessage: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  successText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  modeSwitch: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchText: {
    marginRight: 10,
    fontSize: 16,
  },
  switchOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
  },
  switchOptionSelected: {
    backgroundColor: "#94b43b", // Color de fondo cuando está seleccionado
    borderColor: "#94b43b", // Color de borde cuando está seleccionado
  },
  switchOptionText: {
    fontSize: 14,
  },
  switchOptionTextSelected: {
    color: "white", // Color del texto cuando está seleccionado
  },
  errorMessage: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});

export default LectorQR;
