import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getCurrentUser } from '../functions/actions';
import { Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Comentarios from './Comentarios';

export default function ListaReview({ navigation, idProduct, nameProduct }) {
    //Verificar si el usuario está logueado con el token
    const [login, setLogin] = useState(null);
    const [user, setUser] = useState(null);

    useFocusEffect(
        useCallback(() => {
        (async () => {
            const user = await getCurrentUser();
            user ? setLogin(true) : setLogin(false);
            setUser(user);
        })();
        }
        , [])
    );

    return (
        <View>
            {
                login ? (
                    <Button
                        title="Escribe una reseña"
                        buttonStyle={styles.btnAddReview}
                        titleStyle={styles.btnTitleReview}
                        icon={{
                            type: "material-community",
                            name: "square-edit-outline",
                            color: "#EC801A"
                        }}
                        onPress={() => navigation.navigate("add-review-products", { idProduct: idProduct, nameProduct: nameProduct, user: user })}
                    />
                ) : (
                        <Text style={styles.mustLoginText}>
                            Para escribir una reseña es necesario estar logueado.{" "}
                            <Text
                                style={styles.loginText}
                                onPress={() => navigation.navigate("LoginScreen")}
                            >
                                Pulsa AQUÍ para iniciar sesión
                            </Text>
                        </Text>
                    )
            }
            <Comentarios
                navigation={navigation}
                idProduct={idProduct}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",
        fontWeight: "bold",
        marginTop: 20
    },
    btnTitleReview: {
        color: "#EC801A",
        fontWeight: "bold"
    },
    mustLoginText: {
        textAlign: "center",
        color: "#EC801A",
        padding: 20
        
    },
    loginText: {
        fontWeight: "bold"
    }
});
