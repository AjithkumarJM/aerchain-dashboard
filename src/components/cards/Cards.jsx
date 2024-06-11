import { Box, Grid, Divider } from "@mui/material";
import CircularProgressWithLabel from "../circularProgress/CircularProgressWithLabel";
import { formatIndianNumber } from "../../utils";

import "./Cards.css";

function Cards() {
  return (
    <Box width="100%">
      <Grid container spacing={4}>
        <Grid item xs={3.5}>
          <div className="trips">
            <p>Total Trips</p>
            <h2>{formatIndianNumber(18033)}</h2>
          </div>
        </Grid>

        <Grid item xs={3}>
          <Box display={"flex"}>
            <div className="trips delivered">
              <p>Delivered</p>
              <h2>{formatIndianNumber(18033)}</h2>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ opacity: 0.6, backgroundColor: "#f9f9f9" }}
            />
            <div className="on-time center">
              <div>
                <CircularProgressWithLabel
                  value={100}
                  color="success"
                  thickness={8}
                  size={55}
                />
                <p>
                  Ontime:{" "}
                  <span className="count">{formatIndianNumber(123456)}</span>
                </p>
              </div>
            </div>
          </Box>
        </Grid>

        <Grid item xs={5.5}>
          <Box display={"flex"}>
            <div className="trips delayed">
              <p>Delayed</p>
              <h2>{formatIndianNumber(18033)}</h2>
            </div>
            <div className="trips in-transit">
              <p>In Transit</p>
              <h2>{formatIndianNumber(18033)}</h2>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ opacity: 0.6, backgroundColor: "#f9f9f9" }}
            />
            <div className="trips delivered-in">
              <p>Delayed</p>
              <h2>{formatIndianNumber(18033)}</h2>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cards;
