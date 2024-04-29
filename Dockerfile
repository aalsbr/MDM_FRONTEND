# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application for production
RUN npm run build

# Use Nginx to serve the build folder
FROM nginx:1.21.1-alpine

# Copy the build output to replace the default Nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]