import React, { useEffect, useState, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import UserLogged from "./account/UserLogged";
import Loading from "../functions/Loading";

const PerfilScreen = () => {
  const navigation = useNavigation();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // useEffect(() => {
      // Verificar si el usuario está logueado
      AsyncStorage.getItem("token")
        .then((token) => {
          if (token !== null) {
            setUserLoggedIn(true);
          } else {
            setUserLoggedIn(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // }, []);
    }, [])
  );

  // const handleLogout = () => {
  //   AsyncStorage.removeItem("token");
  //   setUserLoggedIn(false);
  //   navigation.navigate("Account");
  // };

  const handleLogout = () => {
    const confirmLogout = Alert.alert(
      "¿Desea cerrar sesión?",
      "Cerrar sesión eliminará tu token y te desconectará de la aplicación.",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Cerrar sesión",
          style: "destructive",
            onPress: () => {
            AsyncStorage.removeItem("token");
            setUserLoggedIn(false);
            navigation.navigate("Account");
          },
        },
      ],
    );
  };

  return (
    <View>
      {userLoggedIn ? (
        // Si el usuario está registrado, muestra el contenido del perfil.
        <View>
          <Loading isVisible={loading} text="Cerrando sesión" />
          <Button
            title="Cerrar Sesión"
            buttonStyle={styles.btnCloseSession}
            titleStyle={styles.btnCloseSessionText}
            onPress={handleLogout}
          />
          <UserLogged />
          
        </View>
      ) : (
        // Si el usuario no está registrado, muestra el botón para iniciar sesión o registrarse.
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.loginButtonText}>
            Iniciar Sesión o Registrarse
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
  },
  loginButton: {
    backgroundColor: "#94b43b",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
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
});

export default PerfilScreen;
