import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';


export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

//URL de la API desde el backend laravel
export const BASE_URL = 'http://192.168.137.1:8000';

//URL del microservicio en express
export const BASE_URL2 = 'http://192.168.137.1:3000';





export const loadImageFromGallery = async () => {
    // Solicitar permisos para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Se requieren permisos para acceder a la galería");
        return;
    }

    // Abrir el selector de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    // Manejar la respuesta de ImagePicker
    if (!result.canceled) {
        return { status: true, image: result.assets[0].uri };
    } else {
        return { status: false, image: null };
    }
};

export const fileToBlob = async(path) => {
    const file = await fetch(path);
    const blob = await file.blob();
    return blob;
}



