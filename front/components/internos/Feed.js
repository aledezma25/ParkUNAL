import React, { useEffect, useState, useCallback} from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { getCurrentUser } from '../functions/actions';
import { BASE_URL } from '../../utils/helpers';
import { Avatar, Icon } from 'react-native-elements';
import Modal from '../functions/Modal'; // Asegúrate de que este Modal soporte el estilo
import { getComments, addComment } from '../functions/actions';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect
import Loading from '../functions/Loading';
import { set } from 'lodash';


const pickImage = async (setSelectedImage) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permiso necesario', 'Se requiere permiso para acceder a la galería de imágenes.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true, // Permitir ajuste de la imagen
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
};

// Función para subir una imagen al backend
const uploadImage = async (uri) => {
  const formData = new FormData();
  formData.append('image', {
    uri,
    type: 'image/jpeg', // Ajusta el tipo MIME si es necesario
    name: 'photo.jpg',
  });

  try {
    const response = await axios.post(`${BASE_URL}/api/comments/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const imageUrl = response.data.url; // URL de la imagen subida devuelta por el backend
    return imageUrl;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    ToastAndroid.show('Error al subir la imagen', ToastAndroid.SHORT);
    return null;
  }
};

const Feed = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Estado para pull-to-refresh


  // Función para obtener y establecer el usuario actual
  const fetchCurrentUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  };

  // useFocusEffect se ejecuta cada vez que el componente gana foco
  useFocusEffect(
    useCallback(() => {
      fetchCurrentUser();
    }, []) // Dependencia vacía para que se ejecute solo en montajes y al ganar foco
  );

  const deleteComment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/comments/${id}`);
      // Actualizar la lista de mensajes después de la eliminación
      //mensaje de exito con toast
      ToastAndroid.show('Comentario eliminado con éxito', ToastAndroid.SHORT);
      const response = await getComments();
      setMessages(response);
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
      //mensaje de error con toast
      ToastAndroid.show('Error al eliminar el comentario', ToastAndroid.SHORT);
    }
  };
  const confirmDeleteComment = (id) => {
    Alert.alert(
      'Eliminar comentario',
      '¿Estás seguro de que quieres eliminar este comentario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => deleteComment(id) },

      ],
      { cancelable: true }
    );
  };

  const handleOpenModal = () => {
    if (user) {
      setModalVisible(true); // Si el usuario está autenticado, abre el modal
    } else {
      ToastAndroid.show('Debes iniciar sesión para agregar un comentario', ToastAndroid.SHORT);
      navigation.navigate('LoginScreen'); // Si no está autenticado, redirige a la pantalla de inicio de sesión
    }
  };
  
  // const reload = async () => {
  //   setLoading(true);
  //   fetchMessages();
  //   setLoading(false);
  // };

 
  const fetchMessages = async () => {
    try {
      setRefreshing(true); // Inicia el estado de refresco
      const response = await getComments();
      setMessages(response);
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
      ToastAndroid.show('Error al obtener los mensajes', ToastAndroid.SHORT);
    } finally {
      setRefreshing(false); // Finaliza el estado de refresco
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
 

  const addReaction = async (id, reaction) => {
    try {
      console.log('Reaccionando al mensaje:', id);
      await axios.put(`${BASE_URL}/api/comments/${id}`, {
        reaction: reaction + 1,
      });
      const response = await axios.get(`${BASE_URL}/api/comments`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error al agregar la reacción:', error);
    }
  };

  const handleAddMessage = async () => {
    let imageUrl = null;
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage);
    }

    const commentData = {
      idUser: user.id,
      nameUser: user.name,
      lastNameUser: user.last_name,
      photoURL: user.photoURL,
      message: newMessage,
      image: imageUrl,
      reaction: 0,
      date: new Date().toISOString(),
    };

    console.log('Agregando comentario:', commentData);

    try {
      const result = await addComment(commentData);
      if (result.status === 200) {
        console.error('Error al agregar el comentario:', result.message);

      } else {
        setNewMessage('');
        setSelectedImage(null);
        setModalVisible(false);
        fetchMessages(); // Llama a fetchMessages para actualizar los comentarios después de agregar uno nuevo
        const response = await axios.get(`${BASE_URL}/api/comments`);
        setMessages(response.data);
        
        ToastAndroid.show('Comentario agregado con éxito', ToastAndroid.SHORT);
      }
      console.error('Error al agregar el mensaje:', error);
    } catch (error) {
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Avatar
        rounded
        size='medium'
        containerStyle={styles.avatar}
        source={
          item.photoURL
            ? { uri: `${BASE_URL}/${item.photoURL}` }
            : require('../../assets/avatar-default.jpg')
        }
      />
      <View style={styles.messageContent}>
        <View style={styles.header}>
          <Text style={styles.userName}>{item.nameUser} {item.lastNameUser}</Text>
          {user && user.id === item.idUser && (
            <TouchableOpacity onPress={() => confirmDeleteComment(item.id)}>
              <Icon name='trash' type='font-awesome' color='#d9534f' />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.messageText}>{item.message}</Text>
        {item.image && (
          <Image source={{ uri: `${BASE_URL}/${item.image}` }} style={styles.messageImage} />
        )}
        <View style={styles.reactionContainer}>
          <TouchableOpacity
            style={styles.reactionButton}
            onPress={() => addReaction(item.id, item.reaction)}
          >
            <Text style={styles.reactionText}>👍 {item.reaction || 0}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );
  
  
  return (
    <View style={styles.container}>
      <FlatList
        data={messages.slice().reverse()} // Invierte el array antes de pasarlo a FlatList
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={fetchMessages}
        
      />
      <View style={styles.button}>
        <Button
          title="Agregar Comentario"
          onPress={handleOpenModal}
          color="#94b43b"
        />

      </View>
  
      {/* Modal para agregar un mensaje */}
      <Modal
        isVisible={modalVisible}
        setVisible={setModalVisible}
      >
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>Nuevo comentario</Text>
          {/* Icono para recargar  */}
  
          <TextInput
            style={modalStyles.input}
            placeholder="Escribe tu comentario"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={modalStyles.selectedImage} />
          )}
          <View style={modalStyles.buttons}>
            <Icon name='image' type='font-awesome' color='#94b43b' onPress={() => pickImage(setSelectedImage)} />
            <Button title="Enviar" onPress={handleAddMessage} color="#94b43b" />
          </View>
        </View>
      </Modal>
      <Loading 
        isVisible={loading}
        text='Cargando mensajes...'
        timeout={10000}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  messageText: {
    fontSize: 14,
    marginVertical: 5,
    color: '#555',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  reactionButton: {
    marginRight: 10,
  },
  reactionText: {
    color: '#94b43b',
    fontWeight: 'bold',
  },
  date: {
    color: '#999',
    marginTop: 10,
    textAlign: 'right',
  },
  button: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
});

const modalStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 80,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default Feed;
