import React, { useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { setTestDeviceIDAsync, AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'expo-ads-admob';

export default function Card({content, navigation}) {
  useEffect(()=>{
    Platform.OS === 'ios' ? AdMobInterstitial.setAdUnitID("ca-app-pub-1912966705500465/3828864254") : AdMobInterstitial.setAdUnitID("ca-app-pub-1912966705500465/2324210893")

    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
        console.log("interstitialDidLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
        console.log("interstitialDidFailToLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
        console.log("interstitialDidOpen")
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
        console.log("interstitialDidClose")
        navigation.navigate('DetailPage',{idx:content.idx})
    });
  },[])
  const goDetail = async () =>{
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
  }

  return (
    <TouchableOpacity style={styles.card} onPress={()=>{goDetail()}}>
      <Image style={styles.cardImage} source={{uri:content.image}}/>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
        <Text style={styles.cardDate}>{content.date}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card:{
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingBottom: 10,
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
})