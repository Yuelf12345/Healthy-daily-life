const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
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
const user = {
    userLogin: async (ctx) => {
        const { username, password } = ctx.request.body
        console.log('接收到参数:', username, password);
        let rs = await db.query("select * from users where username =?", [username]);
        if (rs[0].length > 0) {
            let res
            for (let i = 0; i < rs[0].length; i++) {
                const user = rs[0][i];
                if (user.password == password) {
                    res = {
                        code: 200,
                        success: true,
                        msg: '登录成功',
                        data: {
                            ...user,
                            token: jwt.sign({ username: user.username }, 'healthy', { expiresIn: '10h' }),
                        }
                    };
                    found = true;
                    // 修改用户登录时间信息
                    await db.query("update users set updatedAt = ? where username = ?", [new Date(), username]);
                    break; // 跳出循环
                } else {
                    res = {
                        code: 204,
                        success: false,
                        msg: '密码错误',
                    };
                }
            }
            ctx.body = res;
        } else {
            ctx.body = {
                code: 202,
                success: false,
                msg: '用户不存在',
            }
        }
    },
    userRegister: async (ctx) => {
        const id = uuid();
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        const gender = null;
        const age = null;
        const avatar = `http://localhost:6060/default_avatar/avatar${Math.floor(Math.random() * 10)}.webp`;
        const createdAt = new Date();
        const updatedAt = new Date();
        try {
            // 判定用户在数据库是否存在
            const rs = await db.query("select * from users where username =?", [username])
            if (rs[0].length > 0) {
                ctx.body = {
                    code: 201,
                    success: false,
                    msg: '改用户已存在,请使用其他用户名',
                }
                return;
            }
            const insertUserSql = `
                INSERT INTO users (id, username, password, gender, age, avatar, createdAt, updatedAt)
                VALUES (?, ?, ?,?,?, ?, ?, ?)
            `;
            await db.query(insertUserSql, [
                id, username, password, gender, age, avatar, createdAt, updatedAt
            ])
            ctx.body = {
                code: 200,
                success: true,
                msg: '注册成功',
            }
        } catch (error) {
            ctx.body = {
                code: 400,
                success: false,
                msg: 'error' + error,
            }
        }
    },
    // 获取用户信息
    userInfo: async (ctx) => {
        const { id } = ctx.request.body
        const rs = await db.query("select * from users where id =?", [id])
        if (rs[0].length > 0) {
            ctx.body = {
                code: 200,
                success: false,
                msg: '用户获取成功',
                data: rs[0][0]
            }
            return;
        } else {
            ctx.body = {
                code: 202,
                success: false,
                msg: '用户不存在',
            }
        }
    },
    // 用户信息修改
    userEdit: async (ctx) => {

        const { id, username, password, gender, age } = ctx.request.body
        try {
            // 判定用户在数据库是否存在（除了当前正在编辑的用户自己）
            const checkUserSql = "SELECT * FROM users WHERE username = ? AND id != ?";
            const checkRs = await db.query(checkUserSql, [username, id]);
            if (checkRs[0].length > 0) {
                ctx.body = {
                    code: 201,
                    success: false,
                    msg: '该用户已存在,请使用其他用户名',
                };
                return;
            }
            // 根据id修改用户信息
            // 准备更新用户信息的数据对象
            const updateData = {
                username,
                password,
                gender,
                age
            };

            // 根据id修改用户信息
            const updateUserSql = "UPDATE users SET ? WHERE id = ?";
            const updateRs = await db.query(updateUserSql, [updateData, id]);
            ctx.body = {
                code: 200,
                success: true,
                msg: '修改成功',
            };
        } catch (error) {
            console.log(error);
            ctx.body = {
                code: 400,
                success: false,
                msg: 'error' + error,
            }
        }
    },
    uploadAvatar: async (ctx) => {
        const { avatar: { newFilename, filepath, mimetype } } = ctx.request.files
        const { id } = ctx.request.body

        // 指定用户id为头像文件名
        // const newPath = path.join('./public/avatar', `${id}.${mimetype.split('/')[1]}`);
        // const avatarPath = `http://localhost:6060/avatar/${id}.${mimetype.split('/')[1]}`
        // await fs.rename(filepath, newPath);


        const avatarPath = `http://localhost:6060/avatar/${newFilename}`
        // 根据id更新用户头像
        try {
            const updateUserSql = "UPDATE users SET avatar = ? WHERE id = ?";
            const updateRs = await db.query(updateUserSql, [avatarPath, id]);
            ctx.body = {
                code: 200,
                success: true,
                msg: '上传成功'
            };
        } catch (error) {
            ctx.body = {
                code: 400,
                success: false,
                msg: '上传失败'
            }
        }
    }
}
module.exports = user;