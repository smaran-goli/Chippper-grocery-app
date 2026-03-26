import React from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from './styles';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Msg = ({ incomingMsg, sentMsg, msg }) => {
  return (
    <View>
      {incomingMsg && (
        <View style={styles.incomingMsgBox}>
          <FontAwesome5
            name="robot"
            size={25}
            style={{
              marginBottom: 3,
              alignSelf: "center",
              marginRight: 10,
            }}
          />
          <Text style={styles.incomingMsgText}>{msg}</Text>
        </View>
      )}
      {sentMsg && (
        <Text style={styles.sentMsgBox}>
          <Text style={styles.sentMsgText}>{msg}</Text>
        </Text>
      )}
    </View>
  );
};

export default Msg;