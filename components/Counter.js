import React, { Component } from 'react';
import { StyleSheet,
         Text,
         TextInput,
         View,
         Button,
         TouchableOpacity,
         Keyboard,
         TouchableWithoutFeedback,
         AsyncStorage,
         Alert} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import SafeAreaView from 'react-native-safe-area-view';



export default class Counter extends Component {
  state = {
    counter: 0.0,
    log: '',
    data: [
      {
        label: 'Vacation Time'
      },
      {
        label: 'Sick Time'
      }
    ]
  }

  logChange = (text) =>{
    this.setState({
      log:text
    })

  }

  changeButton = data => this.setState({ data });
  addCounter = () => this.setState({ counter: this.state.counter += 0.5});
  subtractCounter = () => {
    this.setState({ counter: this.state.counter -= 0.5});
    if(this.state.counter < 0 ){
      this.setState({ counter: 0 });
    }
}
  submitVacation = (e) => {
    if(e === 'add'){
      this.props.updateVacation( this.state.counter, this.state.log );
      this.setState({ log: '' });
      Keyboard.dismiss();
      alert('Vacation Time Successfully Entered!');
    } else {
      this.props.updateVacation( (-1 * this.state.counter), this.state.log );
      this.setState({ log: '' })
      alert('Vacation Time Successfully Entered!');
      Keyboard.dismiss();
    }
  };
  submitSick = (e) => {
    if(e === 'add'){
      this.props.updateSick( this.state.counter, this.state.log );
      this.setState({ log: '' });
      alert('Sick time succesfully updated!');
    } else {
      this.props.updateSick( (-1 * this.state.counter), this.state.log );
      this.setState({ log: '' });
      alert('Sick time succesfully updated!')
    }
  };
  clearCounter = () => {
    return this.setState({counter: 0})
  };
  addVacationOrSick = () => {
    Alert.alert(
      'Add time',
      'Is everthing correct?',
      [
        {text: 'NO', onPress: console.log('No'), style: 'cancel'},
        {text: 'YES', onPress: () => selectedButton === 'Vacation Time' ? (e) => this.submitVacation(e.value = 'add')
                                     : (e) => this.submitSick(e.value = 'add')},
      ]
    );
  }
  removeVacationOrSick = () => {
    Alert.alert(
      'Remove time',
      'Is everthing correct?',
      [
        {text: 'NO', onPress: console.log('No'), style: 'cancel'},
        {text: 'YES', onPress: () => selectedButton === 'Vacation Time' ? (e) => this.submitVacation(e.value = 'remove')
                              : (e) => this.submitSick(e.value = 'remove')},
      ]
    );
  }
  deleteAlert = () => {
    Alert.alert(
      'Are you sure?',
      'Once you delete it cannot be undone!',
      [
        {
          text: 'Cancel',
       onPress: () => console.log('Cancel Pressed'),
       style: 'cancel',
     },
     {text: 'DELETE', onPress: async () => {
       await AsyncStorage.removeItem('vacationTime');
       await AsyncStorage.removeItem('sickTime');
       this.props.update();
     }},
   ]
     );
  }

  render(){
    console.log(this.props.update)
    const navigate  = this.props.navigate;
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
    return(
      <SafeAreaView style={ styles.container }>
          <RadioGroup flexDirection = 'row'
                      radioButtons = { this.state.data }
                      onPress = { this.changeButton } />
        <View style={ styles.counterContainer}>
          <TouchableOpacity
            style = { [styles.buttons, styles.add] }
            onPress = { this.addCounter }
          >
            <Text style={ styles.touchText }>+</Text>
          </TouchableOpacity >
          <View style={ styles.counterView}>
            <Text style={ styles.counterText}>{ this.state.counter }</Text>
          </View>
          <TouchableOpacity
            style = { [styles.buttons, styles.remove] }
            id = "subtract"
            onPress = { this.subtractCounter }
          >
            <Text style={ styles.touchText }>-</Text>
          </TouchableOpacity>
          <View style = { styles.addOrRemove }>
            <TouchableOpacity
              style = { [styles.buttons, styles.add] }
              value = "add"
              onPress = {selectedButton === 'Vacation Time' ? (e) => this.submitVacation(e.value = 'add')
                                           : (e) => this.submitSick(e.value = 'add')}>
              <Text style={styles.touchText}>ADD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = { [styles.buttons, styles.remove] }
              onPress = {selectedButton === 'Vacation Time' ? (e) => this.submitVacation(e.value = 'remove')
                                    : (e) => this.submitSick(e.value = 'remove')}>
              <Text style={styles.touchText}>REMOVE</Text>
            </TouchableOpacity>
          </View>
          <View style={ styles.textView}>
              <TextInput
                style = {styles.textInput}
                onChangeText={text => this.logChange(text)}
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
                value = {this.state.log}
                placeholder = 'Notes (40 char limit)'
                multiline = {true}
                maxLength= {40}
              />
          </View>
          <Button
            title = "clear counter"
            onPress = { this.clearCounter } />
      </View>

      <Button
          title="LOG"
          onPress={() => navigate('Log', {
            vacation: this.props.vacation,
            sick: this.props.sick,
          })}
        />
        <Button   onPress={()=> this.deleteAlert()}
                  title= 'DELETE ALL (cannot be undone)'

                />
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCFFFF',

  },
  addOrRemove:{
    display: 'flex',
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textView:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1.5, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
  },
  textInput:{
    textAlign: 'center',
    height: 150,
    width: 200,
    backgroundColor: 'mintcream',
    borderRadius: 10
  },
  buttons: {
    justifyContent: 'center',
    margin: 5,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1.5, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1.5,

  },
  add: {
    width: '40%',
    padding: 10,
    backgroundColor: 'green',
    textAlign: 'center',
    alignItems: 'center',
  },
  touchText:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  remove:{
    width: '40%',
    padding: 10,
    backgroundColor: 'red',
    textAlign: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 250,
    margin: 10,
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1.5, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  counterView:{
    backgroundColor: 'mintcream',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: 75,
    margin: 10,
    padding: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    fontWeight: 'bold',
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1.5, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,

  },

  counterText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
