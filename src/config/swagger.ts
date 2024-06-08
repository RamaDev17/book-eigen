import swaggerJsdoc from 'swagger-jsdoc'

const url = process.env.BE_URL != null ? process.env.PORT != null ? process.env.BE_URL + ':' + process.env.PORT : process.env.BE_URL : 'http://localhost:3334'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation',
        },
        servers: [
            {
                url: url,
            },
        ],
    },
    apis: ['./src/swagger/*.ts'],
    
};

export const specs = swaggerJsdoc(options);

