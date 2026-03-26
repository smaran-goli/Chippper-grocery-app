import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";
import { ScrollView } from "react-native";
import logo from "../../assets/logo-removebg.png";
import chipper from "../../assets/chipper.png";
import slogan from "../../assets/slogan.png";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  // forget password
  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5%",
          }}
        >
          <Image
            source={logo}
            style={{ width: 75, height: 75, marginRight: "5%" }}
          />
          <Image source={chipper} style={{ marginTop: "3%" }} />
        </View>
        <View style={{marginBottom: '15%'}}>
          <Image source={slogan} />
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Login</Text>
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "#fff" }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registration")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Don't have an account? Sign up here
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            forgetPassword();
          }}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 70,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "#000",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
