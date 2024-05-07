import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { getCurrentUser } from '../../functions/actions'
import { useFocusEffect } from '@react-navigation/native'
import Loading from '../../functions/Loading'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import PerfilScreen from '../PerfilScreen'

export default function AccountScreen() {
    const [login, setLogin] = useState(null)

    useFocusEffect (
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null) {
        return <Loading isVisible={true} text="Cargando..."/>
    }
    return login ? <PerfilScreen/> : <UserGuest/>
}

const styles = StyleSheet.create({})