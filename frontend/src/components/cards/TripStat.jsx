import PropTypes from "prop-types";
import { formatIndianNumber } from "../../utils";

import "./Cards.css";

const TripStat = ({ label, value, color }) => (
  <div className={`trips ${color}`}>
    <p>{label}</p>
    <h2>{formatIndianNumber(value)}</h2>
  </div>
);

TripStat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default TripStat;
