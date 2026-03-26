import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { firebase } from '../config';
Icon.loadFont().then();



const ChatScreen = ({ user, route }) => {
    const [messages, setMessages] = useState([]);
    const { uid } = route.params;

    const getAllMessages = async () => {
        const docid = uid > firebase.auth().currentUser.uid ? firebase.auth().currentUser.uid + "-" + uid : uid + "-" + firebase.auth().currentUser.uid
        const msgResponse = await firebase.firestore().collection('Chats')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")
            .get()
        const allTheMsgs = msgResponse.docs.map(docSanp => {
            return {
                ...docSanp.data(),
                createdAt: docSanp.data().createdAt.toDate()
            }
        })
        setMessages(allTheMsgs)
    }

    useEffect(() => {
        getAllMessages()
    }, [messages]);

    const onSend = (msgArray) => {
        const msg = msgArray[0]
        const usermsg = {
            ...msg,
            sentBy: firebase.auth().currentUser.uid,
            sentTo: uid,
            createdAt: new Date()
        }

        setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
        const docid = uid > firebase.auth().currentUser.uid ? firebase.auth().currentUser.uid + "-" + uid : uid + "-" + firebase.auth().currentUser.uid

        firebase.firestore().collection('Chats')
            .doc(docid)
            .collection('messages')
            .add({ ...usermsg, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
    }


    return (
        <GiftedChat
            style={{ flex: 1 }}
            messages={messages}
            onSend={text => onSend(text)}
            user={{
                _id: firebase.auth().currentUser.uid,
            }}
            renderBubble={(props) => {
                return <Bubble
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: "black",
                            color: "#fd841f",

                        }

                    }}
                />
            }}

            renderInputToolbar={(props) => {
                return <InputToolbar {...props}
                    containerStyle={{ borderTopWidth: 1.5, borderTopColor: '#009387' }}
                    textInputStyle={{ color: "black" }}
                />
            }}
        />
    );
};

const styles = StyleSheet.create({
    Contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Container: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    card: {
        width: '100%',
        height: 'auto',
        marginHorizontal: 4,
        marginVertical: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,
        paddingLeft: 10,
        width: 300,
        backgroundColor: 'transparent',
        // borderBottomWidth: 1,
        // borderBottomColor: '#cccccc',
        borderColor: '#fd841f',
        borderWidth: 0.5,
    },
    userText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameText: {
        fontSize: 14,
        fontWeight: '900',
    },
    msgTime: {
        textAlign: 'right',
        fontSize: 11,
        marginTop: -20,
    },
    msgContent: {
        paddingTop: 5,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default ChatScreen;