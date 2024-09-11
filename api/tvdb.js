import axios from "axios";
import { apiKey, apiBaseUrl } from "../constants";
import { apiCall } from "./moviedb";

// endpoints

const tvTrendingEP = `${apiBaseUrl}/trending/tv/day?api_key=${apiKey}`;

export const fetchTvTrending = () => {
    return apiCall(tvTrendingEP);
}