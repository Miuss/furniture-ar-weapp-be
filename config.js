import path from 'path'

// swagger配置信息
export const swaggerConfig = {
    openapi: '3.0.0',
    title: 'McServers-CN API DOC',
    des: '我的世界服务器网 API文档',
    version: '1.0.0',
    apis: [
        path.join(__dirname, '/routes/*.js')
    ],
    routerPath: '/api-docs'
}