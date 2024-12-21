# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy application code
COPY . .

# Build the application
RUN yarn build

# Expose the port
EXPOSE 4000

# Start the application
CMD ["yarn", "start:prod"]
