// nanoid模块用于生成新客户的ID
const { nanoid } = require("nanoid")

// 客户信息
const customers = [
    { id: 1, name: "Johnny", email: "Johnny@foo.com" }, 
    { id: 2, name: "Joanna", email: "Joanna@bar.com" },
]

// 返回所有客户信息
function getCustomers() {
  return customers;
}

// 删除指定id的客户信息
function remove(id) {
  // 取得id匹配的元素
  const index = customers.findIndex((item) => item.id === id)
  // 若无匹配元素, 返回false, 提示删除失败
  if (index < 0) return false;
  // 从客户信息数组中删除相应元素
  customers.splice(index, 1)
  return true;
}

// 新增或修改客户信息
function saveOrUpdate(customerInfo) {
  // 若客户id不为空则表明该客户为此前已存在的客户
  if (customerInfo.id) {
    // 寻找对应id匹配元素, 并替换原信息
    const index = customers.findIndex((item) => item.id === customerInfo.id)
    customers.splice(index, 1, customerInfo)
  } else {
    // 对于新客户, 取 nanoid 为此新客户的id
    customerInfo.id = nanoid()
    customers.push(customerInfo)
  }
  // 返回最新的客户信息
  return customerInfo
}

module.exports = { getCustomers, remove, saveOrUpdate }