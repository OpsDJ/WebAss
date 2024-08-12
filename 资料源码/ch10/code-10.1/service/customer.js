// nanoid模块用于生成新客户的ID
const { nanoid } = require("nanoid")
const db = require('../utils/dbUtil')

// 返回所有客户信息
function getCustomers() {
    return db.query('select * from customer')
}

// 删除指定id的客户信息
async function remove(id) {
    await db.query('delete from customer where id = ?', [ id ])
    return true
}

// 新增或修改客户信息
async function saveOrUpdate(customerInfo) {
  // 若客户id不为空则表明该客户为此前已存在的客户
  if (customerInfo.id) {
    const {name, email, id} = customerInfo
    await db.query(
      'update customer set name = ?, email = ? where id = ?', 
      [name, email, id]
    )
  } else {
    // 对于新客户, 取 nanoid 为此新客户的id
    customerInfo.id = nanoid()
    const {name, email, id} = customerInfo
    await db.query(
      'insert into customer (id, name, email) values (?, ?, ?)',
      [id, name, email]
    )
  }
  // 返回最新的客户信息
  return customerInfo
}

module.exports = { getCustomers, remove, saveOrUpdate }