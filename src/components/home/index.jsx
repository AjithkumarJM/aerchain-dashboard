import { Box } from "@mui/material";
import Cards from "../cards/Cards";
import TripTable from "../tripList/TripTable";
import { useTripContext } from "../../App";
import { useEffect } from "react";

const Home = () => {
  const { trips, fetchTrips, tripByStatus } = useTripContext();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const { length: totalTrips } = trips,
    delayed = tripByStatus("Delayed"),
    inTransit = tripByStatus("INT"),
    delivered = tripByStatus("DEL"),
    onTime = tripByStatus("On Time"),
    others = tripByStatus("Others");

  return (
    <Box padding={2} bgcolor="#F9F9F9" height="calc(100vh - 50px)">
      <Cards
        totalTrips={totalTrips}
        delayed={delayed}
        inTransit={inTransit}
        delivered={delivered}
        onTime={onTime}
        others={others}
      />
      <TripTable trips={trips} />
    </Box>
  );
};

export default Home;
