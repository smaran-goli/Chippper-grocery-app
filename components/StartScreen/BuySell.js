import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import logo from "../../assets/logo-removebg.png";
import chipper from "../../assets/chipper.png";
import slogan from "../../assets/slogan.png";

const BuySell = ({ navigation }) => {
  return (
    <View style={{marginTop: '20%'}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "5%",
          marginLeft: '13%',
        }}
      >
        <Image
          source={logo}
          style={{ width: 75, height: 75, marginRight: "5%" }}
        />
        <Image source={chipper} style={{ marginTop: "3%",  }} />
      </View>
      <View style={{ marginBottom: "15%", marginLeft: '20%' }}>
        <Image source={slogan} />
      </View>
      <View style={styles.fixToText}>
        <TouchableOpacity
          style={styles.buttonBuy}
          onPress={() => {
            navigation.navigate("BuyerHome");
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BuyerSell");
          }}
          style={styles.buttonSell}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BuySell;

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    marginLeft: "12%",
  },
  buttonBuy: {
    marginTop: 50,
    marginRight: 20,
    height: 70,
    width: 150,
    backgroundColor: "#fff",
    borderColor: "#fd841f !important",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonSell: {
    marginTop: 50,
    height: 70,
    width: 150,
    backgroundColor: "#fd841f",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
