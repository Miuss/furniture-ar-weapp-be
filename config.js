import path from 'path'

// swagger配置信息
export const swaggerConfig = {
    openapi: '3.0.0',
    title: 'Express Template',
    version: '1.0.0',
    apis: [
        path.join(__dirname, '/router/*.js')
    ],
    routerPath: '/api-docs'
}