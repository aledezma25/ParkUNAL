import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { getCurrentUser } from '../functions/actions';
import { useNavigation } from '@react-navigation/native';

const InicioParkUN = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchData();

    // Iniciar el temporizador para actualizar la hora cada segundo
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(timerId);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logoParkUNwhite.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Feliz Día,</Text>
          <Text style={styles.text}>{user ? user.name : 'No hay usuario'}</Text>
        </View>
        <Image
          style={styles.image}
          source={require('../../assets/entrada_la_nubia.jpg')}
        />
      </View>
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <Text style={styles.subtitle}>Park UN</Text>
          <View style={styles.divider}></View>
          <Icon name="clock" type="feather" color="#fff" />
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Hora:</Text>
            <Text style={styles.time}>{currentTime.toLocaleTimeString()}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default InicioParkUN;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  imageContainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Añadido para posicionar elementos absolutos correctamente
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 100,
    left: 0,
    padding: 20,
  },
  logoContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    right: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  overlayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: 70,
    width: 1,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'column', // Cambiado a columna para que el texto "Hora:" esté encima
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: '#fff',
  },
});
