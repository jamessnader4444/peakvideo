import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BasicPagination = ({ page, count, handleChangePage }) => {
  return (
    <Stack spacing={2}>
      {count > 0 && (
        <Pagination
          count={count}
          page={page}
          onChange={(e, page) => handleChangePage(page)}
          showFirstButton
          showLastButton
          color="primary"
          sx={
            {
              // "& .MuiPagination-ul": { backgroundColor: "yellow" },
              // "& .MuiPaginationItem-page": { color: theme === ("dark" || "cosmic") ? "white" : "black" },
              // "& .css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon": {color: theme === ("dark" || "cosmic")  ? "white" : "black"}
              // "& .Mui-selected": { backgroundColor: "green" },
            }
          }
        />
      )}
    </Stack>
  );
};

export default BasicPagination;
