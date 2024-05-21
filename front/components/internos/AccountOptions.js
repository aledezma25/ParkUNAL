import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { map } from 'lodash';
import { ListItem, Icon } from 'react-native-elements';
import Modal from '../functions/Modal';
import ChangePerfilForm from './ChangePerfilForm';
import ChangePasswordForm from './ChangePasswordForm';
import ChangeDireccionForm from './ChangeDireccionForm';

export default function AccountOptions({ user, toastRef, onReload }) {
  const [ShowModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const generateOptions = () => {
    return [
      {
        title: 'Editar Perfil',
        iconType: 'material-community',
        iconNameLeft: 'account-circle',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => selectedComponent('perfil'),
      },
      {
        title: 'Añadir Dirección',
        iconType: 'material-community',
        iconNameLeft: 'map-marker',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => selectedComponent('direccion'),
      },
      {
        title: 'Cambiar Contraseña',
        iconType: 'material-community',
        iconNameLeft: 'lock-reset',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: () => selectedComponent('password'),
      },
    ];
  };

  const selectedComponent = (key) => {
    switch (key) {
      case 'perfil':
        setRenderComponent(
          <ChangePerfilForm
            id={user.id}
            name={user.name}
            lastName={user.last_name}
            phone_number={user.phone_number}
            document_number={user.document_number}
            setShowModal={setShowModal}
            toastRef={toastRef}
            onReload={onReload}
          />
        );
        break;
      case 'direccion':
        setRenderComponent(
          <ChangeDireccionForm
            id={user.id}
            address={user.address}
            setShowModal={setShowModal}
            toastRef={toastRef}
            onReload={onReload}
          />
        );
        break;
      case 'password':
        setRenderComponent(
          <ChangePasswordForm
            id={user.id}
            setShowModal={setShowModal}
            toastRef={toastRef}
          />
        );
        break;
    }
    setShowModal(true);
  };

  const menuOptions = generateOptions();

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} style={styles.menuItem} onPress={menu.onPress}>
          <Icon type="material-community" name={menu.iconNameLeft} color={menu.iconColorLeft} />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon type="material-community" name={menu.iconNameRight} color={menu.iconColorRight} />
        </ListItem>
      ))}
      <Modal isVisible={ShowModal} setVisible={setShowModal}>
        {renderComponent}
      </Modal>
      <View style={styles.message}>
        <Text style={styles.text1}>¡Recuerda mantener tu información actualizada!</Text>
        <Text style={styles.text}>Agrega tu documento y número de celular en la opción de <Text style={styles.text2}>"Editar Perfil"</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  message: {
    margin: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  text1: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
    text2: {
        color: '#00a680',
        fontWeight: 'bold',
    },
});
