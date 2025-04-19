import { Dimensions, Image, Text, View } from "react-native";
import Colors from "../shared/Colors";
import Button from "../components/shared/Button";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      console.log(userInfo?.email);

      const userData = await convex.query(api.Users.GetUser, {
        email: userInfo?.email,
      });
      setUser(userData);
      router.replace('/(tabs)/Home');
    });
    return () => unsubscribe();
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("./../assets/images/landing.jpg")}
        style={{ width: "100%", height: Dimensions.get("screen").height }}
      />
      <View
        style={{
          position: "absolute",
          height: Dimensions.get("screen").height,
          backgroundColor: "#0707075e",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("./../assets/images/logo.png")}
          style={{ width: 350, height: 350, marginTop: 150 }}
        />
        <Text style={{ fontWeight: "bold", color: Colors.WHITE, fontSize: 30 }}>
          AI Diet Planner
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontSize: 20,
            marginTop: 15,
            marginHorizontal: 20,
            opacity: 0.8,
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </Text>
      </View>
      <View
        style={{ position: "absolute", width: "100%", bottom: 25, padding: 20 }}
      >
        <Button
          title={"Get Started"}
          onPress={() => router.push("/auth/SignIn")}
        />
      </View>
    </View>
  );
}
