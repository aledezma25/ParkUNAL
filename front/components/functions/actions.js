import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../utils/helpers';

// Función para verificar si el usuario está autenticado
export const isUserLogged = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.get(`${BASE_URL}/api/user`, {
              headers: {
                'Authorization': 'Bearer ' + token,
              }
            });
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al verificar la autenticación', error);
        return false;
    }
}

// Función para obtener el usuario actual
export const getCurrentUser = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.get(`${BASE_URL}/api/user`, {
              headers: {
                'Authorization': 'Bearer ' + token,
              }       
            });
            // console.log(response.data);
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Error al obtener el usuario', error);
        return null;
    }
}

// funcion para editar el usuario
export const updateProfile = async (id, newName, newLastName, newPhone) => {
  try {
    const data = {};

    if (newName !== '') {
      data.name = newName;
    }

    if (newLastName !== '') {
      data.last_name = newLastName;
    }

    if (newPhone !== '') {
      data.phone_number = newPhone;
    }

    const response = await axios.post(
      `${BASE_URL}/api/users/${id}/updateprofile`,
      data
    );

    if (response.data.success) {
      // La actualización del perfil fue exitosa
      console.log('Perfil actualizado correctamente');
    } else {
      // Hubo un error al actualizar el perfil
      console.error('Error al actualizar el perfil: ', response.data.message);
    }
  } catch (error) {
    console.error('Error de red: ', error);
  }
};

// funcion para cambiar la contraseña
export const changePassword = async (id, currentPassword, newPassword) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/${id}/changepassword`,
      {
        currentPassword,
        newPassword,
      }
    );

    if (response.data.success) {
      console.log('Contraseña cambiada correctamente');
    } else {
      console.error('Error al cambiar la contraseña: ', response.data.message);
    }
  } catch (error) {
    console.error('Error de red: ', error);
  }
};

// funcion para obtener los vehiculos
export const getVehicles = async () => {
  const result = { success: false, error: null, vehicles: [] };
  try {
    const response = await axios.get(`${BASE_URL}/api/vehicles`);
    if (response.data && Array.isArray(response.data)) {
      result.success = true;
      result.vehicles = response.data;
    } else {
      result.error = "Respuesta de API no válida";
    }
  } catch (error) {
    result.error = error.message || "Error de red";
  }
  return result;
};

// funcion para editar direccion de usuario
export const changeDireccion = async (id, newDireccion) => {
  try {
    const data = {};

    if (newDireccion !== '') {
      data.address = newDireccion;
    }

    const response = await axios.post(
      `${BASE_URL}/api/users/${id}/changeDireccion`,
      data
    );

    if (response.data.success) {
      // La actualización del perfil fue exitosa
      console.log('Direccion actualizada correctamente');
    } else {
      // Hubo un error al actualizar el perfil
      console.error('Error al actualizar la direccion: ', response.data.message);
    }

    return response.data;
}
catch (error) {
    console.error('Error de red: ', error);
}
}

//funcion para subir foto de perfil 

// Función para subir la imagen al backend
const uploadProfilePhoto = async (userId, photoURI) => {
  try {
    const formData = new FormData();
    formData.append('profile_photo_path', {
      uri: photoURI,
      name: 'photo.jpg',
      type: 'image/jpg',
    });

    const response = await axios.post(`${BASE_URL}/user/upload-photo/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      console.log('Foto de perfil actualizada exitosamente!');
      // Aquí podrías realizar alguna acción adicional si la actualización fue exitosa
    }
  } catch (error) {
    // console.error('Error al subir la foto de perfil:', error);
    // Manejar el error según sea necesario
  }
};

// Llamada a la función de subida de imagen
const userId = 123; // Reemplaza con el ID del usuario actual
const photoURI = 'URI_DE_LA_IMAGEN_SELECCIONADA'; // Reemplaza con la URI de la imagen seleccionada

uploadProfilePhoto(userId, photoURI);


// función para guardar un nuevo vehículo y mandando el token
export const addVehicle = async (vehicleData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.post(`${BASE_URL}/api/vehicles`, vehicleData, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      return response.data;
    }
    return { success: false, message: 'No se ha podido obtener el token' };
  } catch (error) {
    console.error('Error al guardar el vehículo:', error);
    return { success: false, message: 'Error de red' };
  }
};



// funcion para obtener los tipos de vehiculos
export const getVehicleTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/types`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los tipos de vehículos:', error);
    return [];
  }
};

// funcion para editar el vehiculo
export const editVehicle = async (vehicleData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.put(`${BASE_URL}/api/vehicles/${vehicleData.id}`, vehicleData, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      return response.data;
    }
    return { success: false, message: 'No se ha podido obtener el token' };
  } catch (error) {
    console.error('Error al editar el vehículo:', error);
    return { success: false, message: 'Error de red' };
  }
};

// funcion para eliminar un vehiculo
export const deleteVehicle = async (vehicleId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.delete(`${BASE_URL}/api/vehicles/${vehicleId}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      return response.data;
    }
    return { success: false, message: 'No se ha podido obtener el token' };
  } catch (error) {
    console.error('Error al eliminar el vehículo:', error);
    return { success: false, message: 'Error de red' };
  }
};

// funcion para llenar un registro de entrada
export const fillEntryRecord = async (entryData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.post(`${BASE_URL}/api/records`, entryData, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      return response.data;
    }
    return { success: false, message: 'No se ha podido obtener el token' };
  } catch (error) {
    console.error('Error al llenar el registro de entrada:', error);
    return { success: false, message: 'Error de red' };
  }
};

// funcion para obtener vehiculo por id
export const getVehicleById = async (vehicleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/vehicles/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el vehículo:', error);
    return null;
  }
};
