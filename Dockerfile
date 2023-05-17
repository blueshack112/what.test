FROM node:18.16.0-slim


COPY frontend/package.json /
COPY frontend/yarn.lock /
RUN yarn install

# required to serve the react app on the live server
RUN yarn global add serve

COPY frontend /app
WORKDIR /app

# noop files for non python projects and local development
RUN echo "#!/bin/bash" > /app/migrate.sh && chmod +x /app/migrate.sh
RUN echo "#!/bin/bash" > /usr/local/bin/start && chmod +x /usr/local/bin/start

ENV PATH=/node_modules/.bin:$PATH
ENV REACT_APP_API_ROOT="https://hassan-what-test-task-stage.us.aldryn.io/v1/api/"
ENV PORT=80
ENV HOST=0.0.0.0
ENV BROWSER='none'

RUN yarn build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]