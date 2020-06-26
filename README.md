# node-bing-api
简易却高效的 Bing 今日美图 API，基于 Expressjs

---

## 使用方法
1. Clone 或 Download 这个 repo
2. 执行以下命令  
    ``` shell
    $ npm i --save
    $ export NODE_ENV=production
    ```
3. 启动应用
    - 普通（将在 `9601` 端口启动）
    ``` shell
    $ npm start
    ```
    - 自定义端口（`8081`）
    ``` shell
    $ export PORT=8081
    $ npm start
    ```

> 注：    Windows 用户请使用 `set` 代替 `export`

## 特点
- 重定向  
    使用 `302` 重定向，不怕硬盘爆炸
- 缓存  
    在第一次请求时，会将 Bing.com 返回的 JSON 储存到变量中，并在下一次（没有过期）直接返回图片 URL，加快响应速度；  
    如果缓存过期，将会自动更新缓存
- 多个源  
    我们推荐在中国大陆的用户使用 `cn` 源，在海外的用户使用 `global` 源，这可以加快你的响应