FROM node:18.16.0-slim


COPY frontend/package.json /
COPY frontend/yarn.lock /
RUN yarn install


COPY frontend /app
WORKDIR /app


ENV PATH=/node_modules/.bin:$PATH

CMD yarn build