// ChangePasswordForm.js
import React, { useState } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements'
import { changePassword } from '../functions/actions'; // Asegúrate de tener una función para cambiar la contraseña

const ChangePasswordForm = ({ id, setShowModal, toastRef, onReload }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async () => {
    // Validar los campos y mostrar errores si es necesario
    if (!validateData()) {
        return;
        }


    setLoading(true);
    const result = await changePassword(id, currentPassword, newPassword);
    setLoading(false);

    if (result) {
      setError('Error al cambiar la contraseña');
      return;
    }

    // Cambio de contraseña exitoso, mostrar mensaje y recargar si es necesario
    setShowModal(false);
    if (toastRef.current) {
      toastRef.current.show('Contraseña cambiada correctamente', 2000);
    }
    if (onReload) {
      onReload();
    }
  };

  const validateData = () => {
    setError(null);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Las nuevas contraseñas no coinciden');
      return false;
    }

    if (currentPassword === newPassword) {
      setError('La nueva contraseña no puede ser igual a la actual');
      return false;
    }

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return false;
    }

    return true;
  };

  return (
    <View style={styles.view}>
      {/* Input para la contraseña actual */}
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }

      />

      {/* Input para la nueva contraseña */}
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      {/* Input para confirmar la nueva contraseña */}
      <Input
        placeholder="Confirmar nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => setConfirmNewPassword(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      {/* Botón para cambiar la contraseña */}
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}

      />
    </View>
  );
};

const styles = StyleSheet.create({
 view: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 20,
        width: '95%',
    },
    btn: {
        backgroundColor: '#94b43b',
    }
});

export default ChangePasswordForm;
