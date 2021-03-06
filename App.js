
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Image} from 'react-native';
import {styles} from "./src/styles/styles";
import obd2 from 'react-native-obd2';
import api from "./src/services/api"
//import Routes from "./src/routes/routes"
//const obd2 = require('react-native-obd2');

export default class App extends Component {
  
  state = {
   response :[]
    }
  componentDidMount(){
    this.ListDate();
   // obd2.setMockUpMode
    //obd2.setMockUpMode(true);
    //obd2.ready();
    //obd2.getBluetoothDeviceNameList()
    // .then((nameList) => console.log('Bluetooth device list : ' + JSON.stringify(nameList)))
   //   .catch((e) => console.log('Get device name error : ' + e));''
  }
  ListDate = async () => {
    const response = await api.get("/list/10");
    console.log(response);
    
    this.setState({response:response.data});
    console.log(`\nstate.response:\n`+this.state.response);
    
    
  };
  renderItem = ({item})=>(
    <View style ={styles.itemContainer}>
      <Text style={styles.IdCar} >{item.idReadingFromCar}</Text>
      <Text style={styles.predicted}>{item.predictedValue}</Text>
      <Text style={styles.predicted}>{item.data}</Text>
    </View>
  )
  render() {
    return (
    <View style= {styles.container} >
    {/* {
      this.state.response.map((item) => {
        return (
          <Text key={item.idReadingFromCar}>
            {item.idReadingFromCar}
            {`\n`+item.speed}
          </Text>
          )
      })
    } */}
    <FlatList
          contentContainerStyle = {styles.list}
          data = {this.state.response}
          keyExtractor={(item) => item.idReadingFromCar}
          renderItem= {this.renderItem}
          />
    </View>
    );
  }
}


