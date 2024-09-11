import { View, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

import { theme } from "../theme";

var { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ width, height }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail
        size={160}
        thickness={10}
        borderColor={theme.background}
      />
    </View>
  );
}
