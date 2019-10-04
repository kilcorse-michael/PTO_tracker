import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import Header from './Header';

export default class Log extends Component{

  state = {
    logData: [],
  }

  async componentDidMount(){
    const response = await AsyncStorage.getItem('vacationTime');
    const parsed = JSON.parse(response);
    this.setState({logData: parsed});
    console.log(this.state.logData)
}




  render(){
    return(
      <View style = {styles.container}>
        <Header currentVacation = {this.props.navigation.getParam('vacation')}
                currentSick = { this.props.navigation.getParam('sick')}
        />
        <View style={styles.logBox}>
        {this.state.logData.map((item, key)=>{
          return <View style = {styles.logTable} key={key}>
                 <View style= {styles.logItems}><Text key={key + ' dateTitle'}>DATE:</Text><Text key={key + ' date'}>{item.currentDate}</Text></View>
                 <View style= {styles.logItems}><Text key={key + ' remOrAddTitle'}>DAYS:</Text><Text key={key+' remOrAdd'}>{item.removedOrAdded}</Text></View>
                 <View style= {styles.logItems}><Text key={key + ' notesTitle'}>NOTES:</Text><Text key={key+' notes'}>{item.notes}</Text></View>
                 </View>
        })}
        </View>
        <Button
            title="COUNTER"
            onPress={() => this.props.navigation.navigate('Window')}
          />
      </View>

    );
  }
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#CCFFFF'

},

logTable: {
  flex: 0,
  textAlign: 'center',
  margin: 5,
  flexDirection: 'row',
  flexWrap: 'wrap',


},

logItems:{
  width: '25%'
},

logBox:{
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'black',
  borderRadius: 10,
  borderWidth: 3,
  height: 500,
  width: 400,
  backgroundColor: 'mintcream',
  shadowColor: '#000',
  shadowOffset: { width: 1.5, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
}


});
