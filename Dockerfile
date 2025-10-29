# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the static files from the 'public' directory to the Nginx html directory
COPY public/ /usr/share/nginx/html

# The Nginx base image already exposes port 80, so we don't need to.