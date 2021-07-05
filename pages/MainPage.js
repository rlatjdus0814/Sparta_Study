import React, { useState, useEffect } from 'react';
import main from '../assets/main.png';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import axios from 'axios'
import { firebase_db } from '../firebaseConfig';
import { setTestDeviceIDAsync, AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'expo-ads-admob';

export default function MainPage({navigation, route}) {
  console.disableYellowBox = true;
  const [state,setState] = useState([])
  const [cateState,setCateState] = useState([])
  const [ready,setReady] = useState(true)
  const [weather, setWeather] = useState({
    temp : 0,
    condition : ''
  })

  useEffect(()=>{
    setTimeout(()=>{
      navigation.setOptions({
        title:'나만의 꿀팁'
      })
      firebase_db.ref('/tip').once('value').then((snapshot) => {
        console.log("파이어베이스에서 데이터 가져왔습니다!!")
        let tip = snapshot.val();
        setState(tip)
        setCateState(tip)
        getLocation()
        setReady(false)
      });
    },1000)
  },[])

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const locationData= await Location.getCurrentPositionAsync();
      const latitude = locationData['coords']['latitude']
      const longitude = locationData['coords']['longitude']
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const temp = result.data.main.temp; 
      const condition = result.data.weather[0].main
      
      console.log(result)
      console.log(temp)
      console.log(condition)

      setWeather({
        temp, condition
      })

    } catch (error) {
      Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?");
    }
  }

  const category = (cate) => {
    if(cate == "전체보기"){
        setCateState(state)
    }else{
      setCateState(state.filter((d)=>{
        return d.category == cate
      }))
    }
  }

  return ready ? <Loading/> : (
    <ScrollView style={styles.container}>
      <StatusBar style="black" />
        <Text style={styles.weather}>오늘의 날씨: {weather.temp + '°C   ' + weather.condition} </Text>
      <TouchableOpacity style={styles.aboutButton} onPress={()=>{navigation.navigate('AboutPage')}}>
        <Text style={styles.aboutButtonText}>소개 페이지</Text>
      </TouchableOpacity>
      <Image style={styles.mainImage} source={main}/>
      <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
        <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton04} onPress={()=>{category('꿀팁 찜'); navigation.navigate('LikePage');}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
         { 
          cateState.map((content,i)=>{
            return ( <Card content={content} key={i} navigation={navigation}/> )
          })
         }
         {Platform.OS === 'ios' ? (
            <AdMobBanner
              bannerSize="fullBanner"
              servePersonalizedAds={true}
              adUnitID="ca-app-pub-1912966705500465/9461105516"
              style={styles.banner}
            />
          ) : (
            <AdMobBanner
              bannerSize="fullBanner"
              servePersonalizedAds={true}
              adUnitID="ca-app-pub-1912966705500465/2620364999"
              style={styles.banner}
              />
          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  weather:{
    alignSelf:"flex-end",
    paddingRight:20,
    marginTop: 20,
  },
  aboutButton: {
    backgroundColor: "pink",
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 20,
  },
  aboutButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  mainImage: {
    width:'90%',
    height:200,
    borderRadius:10,
    marginTop:20,
    alignSelf:"center",
  },
  middleContainer:{
    marginTop:20,
    marginLeft:10,
    height:60,
  },
  middleButtonAll: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#20b2aa",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton01: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fdc453",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7,
  },
  middleButton02: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fe8d6f",
    borderRadius:15,
    margin:7,
  },
  middleButton03: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#9adbc5",
    borderRadius:15,
    margin:7,
  },
  middleButton04: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#f886a8",
    borderRadius:15,
    margin:7,
  },
  middleButtonTextAll: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },
  middleButtonText: {
    color:"#fff",
    fontWeight:"700",
    textAlign:"center",
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10,
  },
});