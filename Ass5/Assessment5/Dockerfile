# 1. 使用Node.js 18.16.0版本的基础镜像
FROM node:18.16.0-alpine

# 2. 设置工作目录
WORKDIR /app

# 3. 复制package.json和package-lock.json
COPY package*.json ./

# 4. 安装项目依赖
RUN npm install

# 5. 复制项目的所有文件到工作目录
COPY . .

# 6. 暴露应用程序使用的端口（假设使用3000端口）
EXPOSE 3000

# 7. 指定容器启动时执行的命令
CMD ["node", "index.js"]
