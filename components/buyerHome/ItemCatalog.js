import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Item from "./BuyerItem";
import { firebase } from "../../config";

export default function ItemCatalog() {
  const [items, setItems] = useState([]);
  const productsRef = firebase.firestore().collection("products");

  useEffect(async () => {
    productsRef.onSnapshot(
      (querySnapshot) => {
        const newItems = [];
        querySnapshot.forEach((doc) => {
          const {
            image,
            price,
            productName,
            quantityAvailable,
            quantityFifteen,
            quantityFive,
            quantitySold,
            quantityTen,
            seller,
          } = doc.data();
          newItems.push({
            id: doc.id,
            image,
            price,
            productName,
            quantityAvailable,
            quantityFifteen,
            quantityFive,
            quantitySold,
            quantityTen,
            seller,
          });
        });
        setItems(newItems);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
        >
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          >
            <Item
              id={item.id}
              name={item.productName}
              price={item.price}
              ordersPlaced={item.quantitySold}
              quantityAvailable={item.quantityAvailable}
              quantityFive={item.quantityFive}
              quantityTen={item.quantityTen}
              quantityFifteen={item.quantityFifteen}
              priceFive={item.price * 0.95}
              priceTen={item.price * 0.9}
              priceFifteen={item.price * 0.85}
              image={item.image}
              imageHeight={250}
              imageWidth={380}
              seller={item.seller}
            />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}
