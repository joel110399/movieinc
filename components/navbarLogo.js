import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function NavbarLogo() {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate("Search");
  };
  const handleClickHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      <StatusBar style="light" />
      <View className="flex-row justify-between items-center mx-4">
        <TouchableOpacity>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleClickHome()}>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>Movie Inc</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleClick()}>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
