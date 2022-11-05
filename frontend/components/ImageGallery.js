import EPICImage from "components/EPICImage";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { Button, ButtonGroup } from "@mui/material";

export default function ImageGallery({ images }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Container>
      {
        (loaded && images.length > 0) ?
          <EPICImage date={images[index].date} id={images[index].id} />
          : null
      }
      <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
        <Button disabled={index == 0} onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}>Previous</Button>
        <Button disabled={index == images.length - 1} onClick={() => {
          if (index < images.length - 1) {
            setIndex(index + 1);
          }
        }}>Next</Button>
      </ButtonGroup>
    </Container>
  );
}