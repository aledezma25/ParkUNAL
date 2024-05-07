import react from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importamos los componentes
import InicioScreen from './components/screens/InicioScreen';
import VehiculosQRScreen from './components/screens/VehiculosQRScreen';
import PerfilScreen from './components/screens/PerfilScreen';   
import LoginScreen from './components/screens/account/LoginScreen';
import RegisterScreen from './components/screens/account/RegisterScreen';
import AccountScreen from './components/screens/account/AccountScreen';
import Loading from './components/functions/Loading';

const PerfilStackNavigator = createNativeStackNavigator();
function HomeStack() {
  return (
    <PerfilStackNavigator.Navigator
        InitialRouteName='InicioScreen'
    >
      <PerfilStackNavigator.Screen
          name="InicioScreen"
          component={InicioScreen}
          options={{
          headerShown: false,
          }}
        />
    </PerfilStackNavigator.Navigator>
  
  );
}



function MyStack() {
  return (
    <PerfilStackNavigator.Navigator
        InitialRouteName='InicioScreen'
    >
      <PerfilStackNavigator.Screen 
          name="MiCuenta" 
          component={PerfilScreen} 
          options={{
            title: 'Mi cuenta',
          }}/>
      <PerfilStackNavigator.Screen 
          name="LoginScreen" 
          component={LoginScreen}
          options={{
            title: 'Iniciar Sesión',

          }}
          />
          <PerfilStackNavigator.Screen 
          name="RegisterScreen" 
          component={RegisterScreen}
          options={{
            title: 'Registrarse',

          }}
          />
          <PerfilStackNavigator.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            title: 'Mi cuenta',
          }}
          />
          
          
    </PerfilStackNavigator.Navigator>
    
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Inicio'
      screenOptions={{
        tabBarActiveTintColor: 'green',
      }}
    >
      <Tab.Screen 
      name="Park UN" 
      component={HomeStack} 
      options={{
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen 
      name="Vehiculos & QR" 
      component={VehiculosQRScreen} 
      options={{
        tabBarLabel: 'Vehiculos & QR',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="qrcode" color={color} size={size} />
        ),
      }}
      
      />
      <Tab.Screen 
      name="Account" 
      component={MyStack}
      options={{
        headerShown: false,
        tabBarLabel: 'Mi cuenta',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }} 
      />
    </Tab.Navigator>
  );
}

export default function Navigation(){
    return (
        <NavigationContainer>
        <MyTabs />
        </NavigationContainer>
    );
}
