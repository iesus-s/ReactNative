# Use Node.js as the base image
FROM node:18-bullseye

# Set the working directory inside the container
WORKDIR /Source

# Copy package.json and package-lock.json first for efficient caching
COPY ./Source/package*.json ./

# Install dependencies
RUN npm install -y

# Copy the rest of the app files
COPY ./Source/ /Source/

# Set the working directory to the app folder
WORKDIR /Source

# Expose Metro Bundler port
EXPOSE 8081

# Start the Metro Bundler inside /Source/app
CMD ["npx", "expo", "start", "--tunnel"]
