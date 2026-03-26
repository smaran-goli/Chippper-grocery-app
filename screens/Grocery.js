import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import BuyerBottomTabs from "../components/buyerHome/BuyerBottomTabs";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartReducer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import logo from "../assets/logo-removebg.png";
const API_URL = "http://10.68.11.73:8004";

const Grocery = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const displayTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      console.log("item", item);
      if (item.ordersPlaced + item.quantity >= item.quantityFifteen) {
        total += item.priceFifteen * item.quantity;
      } else if (item.ordersPlaced + item.quantity >= item.quantityTen) {
        total += item.priceTen * item.quantity;
      } else if (item.ordersPlaced + item.quantity >= item.quantityFive) {
        total += item.priceFive * item.quantity;
      } else {
        total += item.price * item.quantity;
      }
    });
    return total;
  };

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    if (item.quantity == 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };

  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, [cart]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handleCheckoutClick = () => {
    navigation.navigate("StripeApp", { total: displayTotal() * 100 });
  };

  return (
    <View style={{ flex: 1 }}>
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
          Cart
        </Text>
      </View>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {cart.map((item, index) => (
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
              key={index}
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={{ height: 100, width: 100 }}
              />
              <View style={{ marginLeft: "5%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: "3%",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{ fontSize: 18, color: "#5FD068", fontWeight: "bold" }}
                >
                  ${item.price}
                </Text>
                <TouchableOpacity
                  style={{ position: "absolute", right: 1, bottom: 5 }}
                  onPress={() => increaseQuantity(item)}
                >
                  <FontAwesome5 name="plus" size={20} />
                </TouchableOpacity>
                <View
                  style={{
                    position: "absolute",
                    right: 25,
                    bottom: 5,
                    marginRight: "2%",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 50,
                    bottom: 5,
                    marginRight: "4%",
                  }}
                  onPress={() => decreaseQuantity(item)}
                >
                  <FontAwesome5 name="minus" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              paddingTop: "10%",
              paddingBottom: "5%",
              marginBottom: "1%",
              paddingLeft: "2%",
              paddingRight: "30%",
              marginTop: "10%",
            }}
          >
            <Text
              style={{
                position: "absolute",
                right: 70,
                fontSize: 20,
                fontWeight: "bold",
                top: 15,
              }}
            >
              Order Total: $
            </Text>
            <Text
              style={{
                position: "absolute",
                right: 35,
                fontSize: 20,
                fontWeight: "bold",
                color: "red",
                top: 15,
              }}
            >
              {displayTotal()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: "2%",
              paddingLeft: "14%",
              marginBottom: "4%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleCheckoutClick();
              }}
              style={{
                marginTop: 10,
                height: 50,
                width: 300,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: "orange" }}
              >
                Continue to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View>
        <BuyerBottomTabs navigation={navigation} />
      </View>
    </View>
  );
};

export default Grocery;
