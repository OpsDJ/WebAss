# 使用Nginx的官方基础镜像
FROM nginx:alpine

# 删除默认配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 复制你自己的Nginx配置文件到容器中
COPY nginx.conf /etc/nginx/conf.d

# 复制SSL证书到容器中
COPY pigfun.online_bundle.pem /etc/nginx/ssl/pigfun.online_bundle.pem
COPY pigfun.online.key /etc/nginx/ssl/pigfun.online.key
