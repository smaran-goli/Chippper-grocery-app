import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Button,
    Alert,
  } from "react-native";
  import React from "react";
  
  export default function SellerItem(props) {
    return (
      <>
        <Image
          source={{
            uri: props.image,
          }}
          style={{ width: "100%", height: props.imageHeight, width: props.imageWidth, borderRadius: 10 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{props.name}</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Price: <Text style={{ color: "#5FD068" }}>${props.price}</Text>
            </Text>
            <Text style={{ fontSize: 13, color: "gray" }}>
              Quantity sold: {props.ordersPlaced}{" "}
            </Text>
          </View>
        </View>
      </>
    );
  }
  