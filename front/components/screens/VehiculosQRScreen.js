import React, { useEffect, useState, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native'
import { getCurrentUser } from '../../components/functions/actions'
import Loading from '../../components/functions/Loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

import VehiculosQR from "../../components/home/VehiculosQR";
import LectorQR from "../internos/LectorQR";



const VehiculosQRScreen = () => {
  const navigation = useNavigation();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // Nuevo estado para almacenar el role_id


  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Mostrar Loading al inicio de la pantalla
      AsyncStorage.getItem("token")
        .then((token) => {
          if (token !== null) {
            // Si el usuario tiene token, está autenticado
            setUserLoggedIn(true);
            getCurrentUser() // Suponiendo que esta función devuelve el usuario con role_id
              .then((user) => {
                setUserRole(user.role_id); // Almacena el role_id del usuario
                setLoading(false); // Oculta el Loading después de obtener el usuario
              })
              .catch((error) => {
                console.log(error);
                setLoading(false); // Oculta el Loading si hay un error
              });
          } else {
            setUserLoggedIn(false);
            setLoading(false); // Oculta el Loading si el usuario no está autenticado
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // Oculta el Loading si hay un error al obtener el token
        });
    }, [])
  );

  if (userLoggedIn === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

   return (
    <View style={styles.container}>
      {userLoggedIn ? (
        <View>
          {userRole === 1 ? (
            <View >
              <LectorQR />
            </View>

          ) : userRole === 2 ? (
            <VehiculosQR />
          ) : (
            <Loading isVisible={true} text="Cargando..." />
          )}
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.welcomeText}>
            Bienvenido a la sección de vehículos y QR, para administrar tus vehículos y códigos QR, inicia sesión o regístrate.
          </Text>
          <Text style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Iniciar Sesión o Registrarse</Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  loginButton: {
    backgroundColor: "#94b43b",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    textAlign: "center",

  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    },
  btnCloseSession: {
    backgroundColor: "#94b43b",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  btnCloseSessionText: {
    color: "white",
    fontSize: 16,
  },
  // qrcontainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "100%",
    
  // },


});

export default VehiculosQRScreen;
