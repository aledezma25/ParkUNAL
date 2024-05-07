import { StyleSheet } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function Modal({ isVisible, setVisible, children }) {
  return (
    <Overlay
        isVisible={isVisible}
        // windowBackgroundColor='rgba(0,0,0,0.5)'
        // overlayBackgroundColor='transparent'
        overlayStyle={styles.overlay}
        onBackdropPress={() => setVisible(false)}
    >
        {
            children
        }
        
    </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay: {
        // height: 'auto',
        width: '90%',
        // backgroundColor: '#fff',
    }
})