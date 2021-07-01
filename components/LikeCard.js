import React from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";

export default function LikeCard({content, navigation}) {
  return (
    <View style={styles.cardView}>
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{uri:content.image}}/>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
          <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
          <Text style={styles.cardDate}>{content.date}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonBorder} onPress={()=>{navigation.navigate('DetailPage', content)}}>
          <Text style={styles.buttonText}>자세히 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBorder}>
          <Text style={styles.buttonText}>찜 해제</Text>
        </TouchableOpacity>
      </View>
     </View>
  )
}

const styles = StyleSheet.create({
  cardView: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  card:{
    flexDirection: "row",
    margin: 10,
  },
  cardImage: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardDesc: {
    fontSize: 15,
  },
  cardDate: {
    fontSize: 10,
    color: "#A6A6A6",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
  },
  buttonBorder: {
    borderColor: "#ea6fb0",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "25%",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#ea6fb0",
    fontWeight: "700",
    textAlign: 'center'
  },
})