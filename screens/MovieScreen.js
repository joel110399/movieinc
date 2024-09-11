import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchMovieCast,
  fetchMovieDeets,
  fetchSimilarMovies,
  rateMovie,
  fetchGuestSession,
  image500,
  noPicPoster,
} from "../api/moviedb";
import FavGoback from "../components/favGoback";
import Icon from "react-native-vector-icons/Ionicons";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const navigation = useNavigation();
  const {
    params: { item, media },
  } = useRoute();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0); // Estado para la calificación del usuario
  const [guestSessionId, setGuestSessionId] = useState(null);

  const getMovieDeets = async (id) => {
    try {
      const data = await fetchMovieDeets(id, media);
      if (data) setMovie(data);
      setLoading(false);
    } catch (e) {
      console.log("Error fetching M Deets: ", e);
    }
  };

  const getMovieCast = async (id) => {
    try {
      const data = await fetchMovieCast(id, media);
      data && data.cast ? setCast(data.cast) : "";
    } catch (e) {
      console.log("Error fetching M Cast: ", e);
    }
  };

  const getSimilarMovies = async (id) => {
    try {
      const data = await fetchSimilarMovies(id, media);
      data && data.results ? setSimilarMovies(data.results) : "";
    } catch (e) {
      console.log("Error fetching Similar Movies: ", e);
    }
  };

  const handleRating = async (ratingValue) => {
    setRating(ratingValue);
    if (guestSessionId) {
      const response = await rateMovie(item.id, ratingValue, guestSessionId);
      console.log("Calificación enviada:", response);
    } else {
      console.log("Guest session no encontrada.");
    }
  };

  useEffect(() => {
    setLoading(true);

    // Obtener guest session ID
    const fetchSessionId = async () => {
      const sessionData = await fetchGuestSession();
      setGuestSessionId(sessionData.guest_session_id);
    };
    fetchSessionId();

    getMovieDeets(item?.id);
    getMovieCast(item?.id);
    getSimilarMovies(item.id);
  }, [item]);

  return (
    <View
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-slate-800"
    >
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View className="w-full">
            <FavGoback />
            <View className="">
              <Image
                source={{ uri: image500(item?.poster_path) || noPicPoster }}
                style={{ width: width, height: height * 0.75 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(30,41,59,.4)",
                  "rgba(30,41,59,1)",
                ]}
                style={{ width: width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          </View>
          {/* movie details */}

          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            <Text className="text-white text-center text-3xl font-bold tracking-wider">
              {media === "movie" ? movie?.title : movie?.name}
            </Text>
            <View className="flex flex-row justify-center items-center gap-2">
              <Text className="text-white text-center">
                {item.vote_average}
              </Text>
              <Icon name="star" size={20} color="#fff220" />
            </View>
            {movie?.id ? (
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {media === "movie"
                  ? movie?.release_date.slice(0, 4)
                  : movie?.first_air_date.slice(0, 4)}{" "}
                • {""}
                {media === "movie"
                  ? movie?.runtime + " mins"
                  : "E" +
                    movie?.number_of_episodes +
                    " S" +
                    movie?.number_of_seasons}
              </Text>
            ) : null}

            {/* genres */}
            <View className="flex-row justify-center mx-4 space-x-2">
              {movie.genres.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text
                    key={index}
                    className="text-neutral-400 font-semibold text-base text-center"
                  >
                    {genre?.name} {showDot ? "•" : null}
                  </Text>
                );
              })}
            </View>
            {/* desc */}
            <Text className="text-neutral-400 mx-4 tracking-wide text-justify">
              {movie?.overview}
            </Text>
          </View>

          {/* Calificación de estrellas */}
          <View className="flex-row justify-center mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <Icon
                  name={rating >= star ? "star" : "star-outline"}
                  size={30}
                  color="#fff220"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* cast members */}
          {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
          {/* similar movies */}
          <MovieList
            title="Peliculas similares"
            hideSeeAll={true}
            data={similarMovies}
            media={media}
          />
        </ScrollView>
      )}
    </View>
  );
}
