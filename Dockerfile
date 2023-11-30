# Use an official Node runtime as a parent image
FROM node:19

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages including Serverless globally
RUN npm install
RUN npm install -g serverless

# Bundle app source
COPY . .

# Compile TypeScript (if necessary)
RUN npm run build

# Define environment variable
ENV NODE_ENV development

EXPOSE 3000

# Run serverless offline when the container launches
CMD ["sls", "offline"]
