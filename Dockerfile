FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

ENV PORT=3000

ENV DATABASE_URL=postgresql://postgres:1234@localhost:5432/grocery_app?schema=public

EXPOSE 3000

CMD [ "npm", "start" ]