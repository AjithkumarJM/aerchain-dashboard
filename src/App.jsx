import { createContext, useContext, useEffect, useState } from "react";
import Header from "./components/header/Header";
import Home from "./components/home";
import PropTypes from "prop-types";

const TripContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTripContext = () => useContext(TripContext);

const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await fetch("http://localhost:3000/data");
        const tripsJson = await data.json();

        const updatedTrips = tripsJson?.map(calculateTATStatus);

        setTrips(updatedTrips);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTrips();
  }, []);

  const calculateTATStatus = (trip) => {
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
  };

  const tripByStatus = (status) => {
    const filteredTrips = trips.filter(
      (trip) => status === trip.currentStatusCode || status === trip.tatStatus
    );

    return filteredTrips.length;
  };

  const fetchTrips = async () => {
    try {
      const data = await fetch("http://localhost:3000/data");
      const tripsJson = await data.json();

      const updatedTrips = tripsJson?.map(calculateTATStatus);

      setTrips(updatedTrips);
    } catch (error) {
      throw new Error(error);
    }
  };

  const value = {
    trips,
    fetchTrips,
    tripByStatus,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

TripProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <TripProvider>
      <div className="app">
        <Header />
        <Home />
      </div>
    </TripProvider>
  );
}

export default App;
