import { View, Text, Image } from "react-native";
import React from "react";
import done from "../assets/done.png";
import BuyerBottomTabs from "../components/buyerHome/BuyerBottomTabs";

export default function OrderSuccessful({ route, navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text
          style={{
            borderWidth: 3,
            borderColor: "#FD841F",
            color: "#FD841F",
            textAlign: "center",
            width: "80%",
            marginTop: "25%",
            fontSize: 17,
            fontWeight: "bold",
            alignItems: "center",
            paddingTop: "2%",
            paddingBottom: "1.8%",
            borderRadius: 10,
          }}
        >
          Thank you for placing an order with us!
        </Text>
        <Image source={done} style={{ marginTop: "20%" }} />
        <Text
          style={{
            color: "#FD841F",
            textAlign: "center",
            width: "80%",
            fontSize: 17,
            fontWeight: "bold",
            alignItems: "center",
            paddingTop: "2%",
            paddingBottom: "1.8%",
          }}
        >
          Your Order ID is: {route.params.orderID}
        </Text>
      </View>
      <View>
        <BuyerBottomTabs navigation={navigation} />
      </View>
    </View>
  );
}
