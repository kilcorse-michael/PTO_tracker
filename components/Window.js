import React, { Component } from 'react';
import { StyleSheet,
         Text,
         View,
         Button,
         AsyncStorage } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Counter from './Counter';


export default class Window extends Component {
  state = {
    vacation: 0,
    sickTime: 0
  }

  async componentDidMount(){
    await this.getVacationTime();
    await this.getSickTime();
  }


  updateVacation = async (num, text) => {
    let updateTime = this.state.vacation += num;
    let today = new Date();
    await this.deleteVacation();
    let timeStamp = today.toDateString().split(' ').slice(1).join(' ');
    let logEntry = { currentDate: timeStamp,
                     removedOrAdded: '+/-' + ' ' + num,
                     totalVacationTime: updateTime,
                     notes: text };
    await this.saveVacationTime(logEntry);
    await this.getVacationTime();
  };

  updateSick = async (num, text) => {
    let updateTime = this.state.sickTime += num;
    await this.deleteSickTime();
    await this.saveSickTime(updateTime);
    await this.getSickTime();
  };

  saveVacationTime = async (logEntry) => {
    const existingLogs = await AsyncStorage.getItem('vacationTime');
    let newLogs = JSON.parse(existingLogs);
    if(!newLogs){
      newLogs = [];
    }
    newLogs.push(logEntry);
    await AsyncStorage.setItem('vacationTime', JSON.stringify(newLogs))
    .then(() => console.log('Success!'))
    .catch(err => alert(err.message))
  };

  saveSickTime = async (time) => {
    let stringTime = JSON.stringify(time);
    AsyncStorage.setItem('sickTime', stringTime)
    .catch(err => alert(err.message))
    }

  getVacationTime = async () => {
    const vTime = await AsyncStorage.getItem('vacationTime');
    if(!vTime){
      this.setState({ vacation: 0})
      return
    }
    const vacationObj = JSON.parse(vTime);
    this.setState({ vacation: vacationObj[vacationObj.length -1].totalVacationTime})
    return
  };

  getSickTime = async () => {
    let sTime = '';
    sTime = AsyncStorage.getItem('sickTime')
    .then((sTime) => {
      if(sTime !== null){
        parsedStime = JSON.parse(sTime);
        this.setState({sickTime: parsedStime})
      }
    })
    .then((parsedVtime) => { return parsedVtime} )
    .catch(err => alert(err.message));
  };

  deleteVacation = async () =>{
    try{
      await AsyncStorage.removeItem('vacationTime');
    }catch(err){
      alert(err.message);
    }
  };

  deleteSickTime = async () =>{
    try {
        await AsyncStorage.removeItem('sickTime');
    } catch(err){
      alert(err.message);
    }
  };


  render(){
    const {navigate} = this.props.navigation;
    return(
      <SafeAreaView style = {styles.container}>
        <Header currentVacation = { this.state.vacation }
                currentSick = { this.state.sickTime } />

        <Counter vacation = {this.state.vacation}
                 sick = {this.state.sickTime}
                 navigate = { navigate }
                 updateVacation = { this.updateVacation }
                 updateSick = { this.updateSick }
                 currentVacation = { this.state.vacation }
                 currentSick = { this.state.sickTime }/>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#CCFFFF'

  }

});
