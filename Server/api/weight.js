const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const uuid = () => uuidv4();
let db;

~async function () {
    db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'healthy_daily_life',
    })
}()

console.log('db', db);
const weight = {
    recordWeight: async (ctx) => {
        const { userId, weight, targetWeight } = ctx.request.body
        const weightId = uuid();
        const createdAt = new Date();
        const updatedAt = new Date();
        console.log('上传体重接收到参数:', userId, weight, targetWeight);
        try {
            await db.query("insert into `weight` (`weightId`,`userId`,`weight`,`targetWeight`,`createdAt`,`updatedAt`) value (?,?,?,?,?,?)", [
                weightId, userId, weight, targetWeight, createdAt, updatedAt
            ])
            ctx.body = {
                code: 200,
                success: true,
                msg: '记录成功',
            }
        } catch (error) {
            ctx.body = {
                code: 400,
                success: false,
                msg: '上传记录失败'
            }
        }
    },
    weightRecords: async (ctx) => {
        const { userId, limit, page } = ctx.request.body
        let startTime = new Date('1900-01-01')
        let endTime = new Date()
        if (ctx.request.body.startTime) {
            startTime = new Date(ctx.request.body.startTime);
        }
        if (ctx.request.body.endTime) {
            endTime = new Date(ctx.request.body.endTime);
        }
        console.log('获取测量体重记录收到参数:', userId, limit, page, startTime, endTime);

        // 计算偏移量
        const offset = (page - 1) * limit;

        // 构建SQL查询语句，动态加入时间筛选条件
        let dataSql = `
        SELECT * FROM weight 
        WHERE userId = ?
        AND updatedAt BETWEEN ? AND ?
        ORDER BY updatedAt DESC
        LIMIT ? OFFSET ?
    `;
        // 构建SQL查询语句，用于获取总数
        let countSql = `
      SELECT COUNT(*) AS total FROM weight 
      WHERE userId = ?
      AND updatedAt BETWEEN ? AND ?
  `;
        // 防止SQL注入，使用参数化查询
        const paramsForData = [userId, startTime, endTime, limit, offset];
        const paramsForCount = [userId, startTime, endTime];
        try {
            const [rows] = await db.query(dataSql, paramsForData);
            const [[{ total }]] = await db.query(countSql, paramsForCount);
            // 根据实际情况处理返回结果
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data: {
                    list: rows,
                    total
                },
            };
        } catch (error) {
            ctx.body = {
                code: 400,
                success: false,
                msg: '获取测量记录失败'
            }
        }
    },
    weightEdit: async (ctx) => {
        const { weightId, weight, targetWeight } = ctx.request.body
        console.log('weightId', weightId, weight, targetWeight);
        const updatedAt = new Date();
        const updateData = {
            weight,
            targetWeight,
            updatedAt
        };
        // 根据weightId 修改体重记录
        const updateWeightSql = "UPDATE weight SET ? WHERE weightId = ?";
        try {
            const updateRs = await db.query(updateWeightSql, [updateData, weightId]);
            ctx.body = {
                code: 200,
                success: true,
                msg: '修改成功',
            };
        } catch (error) {
            ctx.body = {
                code: 400,
                success: false,
                msg: '修改失败'
            }
        }
    },
    weightDel: async (ctx) => {
        const { weightId } = ctx.request.query
        console.log('weightId', weightId);
        // 根据weightId 删除体重记录
        try {
            await db.query("delete from `weight` where `weightId` = ?", [weightId])
            ctx.body = {
                code: 200,
                success: true,
                msg: '删除成功',
            }
        } catch (error) {
            ctx.body = {
                code: 400,
                success: false,
                msg: '删除失败'
            }
        }
    }
}
module.exports = weight;