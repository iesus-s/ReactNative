# Use the Node.js official image
FROM node:18

# Set the working directory inside the container
WORKDIR ./

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install express --save
RUN npm install body-parser --save
RUN npm install cors --save

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
