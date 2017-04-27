'use strict'
import React, { Component } from 'react';

import {
  Text,
    View,
    TouchableHighlight,
    Alert,
    StyleSheet,
    ListView,
    Image
} from 'react-native';

var Crypto = require('crypto-js')
var REQUEST_URL = 'http://192.168.1.12/backend/crud_android/listarmarca';

class reporte2View extends Component {
   constructor(props){
        super(props);
        this.timestamp =1;
        this.public_key ='';
        this.private_key = '';
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1,row2) => row1 !== row2
            }),
            loaded: false
        }
    }

   componentDidMount() {
   this.fetchData();
 }

 fetchData(){
       var hash = Crypto.MD5(this.timestamp + this.private_key + this.public_key);
       fetch(REQUEST_URL)
       .then((response) => response.json()).then((responseData) => this.setState({
           dataSource: this.state.dataSource.cloneWithRows(responseData.data),
           loaded: true
       }))
   }
renderLoadingView(){
      return(
      <View style= {styles.container}>
          <Text style={{}}>Cargando reportes....</Text>
      </View>)
  }

  renderReporte(data){
    return (


    <View style={styles.rightContainer}>
    <Text> Reportes Por tipo:</Text>
    <Text style ={styles.available}> Cantidad :{data.total}</Text>
    <Text style ={styles.available}>Promedio :{data.promedio}</Text>

    </View>

  )
  }


  render() {
      if (!this.state.loaded) {
        return this.renderLoadingView();
      }
   return (
     <ListView
     dataSource= {this.state.dataSource}
     renderRow= {this.renderReporte.bind(this)}
          style= {styles.listview}></ListView>
   );

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
    listView:{
        paddingTop: 64,
        marginBottom: 49
    }
})


module.exports = reporte2View;
