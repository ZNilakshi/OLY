# Use a lightweight Node.js image
FROM node:16-slim

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy backend code
COPY . .

# Expose port
EXPOSE 5000

# Start the backend
CMD ["node", "server.js"]