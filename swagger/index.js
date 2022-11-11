import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerConfig } from '../config'

export default function setSwagger (app) {
    const options = {
        definition: {
            openapi: swaggerConfig.openapi,
            info: {
                title: swaggerConfig.title,
                version: swaggerConfig.version,
                description: swaggerConfig.des,
            },
            host: 'localhost:3001',
            basePath: '/api',
            schemes: ['http', 'https'],
            components: {
                securitySchemes: {
                    Bearer: {
                        type: "apiKey",
                        description: "JWT Authorization format: Bearer {token}.",
                        name: "Authorization",
                        in: "header"
                    }
                }
            },
            security: [
                {
                    Bearer: []
                }
            ]
        },
        apis: swaggerConfig.apis,
    }

    const swaggerSpec = swaggerJSDoc(options)

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    app.use(swaggerConfig.routerPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}