# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the application port (e.g., 3000 for a typical Node.js app)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
