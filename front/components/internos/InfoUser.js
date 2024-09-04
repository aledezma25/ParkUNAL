import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-elements';
import { loadImageFromGallery } from '../../utils/helpers';
import axios from 'axios';
import { BASE_URL } from '../../utils/helpers';
import { updatePhotoURL } from '../functions/actions';
import Loading from '../functions/Loading';
import { set } from 'lodash';


export default function InfoUser({ user }) {
    // Estado para almacenar la URI de la imagen
    const [imageUri, setImageUri] = useState(user.photoURL);
    const [loading, setLoading] = useState(false);

    // Función para subir la imagen al servidor
    const uploadImage = async (uri) => {
        const formData = new FormData();
        const parsedId = parseInt(user.id, 10);
        if (isNaN(parsedId)) {
            console.error('ID no es un número válido');
            return;
        }
        formData.append('photo', {
            uri,
            name: 'photo.jpg', 
            type: 'image/jpeg', // Cambiar si la imagen es de otro tipo, como 'image/png'
        });

        try {
            const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const imageUrl = response.data.url; // URL de la imagen subida devuelta por el backend
                setImageUri(imageUrl); // Actualiza el estado con la nueva URL de la imagen
                const result = await updatePhotoURL(parsedId, imageUrl);
                if (result) {
                    Alert.alert('Imagen subida con éxito');
                    setLoading(false);
                } else {
                    Alert.alert('Error al actualizar la imagen en la base de datos');
                }
            } else {
                Alert.alert('Error al subir la imagen');
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            Alert.alert('Error al subir la imagen');
        }
    };

    // Función para cambiar la foto
    const changePhoto = async () => {
        const result = await loadImageFromGallery();
        if (result.status) {
            setLoading(true);
            uploadImage(result.image); // Llamar a la función de subida de imagen
        } else {
            console.log("La selección de imagen fue cancelada");
        }
    };

    // Use effect para actualizar la URI de la imagen si el usuario cambia
    useEffect(() => {
        setImageUri(user.photoURL);
    }, [user.photoURL]);

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size='large'
                onPress={changePhoto}
                containerStyle={styles.avatar}
                source={
                    imageUri
                        ? { uri: `${BASE_URL}/${imageUri}` }
                        : require('../../assets/avatar-default.jpg')
                }
            />
            <View style={styles.infoUser}>
                <Text style={styles.name}>{user.name ? user.name : 'Anónimo'}</Text>
                <Text style={styles.last_name}>{user.last_name ? user.last_name : 'Anónimo'}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <Loading isVisible={loading} 
                     text='Actualizando Foto...'
                     timeout={10000}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
});
