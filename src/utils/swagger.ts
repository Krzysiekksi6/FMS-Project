import {Express, Request, Response} from "express";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUI from "swagger-ui-express";
import {version} from "../../package.json";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version,
        },
        components: {
            // securitySchemes: {
            //     bearerAuth: {
            //         type: "http",
            //         scheme: "bearer",
            //         bearerFormat: "JWT",
            //     },
            // },
        },
        security: [
            // {
            //     bearerAuth: [],
            // },
        ],
    },
    apis: ["./src/routes/**/*.ts", "./src/schema/*.ts,", "./src/controller/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(app: Express, port: string | number) {
    // Swagger page
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })
    console.log(`Docs available at http//localhost:${port}/docs`)
}

export default swaggerDocs

