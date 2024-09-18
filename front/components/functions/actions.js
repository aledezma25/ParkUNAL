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
export const updateProfile = async (id, newName, newLastName, newPhone, newDocument) => {
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
    if (newDocument !== '') {
      data.document_number = newDocument;
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


// función para guardar un nuevo vehículo 
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

// funcion para editar un registro al momento de la salida
export const updateExitRecord = async (recordId, exitData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.put(`${BASE_URL}/api/records/${recordId}`, {
        ...exitData, // Spread operator para enviar los datos de salida
      }, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      return response.data;
    }
    return { success: false, message: 'No se ha podido obtener el token' };
  } catch (error) {
    console.error('Error al editar el registro de salida:', error);
    return { success: false, message: 'Error de red' };
  }
}

// funcion para obtener el ultimo registro de entrada
export const getLastEntryRecord = async (vehicleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/records/last/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el último registro de entrada:', error);
    return null;
  }
}

// funcion para actualizar los espacios disponibles por tipo de vehiculo y pasando el token
export const updateSpaces = async (typeId, newSpaces) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.put(`${BASE_URL}/api/types/spaces/${typeId}`, {
        spaces: newSpaces,
      }, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      return response.data;
    }
    return { success: false, message: 'No se ha podido obtener el token' };
  } catch (error) {
    console.error('Error al actualizar los espacios disponibles:', error);
    return { success: false, message: 'Error de red' };
  }
}



//funcion para obtener el tipo de vehiculo por id
export const getVehicleTypeById = async (typeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/types/${typeId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el tipo de vehículo:', error);
    return null;
  }
}


//funcion agregar el campo photoURL de un usuario y pasando el token
// funcion para editar direccion de usuario
export const updatePhotoURL = async (id, photoURL) => {
  try {
    const data = {};

    if (photoURL !== '') {
      data.photoURL = photoURL;
    }

    const response = await axios.post(
      `${BASE_URL}/api/users/${id}/uploadphoto`,
      data
    );

    if (response.data.success) {
      // La actualización del perfil fue exitosa
      console.log('Foto actualizada correctamente');
    } else {
      // Hubo un error al actualizar el perfil
      console.error('Error al actualizar la Foto: ', response.data.message);
    }

    return response.data;
}
catch (error) {
    console.error('Error de red: ', error);
}


}

//funcion para obtener los comentarios 
export const getComments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/comments`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    return [];
  }
};

//funcion para agregar un comentario pasando el token

export const addComment = async (commentData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.post(`${BASE_URL}/api/comments`, commentData, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      return response.data;
    }
    return { success: false, message: 'No se ha podido obtener el token' };
  } catch (error) {
    console.error('Error al agregar el comentario:', error);
    return { success: false, message: 'Error de red' };
  }
};

//funcion para obtener usuario por id
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;
  }
}; 