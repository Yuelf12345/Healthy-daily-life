const Koa = require('koa')
const Router = require('koa-router')    //路由管理
const { koaBody } = require('koa-body') //解析参数
const cors = require('koa2-cors')       //cors跨域


const checkToken = require('./middleware/checkToken') // 校验token中间件
const app = new Koa()
const router = new Router()

app.use(cors({
    origin: 'http://localhost:5173',    // 前端地址  origin: '*' 允许所有地址
    credentials: true
}));
app.use(checkToken)
app.use(koaBody())
app.use(router.routes())


app.use((ctx, next) => {
    ctx.body = '后台'
    next()
})

// 用户模块
var User = require('./api/user')        //路由模块化
router.post('/login', User.userLogin)
router.post('/register', User.userRegister)
router.post('/userInfo', User.userInfo)
router.post('/userEdit', User.userEdit)

// 体重记录模块
const Weight = require('./api/weight')
router.post('/recordWeight', Weight.recordWeight)// 记录体重
router.post('/weightRecords', Weight.weightRecords)// 获取测量体重记录
router.post('/weightEdit', Weight.weightEdit)// 修改测量体重记录
router.delete('/weightDel', Weight.weightDel)// 删除测量体重记录

app.listen(6060, () => {
    console.log('服务器已启动,请访问http://localhost:6060/');
})