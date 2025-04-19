import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { useRouter } from "expo-router";
export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert("Please fill all fields");
      return;
    }
  };
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Image
        style={{ width: 350, height: 350, position: "absolute", top: 50 }}
        source={require("../../assets/images/logo.png")}
      />
      <Text style={{ marginTop: 380, fontWeight: "bold", fontSize: 20 }}>
        Welcome Back
      </Text>
      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder={"E-mail"} onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ width: "100%", marginTop: 60 }}>
        <Button title={"Sign In"} onPress={() => onSignIn()} />
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Don't have an account?{" "}
          <Text
            style={{ fontWeight: "bold" }}
            onPress={() => router.push("/auth/SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
