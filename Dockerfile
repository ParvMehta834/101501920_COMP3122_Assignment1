# Backend Dockerfile
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies (only production deps)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 8081

# Start the server
CMD ["npm", "start"]
