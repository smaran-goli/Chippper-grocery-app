import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import logo from "../assets/logo-removebg.png";

import BuyerBottomTabs from "../components/buyerHome/BuyerBottomTabs";

const Chat = ({ navigation }) => {
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    const querySanp = await firebase
      .firestore()
      .collection("users")
      .where("uid", "!=", firebase.auth().currentUser.uid)
      .get();
    const allUsers = querySanp.docs.map((docSnap) => docSnap.data());
    setUsers(allUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

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
      <ScrollView>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <ScrollView>
            <View style={styles.Contain}>
              <FlatList
                data={users}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Chats', { name: item.name, uid: item.uid })} >
                    <View style={styles.card} >
                      <Image style={styles.userImageST} source={{ uri: item.profile }} />
                      <View style={styles.textArea}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.msgContent}>{item.email}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View>
        <BuyerBottomTabs navigation={navigation} />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  Contain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    height: "auto",
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textArea: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  userText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900',
  },
  msgTime: {
    textAlign: "right",
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
