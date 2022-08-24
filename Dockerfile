FROM node:latest

# global install & update
RUN npm i -g npm && npm i -g yarn --force
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && ./aws/install

# Install all dependencies - to speed up built process this is done before copying code of app
WORKDIR /app
ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock
RUN yarn


# Copy code and start the fun
ADD . /app/

# A few tests to make sure everything is working
RUN yarn checkout auto-assurance 
RUN yarn warmup auto-assurance

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "dev", "production" ]