"use client";

import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";
import { swaggerDoc } from "@/lib/swagger";
import ReactPlayer from "react-player/lazy";
// test deploy
export default function ApiDocs() {
  return (
    <div className="containe">
      <SwaggerUI spec={swaggerDoc} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Пример как пользоваться ReactPlayer */}
        <h1>Пример как пользоваться ReactPlayer</h1>

        <textarea
          style={{ width: "500px", height: "200px" }}
          defaultValue={`import ReactPlayer from "react-player/lazy";


            <ReactPlayer url={""} width="700px" height="400px" controls/>`}
        ></textarea>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=fcMcf_4PjfI"
          width="700px"
          height="400px"
          controls
        />
      </div>
      {/* Пример как пользоваться ReactPlayer */}
    </div>
  );
}
