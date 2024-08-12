const mysql = require("mysql")

// 创建数据库连接池
const pool = mysql.createPool({
	host: "localhost",     // MySQL所在的主机
  port: 3306,            // MySQL监听的端口, 默认3306
  user: "root",          // 数据库登录名
  password: "1234",      // 数据库登录密码
  database: "web_demo",  // 数据库名称
})

// 执行单条SQL语句
function query(sql, params) {
  return new Promise((resolve, reject) => {
    // pool.query 等价于
    // pool.getConnection() -> connection.query() -> connection.release()
    pool.query(sql, params, (err, results) => {
      err ? reject(err) : resolve(results)
    })
  })
}

// 批量执行多个SQL命令
// commands为数组, 数组中每个元素SQL及参数组成的数组
// 如 [ [sql1, params1], [sql2, params2], ... ]
function queryBatch(commands) {
  return new Promise(async (resolve, reject) => {
    // 取得数据库连接
    pool.getConnection((err, conn) => {
      if (err) return reject(err)
      // 开始事务
      conn.beginTransaction(async err => {
        if (err) return reject(err)
        // 执行每条SQL语句的结果
        const results = []
        try {
          // 依次执行每个命令, 并暂存结果
          for (let command of commands) {
            results.push(await _query(conn, command))
          }
          // 所有命令执行完毕, 提交事务
          conn.commit(err => {
            // 若提交事务失败则回滚事务, 否则返回结果
            err ? (conn.rollback(() => reject(err))) : resolve(results)
          });
        } catch (ex) {
          // 若出错则回滚事务
          conn.rollback(() => reject(ex))
        } finally {
          // 释放数据库连接
          conn.release()
        }
      })
    })
  })
}

// 使用给定的连接对象conn执行一个SQL命令
// 模块内供上述 queryBatch() 调用
function _query(conn, command) {
  return new Promise((resolve, reject) => {
    conn.query(command[0], command[1], (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

module.exports = {
  query,
  queryBatch
}
