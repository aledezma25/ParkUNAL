import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Input } from 'react-native-elements'
import { useState } from 'react'
import { isEmpty } from 'lodash';
import { changeDireccion } from '../functions/actions';
import axios from 'axios';

export default function ChangeNameForm({id, address, setShowModal, toastRef, onReload}) {
    const [newAddress, setNewAddress] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const onSubmit = async () => {

        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            console.error('ID no es un número válido');
            return;
        }
        setLoading(true);
        console.log(parsedId);
        const result = await changeDireccion(parsedId, newAddress);

        setLoading(false);

        if (!result) {
            setError('Error al añadir direccion...');
            return;
        }
         // Actualización exitosa, mostrar mensaje
         setShowModal(false);
        if (toastRef.current) {
            toastRef.current.show('Direccion Añadida...', 2000); // Cambia el tiempo según tu preferencia
        }
        if (onReload) {
            onReload();
        }
        
    };


    return (
    <View style={styles.view}>
        <Input
            placeholder='Address'
            containerStyle={styles.input}
            defaultValue={address || ''}
            onChange={(e) => setNewAddress(e.nativeEvent.text)}
            errorMessage={error}
            rightIcon={{
                type: 'material-community',
                name: 'map-marker-outline',
                color: '#c2c2c2',
            }}
        />

        <Button
            title='Cambiar Dirección'
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={loading}
        />
    </View>
  )
}

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
})