const path = require('path');
var express = require('express');
var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://weixin-uat.zkh360.com";
var host=""
var proxyOption = {
    target: proxyPath, changeOrigoin: true,
};
var app = express();
console.log(__dirname);
app.use('/wechart', express.static(path.join(__dirname, '..', 'wechat/wechart/src/main/webapp')));

app.use("/", proxyMiddleWare(proxyOption))


app.listen(3001, "localhost", () => {
    console.log('listening as http://localhost:3001\n')
})
//http://esp.fat.zkh360.com/login.jsp?passport=false