import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Grid,
  Divider,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTripContext } from "../../contexts/tripContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const currentStatusCodes = [
  {
    value: "BKD",
    label: "Booked",
  },
  {
    value: "INT",
    label: "In Transit",
  },
  {
    value: "RD",
    label: "Reached Desitnation",
  },
  {
    value: "DEL",
    label: "Delivered",
  },
];

const UpdateStatusForm = ({ open, onClose, tripId }) => {
  const { fetchTrips, trips } = useTripContext();
  const [transporter, setTransporter] = useState("");
  const [lastPingTime, setLastPingTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentTrip = trips.find((trip) => trip.tripId === tripId);

  const [statusCodes, setStatusCodes] = useState(currentStatusCodes);

  useEffect(() => {
    if (currentTrip?.currentStatusCode) {
      const index = statusCodes.findIndex(
        (item) => item.value === currentTrip.currentStatusCode
      );

      setStatusCodes(
        currentStatusCodes.slice(index, currentStatusCodes.length)
      );
    }
  }, [currentTrip]);

  const handleSave = async () => {
    const payload = {
      currentStatusCode: transporter,
      lastPingTime: new Date(lastPingTime).toISOString(),
      currenStatus: currentStatusCodes.find(
        ({ value }) => value === transporter
      )?.value,
    };

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/data/${tripId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentTrip,
          ...payload,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      setLastPingTime(null);
      setTransporter("");
      onClose();
      fetchTrips();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStatusCodes = () => {
    return statusCodes.map(({ label, value }) => (
      <MenuItem value={value} key={value}>
        {label}
      </MenuItem>
    ));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        Update Status
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          x
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>
              <Typography>
                Transporter{" "}
                <Typography component="span" color="error">
                  *
                </Typography>
              </Typography>
            </InputLabel>
            <Select
              fullWidth
              variant="outlined"
              name="transporter"
              value={transporter}
              onChange={(e) => setTransporter(e.target.value)}
              label="Transporter"
              sx={{ minWidth: 200 }}
            >
              {renderStatusCodes()}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                variant="outlined"
                name="date"
                value={lastPingTime}
                onChange={(date) => setLastPingTime(date)}
                label="Time"
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>

      <Divider sx={{ margin: "16px 0" }} />
      <Grid item xs={12}>
        <DialogActions sx={{ marginRight: 2, marginBottom: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            sx={{ position: "relative" }}
          >
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
            Update Status
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

UpdateStatusForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tripId: PropTypes.string,
};

export default UpdateStatusForm;
