import React from "react";
import { Tabs } from "expo-router";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Home05Icon,
  Profile02FreeIcons,
  Progress02Icon,
  SpoonAndForkIcon,
} from "@hugeicons/core-free-icons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon
              icon={Home05Icon}
              color={color}
              size={size}
              strokeWidth={1.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Meals"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon
              icon={SpoonAndForkIcon}
              color={color}
              size={size}
              strokeWidth={1.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon
              icon={Progress02Icon}
              color={color}
              size={size}
              strokeWidth={1.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon
              icon={Profile02FreeIcons}
              color={color}
              size={size}
              strokeWidth={1.5}
            />
          ),
        }}
      />
    </Tabs>
  );
}
