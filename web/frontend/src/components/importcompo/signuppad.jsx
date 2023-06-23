import React, { useEffect, useState } from "react";
import "./pad.css";
import ReactDOM from "react-dom";
import SignatureCanvas from "react-signature-canvas";

function Pad() {
  const [start, setStart] = useState(false);
  const [mousePos, setMousePos] = useState({});
  useEffect(() => {
    
  }, [mousePos]);

  return (
    <div>
      <div id="watermark">Draw Here </div>
      <div
        className="patt"
        id="drawpad"
        style={{ height: 300, marginTop: 10, marginLeft: 110 }}
      >
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 400, height: 300, className: "sigCanvas" }}
        />
      </div>
    </div>
  );
}

export default Pad;
