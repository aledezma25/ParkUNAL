import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Input } from 'react-native-elements'
import { useState } from 'react'
import { isEmpty } from 'lodash';
import { updateProfile } from '../functions/actions';
import axios from 'axios';

export default function ChangeNameForm({id, name, lastName, phone_number, document_number, setShowModal, toastRef, onReload}) {
    const [newName, setNewName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newDocument, setNewDocument] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const onSubmit = async () => {

        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            console.error('ID no es un número válido');
            return;
        }
        setLoading(true);
        const result = await updateProfile(parsedId, newName, newLastName, newPhone, newDocument);
        setLoading(false);

        if (result) {
            setError('Error al actualizar el perfil');
            return;
        }
         // Actualización exitosa, mostrar mensaje
         setShowModal(false);
        if (toastRef.current) {
            toastRef.current.show('Perfil actualizado correctamente', 2000); // Cambia el tiempo según tu preferencia
        }
        if (onReload) {
            onReload();
        }
        
    };


    return (
    <View style={styles.view}>
        <Input
            placeholder='Nombre'
            containerStyle={styles.input}
            defaultValue={name || ''}
            onChange={(e) => setNewName(e.nativeEvent.text)}
            errorMessage={error}
            rightIcon={{
                type: 'material-community',
                name: 'account-circle-outline',
                color: '#c2c2c2',
            }}
        />
        <Input
            placeholder='Apellidos'
            containerStyle={styles.input}
            defaultValue={lastName || ''}
            onChange={(e) => setNewLastName(e.nativeEvent.text)}
            errorMessage={error}
        />
        <Input
            placeholder='Numero de telefono'
            containerStyle={styles.input}
            defaultValue={phone_number || ''}
            onChange={(e) => setNewPhone(e.nativeEvent.text)}
            errorMessage={error}
            keyboardType='phone-pad'
            rightIcon={{
                type: 'material-community',
                name: 'phone',
                color: '#c2c2c2',
            }}
        />
        <Input
            placeholder='Documento de identidad'
            containerStyle={styles.input}
            defaultValue={document_number || ''}
            onChange={(e) => setNewDocument(e.nativeEvent.text)}
            errorMessage={error}
            keyboardType='numeric'
            rightIcon={{
                type: 'material-community',
                name: 'card-account-details',
                color: '#c2c2c2',
            }}
        />
        

        <Button
            title='Actualizar perfil'
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