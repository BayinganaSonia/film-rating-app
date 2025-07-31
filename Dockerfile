# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Set default port
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Run the app
CMD ["node", "backend/server.mjs"]
