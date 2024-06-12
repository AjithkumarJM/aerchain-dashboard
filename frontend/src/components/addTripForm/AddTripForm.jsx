import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  Grid,
  Divider,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import { generateId } from "../../utils";
import { useTripContext } from "../../contexts/tripContext";

const AddTripForm = ({ open, onClose }) => {
  const { fetchTrips } = useTripContext();
  const [formData, setFormData] = useState({
    tripId: "",
    transporter: "",
    source: "",
    dest: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _id: generateId(),
          tripStartTime: new Date().toISOString(),
          currentStatusCode: "BKD",
          currenStatus: "Booked",
          etaDays: 0,
          distanceRemaining: 239,
          tripEndTime: "",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      setFormData({
        tripId: "",
        transporter: "",
        source: "",
        dest: "",
        phoneNumber: "",
      });
      onClose();
      fetchTrips();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Add Trip
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
          <Grid item xs={6}>
            <TextField
              label={
                <Typography>
                  Trip ID{" "}
                  <Typography component="span" color="error">
                    *
                  </Typography>
                </Typography>
              }
              fullWidth
              variant="outlined"
              name="tripId"
              value={formData.tripId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
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
              value={formData.transporter}
              onChange={handleChange}
              label="Transporter"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="Blue Dart">Blue Dart</MenuItem>
              <MenuItem value="Delhivery">Delhivery</MenuItem>
              <MenuItem value="DTDC">DTDC</MenuItem>
              <MenuItem value="Merks">Merks</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={
                <Typography>
                  Source{" "}
                  <Typography component="span" color="error">
                    *
                  </Typography>
                </Typography>
              }
              fullWidth
              variant="outlined"
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={
                <Typography>
                  Destination{" "}
                  <Typography component="span" color="error">
                    *
                  </Typography>
                </Typography>
              }
              fullWidth
              variant="outlined"
              name="dest"
              value={formData.dest}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={
                <Typography>
                  Phone{" "}
                  <Typography component="span" color="error">
                    *
                  </Typography>
                </Typography>
              }
              fullWidth
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
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
            Add Trip
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

AddTripForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddTripForm;
