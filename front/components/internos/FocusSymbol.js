import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Icon } from 'react-native-elements';

const FocusSymbol = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => blink());
    };

    blink();
  }, [opacity]);

  return (
    <View style={styles.focusSymbol}>
      <Animated.View style={{ opacity }}>
        <Icon name="scan-helper" type="material-community" size={300} color="#fff" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  focusSymbol: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
});

export default FocusSymbol;
