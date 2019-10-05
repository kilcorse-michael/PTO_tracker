import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import Header from './Header';

export default class Log extends Component{

  state = {
    logData: [],
  }

  async componentDidMount(){
    let logArr = [];
    const response = await AsyncStorage.multiGet(['vacationTime', 'sickTime'],(err, stores) => {
      stores.map((result, i, store) => {
      // get at each store's key/value so you can work with it
      let key = store[i][0];
      let value = store[i][1];
    });
  });
    const parsedVacation = JSON.parse(response[0][1]);
    const parsedSickTime = JSON.parse(response[1][1]);
    this.checkForNullAndSet(parsedVacation, parsedSickTime);
    console.log(this.state.logData)
}

    checkForNullAndSet = (vacation, sick) => {
      if(vacation == null || sick == null){
        this.setState.logData = [];
      } else{
        const totalParsed = vacation.concat(sick);
        const sortedArr = this.sortByDate(totalParsed);
        const readDate = this.readableDate(sortedArr);
        this.setState({logData: readDate});
      }
      return; 
    }
    readableDate = (log) => {
      for(let i = 0; i < log.length; i++ ){
        log[i].currentDate = new Date(log[i].currentDate).toDateString().split(' ').slice(1).join(' ');
      }
      return log;

    }
    sortByDate = (totalParsed) => {
      let naturalArr = [];
      for(let i in totalParsed){
        naturalArr.push(totalParsed[i])
      }
      const sorted = naturalArr.sort((a, b)=> new Date(a.currentDate) - new Date(b.currentDate))
      return sorted
    }


  render(){
    return(
      <SafeAreaView style = {styles.container}>
        <Header currentVacation = {this.props.navigation.getParam('vacation')}
                currentSick = { this.props.navigation.getParam('sick')}
        />
        <View style={styles.logBox}>
          <ScrollView>
            {this.state.logData.map((item, key)=>{
              return <View style = {styles.logTable} key={key}>
                     <View style= {styles.logItems}><Text key={key + ' dateTitle'}>DATE:</Text><Text key={key + ' date'}>{item.currentDate}</Text></View>
                     <View style= {styles.logItems}><Text key={key + ' remOrAddTitle'}>DAYS:</Text><Text key={key+' remOrAdd'}>{item.removedOrAdded}</Text></View>
                     <View style= {styles.logItems}><Text key={key + ' notesTitle'}>NOTES:</Text><Text key={key+' notes'}>{item.notes}</Text></View>
                     <View style= {styles.logItems}><Text key={key + ' typeTitle'}>TYPE:</Text><Text key={key+' type'}>{item.type}</Text></View>
                     </View>
            })}
          </ScrollView>
        </View>
        <Button
            title="COUNTER"
            onPress={() => this.props.navigation.navigate('Window')}
          />
      </SafeAreaView>

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
  margin: 2,
  flexDirection: 'row',
  flexWrap: 'wrap',


},

logItems:{
  width: '20%',
  margin: 5
},

logBox:{
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'black',
  borderRadius: 10,
  borderWidth: 3,
  height: 500,
  width: 325,
  backgroundColor: 'mintcream',
  shadowColor: '#000',
  shadowOffset: { width: 1.5, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
}


});
