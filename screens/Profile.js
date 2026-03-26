import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { firebase } from "../config";
import profilePhoto from "../assets/profile-photo.png";
import BuyerBottomTabs from "../components/buyerHome/BuyerBottomTabs";
import SellerBottomTabs from "../components/sellerHome/SellerBottomTabs";
import logo from "../assets/logo-removebg.png";
import chipper from "../assets/chipper.png";

const Profile = ({ route, navigation }) => {
  if (route.params.whichProfile === "buyer") {
    return (
      <>
        <BuyerProfile navigation={navigation} />
        <BuyerBottomTabs navigation={navigation} />
      </>
    );
  } else {
    return (
      <>
        <SellerProfile navigation={navigation} />
        <SellerBottomTabs navigation={navigation} />
      </>
    );
  }
};

export default Profile;

const BuyerProfile = ({ navigation }) => {
  const [name, setName] = useState([]);
  const [pictureUrl, setPictureUrl] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      //  converting image as a blob image
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network Request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      // setting metadata of the image
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      //  upload image on storage

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(getStorage(), "Profile_Pictures/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setPictureUrl(downloadURL);
          });
        }
      );
    };

    if (image != null) {
      uploadImage();
      setImage(null);
    }
  }, [image]);

  useEffect(() => {
    if (pictureUrl != "") {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          profile: pictureUrl,
        })
        .then(() => {
          console.log("User updated!");
        });
    }
  }, [pictureUrl]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // change the password
  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
          setPictureUrl(snapshot.data().profile);
        } else {
          console.log("does not exist");
        }
      });
  }, []);

  return (
    <View style={{ flex: 1, marginTop: "15%" }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={styles.container}>
          <View style={{ position: "absolute", right: 20 }}>
            <TouchableOpacity
              onPress={() => {
                firebase.auth().signOut();
              }}
              style={{
                marginTop: 20,
                height: 40,
                width: 100,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "orange" }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: "4%",
            }}
          >
            <Image
              source={{ uri: pictureUrl }}
              style={{
                height: 120,
                width: 120,
                borderRadius: 40,
                marginBottom: "2%",
              }}
            />
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>
              Hello, {name.firstName}
            </Text>

            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}
              style={styles.button}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: "orange" }}
              >
                Upload a picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ViewOrders")}
              style={styles.button}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: "orange" }}
              >
                Manage Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changePassword();
              }}
              style={styles.button}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: "orange" }}
              >
                Change Password
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '10%'}}>
            <Image source={logo} style={{height: 50, width: 50, marginRight: '3%'}} />
            <Image source={chipper} style={{height: 31, width: 122, marginTop: '2%'}} />
          </View>
          <Text style={{marginTop: '2%', fontWeight: 'bold'}}>Version 1.0.0</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const SellerProfile = ({ navigation }) => {
  const [name, setName] = useState([]);
  const [pictureUrl, setPictureUrl] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      //  converting image as a blob image
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network Request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      // setting metadata of the image
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      //  upload image on storage

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(getStorage(), "Profile_Pictures/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setPictureUrl(downloadURL);
          });
        }
      );
    };

    if (image != null) {
      uploadImage();
      setImage(null);
    }
  }, [image]);

  useEffect(() => {
    if (pictureUrl != "") {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          profile: pictureUrl,
        })
        .then(() => {
          console.log("User updated!");
        });
    }
  }, [pictureUrl]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // change the password
  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
          setPictureUrl(snapshot.data().profile);
        } else {
          console.log("does not exist");
        }
      });
  }, []);

  return (
    <View style={{ flex: 1, marginTop: "15%" }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={styles.container}>
          <View style={{ position: "absolute", right: 20 }}>
            <TouchableOpacity
              onPress={() => {
                firebase.auth().signOut();
              }}
              style={{
                marginTop: 50,
                height: 40,
                width: 100,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "orange" }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: "4%",
            }}
          >
            <Image
              source={{ uri: pictureUrl }}
              style={{
                height: 120,
                width: 120,
                borderRadius: 40,
                marginBottom: "2%",
              }}
            />
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>
              Hello, {name.firstName}
            </Text>

            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}
              style={styles.button}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: "orange" }}
              >
                Upload a picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ViewPickupOrders")}
              style={styles.button}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: "orange" }}
              >
                Manage Pickup Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changePassword();
              }}
              style={styles.button}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 22, color: "orange" }}
              >
                Change Password
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "10%",
              }}
            >
              <Image
                source={logo}
                style={{ height: 50, width: 50, marginRight: "3%" }}
              />
              <Image
                source={chipper}
                style={{ height: 31, width: 122, marginTop: "2%" }}
              />
            </View>
            <Text style={{ marginTop: "2%", fontWeight: "bold" }}>
              Version 1.0.0
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 15,
    height: 50,
    width: 250,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
});
