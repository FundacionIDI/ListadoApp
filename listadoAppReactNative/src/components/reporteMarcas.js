'use strict'

import React, { Component } from 'react';
import { Text, View, StyleSheet,Picker, ScrollView } from 'react-native'
const Item = Picker.Item;

class ReporteMarcas extends Component{
    constructor(props) {
        super(props)
        this.state={
            vec:[],
            tipos:[],
            total:'',
            promedio:'',
            language:''
        }
    }
    componentDidMount() {
        this.fetchMarca();

    }

    fetchMarca(){
        fetch("http://192.168.1.20/ListadoApp/backend/index.php/controller_vehiculo/listarMarcas")
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    vec: responseData.data
                })
            })
    }

    Consulta = (key) => {
        // Con FormData
        const params = new FormData();
        params.append('marca', key);
        //etc

        fetch('http://192.168.1.20/ListadoApp/backend/index.php/controller_vehiculo/marca', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        }).then((responseData) => {
            var json = JSON.parse((responseData._bodyInit));
            this.setState({tipos:json.data})
            for (var i in this.state.tipos){
                this.setState({
                    total:this.state.tipos[i].TOTAL,
                    promedio:this.state.tipos[i].Promedio
                })
            }
        });


    };

    render(){
        var _scrollView: ScrollView;
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reportes por Marca</Text>
                </View>


                <View style={styles.div}>

                    <Picker
                        selectedValue={this.state.language}
                        onValueChange={(lang) => {this.setState({language: lang})
                            this.Consulta(this.state.language)}}>
                        {this.state.vec.map((v, i) => <Item  value={v.marca} label={v.marca} />)}
                    </Picker>
                </View>

                <View style={styles.muestra}>
                    <Text style={styles.title}>Cantidad: {this.state.total} </Text>
                    <Text style={styles.title}>Promedio: {this.state.promedio} </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontSize:15,
        textAlign:'center',
        color: '#ffffff',
        marginTop:25
    },
    header: {
        height: 50,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: '#0b0981',
        zIndex: 10
    },
    div: {
        height: 150,
        position: 'absolute',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 50,
        backgroundColor: '#ffffff',
        zIndex: 10
    },
    muestra:{
        height: 230,
        position: 'absolute',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top:200,
        backgroundColor: '#384395',
        zIndex: 10
    },

})
module.exports = ReporteMarcas;