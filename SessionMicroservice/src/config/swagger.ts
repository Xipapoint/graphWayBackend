import swaggerJSDoc from "swagger-jsdoc";
import {version} from '../../package.json'
const options: swaggerJSDoc.Options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version,
        description:
          "SessionMicrroservice CRUD API application",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5001",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

export const swaggerSpec = swaggerJSDoc(options);