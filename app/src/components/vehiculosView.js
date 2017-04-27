'use strict'
import React, { Component } from 'react';
import Form from 'react-native-form';
import TextField from 'react-native-md-textinput';
import {
  Text,
    View,
    ScrollView,
    TouchableHighlight,
    Picker,
    Alert,
    StyleSheet
} from 'react-native';



class vehiculosView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modelo: '',
      marca:'',
      color:'',
      placa:'',
      precio:'',
      ano:'',
      tipo:'',
    };
  }



  handleModeloChange = text => {
    this.setState({
      modelo: text
    });
  };
  handleMarcaChange = text => {
    this.setState({
      marca: text
    });
  };
  handleColorChange = text => {
    this.setState({
      color: text
    });
  };
  handlePlacaChange = text => {
    this.setState({
      placa: text
    });
  };
  handlePrecioChange = text => {
    this.setState({
      precio: text
    });
  };
  handleAnoChange = text => {
    this.setState({
      ano: text
    });

  };


    render(){
      const {modelo, marca,color,placa,precio,ano} = this.state;
        return(
     <View>
     <ScrollView>
     <Text style={styles.title}> Crear Nuevo Vehiculo</Text>
     <TextField label={'Modelo'} highlightColor={'#00BCD4'} name={'modelo'} value={modelo} onChangeText={this.handleModeloChange} />
     <TextField label={'Marca'} highlightColor={'#00BCD4'} name={'marca'} value={marca} onChangeText={this.handleMarcaChange} />
     <TextField label={'Color'} highlightColor={'#00BCD4'} name={'color'} value={color} onChangeText={this.handleColorChange} />
     <TextField label={'Placa'} highlightColor={'#00BCD4'} name={'placa'} value={placa} onChangeText={this.handlePlacaChange} />
     <TextField label={'Precio'} highlightColor={'#00BCD4'} name={'precio'} value={precio} onChangeText={this.handlePrecioChange}/>
     <TextField label={'Año'} highlightColor={'#00BCD4'} name={'ano'} value={ano} onChangeText={this.handleAnoChange}/>
     <Picker
      selectedValue={this.state.tipo}
      onValueChange={(lang) => this.setState({tipo: lang})}>
     <Picker.Item label="Carro" value="carro" />
     <Picker.Item label="Camioneta" value="camioneta" />
     <Picker.Item label="Camión" value="camion" />
     <Picker.Item label="Bus" value="bus" />
     <Picker.Item label="Buseta" value="buseta" />
     <Picker.Item label="Otro" value="otro" />
     </Picker>
     <TouchableHighlight style={styles.boton} onPress={()=>this.enviar('data')}>
     <Text style={styles.textoBoton}> Insertar </Text>
     </TouchableHighlight>


     </ScrollView>
     </View>
        )
    }

    enviar(){
      const {modelo, marca , color , placa , precio , ano,tipo} = this.state;

    const formBody = Object.keys(this.state).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this.state[key]);
    }).join('&');
    fetch('http://192.168.1.12/backend/crud_android/insertar',
    {
    method: 'POST',
    headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody
    })
    .then(function(res){ console.log(res.text()); return ' Vehiculo Insertado'; })
    .catch(err => console.log(err))
    .then(function(data){ alert( JSON.stringify( data ) ) })


    }




}




const styles = StyleSheet.create({
  boton:{
      width: 300,
      height: 30,
      backgroundColor: '#454545',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      marginBottom: 50,
      borderRadius: 8,
      borderWidth: 1
  },
  textoBoton: {
      color: 'white'
  },
    container: {
    flex: 1,
    alignItems: 'center',
    },
    title:{
        fontSize: 25,
        marginTop: 50
    }
})


module.exports = vehiculosView;
