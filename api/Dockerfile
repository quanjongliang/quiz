FROM node:latest

# ENV PORT=3000

# ENV NODE_ENV=production

# EXPOSE ${PORT}

# Create app directory, this is in our container/in our image
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# RUN npm install -g @nestjs/cli

# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# RUN ls
# RUN npm install -g npm@8.15.1
RUN npm i --force
# RUN npm i bcrypt@latest
# RUN npm i
# RUN npm i -g typeorm pg@8.0.2
# RUN npm run build
# RUN npm run typeorm migration:generate -- -n firstInitTable
RUN npm run build
COPY . .
# RUN npm run typeorm migration:run

EXPOSE 5000
# CMD [ "npm",'run', "start" ]
CMD ["sh", "-c", "typeorm migration:run; node dist/main.js"]
# CMD ["node","dist/main"]