开发环境搭建完成后, 依次执行如下命令运行本示例:

- 安装依赖
yarn

- 构建 web 程序
yarn build

- 添加平台支持
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios

- 启动程序
npx cap run android
npx cap run ios