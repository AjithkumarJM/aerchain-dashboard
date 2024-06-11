import { Button } from "@mui/material";
import PropTypes from "prop-types";

const EnhancedTableToolbar = ({ numSelected, onAddTripHandler }) => {
  return (
    <div className="trip-list-header">
      <h2>Trip List</h2>
      <div className="center">
        <Button variant="contained" disabled={!numSelected}>
          Update Status
        </Button>
        <Button variant="contained" onClick={onAddTripHandler}>
          Add Trip
        </Button>
      </div>
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onAddTripHandler: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
