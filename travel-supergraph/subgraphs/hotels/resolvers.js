import { HOTELS } from "./data.js";
import { faker } from "@faker-js/faker";

export const getHotelById = (id) => HOTELS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    hotels: () => HOTELS
  },
  Hotel: {
    __resolveReference(ref) {
      return getHotelById(ref.id);
    }
  }
};
