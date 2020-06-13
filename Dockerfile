FROM node:12.18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
RUN npm ci --only=production
# Bundle app source
COPY . .
# 注意端口号,一定要与环境变量一致.默认为3000
EXPOSE 3000
CMD ["npm", "start"]
