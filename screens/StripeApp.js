import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  CardField,
  useConfirmPayment,
  CardForm,
} from "@stripe/stripe-react-native";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../config";
import { removeFromCart } from "../redux/cartReducer";
import logo from "../assets/logo-removebg.png";

//ADD localhost address of your server
const API_URL = "http://10.68.2.133:8006";

const StripeApp = ({ route, navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  let orderID = "";
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  const handleCompleteOrder = () => {
    var products = [];
    cart.forEach((item) => {
      products.push({
        id: item.id,
        quantityAvailable: item.quantityAvailable - item.quantity,
        quantitySold: item.ordersPlaced + item.quantity,
        productName: item.name,
        price: item.price,
        image: item.image,
        seller: item.seller,
        quantityFive: item.quantityFive,
        quantityTen: item.quantityTen,
        quantityFifteen: item.quantityFifteen,
      });
    });

    var order = {
      address: address,
      email: email,
      mobileNumber: mobile,
      products: products,
      orderTotal: route.params.total / 100,
      orderDate: today,
    };

    firebase
      .firestore()
      .collection("orders")
      .add(order)
      .then((snapshot) => {
        order.id = snapshot.id;
        orderID = order.id;
        snapshot.set(order);
      })
      .then(() => {
        products.forEach((product) => {
          firebase
            .firestore()
            .collection("products")
            .doc(product.id)
            .set(product)
            .catch((error) => console.log(error));
        });
      })
      .then(() => {
        cart.forEach((item) => {
          dispatch(removeFromCart(item));
        });
      })
      .then(() => {
        Alert.alert("Order placed successfully!");
        navigation.navigate("orderSuccessful", { orderID: orderID });
      })
      .catch((error) => console.log(error));
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total: route.params.total }),
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email || !address || !mobile) {
      Alert.alert("Please enter all the details");
      return;
    }
    const billingDetails = {
      email: email,
      address: address,
      mobile: mobile,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          handleCompleteOrder();
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <ScrollView>
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
          }}
        >
          Checkout
        </Text>
      </View>
      <View style={styles.container}>
        <View>
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
                    style={{
                      fontSize: 18,
                      color: "#5FD068",
                      fontWeight: "bold",
                    }}
                  >
                    ${item.price}
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Quantity: {item.quantity}
                  </Text>
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
                marginTop: "5%",
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
                {parseFloat(route.params.total) / 100}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <Text
            style={{ fontFamily: "Roboto", fontSize: 20, fontWeight: "bold" }}
          >
            Enter Customer and Delivery Info
          </Text>
        </View>
        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChange={(value) => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Address"
          onChange={(value) => setAddress(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Mobile Number"
          keyboardType="numeric"
          onChange={(value) => setMobile(value.nativeEvent.text)}
          style={styles.input}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2%",
          }}
        >
          <Text
            style={{ fontFamily: "Roboto", fontSize: 20, fontWeight: "bold" }}
          >
            Enter Credit/Debit Card Details
          </Text>
        </View>
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <Button
          onPress={handlePayPress}
          title="Pay"
          disabled={loading}
          style={{ marginBottom: "10%" }}
        />
      </View>
    </ScrollView>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#DDDDDD",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
