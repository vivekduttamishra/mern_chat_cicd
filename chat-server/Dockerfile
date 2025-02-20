# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# ✅ Copy the entire backend first (without node_modules)
COPY chat-server/ ./chat-server

# ✅ Install backend dependencies
RUN cd chat-server && npm install

# ✅ Build frontend directly into backend's public folder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build  # Vite emits to ../chat-server/public

# ✅ Set working directory back to backend
WORKDIR /app/chat-server

# Expose port 80
EXPOSE 80

# Start the backend
CMD ["npm", "start"]
