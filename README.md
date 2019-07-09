# Fusion Site SDK


## 安装
`npm install @alifd/fusion-site-sdk -S`

自带 `.d.ts`文件 支持 Typescript.
## API

### 获取Token
见帮助文档: https://fusion.design/help.html#/dev-create-site

### client类

#### 初始化
```javascript
const Client = require('@alifd/fusion-site-sdk');

// 使用token 初始化token
const client = new Client('your token'); 

// 为了方便开发调试 可以让client链接到不同环境
const client = new Client({
    token: 'your token',
    env: 'prod',  // 全部支持的环境见: https://github.com/alibaba-fusion/fusion-site-sdk/blob/master/src/type.ts
});
```

### 环境
默认是外网`prod`, 内网请使用`aliprod`, 不同环境token不通用。

#### 重置token
如果token过期 可以通过client实例的方法刷新token.

```javascript
const client = new Client('your token');

client.setToken('new token'); 
```
#### 查看环境、Token
```javascript
const client = new Client('your token');
// 只读 不要修改
client.token; // 'your token'
client.env; // env
```


### user方法群
```javascript
const user = client.user;
```
#### 校验token是否有效
```javascript
async () => {
    const isValid = await user.checkToken();
    // true 代表有效  false 代表 无效或者网络不通
}
```

#### 获取用户名下的站点
```javascript
async () => {
    const sites = await user.getSites();
    // sites Array<Site> 具体字段见 https://github.com/alibaba-fusion/fusion-site-sdk/blob/master/src/type.ts 的 IFusionSite
}
```




### site方法群
```javascript
const {site} = client;
```

#### siteId
获取siteId需要先调用获取site的接口


#### 添加物料
```javascript
async () => {
    // blocks + components + scaffolds  总数不要超过20,数量太多需要切分 多次调用 
    const res = await site.addMaterials(siteId, {
        blocks: ['npm包名@精确版本号', '@alifd/test-block@1.2.3'],
        components: ['npm包名@精确版本号', '@alifd/test-comp@1.2.3'],
        scaffolds: ['npm包名@精确版本号', '@alifd/test-scaffold@1.2.3'],
    });
    console.log(res); //成功 {success: true}  失败 {success: false, message: 'xxxxx'}
}
```

#### 添加区块、模板、组件
以下几个方法是对`site.addMaterials`方法的封装,方便调用

```javascript
async () => {
    // 添加区块, 返回值同 site.addMaterials
    const res = site.addBlocks(siteId, ['@alifd/test-block@1.2.3']);
    // 添加组件, 返回值同 site.addMaterials
    const res = site.addComponents(siteId, ['@alifd/test-components@1.2.3']);
    // 添加模板, 返回值同 site.addMaterials
    const res = site.addScaffolds(siteId, ['@alifd/test-scaffolds@1.2.3']);
}
```
