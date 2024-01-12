# SavePDF Script

quickly automation save a pdf file by html template.

快速导出网页模板的pdf，适用于简历等场景。

using express,puppeteer and json-server.

## How to work

- initial modules.

```sh
npm i
```

- starting json-server,a simple db server

```sh
npm run jsondb
```

- configuring your main.js,setting how to save internet data in db.json or copy your data save db.json;moving your html template to /dist,your html has must request jsondb,puppeteer request like `http://localhost:3000?id=1` .

```js
//vue.app example
onMounted(async () => { 
    const currentUrl = window.location.href; 
    const url = new URL(currentUrl); 
    const searchParams = new URLSearchParams(url.search); 
    const queryParams = {}; 
    for (const [key, value] of searchParams) { queryParams[key] = value; } 
    const res = await axios({ url: "http://localhost:3001/list/" })
    const result = res.data[0].list[Number(queryParams.id)]
})

//db.json example
{
  "list": {
    "id": 1,
    "list": [
      {
        "name": "john"
      }
    ]
  }
}
```

- starting server.

```js
npm run start
```

## 简体中文

使用express,puppeteer和json-server.

## 怎么使用

- 初始化.

```sh
npm i
```

- 启动jsondb

```sh
npm run jsondb
```

- 配置mainjs文件，或者根据需要进行修改；内置了一个简单函数用于获取token和获取data，保存到本地，也可以直接复制到dbjson；把html模板放置到dist下，pupeteer的请求类似于`http://localhost:3000?id=1` ，**直接开起来会失败，需配置自己的html模板和dbjson的资料**

```js
//app.vue 示例
onMounted(async () => { 
    const currentUrl = window.location.href; 
    const url = new URL(currentUrl); 
    const searchParams = new URLSearchParams(url.search); 
    const queryParams = {}; 
    for (const [key, value] of searchParams) { queryParams[key] = value; } 
    const res = await axios({ url: "http://localhost:3001/list/" })
    const result = res.data[0].list[Number(queryParams.id)]
})

//db.json格式示例，读取id为1的list数组中的内容
{
  "list": {
    "id": 1,
    "list": [
      {
        "name": "john"
      }
    ]
  }
}
```

- 启动脚本.

```js
npm run start
```
