import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import InicioParkUN from '../home/InicioParkUN';
import CuposIcon from '../internos/CuposIcon';
import { useNavigation } from '@react-navigation/native';

const InicioScreen = () => {
  const navigation = useNavigation();

  const handleFeed = () => {
    navigation.navigate('Feed'); // Navega a la vista de Feed
  };

  return (
    <View >
      <InicioParkUN />
      <CuposIcon />
      <View style={styles.container}>
      <Button
        title="Feed"
        onPress={handleFeed}
        color="#94b43b"
      />
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
});

export default InicioScreen;
