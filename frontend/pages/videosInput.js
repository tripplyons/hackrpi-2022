import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/Nav/navbar";
export default function videosInput() {
  const [file, setfile] = useState("");
  const [typeOfUpload, setTypeOfUpload] = useState("1");
  const [url, seturl] = useState("");
  return (
    <div>
      <Navbar />
      {typeOfUpload !== "1" && (
        <Button type="button" onClick={() => setTypeOfUpload("1")}>
          Go Back
        </Button>
      )}
      {typeOfUpload === "1" && (
        <div>
          <Button type="button" onClick={() => setTypeOfUpload("url")}>
            Upload via link
          </Button>
          <br />
          <Button type="button" onClick={() => setTypeOfUpload("file")}>
            Upload via file
          </Button>
        </div>
      )}

      {typeOfUpload === "file" && (
        <div>
          <TextField
            type="file"
            accept="video/*"
            onChange={(e) => setfile(e.target.files[0])}
          />
        </div>
      )}

      {typeOfUpload === "url" && (
        <div>
          <p>URL</p>
          <TextField
            placeholder="Paste the url"
            onChange={(e) => {
              console.log("Testing " + url);
              seturl(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
}

// if (typeOfUpload === "1") {
//   return (
//     <div>
//       <Navbar />
//       <Button>Upload via link</Button>
//       <br />
//       <Button>Upload via file</Button>
//     </div>
//   );
// }
// if (typeOfUpload === "url") {
//   return (
//     <div>
//       <Navbar />
//     </div>
//   );
// }
// if (typeOfUpload === "file") {
//   return (
//     <div>
//       <Navbar />

//     </div>
//   );
// }
