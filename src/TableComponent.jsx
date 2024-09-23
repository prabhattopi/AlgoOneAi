/* eslint-disable react/prop-types */
import { MaterialReactTable } from "material-react-table";
import { Modal, Box, Checkbox, FormControlLabel } from "@mui/material";
import { useState, useMemo } from "react";

const TableComponent = ({ data }) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({ in: false, out: false });

  // Memoize filtered data based on filterValues
  const filteredData = useMemo(() => {
    if (filterValues.in && filterValues.out) {
      return data;
    }
    if (filterValues.in) {
      return data.filter((row) => row.percent_in_out_money >= 0);
    }
    if (filterValues.out) {
      return data.filter((row) => row.percent_in_out_money < 0);
    }
    return data; // No filter applied, show all data
  }, [filterValues, data]);

  const columns = [
    { accessorKey: "strike", header: "Strike" },
    {
      accessorKey: "percent_in_out_money",
      header: "% In/Out Money",
      Cell: ({ cell }) => (
        <span
          style={{
            backgroundColor: cell.getValue() > 0 ? "#FFE0B1" : "#FFFBD6",
            padding: "2px 4px",
            borderRadius: "4px",
            display: "inline-block",
            width: "100%",
            textAlign: "center",
          }}
        >
          {cell.getValue() > 0 && "+"}
          {cell.getValue().toFixed(2)}
        </span>
      ),
      Filter: () => (
        <button
          onClick={() => setFilterModalOpen(true)}
          style={{
            backgroundColor: "#16213e",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Filter by % In/Out Money
        </button>
      ),
    },
    { accessorKey: "percent_max_risk", header: "% Max Risk" },
    { accessorKey: "percent_cost_to_insure", header: "% Cost To Insure" },
    { accessorKey: "sigma_break_even", header: "Sigma Break Even" },
    { accessorKey: "percent_to_dbl", header: "% To Dbl" },
    { accessorKey: "prob_above", header: "Prob Above" },
    { accessorKey: "opt_mid_price", header: "Opt Mid Price" },
    { accessorKey: "percent_ask_time_value", header: "% Ask Time Value" },
    { accessorKey: "delta", header: "Delta" },
    { accessorKey: "opt_open_int", header: "Opt Open Int" },
    {
      accessorKey: "black_scholes_ratio_siv",
      header: "Black Scholes Ratio (SIV)",
    },
    {
      accessorKey: "black_scholes_ratio_50_day",
      header: "Black Scholes Ratio (50 Day)",
    },
    { accessorKey: "iv_hv", header: "IV/HV" },
    { accessorKey: "percent_bid_ask_spread", header: "% Bid-Ask Spread" },
    {
      accessorKey: "percent_return_1_sigma_max_risk",
      header: "% Return 1σ/% Max Risk",
      Cell: ({ cell }) => {
        const maxVal = Math.max(
          ...data.map((row) => row.percent_return_1_sigma_max_risk)
        );
        const cellValue = cell.getValue();
        const percentage = (cellValue / maxVal) * 100;

        let color = "#f00";
        if (percentage > 10) color = "#f7b400";
        if (percentage > 50) color = "#0f0";

        return (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                backgroundColor: color,
                height: "100%",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#000",
              }}
            >
              {cellValue.toFixed(2)}
            </span>
          </div>
        );
      },
    },
  ];

  const handleFilterChange = (type) => {
    setFilterValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [type]: !prevValues[type],
      };

      // Directly close the modal after updating the state
      setFilterModalOpen(false);
      return newValues;
    });
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={filteredData}
        muiTableBodyCellProps={{
          sx: {
            width: "130px",
            height: "34px",
            padding: "0",
            fontSize: "0.875rem",
            lineHeight: "1.2",
            color: "#808080",
            border: "1px solid #e0e0e0",
            textAlign: "center",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            width: "130px",
            height: "34px",
            padding: "8px",
            fontSize: "0.875rem",
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "#16213e",
            color: "#ffffff",
            border: "1px solid #e0e0e0",
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            "&:nth-of-type(even)": {
              backgroundColor: "#f9f9f9",
            },
            "&:nth-of-type(odd)": {
              backgroundColor: "#ffffff",
            },
          },
        }}
        enableColumnFilters
        enableRowSelection={false}
        enablePagination={false}
      />
      <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)}>
        <Box
          sx={{
            p: 2,
            backgroundColor: "#fff",
            borderRadius: "8px",
            maxWidth: "200px",
            margin: "auto",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={filterValues.in}
                onChange={() => handleFilterChange("in")}
              />
            }
            label="In"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterValues.out}
                onChange={() => handleFilterChange("out")}
              />
            }
            label="Out"
          />
        </Box>
      </Modal>
    </>
  );
};

export default TableComponent;
