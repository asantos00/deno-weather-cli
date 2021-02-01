import { parse } from "https://deno.land/std@0.83.0/flags/mod.ts";
import { validate, required, isString, isIn } from "https://deno.land/x/validasaur/mod.ts";
import { WeatherResponse } from "./types.ts";

const { city, units } = parse(Deno.args);

const unitArgs = ((units === undefined) ? "standard" : units)

const [ passes, errors] = await validate({city, unitArgs}, {
  city: [required, isString],
  unitArgs: [isIn(["metric", "imperial", "standard"])]
})

try { 
  if (!passes) {
    console.log(errors)
    throw new Error("Some errors with parameters passed");
  }

  const API_KEY = Deno.env.get("OWM_API_KEY");
  if (!API_KEY) {
    throw new Error("OWM_API_KEY should be defined");
  }

  const response: WeatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`,
  ).then((r) => r.json());

  console.log(`Weather for ${city}: ${response.weather.map((entry) => entry.main)}

  Temperature:
    Max: ${response.main.temp_max}
    Min: ${response.main.temp_min}
    Feeling: ${response.main.feels_like}
  Wind:
    Speed: ${response.wind.speed} km/h
  `);
} catch (err) {
  console.log(err.message);
}
