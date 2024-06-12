import { Box } from "@mui/material";
import Cards from "../cards/Cards";
import TripTable from "../tripList/TripTable";
import { useTripContext } from "../../contexts/tripContext";
import { useEffect } from "react";

const Home = () => {
  const { trips, fetchTrips, modifiedTrips } = useTripContext();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <Box padding={2} bgcolor="#F9F9F9" height="calc(100vh - 50px)">
      <Cards />
      <TripTable trips={modifiedTrips.length ? modifiedTrips : trips} />
    </Box>
  );
};

export default Home;
