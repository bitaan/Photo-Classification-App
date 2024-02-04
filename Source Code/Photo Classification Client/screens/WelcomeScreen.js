import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";

const WelcomeScreen = ({ navigation }) => {
  let cameraRef = useRef();
  const [hasCameraPermsission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [openCamera, setOpenCamera] = useState(false);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  });

  const takePicture = async () => {
    setOpenCamera(false);
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (hasCameraPermsission === false) {
    return <Text>No access to Camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PhotoApp</Text>
      <Button
        title="Take Picture"
        onPress={() => navigation.navigate("Camera")}
      ></Button>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
  },
});
