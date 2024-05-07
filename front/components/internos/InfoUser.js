import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements';
import { useEffect } from 'react';
import { loadImageFromGallery } from '../../utils/helpers';


export default function InfoUser({user}) {
    console.log(user.id);
   
  const changePhoto = async() => {
    const result = await loadImageFromGallery([1, 1]);
    console.log(result);
    
  }
    
  return (
    <View style={styles.container}>
        <Avatar
            rounded
            size='large'
            // onPress={changePhoto}
            containerStyle={styles.avatar}
            source={
                user.photoURL
                ? {uri: user.photoURL}
                : require('../../assets/avatar-default.jpg')
            }
        />
        <View style={styles.infoUser}>
            <Text style={styles.name}>{user.name ? user.name : 'Anónimo'}</Text>
            <Text style={styles.las_name}>{user.last_name ? user.last_name : 'Anónimo'}</Text>
            <Text style={styles.email}>{user.email}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // minHeight: '100%',
        backgroundColor: '#f9f9f9',
        paddingVertical: 30,
      },
      infoUser: {
        marginLeft: 20,
      },
      name: {
        fontWeight: 'bold',
        paddingBottom: 5,
      },

})