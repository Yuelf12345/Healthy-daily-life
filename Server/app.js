const Koa = require('koa')
const Router = require('koa-router')    //路由管理
const static = require('koa-static')    //静态资源托管
const { koaBody } = require('koa-body') //解析参数
const cors = require('koa2-cors')       //cors跨域
const path = require('path');

const checkToken = require('./middleware/checkToken') // 校验token中间件
const app = new Koa()
const router = new Router()

app.use(cors({
    origin: 'http://localhost:5173',    // 前端地址  origin: '*' 允许所有地址
    credentials: true
}));
app.use(checkToken)
app.use(koaBody({
    multipart: true, // 解析多个文件
    formidable: {
        uploadDir: './public/avatar', // 文件上传的临时目录
        keepExtensions: true, // 保留文件扩展名
    }
}))
app.use(static(path.join(__dirname, 'public')));
app.use(router.routes())


// 用户模块
var User = require('./api/user')        //路由模块化
router.post('/login', User.userLogin)
router.post('/register', User.userRegister)
router.post('/userInfo', User.userInfo)
router.post('/userEdit', User.userEdit)
router.post('/uploadAvatar',User.uploadAvatar)

// 体重记录模块
const Weight = require('./api/weight')
router.post('/recordWeight', Weight.recordWeight)// 记录体重
router.post('/weightRecords', Weight.weightRecords)// 获取测量体重记录
router.post('/weightEdit', Weight.weightEdit)// 修改测量体重记录
router.delete('/weightDel', Weight.weightDel)// 删除测量体重记录

router.post('/weightByType', Weight.weightByType)// 获取月/周/日体重记录

app.listen(6060, () => {
    console.log('服务器已启动,请访问http://localhost:6060/');
})