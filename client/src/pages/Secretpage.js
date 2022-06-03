import React from "react";

import { Button } from "@mui/material";

const Secretpage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "30px",
      }}
    >
      <div>Welcome to this secret homepage</div>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Out
      </Button>
    </div>
  );
};

export default Secretpage;
