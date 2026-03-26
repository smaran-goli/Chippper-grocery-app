import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../../config'
import { ScrollView } from 'react-native'
import logo from "../../assets/logo-removebg.png";
import chipper from "../../assets/chipper.png";
import slogan from "../../assets/slogan.png";
import { useNavigation } from "@react-navigation/native";

const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            firstName,
            lastName,
            email,
            uid: firebase.auth().currentUser.uid,
            profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          })
      })
      .catch((error) => {
        alert(error)
      })
  }


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
        <View style={{marginBottom: '10%'}}>
          <Image source={slogan} />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 30, }}>
          Register Here!
        </Text>
        <View style={{ marginTop: 20 }}>
          <TextInput style={styles.textInput}
            placeholder="First Name"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
          />
          <TextInput style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
          />
          <TextInput style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => registerUser(email, password, firstName, lastName)}
          style={styles.button}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff' }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 5 }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Registration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 20,
  }
});