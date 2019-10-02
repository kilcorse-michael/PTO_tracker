import React from 'react';
import { StyleSheet,
         Text,
         View,
         Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Window from './components/Window';


export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(174, 214, 241, 0.5)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 0
        }}
      />
        <Window />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCFFFF',
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
