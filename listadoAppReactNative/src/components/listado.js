'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image,TouchableHighlight } from 'react-native'



const REQUEST_URL= "http://192.168.1.20/ListadoApp/backend/index.php/controller_vehiculo/listar";
const Detalles = require('./detalles')

class listado extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrayTipos:[],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        }
    }


    componentDidMount() {
        this.fetchData();
        this.fetchMarca();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
            console.log(responseData)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                    loaded: true
                })
            })
    }

    fetchMarca(){
        fetch("http://192.168.1.20/ListadoApp/backend/index.php/controller_vehiculo/listarTipos")
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    arrayTipos: responseData.data
                })
            })
    }

    renderLoadingView(){
        return(
            <View style={styles.container}>
                <Text style={{marginTop:100}}>Cargando autos ...</Text>
            </View>
        )
    }

    renderComic(comic){
        return(
            <TouchableHighlight onPress={()=>this.onAutoPress(comic)}>
                <Image source={{uri:comic.img}} style={styles.backgroundImage}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{comic.marca}</Text>
                    </View>
                </Image>
            </TouchableHighlight>
        )
    }
    render(){
        if (!this.state.loaded){
            return this.renderLoadingView();
        }

        return(

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderComic.bind(this)}
                style={styles.listViews}
            />

        )
    }

    onAutoPress(comic){
        this.props.navigator.push({
            name:'Detalles',
            title: comic.name,
            passProps: {comic:comic, arra:this.state.arrayTipos}
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 100
    },
    backgroundImage:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 150
    },
    rightContainer: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        alignSelf: 'stretch',
        paddingTop: 30,
        height: 150
    },
    title:{
        fontSize: 27,
        marginBottom: 8,
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: 'rgba(52,52,52,0)'
    },
    available: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: 'rgba(52,52,52,0)'
    },
    header: {
        height: 65,
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        top: 0,
        backgroundColor: '#0b0981',
        zIndex: 10
    },
    listView:{
        paddingTop: 64,
        marginBottom: 49
    }
})

module.exports = listado;
