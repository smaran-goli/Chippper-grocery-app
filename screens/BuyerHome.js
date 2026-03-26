import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeader from "../components/buyerHome/HomeHeader";
import ItemSlider from "../components/buyerHome/ItemSlider";
import BottomTabs from "../components/buyerHome/BuyerBottomTabs";
import ItemCatalog from "../components/buyerHome/ItemCatalog";
import * as Location from "expo-location";

export default function BuyerHome({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      setLocation(location);
      setCity(address[0].city)
    })();
  }, []);
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <HomeHeader cityLocation={city}/>
          <View>
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: "5%",
                marginTop: "5%",
              }}
            >
              Popular Products Near You
            </Text>
          </View>
          <ItemSlider />
          <View>
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: "5%",
              }}
            >
              Recommended Products For You
            </Text>
          </View>
          <ItemSlider />
          <View>
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: "5%",
                marginTop: "5%",
              }}
            >
              Popular Products For You
            </Text>
          </View>
          <ItemCatalog />
        </View>
      </ScrollView>
      <View>
        <BottomTabs navigation={navigation} />
      </View>
    </View>
  );
}
