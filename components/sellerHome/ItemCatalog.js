import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";
import SellerItem from "./SellerItem";
import {firebase} from '../../config';

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
            quantitySold,
            seller,
          } = doc.data();
          newItems.push({
            id: doc.id,
            image,
            price,
            productName,
            quantityAvailable,
            quantitySold,
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
              <SellerItem
                name={item.productName}
                price={item.price}
                ordersPlaced={item.quantitySold}
                image={item.image}
                imageHeight={250}
                imageWidth={380}
              />
            </View>
          </TouchableOpacity>
        ))}
    </>
  );
}