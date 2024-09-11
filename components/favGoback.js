import { TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Importación de Ionicons

const topMargin = Platform.OS == "ios" ? "" : "mt-3";

export default function FavGoback() {
  const navigation = useNavigation();
  const [isFave, toggleFave] = useState(false);

  return (
    <SafeAreaView
      className={
        "absolute z-20 w-full flex-row justify-between items-center px-4" +
        topMargin
      }
    >
      {/* Botón para retroceder */}
      <TouchableOpacity
        style={styles.background}
        className="rounded-xl p-1"
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Botón de favorito */}
      <TouchableOpacity onPress={() => toggleFave(!isFave)}>
        {isFave ? (
          <Icon name="heart" size={35} color="red" />
        ) : (
          <Icon name="heart-outline" size={35} color={theme.background} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
