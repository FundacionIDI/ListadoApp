'use strict'

import React, { Component } from 'react'

import {
    Text,
    View,
    TouchableHighlight,
    Alert,
    StyleSheet,
    Image
} from 'react-native'




class loginView extends Component {
    render(){
        return(
            <Image  style={styles.container} source={{uri: 'http://cdn1.blog.iseecars.com/wp-content/uploads/2016/09/Photo-by-Mason-Jones-Unsplash.jpg'}}>
            <View>
                <TouchableHighlight onPress={this.onLogin.bind(this)} style={styles.boton}>
                    <Text style={styles.textoBoton}> Crud </Text>
                </TouchableHighlight>
            </View>
            </Image>
        )
    }
    onLogin(){
        Alert.alert(
            'Acceso',
            'Te has logueado en el sistema',
            [
                {
                    text: 'Aceptar',
                    onPress: this.aceptar.bind(this)
                },
                {
                    text: 'Cancelar',
                    onPress: this.cancelar.bind(this)
                }
            ]
        )
    }
    aceptar(){
         this.props.navigator.replace({
            title: 'Dashboard',
            name: 'Dashboard',
            passProps:{}
        })
    }
    cancelar(){
        console.log('Login cancelado')
    }
}
const styles = StyleSheet.create({
    boton:{
        width: 300,
        height: 30,
        backgroundColor: '#454545',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1
    },
    textoBoton: {
        color: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 30
    },
    title:{
        marginTop: 100,
        fontSize: 25,
        textAlign: 'center',
        color: 'red',
        backgroundColor:'rgba(0,0,0,0)'
    }
})

module.exports = loginView;
