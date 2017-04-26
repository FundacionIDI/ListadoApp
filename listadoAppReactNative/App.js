import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    TouchableHighlight,
    View
} from 'react-native';

const Listado = require('./src/components/listado')
const Detalles = require('./src/components/detalles')
const Tabs = require('./src/components/tabs')

var NavigatorBarRouterMapper = {
    LeftButton: function (route, navigator, index){

        if (index==0){
            return null;
        }
        return(
            <TouchableHighlight onPress={()=>{
                if (index > 0){
                    navigator.pop();
                }
            } }>
              <Text style={{marginTop:10, marginLeft:20, color:'#007AFF'}}>Atras</Text>
            </TouchableHighlight>
        )
    },
    RightButton: function (route, navigator, index){
        return null;
    },
    Title: function (route,navigator, index) {
        if(route.name==='Listado'){
          return null;
        }
        return(
            <Text style={{marginTop:10, color:'#007AFF'}}>
                {route.name}
            </Text>
        )
    }
};
export default class App extends React.Component {
    renderScene(route, navigator){
        switch (route.name){
            case 'Listado':
                return(
                    <Tabs {...route.props} navigator={navigator} route={route}/>

                );

            case 'Detalles':
                return(
                        <Detalles {...route.props} navigator={navigator} route={route}/>

                );
        }
    }

    render() {
        return (
            <Navigator style={{backgroundColor: '#fff'}}
                       initialRoute={{name: 'Listado'}}
                       renderScene={this.renderScene}
                       configureScene={(route)=>{
                           if(route.sceneConfig){
                               return route.sceneConfig;
                           }
                           return Navigator.SceneConfigs.FloatFromRight
                       }}

                       navigationBar={
                         <Navigator.NavigationBar
                             routeMapper={NavigatorBarRouterMapper}/>
                       }
            />
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
AppRegistry.registerComponent('App', () => App);