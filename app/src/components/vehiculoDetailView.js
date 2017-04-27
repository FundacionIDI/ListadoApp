'use strict'
import React, { Component } from 'react'
import TextField from 'react-native-md-textinput';
import {
  Text,
    View,
    TouchableHighlight,
    Alert,
    Picker,
    StyleSheet,
    ScrollView,
    ListView,
    Image
} from 'react-native'

class vehiculoDetailView extends Component {
    constructor(props){
        super(props)
        const {passProps} = this.props.route;
        this.state = {
          id: passProps.data.id,
          modelo: passProps.data.modelo,
          marca: passProps.data.marca,
          color: passProps.data.color,
          placa: passProps.data.placa,
          precio: passProps.data.precio,
          ano: passProps.data.ano,
          tipo: passProps.data.tipo
        };

    }

    render(){
      const {id,modelo, marca,color,placa,precio,ano,tipo} = this.state;
        return(
        <View style={styles.container}>
        <ScrollView>
            <TextField style={styles.pick} label={'ID :'} value={id} name={'modelo'}/>
            <TextField style={styles.pick} label={'MODELO :'} value={modelo} name={'modelo'} onChangeText={(modelo) => {this.setState({modelo})}} />
            <TextField style={styles.pick} label={'MARCA :'} value={marca} name={'marca'} onChangeText={(marca) => {this.setState({marca})}} />
            <TextField style={styles.pick} label={'COLOR :'} value={color} name={'color'} onChangeText={(color) => {this.setState({color})}} />
            <TextField style={styles.pick} label={'PLACA :'} value={placa} name={'placa'} onChangeText={(placa) => {this.setState({placa})}} />
            <TextField style={styles.pick} label={'PRECIO :'} value={precio} name={'precio'} onChangeText={(precio) => {this.setState({precio})}} />
            <TextField style={styles.pick} label={'AÑO :'} value={ano} name={'ano'} onChangeText={(ano) => {this.setState({ano})}} />
            <Picker
             selectedValue={tipo}
             onValueChange={(lang) => this.setState({tipo: lang})}>
            <Picker.Item label="Carro" value="carro" />
            <Picker.Item label="Camioneta" value="camioneta" />
            <Picker.Item label="Camión" value="camion" />
            <Picker.Item label="Bus" value="bus" />
            <Picker.Item label="Buseta" value="buseta" />
            <Picker.Item label="Otro" value="otro" />
            </Picker>
            <TouchableHighlight style={styles.boton} onPress={()=>this.enviar('data')}>
            <Text style={styles.textoBoton}> Editar </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.boton} onPress={()=>this.borrar('data')}>
            <Text style={styles.textoBoton}> Eliminar </Text>
            </TouchableHighlight>
        </ScrollView>
        </View>

    )
    }

    enviar(){

    const formBody = Object.keys(this.state).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.state[key]);
    }).join('&');
    fetch('http://192.168.1.12/backend/crud_android/modificar',
    {
    method: 'POST',
    headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody
    })
    .then(function(res){ console.log(res.text()); return "Vehiculo modificado"; })
    .catch(err => console.log(err))
    .then(function(data){ alert( JSON.stringify( data ) ) })

    this.props.navigator.replace({
       title: 'Dashboard',
       name: 'Dashboard',
       passProps:{}
   })
    }


    borrar(){

    const formBody = Object.keys(this.state).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.state[key]);
    }).join('&');
    fetch('http://192.168.1.12/backend/crud_android/eliminar',
    {
    method: 'POST',
    headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody
    })
    .then(function(res){ console.log(res.text()); return "Vehiculo Borrado"; })
    .catch(err => console.log(err))
    .then(function(data){ alert( JSON.stringify( data ) ) })

    this.props.navigator.replace({
       title: 'Dashboard',
       name: 'Dashboard',
       passProps:{}
   })

    }

}


const styles = StyleSheet.create({
    container: {
        marginTop: 63,
        flex: 1,
        alignItems:'center',
        backgroundColor: '#F5FCFF'
    },
    title:{
        fontSize: 23,
        color: '#007AFF'
    },
    description:{
        marginTop: 10,
        fontSize: 16,
        color:'#454545'
    },
    modified:{
        marginTop: 10,
        fontSize: 16
    },
    image: {
        alignSelf: 'stretch',
        height: 300
    },
    pick:{
      width:300
    },
    boton:{
        width: 300,
        height: 30,
        backgroundColor: '#454545',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 8,
        borderWidth: 1
    },
    textoBoton: {
        color: 'white'
    },
})

module.exports = vehiculoDetailView
