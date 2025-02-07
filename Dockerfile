# Use Node.js as the base image
FROM node:18-bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for efficient caching
COPY ./Source/ .

# Install dependencies
RUN npm install

# Expose Metro Bundler port
EXPOSE 8081

# Command to start the Metro Bundler
CMD ["npx", "expo", "start", "--tunnel"]
