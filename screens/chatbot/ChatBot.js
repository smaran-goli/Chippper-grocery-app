import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Msg from "./msg";
import { data } from "./data";
import logo from "../../assets/logo-removebg.png";
import BuyerBottomTabs from "../../components/buyerHome/BuyerBottomTabs";

let chats = [];
const ChatBot = ({ navigation }) => {
  const [msg, setMsg] = useState("");
  const [chatList, setChatList] = useState([]);

  const getAnswer = (q) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].question.includes(q.toLowerCase())) {
        chats = [...chats, { msg: data[i].answer, incomingMsg: true }];
        setChatList([...chats].reverse());
        return;
      }
    }

    chats = [
      ...chats,
      { msg: "Didn't recognize your question", incomingMsg: true },
    ];
    setChatList([...chats].reverse());
    return;
  };

  const onSendMsg = () => {
    chats = [...chats, { msg: msg, sentMsg: true }];
    setChatList([...chats].reverse());
    setTimeout(() => {
      getAnswer(msg);
    }, 1000);
    setMsg("");
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
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{marginTop: '3%', fontWeight: 'bold', fontSize: 32}}>ChatBot</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ height: "87%", bottom: "3%" }}
          inverted={true}
          keyExtractor={(_, index) => index.toString()}
          data={chatList}
          renderItem={({ item }) => (
            <Msg
              incomingMsg={item.incomingMsg}
              msg={item.msg}
              sentMsg={item.sentMsg}
            />
          )}
        />
      </View>
      <View>
        <View style={styles.typeMsgContainer}>
          <TextInput
            style={styles.typeMsgBox}
            value={msg}
            placeholder="Type Here ..."
            onChangeText={(val) => setMsg(val)}
          />
          <TouchableOpacity
            style={[
              styles.sendBtn,
              { backgroundColor: msg ? "orange" : "grey" },
            ]}
            disabled={msg ? false : true}
            onPress={() => onSendMsg()}
          >
            <Text style={styles.sendTxt}>send</Text>
          </TouchableOpacity>
        </View>
        <BuyerBottomTabs navigation={navigation} />
      </View>
    </View>
  );
};

export default ChatBot;
