import React from 'react';
import { StyleSheet,
         Text,
         View,
         Button } from 'react-native';

export default Header = (props) => {
  return(
    <View style = {styles.container}>
      <Text style={styles.textTitle}>Vacation Time: <Text style={styles.textNumber}>{ props.currentVacation }</Text> Days</Text>
      <Text style={styles.textTitle}>Sick Time: <Text style={styles.textNumber}>{ props.currentSick }</Text> Days</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#CCFFFF',
  },
  textTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  textNumber: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'green'
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
