'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Button, Alert, Picker,Text} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';



const Item = Picker.Item;
class  detalles extends Component{
    constructor(props){
        super(props)
        this.passProps = this.props.route.passProps;
        this.state = {
            selected1: 2,
            vec:this.props.route.passProps.arra,
            marca: this.props.route.passProps.comic.marca,
            modelo: this.props.route.passProps.comic.modelo,
            id: this.props.route.passProps.comic.id,
            color:this.props.route.passProps.comic.color,
            precio:this.props.route.passProps.comic.precio,
            ano:this.props.route.passProps.comic.ano,
            placa:this.props.route.passProps.comic.placa,
            tipo:this.props.route.passProps.comic.tipo
        };
    }



    delete = () => {
        // Con FormData
        const params = new FormData();
        params.append('id', this.state.id);
        //etc

        fetch('http://192.168.1.20/ListadoApp/backend/index.php/controller_vehiculo/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        }).then((responseData) => {
            console.log(responseData.text())
        });
    };
    aceptar =() => {
        this.delete();
        this.props.navigator.replace({
            title:'Listado',
            name:'Listado',
            passProps:{}
        });
    };
    onValueChange = (key: string, value: string) => {
        this.setState({
            selected1:value,
            tipo:key});
        console.log(key);
        console.log(value);

    };

    Eliminar=()=>{
        Alert.alert(
            'Alerta',
            '¿Desea eliminar este automovil?',
            [
                {
                    text:'Aceptar',
                    onPress:(this.aceptar)
                },
                {
                    text:'Cancelar',

                }
            ]
        )
    };


    Acep=()=>{
        this.onUpdateCreator();
        this.props.navigator.replace({
            title:'Listado',
            name:'Listado'
        });
    }


    Update = () => {
      Alert.alert(
          'Alerta',
          '¿Deseea guardar los cambios?',
          [
              {
                  text:'Aceptar',
                  onPress:(this.Acep)
              },
              {
                  text:'cancelar'
              }
          ]
      )
    };
    onUpdateCreator = () => {
        const params = new FormData();
        for(var i in this.state){
            params.append(i,this.state[i]);
        }
            fetch('http://192.168.1.20/ListadoApp/backend/index.php/controller_vehiculo/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            }).then((responseData) => {
                console.log(responseData.text())
            });

    };

    render(){
        var _scrollView: ScrollView;
        return(

            <View style={styles.container}>
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={styles.scrollView}>
                    <Image source={{uri: this.passProps.comic.img}} style={styles.image}/>
                    <Sae label={'Marca'} iconClass={FontAwesomeIcon}  iconName={'pencil'} iconColor={'white'} autoCapitalize={'none'} autoCorrect={false} value={this.state.marca} onChangeText={(marca) => this.setState({marca})}/>
                    <Sae label={'Modelo'} iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={'white'} autoCapitalize={'none'} autoCorrect={false} value={this.state.modelo} onChangeText={(modelo) => this.setState({modelo})}/>
                    <Sae label={'Color'} iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={'white'} autoCapitalize={'none'} autoCorrect={false} value={this.state.color} onChangeText={(color) => this.setState({color})}/>
                    <Sae label={'Precio'} iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={'white'} autoCapitalize={'none'} autoCorrect={false} value={this.state.precio} onChangeText={(precio) => this.setState({precio})}/>
                    <Sae label={'Año'} iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={'white'} autoCapitalize={'none'} autoCorrect={false} value={this.state.ano} onChangeText={(ano) => this.setState({ano})}/>
                    <Sae label={'Placa'} iconClass={FontAwesomeIcon} iconName={'pencil'} iconColor={'white'} autoCapitalize={'none'} autoCorrect={false} value={this.state.placa} onChangeText={(placa) => this.setState({placa})}/>
                    <Picker
                        selectedValue={this.state.tipo}
                        onValueChange={(lang) => {this.setState({tipo: lang})}}>
                        <Picker.Item label='carro' value="carro"/>
                        <Picker.Item label='camioneta' value="camioneta"/>
                        <Picker.Item label='camion' value='camion'/>
                        <Picker.Item label='bus' value='bus'/>
                        <Picker.Item label='buseta' value='buseta'/>
                    </Picker>
                    <Button onPress={this.Update} title="Guardar" color="#841584"/>
                    <Button onPress={this.Eliminar} title="Eliminar" color="#841584"/>




                </ScrollView>

            </View>
        )
    }


}
const styles = StyleSheet.create({
    container: {
        marginTop: 63,
        flex: 1,
        backgroundColor: '#5b8dff',
    },
    title:{
        fontSize:23,
        color: '#007AFF',
        justifyContent: 'center',
        textAlign: 'center'
    },
    description:{
        marginTop:10,
        fontSize: 16,
    },
    modified:{
        marginTop: 10,
        fontSize:16,
        color: '#007AFF',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 150,
        backgroundColor: '#ffffff'
    },
    viewEliminar:{
        right: 100
    },
    viewGuardar:{
        left: 100
    }

});
module.exports = detalles;