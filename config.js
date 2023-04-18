import path from 'path'

// swagger配置信息
export const swaggerConfig = {
    openapi: '3.0.0',
    title: 'Furniture Weapp API DOC',
    des: 'AR家具摆放小程序 API文档',
    version: '1.0.0',
    apis: [
        path.join(__dirname, '/app/routes/*.js')
    ],
    routerPath: '/api-docs'
}

export const qiniuConfig = {
    accessKey:'F_UWTARJKp0t_0OWs3fiDv1U5Y6H39LnSz2apznH',
    secretKey: 'tlb5nAMuxqjywLdqWbZ9lPnrvndr7rvY0Aa48TNG',
    bucket: 'cdn-miuss-icu'
}

export const weappConfig = {
    appId: 'wx5a1a40f933d258a3',  // 小程序appId
    appSecrt: '587f253df85f90bf1bc4071a085c4c2a'    // 小程序appSecrt
}