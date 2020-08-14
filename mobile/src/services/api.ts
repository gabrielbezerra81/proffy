import { Platform } from "react-native";
import axios from "axios";

const url = Platform.OS === "ios" ? "localhost" : "10.0.0.172";

const api = axios.create({
  baseURL: `http://${url}:3334`,
});

export default api;
