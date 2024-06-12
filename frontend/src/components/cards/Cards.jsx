import { Box, Grid, Divider } from "@mui/material";
import CircularProgressWithLabel from "../circularProgress/CircularProgressWithLabel";
import { formatIndianNumber } from "../../utils";
import { useTripContext } from "../../contexts/tripContext";

import "./Cards.css";

const Cards = () => {
  const { trips, tripByStatus, updateTripByStatus } = useTripContext();

  const tripConstants = {
    DELAYED: "Delayed",
    INTRANSIT: "INT",
    DELIVERED: "DEL",
    ONTIME: "On Time",
    OTHERS: "Others",
  };

  const { length: totalTrips } = trips,
    delayed = tripByStatus(tripConstants.DELAYED),
    inTransit = tripByStatus(tripConstants.INTRANSIT),
    delivered = tripByStatus(tripConstants.DELIVERED),
    onTime = tripByStatus(tripConstants.ONTIME),
    others = tripByStatus(tripConstants.OTHERS);

  return (
    <Box width="100%">
      <Grid container spacing={4}>
        <Grid item xs={3.5}>
          <div className="trips" onClick={() => updateTripByStatus("")}>
            <p>Total Trips</p>
            <h2>{formatIndianNumber(totalTrips)}</h2>
          </div>
        </Grid>

        <Grid item xs={3}>
          <Box display={"flex"}>
            <div
              className="trips delivered"
              onClick={() => updateTripByStatus(tripConstants.DELIVERED)}
            >
              <p>Delivered</p>
              <h2>{formatIndianNumber(delivered)}</h2>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ opacity: 0.6, backgroundColor: "#f9f9f9" }}
            />
            <div
              className="on-time center"
              onClick={() => updateTripByStatus(tripConstants.ONTIME)}
            >
              <div>
                <CircularProgressWithLabel
                  value={(onTime / totalTrips) * 100}
                  color="success"
                  thickness={8}
                  size={55}
                />
                <p>
                  On time:{" "}
                  <span className="count">{formatIndianNumber(onTime)}</span>
                </p>
              </div>
            </div>
          </Box>
        </Grid>

        <Grid item xs={5.5}>
          <Box display={"flex"}>
            <div
              className="trips delayed"
              onClick={() => updateTripByStatus(tripConstants.DELAYED)}
            >
              <p>Delayed</p>
              <h2>{formatIndianNumber(delayed)}</h2>
            </div>
            <div
              className="trips in-transit"
              onClick={() => updateTripByStatus(tripConstants.INTRANSIT)}
            >
              <p>In Transit</p>
              <h2>{formatIndianNumber(inTransit)}</h2>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ opacity: 0.6, backgroundColor: "#f9f9f9" }}
            />
            <div
              className="trips delivered-in"
              onClick={() => updateTripByStatus(tripConstants.OTHERS)}
            >
              <p>Others</p>
              <h2>{formatIndianNumber(others)}</h2>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cards;
