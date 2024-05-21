// InicioScreen.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InicioParkUN from '../home/InicioParkUN';
import CuposIcon from '../internos/CuposIcon';

const InicioScreen = () => {
  return (
    <View>
      <InicioParkUN />
      <CuposIcon/>
    </View>
  );
};

export default InicioScreen;
