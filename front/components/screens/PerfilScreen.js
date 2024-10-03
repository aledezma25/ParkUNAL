import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
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
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(
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
      ]
    );
  };

  return (
    <View >
      {userLoggedIn ? (
        <View style={styles.profileContainer}>
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
        <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.welcomeText}>
            Bienvenido/a a la aplicación. Por favor, inicia sesión o regístrate para continuar.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.loginButtonText}>
              Iniciar Sesión o Registrarse
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 50,
  },

  loginContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#94b43b",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnCloseSession: {
    backgroundColor: "#e63946",
    paddingVertical: 15,
  },
  btnCloseSessionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PerfilScreen;
