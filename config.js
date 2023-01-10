import path from 'path'

// swagger配置信息
export const swaggerConfig = {
    openapi: '3.0.0',
    title: 'McServers-CN API DOC',
    des: '我的世界服务器网 API文档',
    version: '1.0.0',
    apis: [
        path.join(__dirname, '/app/routes/*.js')
    ],
    routerPath: '/api-docs'
}

export const qiniuConfig = {
    accessKey:'F_UWTARJKp0t_0OWs3fiDv1U5Y6H39LnSz2apznH',
    secretKey: 'tlb5nAMuxqjywLdqWbZ9lPnrvndr7rvY0Aa48TNG',
    bucket: 'img-mcservers-cn'
}