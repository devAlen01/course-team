import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";
import { swaggerDoc } from "@/lib/swagger";
export default function ApiDocs() {
  return (
    <div className="containe">
      <SwaggerUI spec={swaggerDoc} />
    </div>
  );
}
