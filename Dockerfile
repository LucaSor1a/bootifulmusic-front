# pull official base image
FROM node:16.13-alpine

# set working directory
WORKDIR /front

ENV PATH /bootifulmusic-front/node_modules/.bin:$PATH

# add app
COPY . ./

# install app dependencies
RUN npm install --silent
RUN npm run build
RUN npm install -g serve

# start app
# CMD ["npm", "start"]
CMD ["serve", "-s", "build"]
