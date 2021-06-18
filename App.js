import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//flexDirection: "row"는 좌우 배치
//flexDirection의 default는 column
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerOne}>

      </View>
      <View style={styles.containerTwo}>
        <View style={styles.innerOne}>

        </View>
        <View style={styles.innerTwo}>
          
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  containerOne: {
    flex:1,
    backgroundColor:"red"
  },
  containerTwo:{
    flex:2,
    flexDirection:"row",
    backgroundColor:"yellow"
  },
  innerOne: {
    flex:1,
    backgroundColor:"blue"
  },
  innerTwo: {
    flex:4,
    backgroundColor:"orange"
  }
});