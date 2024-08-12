Vue.createApp({
  data() {
    return {
      // 所有客户信息数据
      customers: [],
      // 当前正在编辑的客户信息, 绑定界面右侧编辑区
      editCopy: {},
      // 当前是否正在与服务端通信
      isBusy: false,
    };
  },
  // 前端程序加载完成后加载客户信息
  mounted() {
    this.loadCustomers();
  },
  methods: {
    // 加载所有客户信息
    async loadCustomers() {
      try {
        this.isBusy = true
        const resp = await axios.get("/customer/getCustomers")
        this.customers = resp.data
      } catch (ex) {
        alert(ex)
      } finally {
        this.isBusy = false
      }
    },
    // 删除指定 id 的客户信息
    async remove(id) {
      try {
        this.isBusy = true;
        const resp = await axios.post("/customer/remove", { id })
        // 若服务端返回 true 表明服务端客户记录删除成功
        if (resp.data === true) {
          // 移除客户端 vm 中相应的客户记录
          const index = this.customers.findIndex((item) => item.id === id)
          this.customers.splice(index, 1)
        } else {
          alert("Failed to remove customer.")
        }
      } catch (ex) {
        alert(ex)
      } finally {
        this.isBusy = false
      }
    },
    // 保存客户信息, 此方法实现新增和修改两项功能
    async save() {
      // 若编辑副本id为空则说明是新增客户
      const isNew = !this.editCopy.id
      try {
        this.isBusy = true
        // 将编辑副本信息(编辑区中用户输入的数据)发送到服务端
        const resp = await axios.post("/customer/saveOrUpdate", {
          customerInfo: this.editCopy,
        })
        // 服务端返回的最新客户信息
        // 对于新增客户, 其中包含服务端使用nanoid模块生成的客户id
        const customerInfo = resp.data
        if (isNew) {
          // 对于新增客户将新记录添加到customers数组即可
          this.customers.push(customerInfo)
        } else {
          // 对于编辑客户信息, 使用新信息替换原有信息
          const index = this.customers.findIndex(
            (item) => item.id === customerInfo.id
          )
          this.customers.splice(index, 1, customerInfo)
        }
        // 将编辑副本信息置空, 以清空编辑区表单
        this.editCopy = {}
      } catch (ex) {
        alert(ex)
      } finally {
        this.isBusy = false
      }
    },
    // 开始编辑指定的客户信息
    startEdit(customerInfo) {
      // 此处先后使用 JSON.stringify(), JSON.parse() 方法
      // 对客户信息进行"深拷贝"
      this.editCopy = JSON.parse(JSON.stringify(customerInfo))
    },
    // 取消编辑
    cancelEdit() {
      this.editCopy = {}
    }
  }
}).mount("#app")