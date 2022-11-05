import { Card, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import Link from "../../src/Link";
import AppBar from "@mui/material/AppBar";

export default function navbar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            noLinkStyle
            href="/"
            sx={{ mr: 2 }}
          >
            Home{" "}
          </Typography>

          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            noLinkStyle
            href="/videosInput "
            sx={{ mr: 2 }}
          >
            Upload Video{" "}
          </Typography>

          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            noLinkStyle
            href="/about"
            sx={{ mr: 2 }}
          >
            About{" "}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
