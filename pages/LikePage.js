import React, {useState, useEffect} from "react"
import {StyleSheet, ScrollView} from "react-native";
import LikeCard from '../components/LikeCard';
import Loading from '../components/Loading';
import {firebase_db} from '../firebaseConfig';
import Constants from 'expo-constants';

export default function LikePage({navigation}) {

  const [tip, setTip] = useState([])
  const [ready,setReady] = useState(true)

  useEffect(()=>{
    navigation.setOptions({
      title: "꿀팁 찜",
    })
    const user_id = Constants.installationId;
    firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
      console.log("파이어베이스에서 데이터 가져왔습니다!!")
      let tip = snapshot.val();
      console.log(tip)
      let tip_list = Object.values(tip)
      if(tip_list.length > 0){
          setTip(tip_list)
          setReady(false)
      }
    })
  },[])

  const reload = () => {
    const user_id = Constants.installationId;
    firebase_db.ref('/like/'+user_id).once('value').then((snapshot) => {
      if(snapshot.exists()){
        let tip = snapshot.val();
        let tip_list = Object.values(tip)
        setTip(tip_list)
      }else{
        setReady(true)
        setTip([])
      }
    })
}

  return ready ? <Loading /> : (
    <ScrollView style={styles.cardContainer}>
         { 
          tip.map((tipItems,i)=>{
            return ( <LikeCard content={tipItems} reload={reload} key={i} navigation={navigation}/> )
          })
         }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
  },
})