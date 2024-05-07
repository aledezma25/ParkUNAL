import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AddVehicleForm from './AddVehicleForm';
import Modal from '../functions/Modal';

export default function AddVehicleModal({ isVisible, setVisible, onReload, toastRef }) {
  const closeModal = () => setVisible(false);

  return (
    <Modal isVisible={isVisible} setVisible={setVisible}>
      <View style={styles.container}>
        <Text h4 style={styles.title}>Añadir nuevo vehículo</Text>
        <AddVehicleForm setShowModal={setShowModal} toastRef={toastRef} onReload={reloadVehicles} editMode={true} vehicle={selectedVehicle} />
        <Button
          title="Cancelar"
          containerStyle={styles.cancelButtonContainer}
          buttonStyle={styles.cancelButton}
          onPress={closeModal}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  cancelButtonContainer: {
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});
