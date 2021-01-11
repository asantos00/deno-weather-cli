import { parse } from "https://deno.land/std@0.83.0/flags/mod.ts";
import { WeatherResponse } from "./types.ts";

const { city } = parse(Deno.args);

const API_KEY = Deno.env.get("OWM_API_KEY");
if (!API_KEY) {
  throw new Error("OWM_API_KEY should be defined");
}

const response: WeatherResponse = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
).then((r) => r.json());

console.log(`Weather for ${city}: ${response.weather.map((entry) => entry.main)}

Temperature:
  Max: ${response.main.temp_max}
  Min: ${response.main.temp_min}
  Feeling: ${response.main.feels_like}
Wind:
  Speed: ${response.wind.speed} km/h
`);
