export const TRIPS = [
  {
    id: "trip:1",
    user: {
      id: "user:1"
    },
    products: [{
      __typename: "Hotel",
      id: "hotel:1"
    }, {
      __typename: "Flight",
      id: "flight:1"
    }, {
      __typename: "TripSuggestion",
      trip: {
        id: "trip:1"
      }
    }],
  },
  {
    id: "trip:2",
    user: {
      id: "user:2"
    },
    products: [{
      __typename: "Hotel",
      id: "hotel:2"
    }, {
      __typename: "TripSuggestion",
      trip: {
        id: "trip:2"
      }
    }],
  },
];
