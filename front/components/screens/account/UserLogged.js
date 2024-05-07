import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useRef, useCallback } from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import Loading from '../../functions/Loading'
import InfoUser from '../../internos/InfoUser'
import { getCurrentUser } from '../../functions/actions'
import AccountOptions from '../../internos/AccountOptions'
import { useFocusEffect } from '@react-navigation/native'
import { set } from 'lodash'


export default function UserLogged() {
  const navigation = useNavigation();
  const toastRef = useRef();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [user, setUser] = useState(null);
  const [reloadUser, setReloadUser] = useState(false);

  useFocusEffect(
    useCallback(() => {
    // Llama a getCurrentUser para obtener los datos del usuario.
    async function fetchUserData() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        // console.log(userData);
        set
      } catch (error) {
        console.error('Error al obtener el usuario', error);
      }
    }

    fetchUserData();
     // Si reloadUser es true, significa que se ha actualizado el perfil y debes recargar el usuario
      if (reloadUser) {
        setReloadUser(false); // Reinicia el estado de recarga
        fetchUserData();
      }

  }, [reloadUser])
  );

  const handleReload = () => {
    setReloadUser(true);
  };

  return (
    <View style={styles.container}>
      {
         user && (
            <View>
              <InfoUser 
                user={user}
                setLoading={setLoading}
                setLoadingText={setLoadingText}
              />
              <AccountOptions
                user={user}
                toastRef={toastRef}
                setLoading={setLoading}
                setLoadingText={setLoadingText}
                onReload={handleReload}
              />
            </View>
        )}
        
      <Toast ref={toastRef} position='center' opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  )
}

const styles = StyleSheet.create({  
  container: {
    minHeight: '100%',
    backgroundColor: '#f9f9f9',
  },
  reloadButtonContainer: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
  },


})