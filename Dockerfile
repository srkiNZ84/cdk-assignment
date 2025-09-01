FROM node:22-alpine

EXPOSE 3000

WORKDIR /tmp

# Copy all the code into the container
COPY dist/app /tmp/app

# Install expressjs
RUN npm install express --save

# Run our application
ENTRYPOINT [ "node", "/tmp/app/index.js" ]