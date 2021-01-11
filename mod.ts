import { parse } from "https://deno.land/std@0.83.0/flags/mod.ts";

const { city } = parse(Deno.args);

const API_KEY = Deno.env.get("OWM_API_KEY");
if (!API_KEY) {
  throw new Error("OWM_API_KEY should be defined");
}

const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
).then((r) => r.json());

console.log(response);
