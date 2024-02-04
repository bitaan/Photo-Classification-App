import { Button, StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const UploadScreen = ({ route, navigation }) => {
  console.log("route", route.params.base64);
  //   const [base64image,setBase64Image] = useState(null)
  const base64image = route.params.base64;
  const [upload, setUpload] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "People", value: "People" },
    { label: "Animal", value: "Animal" },
    { label: "Object", value: "Object" },
    { label: "Misc", value: "Misc" },
  ]);

  const uploadHandler = async () => {
    const data = {
      category: value,
      image: base64image,
    };
    // console.log(data);

    const response = await fetch("http://192.168.0.225:4000/save_image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    // console.log(json);
    setUpload(true);
    Alert.alert("The number is " + json['number']);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Captured Image:</Text>
      <Image
        style={{ height: 200, width: 200, marginBottom: 10 }}
        source={{ uri: "data:image/jpg;base64," + base64image }}
      ></Image>
      <Button
        style={{ marginTop: 30 }}
        title="Upload Image"
        onPress={uploadHandler}
      ></Button>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
  dropdown: {
    width: "70%",
    alignSelf: "center",
    margin: 10,
  },
});
