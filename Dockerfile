FROM node:12
LABEL api.maintainer.name="Abou Bakr Gbané"
LABEL api.maintainer.email="aboubakr.gbane@gmail.com"

ARG APP_ROOT

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p $APP_ROOT && cp -a /tmp/node_modules $APP_ROOT

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR $APP_ROOT
ADD . $APP_ROOT

# Define app's port
EXPOSE 5000

ENTRYPOINT [ "yarn", "run", "start:dev" ]