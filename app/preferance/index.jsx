import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import Input from "../../components/shared/Input";
import Colors from "../../shared/Colors";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Dumbbell01Icon,
  Female02Icon,
  Male02Icon,
  PlusSignSquareIcon,
  WeightScaleIcon,
} from "@hugeicons/core-free-icons";
import Button from "../../components/shared/Button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "expo-router";
import { CalculateCaloriesAI } from "../../services/AiModel";
import { CALORIES_PROMPT } from "../../shared/Prompt";

export default function Preferance() {
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const UpdateUserPref = useMutation(api.Users.UpdateUserPref);

  const onContinue = async () => {
    if (!weight || !height || !gender) {
      Alert.alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const data = {
        uid: user._id,
        weight: weight,
        height: height,
        gender: gender,
        goal: goal,
      };

      const PROMPT = JSON.stringify(data) + CALORIES_PROMPT;
      console.log("Prompt gönderiliyor:", PROMPT);

      const AIResult = await CalculateCaloriesAI(PROMPT);
      console.log("AI Result:", AIResult);

      const AIResp = AIResult.choices[0].message.content;
      console.log("AI Response content:", AIResp);

      const startIndex = AIResp.indexOf("{");
      const endIndex = AIResp.lastIndexOf("}");
      const onlyJson = AIResp.substring(startIndex, endIndex + 1);

      const JSONContent = JSON.parse(onlyJson);
      console.log("Parsed JSON:", JSONContent);

      const result = await UpdateUserPref({
        ...data,
        ...JSONContent,
      });

      console.log("Convex Update Success:", result);

      setUser((prev) => ({
        ...prev,
        ...data,
        ...JSONContent,
      }));

      router.replace("/(tabs)/Home");
    } catch (error) {
      console.error("onContinue HATASI:", error);
      Alert.alert("Something went wrong", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ padding: 20, height: "100%", backgroundColor: Colors.WHITE }}
    >
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
        Tell Us About Yourself
      </Text>
      <Text style={{ textAlign: "center", opacity: 0.5 }}>
        This will help us to create a personalized plan for you.
      </Text>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Input
            placeholder={"e.g 70"}
            label="Weight"
            onChangeText={setWeight}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            placeholder={"e.g 160"}
            label="Height"
            onChangeText={setHeight}
          />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "medium" }}>Gender</Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={() => setGender("Male")}
            style={{
              padding: 7,
              borderColor: gender == "Male" ? Colors.PRIMARY : "black",
              borderWidth: 1,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon icon={Male02Icon} size={30} color={Colors.BLUE} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender("Female")}
            style={{
              padding: 7,
              borderColor: gender == "Female" ? Colors.PINK : "black",
              borderWidth: 1,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon icon={Female02Icon} size={30} color={Colors.PINK} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "medium", fontSize: 18 }}>
          What's your goal? (Optional)
        </Text>
        <TouchableOpacity
          style={[
            styles.goalContainer,
            {
              borderColor: goal == "Weight Loss" ? Colors.PRIMARY : Colors.GRAY,
            },
          ]}
          onPress={() => setGoal("Weight Loss")}
        >
          <HugeiconsIcon icon={WeightScaleIcon} />
          <View>
            <Text>Weight Loss</Text>
            <Text>I want to lose weight and get fit.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.goalContainer,
            {
              borderColor: goal == "Muscle Gain" ? Colors.PRIMARY : Colors.GRAY,
            },
          ]}
          onPress={() => setGoal("Muscle Gain")}
        >
          <HugeiconsIcon icon={Dumbbell01Icon} />
          <View>
            <Text>Muscle Gain</Text>
            <Text>I want to gain muscle and get fit.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.goalContainer,
            {
              borderColor: goal == "Weight Gain" ? Colors.PRIMARY : Colors.GRAY,
            },
          ]}
          onPress={() => setGoal("Weight Gain")}
        >
          <HugeiconsIcon icon={PlusSignSquareIcon} />
          <View>
            <Text>Weight Gain</Text>
            <Text>I want to gain weight and get fit.</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 25 }}>
        {loading ? (
          <Button title="Loading..." disabled={true} />
        ) : (
          <Button title="Continue" onPress={onContinue} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goalSubText: {
    color: Colors.GRAY,
  },
  goalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    marginTop: 20,
  },
});
