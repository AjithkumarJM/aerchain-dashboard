import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

const TripContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTripContext = () => useContext(TripContext);

const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [modifiedTrips, setModifiedTrips] = useState([]);

  // Enhance it by setting loading and error state
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const calculateTATStatus = useCallback((trip) => {
    const { etaDays, tripStartTime, tripEndTime, lastPingTime } = trip;
    const tripEnd = tripEndTime || lastPingTime;

    const start = new Date(tripStartTime);
    const end = new Date(tripEnd);
    const timeTaken = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    let tatStatus = "Others";

    if (etaDays > 0) {
      if (etaDays >= timeTaken) {
        tatStatus = "On Time";
      } else {
        tatStatus = "Delayed";
      }
    }

    return { ...trip, tatStatus };
  }, []);

  const fetchTrips = useCallback(async () => {
    // setLoading(true);
    // setError(null);
    try {
      const data = await fetch("http://localhost:3000/data");
      const tripsJson = await data.json();

      const updatedTrips = tripsJson?.map(calculateTATStatus);

      setTrips(updatedTrips);
      setModifiedTrips([]);
    } catch (error) {
      // setError(error);
      throw new Error(error);
    } finally {
      // setLoading(false);
    }
  }, [calculateTATStatus]);

  const updateTripByStatus = useCallback(
    (status) => {
      const filteredTrips = trips.filter(
        (trip) => status === trip.currentStatusCode || status === trip.tatStatus
      );

      setModifiedTrips(filteredTrips);
    },
    [trips]
  );

  const tripByStatus = useCallback(
    (status) => {
      const filteredTrips = trips.filter(
        (trip) => status === trip.currentStatusCode || status === trip.tatStatus
      );

      return filteredTrips.length;
    },
    [trips]
  );

  const value = {
    trips,
    modifiedTrips,
    fetchTrips,
    tripByStatus,
    updateTripByStatus,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

TripProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TripContext, TripProvider };
