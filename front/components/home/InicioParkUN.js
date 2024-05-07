import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { getCurrentUser } from '../functions/actions';
import { useNavigation } from '@react-navigation/native';

const InicioParkUN = () => {
  const [user, setUser] = useState(null);
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
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inicio</Text>
      <Text style={styles.subtitle}>Bienvenido a ParkUN</Text>
      <Text style={styles.text}>{user ? user.name + ' ' + user.last_name: 'No hay usuario'}</Text>
      <Image
        style={styles.image}
        source={require('../../assets/parkun.png')}

      />
    </ScrollView>
  );
}



export default InicioParkUN;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#94b43b',
  },
  buttonContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },



});
