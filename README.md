## mcservers-node-fe

我的世界服务器网（https://www.mcservers.cn）服务端，服务端采用Express+sequelize进行开发

### 如何运行

首先安装依赖包
```
npm install
```

然后输入运行指令

```
npm run dev # 运行项目（开发环境下运行项目）
```
或
```
npm run serve # 运行项目（生产环境下运行项目）
```

### 数据库管理

```
npm run dbload # 通过数据库表结构生成sequelize模型
```