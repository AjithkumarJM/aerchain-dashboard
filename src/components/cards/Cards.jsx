import { Box, Grid, Divider } from "@mui/material";
import CircularProgressWithLabel from "../circularProgress/CircularProgressWithLabel";
import { formatIndianNumber } from "../../utils";
import PropTypes from "prop-types";

import "./Cards.css";

const Cards = ({
  totalTrips,
  onTime,
  delayed,
  delivered,
  inTransit,
  others,
}) => {
  return (
    <Box width="100%">
      <Grid container spacing={4}>
        <Grid item xs={3.5}>
          <div className="trips">
            <p>Total Trips</p>
            <h2>{formatIndianNumber(totalTrips)}</h2>
          </div>
        </Grid>

        <Grid item xs={3}>
          <Box display={"flex"}>
            <div className="trips delivered">
              <p>Delivered</p>
              <h2>{formatIndianNumber(delivered)}</h2>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ opacity: 0.6, backgroundColor: "#f9f9f9" }}
            />
            <div className="on-time center">
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
            <div className="trips delayed">
              <p>Delayed</p>
              <h2>{formatIndianNumber(delayed)}</h2>
            </div>
            <div className="trips in-transit">
              <p>In Transit</p>
              <h2>{formatIndianNumber(inTransit)}</h2>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ opacity: 0.6, backgroundColor: "#f9f9f9" }}
            />
            <div className="trips delivered-in">
              <p>Others</p>
              <h2>{formatIndianNumber(others)}</h2>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Cards.propTypes = {
  totalTrips: PropTypes.number.isRequired,
  onTime: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired,
  delayed: PropTypes.number.isRequired,
  inTransit: PropTypes.number.isRequired,
  others: PropTypes.number.isRequired,
};

export default Cards;
