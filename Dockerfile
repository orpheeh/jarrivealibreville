FROM node

ENV PORT 8080
ENV DOMAIN https://jarrivealibreville.orpheenve.xyz
ENV MONGOADDR mongo

WORKDIR /user/src/app

COPY package.json .

RUN npm install

EXPOSE 8080

COPY . .

RUN bash ./install/installadmin.bash


CMD ["node", "app.js"]