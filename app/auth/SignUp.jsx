import { View, Text, Image, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { useRouter } from "expo-router";
import { auth } from "../../services/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UserContext } from "../../context/UserContext";
export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const createNewUser = useMutation(api.Users.CreateNewUser)
  const {user, setUser} = useContext(UserContext);
  const router = useRouter();
  const onSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert("Please fill all fields");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if(user) {
          const result = await createNewUser({
            email: email,
            name: name,
          });

          console.log(result);
          setUser(result);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
        console.log(errorCode, errorMessage);
      });
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
        Create New Account
      </Text>
      <View style={{ marginTop: 20, width: "100%" }}>
        <Input placeholder={"Full Name"} onChangeText={setName} />
        <Input placeholder={"E-mail"} onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ width: "100%", marginTop: 60 }}>
        <Button title={"Sign Up"} onPress={() => onSignUp()} />
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Already have an account?{" "}
          <Text
            style={{ fontWeight: "bold" }}
            onPress={() => router.push("/auth/SignIn")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
}
