import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import InicioParkUN from '../home/InicioParkUN';
import CuposIcon from '../internos/CuposIcon';
import { useNavigation } from '@react-navigation/native';

const InicioScreen = () => {
  const navigation = useNavigation();

  const handleFeed = () => {
    navigation.navigate('Feed'); // Navega a la vista de Feed
  };

  return (
    <View>
      <InicioParkUN />
      <CuposIcon />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleFeed}>
          <Text style={styles.buttonText}>Comunidad UN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#94b43b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InicioScreen;
