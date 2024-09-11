import axios from "axios";
import { apiKey, apiBaseUrl } from "../constants";

// endpoints

const trendingMoviesEP = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}&language=es-ES`;
const playingNow = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}&language=es-ES`;
const upcomingMoviesEP = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}&language=es-ES`;
const topRatedMoviesEP = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&language=es-ES`;
const searchMovieEP = `${apiBaseUrl}/search/movie?api_key=${apiKey}&language=es-ES`;

// dynamic EPs
const movieDeetsEP = (id, media) =>
  `${apiBaseUrl}/${media}/${id}?api_key=${apiKey}&language=es-ES`;
const movieCastEP = (id, media) =>
  `${apiBaseUrl}/${media}/${id}/credits?api_key=${apiKey}&language=es-ES`;
const similarMoviesEP = (id, media) =>
  `${apiBaseUrl}/${media}/${id}/similar?api_key=${apiKey}&language=es-ES`;

const personEP = (id) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}&language=es-ES`;
const personMoviesEP = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}&language=es-ES`;
const personTvShowsEP = (id) =>
  `${apiBaseUrl}/person/${id}/tv_credits?api_key=${apiKey}&language=es-ES`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;

export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const noPicPoster =
  "https://cdn-icons-png.flaticon.com/512/2589/2589327.png";

export const noPicActor =
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

// Obtener guest session
const getGuestSessionEP = `${apiBaseUrl}/authentication/guest_session/new?api_key=${apiKey}`;

export const fetchGuestSession = async () => {
  return apiCall(getGuestSessionEP);
};

// Calificar película
const rateMovieEP = (movieId, guestSessionId) =>
  `${apiBaseUrl}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`;

export const rateMovie = async (movieId, rating, guestSessionId) => {
  const options = {
    method: "POST",
    url: rateMovieEP(movieId, guestSessionId),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    data: {
      value: rating, // La calificación debe estar entre 0.5 y 10
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    console.log("ERROR: ", e);
    return {};
  }
};

export const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    console.log("ERROR: ", e);
    return {};
  }
};

export const fetchPlayingNowMovies = () => {
  return apiCall(playingNow);
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEP);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEP);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEP);
};

export const fetchMovieDeets = (id, media) => {
  return apiCall(movieDeetsEP(id, media));
};

export const fetchMovieCast = (id, media) => {
  return apiCall(movieCastEP(id, media));
};

export const fetchSimilarMovies = (id, media) => {
  return apiCall(similarMoviesEP(id, media));
};

export const fetchPerson = (id) => {
  return apiCall(personEP(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEP(id));
};

export const fetchPersonTvShows = (id) => {
  return apiCall(personTvShowsEP(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMovieEP, params);
};
