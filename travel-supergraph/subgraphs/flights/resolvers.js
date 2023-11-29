import { FLIGHTS } from "./data.js";

const getFlightById = (id) => FLIGHTS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    allFlights: () => FLIGHTS,
  },
  Flight: {
    __resolveReference(ref) {
      return getFlightById(ref.id);
    }
  }
};
