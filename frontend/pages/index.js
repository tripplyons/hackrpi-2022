import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import EPICImage from "../components/EPICImage";
import ImageGalleryForDay from "../components/ImageGalleryForDay";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <EPICImage date="2019/05/30" id="epic_1b_20190530011359" />
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>

        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
