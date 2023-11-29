import { TRIPS } from "./data.js";

export const getTripById = (id) => TRIPS.find((it) => it.id === id);
export const getCurrentTripByUserId = (userId) => TRIPS.find((it) => it.user.id === userId);

export const resolvers = {
  Trip: {
    __resolveReference(ref) {
      return getTripById(ref.id);
    }
  },
  Query: {
    currentTrip(_, args) {
      return getCurrentTripByUserId(args.userId)
    }
  }
};
