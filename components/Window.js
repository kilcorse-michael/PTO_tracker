import React, { Component } from 'react';
import { StyleSheet,
         Text,
         View,
         Button,
         AsyncStorage } from 'react-native';
import Counter from './Counter';
import Header from './Header';


export default class Window extends Component {
  state = {
    vacation: 0,
    sickTime: 0
  }

  componentDidMount(){
   this.getVacationTime()
   this.getSickTime();
  }


  updateVacation = async (num) => {
    let updateTime = this.state.vacation += num;
    await this.deleteVacation();
    await this.saveVacationTime(updateTime);
    await this.getVacationTime();
  };

  updateSick = async (num) => {
    let updateTime = this.state.sickTime += num;
    await this.deleteSickTime();
    await this.saveSickTime(updateTime);
    await this.getSickTime();
  };

  saveVacationTime = (time) => {
    let stringTime = JSON.stringify(time);
    AsyncStorage.setItem('vacationTime', stringTime)
    .catch(err => alert(err.message))
    }

  saveSickTime = async (time) => {
    let stringTime = JSON.stringify(time);
    AsyncStorage.setItem('sickTime', stringTime)
    .catch(err => alert(err.message))
    }

  getVacationTime = () => {
    let vTime = '';
    vTime = AsyncStorage.getItem('vacationTime')
    .then((vTime) => {
      if(vTime !== null){
        parsedVtime = JSON.parse(vTime);
        this.setState({vacation: parsedVtime})
      }
    })
    .then((parsedVtime) => { return parsedVtime} )
    .catch(err => alert(err.message));
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
    return(
      <View style = {styles.container}>
        <Header currentVacation = { this.state.vacation }
                currentSick = { this.state.sickTime } />

        <Counter updateVacation = { this.updateVacation }
                 updateSick = { this.updateSick }
                 currentVacation = { this.state.vacation }
                 currentSick = { this.state.sickTime }/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
container: {
  flex: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#CCFFFF'

  }

});
