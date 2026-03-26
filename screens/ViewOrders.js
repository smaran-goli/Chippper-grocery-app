import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import BuyerBottomTabs from "../components/buyerHome/BuyerBottomTabs";
import logo from "../assets/logo-removebg.png";

export default function ViewOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const ordersRef = firebase.firestore().collection("orders");

  useEffect(async () => {
    ordersRef.onSnapshot(
      (querySnapshot) => {
        const newOrders = [];
        querySnapshot.forEach((doc) => {
          const {
            address,
            email,
            mobileNumber,
            orderDate,
            orderTotal,
            products,
          } = doc.data();
          newOrders.push({
            id: doc.id,
            address,
            email,
            mobileNumber,
            orderDate,
            orderTotal,
            products,
          });
        });
        setOrders(newOrders);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <View style={{ flex: 1, }}>
    <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "3%",
          backgroundColor: "#fff",
          paddingBottom: "3%",
        }}
        onPress={() => navigation.navigate("BuyerHome")}
      >
        <Image
          source={logo}
          style={{ width: 35, height: 35, marginRight: "2%" }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Chipper</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            marginTop: "3%",
            fontWeight: "bold",
            fontSize: 32,
            marginBottom: "5%",
          }}
        >
          View Orders
        </Text>
      </View>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {orders.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ManageOrder", { item })}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  paddingTop: "5%",
                  paddingBottom: "5%",
                  marginBottom: "1%",
                  paddingLeft: "2%",
                  paddingRight: "30%",
                }}
              >
                <Image
                  source={{
                    uri: item.products[0].image,
                  }}
                  style={{ height: 100, width: 100 }}
                />
                <View style={{ marginLeft: "5%" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginBottom: "3%",
                      fontWeight: "bold",
                      color: "#B2B2B2",
                    }}
                  >
                    Order ID: {item.id}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Items in order:{" "}
                    {item.products.map((product) => product.productName + ", ")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: "2%",
                      fontWeight: "bold",
                      color: "#B2B2B2",
                      marginTop: "2%",
                    }}
                  >
                    Order Date: {item.orderDate}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#5FD068",
                      fontWeight: "bold",
                    }}
                  >
                    ${item.orderTotal}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View>
        <BuyerBottomTabs navigation={navigation} />
      </View>
    </View>
  );
}
