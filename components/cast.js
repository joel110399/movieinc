import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { image342, noPicActor } from "../api/moviedb";

export default function Cast({ cast, navigation }) {
  return (
    <View className="my-6">
      <Text className="text-white mx-4 mb-5 text-2xl">Actores</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", person)}
              >
                <Image
                  className="rounded-2xl h-32 w-24"
                  source={{ uri: image342(person?.profile_path) || noPicActor }}
                />
                <Text className="text-white text-md mt-1">
                  {person?.name.length > 12
                    ? person?.name.slice(0, 10) + "..."
                    : person?.name}
                </Text>
                <Text className=" text-neutral-400 text-md mt-1">
                  {person?.character.length > 15
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
