import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartOut } from "react-native-heroicons/outline";

import { styles, theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchPerson,
  fetchPersonMovies,
  fetchPersonTvShows,
  image500,
  noPicActor,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFave, toggleFave] = useState(false);
  const verticalMargin = Platform.OS == "ios" ? "" : "my-3";
  const [personMovies, setPersonMovies] = useState([]);
  const [personTvShows, setPersonTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({});
  const { params: item } = useRoute();

  const getPerson = async (id) => {
    try {
      const data = await fetchPerson(id);
      if (data) setPerson(data);
      setLoading(false);
    } catch (e) {
      console.log("Error fetching Person Deets: ", e);
    }
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    try {
      const data = await fetchPersonMovies(id);
      data && data.cast ? setPersonMovies(data.cast) : "";
    } catch (e) {
      console.log("Error fetching Person Movies: ", e);
    }
  };
  const getPersonTvShows = async (id) => {
    try {
      const data = await fetchPersonTvShows(id);
      data && data.cast ? setPersonTvShows(data.cast) : "";
    } catch (e) {
      console.log("Error fetching Person Movies: ", e);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPerson(item.id);
    getPersonMovies(item.id);
    getPersonTvShows(item.id);
  }, [item]);

  const HeartOutline = () => {
    return <HeartOut size={35} color={theme.background} fill={"white"} />;
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-800"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
        }
      >
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFave(!isFave)}>
          {isFave ? (
            <HeartIcon size={35} color={theme.background} />
          ) : (
            HeartOutline()
          )}
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: theme.background,
              shadowRadius: 30,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.35,
            }}
          >
            <View className="items-center rounded-full overflow-hidden border-2 border-neutral-500">
              <Image
                source={{ uri: image500(person?.profile_path) || noPicActor }}
                style={{ height: height * 0.43, width: width * 0.75 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.gender === 2 ? "Male" : "Female"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center pr-4">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center pr-4">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || "No Biography Available"}
            </Text>
          </View>
          {/* movieList */}
          <MovieList
            title={"Movies of " + person?.name}
            hideSeeAll={true}
            data={personMovies}
            media={"movie"}
          />
          <MovieList
            title={"TV Shows of " + person?.name}
            hideSeeAll={true}
            data={personTvShows}
            media={"tv"}
          />
        </View>
      )}
      {/* person deets */}
    </ScrollView>
  );
}
