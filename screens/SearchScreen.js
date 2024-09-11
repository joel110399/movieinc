import React, { useCallback, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { searchMovies, image500, noPicPoster } from "../api/moviedb";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles, theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import Loading from "../components/loading";
import { debounce } from "lodash";

var { width, height } = Dimensions.get("window");

const SearchScreen = ({ media }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        // get media type of all data
        media = "movie";
        if (data && data.results) {
          setResults(data.results);
        }
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <View
      contentContainerStyle={{ paddingBottom: 40 }}
      className="flex-1 bg-slate-800"
    >
      <View className="w-full ">
        <SafeAreaView className="absolute w-full flex-row justify-between items-center">
          {/* go back button */}
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl my-3 ml-2 p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
          </TouchableOpacity>
          <View className="w-80 mx-5 flex-row justify-between">
            <TextInput
              className="pl-4 flex-1 my-3 mr-4"
              style={{
                height: 40,
                borderRadius: 15,
                borderColor: theme.text,
                borderWidth: 1,
                marginBottom: 12,
                padding: 10,
                color: "white",
              }}
              placeholder="Buscar..."
              placeholderTextColor={"grey"}
              onChangeText={handleDebounce}
            />
          </View>
        </SafeAreaView>
      </View>
      {/* movie results */}
      {loading ? (
        <Loading />
      ) : results.length >= 0 ? (
        <ScrollView
          showsVerticalSCrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 15 }}
          className="space-y-3 mt-28 pl-4 pr-4"
        >
          <Text className="text-white font-semibold ml-1">
            Resultados ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", { item, media })}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: image500(item?.poster_path) || noPicPoster,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 text-center ml-1">
                      {item?.title?.length > 22
                        ? item?.title?.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/search_bg.png")}
              className="h-64 mt-40  w-auto"
              style={{ objectFit: "contain" }}
            />
          </View>
          <Text className="text-neutral-300 text-3xl text-center ml-1">
            What movie to watch?
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
