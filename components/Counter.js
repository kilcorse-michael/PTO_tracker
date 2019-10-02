import React, { Component } from 'react';
import { StyleSheet,
         Text,
         TextInput,
         View,
         Button,
         TouchableOpacity,
         AsyncStorage } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

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
    console.log(e)
    if(e === 'add'){
      this.props.updateVacation( this.state.counter );
      console.log(e.target)
    } else {
      this.props.updateVacation( (-1) * this.state.counter );
    }
  };
  submitSick = (e) => {
    if(e === 'add'){
      this.props.updateSick( this.state.counter )
    } else {
      this.props.updateSick( (-1) * this.state.counter );
    }
  };
  clearCounter = () => {
    return this.setState({counter: 0})
  };

  render(){
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
    return(
      <View style={ styles.container }>
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
          <View style={ styles.textView}>
            <TextInput
              style = {styles.textInput}
              onChangeText={text => this.logChange(text)}
              value = {this.state.log}
              placeholder = 'Notes (140 char limit)'
              multiline = {true}
              maxLength= {140}
            />
          </View>
        </View>
        <Button
          title = "clear counter"
          onPress = { this.clearCounter } />
        <RadioGroup radioButtons = { this.state.data }
                    onPress = { this.changeButton }
        />
        <TouchableOpacity
          style = { [styles.buttons, styles.add] }
          value = "add"
          onPress = { selectedButton === 'Vacation Time' ? (e) => this.submitVacation(e.value = 'add')
                      : (e) => this.submitSick(e.value = 'add')
                    }
        >
          <Text style={styles.touchText}>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = { [styles.buttons, styles.remove] }
          onPress = { selectedButton === 'Vacation Time' ? (e) => this.submitVacation(e = 'remove')
                      : (e) => this.submitSick(e = 'remove')
                    }
        >
        <Text style={styles.touchText}>REMOVE</Text>
      </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    backgroundColor: '#CCFFFF'

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
    height: 100,
    width: 150,
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
    padding: 10,
    backgroundColor: 'green',
    textAlign: 'center'
  },
  touchText:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  remove:{
    padding: 10,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
    width: 175,
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
