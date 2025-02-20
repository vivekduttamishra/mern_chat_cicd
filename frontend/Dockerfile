# Build Stage
FROM node:18 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the frontend
COPY . .
RUN npm run build

# Deploy Stage using Nginx
FROM nginx:alpine

# Copy build files to Nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
