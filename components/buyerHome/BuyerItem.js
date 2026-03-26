import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartReducer";

export default function BuyerItem(props) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  let displayPrice = () => {
    if (props.quantityFifteen < props.ordersPlaced) {
      return props.priceFifteen;
    } else if (props.quantityTen < props.ordersPlaced) {
      return props.priceTen;
    } else if (props.quantityFive < props.ordersPlaced) {
      return props.priceFive;
    } else {
      return props.price;
    }
  };

  let nextDiscountQuantity = () => {
    if (props.ordersPlaced < props.quantityFive) {
      return props.quantityFive - props.ordersPlaced;
    } else if (props.ordersPlaced < props.quantityTen) {
      return props.quantityTen - props.ordersPlaced;
    } else if (props.ordersPlaced < props.quantityFifteen) {
      return props.quantityFifteen - props.ordersPlaced;
    } else {
      return 0;
    }
  };

  return (
    <View>
      <Image
        source={{
          uri: props.image,
        }}
        style={{
          width: "100%",
          height: props.imageHeight,
          width: props.imageWidth,
          paddingRight: '10%',
          borderRadius: 10,
        }}
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
            Price: <Text style={{ color: "#5FD068" }}>${displayPrice()}</Text>
          </Text>
          <Text style={{ fontSize: 13, color: "gray" }}>
            Quantity sold: {props.ordersPlaced}{" "}
          </Text>
          <Text style={{ fontSize: 13, color: "gray" }}>
            Quantity to Next Discount: {nextDiscountQuantity()}{" "}
          </Text>
        </View>
        {cart.some((value) => value.id == props.id) ? (
          <Button
            title="Remove from cart"
            onPress={() => removeItemFromCart(props)}
          />
        ) : (
          <TouchableOpacity onPress={() => addItemToCart(props)}>
            <View
              style={{
                borderRadius: 15,
                flexDirection: "column",
                alignItems: "center",
                right: 10
              }}
            >
              <FontAwesome5 name="shopping-cart" size={30} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
