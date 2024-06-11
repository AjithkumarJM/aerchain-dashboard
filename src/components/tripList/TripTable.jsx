import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import { daysFromNow, getComparator } from "../../utils";

import "./TripTable.css";
import AddTripForm from "../addTripForm/AddTripForm";
import EnhancedTableToolbar from "./EnhancedToolbar";

const headCells = [
  {
    id: "tripId",
    label: "Trip id",
  },
  {
    id: "transporter",
    label: "Transporter",
  },
  {
    id: "source",
    label: "Source",
  },
  {
    id: "dest",
    label: "Destination",
  },
  {
    id: "phoneNumber",
    label: "Phone",
  },
  {
    id: "etaDays",
    label: "ETA",
  },
  {
    id: "distanceRemaining",
    label: "Distance Remaining",
  },
  {
    id: "currenStatus",
    label: "Trip Status",
  },
  {
    id: "tatStatus",
    label: "TAT Status",
  },
];

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.1)" }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const TripTable = ({ trips }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = trips.map((n) => n.tripId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trips.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...trips]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, trips]
  );

  const renderCurrentStatus = (status) => {
    let buttonProps = {
      variant: "outlined",
      size: "small",
      children: status,
    };

    switch (status) {
      case "In Transit":
      case "Booked":
        buttonProps.color = "primary";
        break;

      case "Delayed":
        buttonProps.color = "warning";
        break;

      case "Reached Destination":
      case "Delivered":
        buttonProps.color = "success";
        break;

      default:
        buttonProps.color = "default";
    }

    return <Button {...buttonProps} />;
  };

  const renderTatStatus = (status) => {
    let buttonProps = {
      variant: "outlined",
      size: "small",
      children: status,
    };

    switch (status) {
      case "On Time":
        buttonProps.color = "success";
        break;

      case "Delayed":
        buttonProps.color = "warning";
        break;

      case "Others":
        buttonProps.color = "secondary";
        break;

      default:
        buttonProps.color = "default";
    }

    return <Button {...buttonProps} />;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onAddTripHandler={() => setOpenModal(true)}
        />
        <AddTripForm open={openModal} onClose={() => setOpenModal(false)} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={trips.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.tripId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.tripId)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.tripId}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      color="primary"
                    >
                      <Box
                        color="rgba(51, 136, 235, 1);
"
                      >
                        {row.tripId}
                      </Box>
                    </TableCell>
                    <TableCell>{row.transporter}</TableCell>
                    <TableCell>{row.source}</TableCell>
                    <TableCell>{row.dest}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{daysFromNow(row.etaDays)}</TableCell>
                    <TableCell>{row.distanceRemaining}</TableCell>
                    <TableCell>
                      {renderCurrentStatus(row.currenStatus)}
                    </TableCell>
                    <TableCell>{renderTatStatus(row.tatStatus)}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trips.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

TripTable.propTypes = {
  trips: PropTypes.array.isRequired,
};

export default TripTable;
