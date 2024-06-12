import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { daysFromNow, getComparator } from "../../utils";

import AddTripForm from "../addTripForm/AddTripForm";
import EnhancedTableToolbar from "./EnhancedToolbar";
import EnhancedTableHead from "./EnhancedTableHead";

import "./TripTable.css";
import UpdateStatusForm from "../updateStatusForm/UpdateStatusForm";

const TripTable = ({ trips }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddTripModal, setOpenAddTripModal] = useState(false);
  const [openUpdateStatusModal, setUpdateStatusModal] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    // setSelected(newSelected);

    const selectedTrip = trips.find((info) => info.tripId === id);
    setSelected(selectedTrip.tripId);
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
        <AddTripForm
          open={openAddTripModal}
          onClose={() => setOpenAddTripModal(false)}
        />

        <UpdateStatusForm
          open={openUpdateStatusModal}
          onClose={() => setUpdateStatusModal(false)}
          tripId={selected}
        />

        <EnhancedTableToolbar
          numSelected={selected.length}
          onAddTripHandler={() => setOpenAddTripModal(true)}
          onUpdateStatusHandler={() => setUpdateStatusModal(true)}
        />

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
