import React, { Component } from 'react';
import { StyleSheet,
         Text,
         View,
         Button,
         AsyncStorage,
         Keyboard,
         TouchableWithoutFeedback } from 'react-native';
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
    if(updateTime < 0){
      updateTime = 0;
    }
    let today = new Date();
    let logEntry = { currentDate: today,
                     removedOrAdded: num,
                     totalVacationTime: updateTime,
                     type: 'Vacation',
                     notes: text };
    await this.saveVacationTime(logEntry);
    await this.getVacationTime();
  };

  updateSick = async (num, text) => {
    let updateTime = this.state.sickTime += num;
    if(updateTime < 0){
      updateTime = 0;
    }
    let today = new Date();
    // let timeStamp = today.toDateString().split(' ').slice(1).join(' ');
    let logEntry = { currentDate: today,
                     removedOrAdded: num,
                     totalSickTime: updateTime,
                     type: 'Sick',
                     notes: text };
    await this.saveSickTime(logEntry);
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

  saveSickTime = async (logEntry) => {
    const existingLogs = await AsyncStorage.getItem('sickTime');
    let newLogs = JSON.parse(existingLogs);
    if(!newLogs){
      newLogs = [];
    }
    newLogs.push(logEntry);
    await AsyncStorage.setItem('sickTime', JSON.stringify(newLogs))
    .then(() => console.log('Success!'))
    .catch(err => alert(err.message))
  };

  getVacationTime = async () => {
    const vTime = await AsyncStorage.getItem('vacationTime');
    if(!vTime){
      this.setState({ vacation: 0});
      return
    }
    const vacationObj = JSON.parse(vTime);
    this.setState({ vacation: vacationObj[vacationObj.length -1].totalVacationTime})
    return
  };

  getSickTime = async () => {
    const sTime = await AsyncStorage.getItem('sickTime');
    if(!sTime){
      this.setState({ sickTime: 0})
      return
    }
    const sickObj = JSON.parse(sTime);
    this.setState({ sickTime: sickObj[sickObj.length -1].totalSickTime})
    return
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

  update = () => {
    this.setState({
      vacation: 0,
      sickTime: 0
    });
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <SafeAreaView style = {styles.container}>
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
          <View>
            <Header currentVacation = { this.state.vacation }
                    currentSick = { this.state.sickTime } />

            <Counter vacation = {this.state.vacation}
                     sick = {this.state.sickTime}
                     navigate = { navigate }
                     updateVacation = { this.updateVacation }
                     updateSick = { this.updateSick }
                     update = { this.update }
                     currentVacation = { this.state.vacation }
                     currentSick = { this.state.sickTime }/>
          </View>
        </TouchableWithoutFeedback>
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
