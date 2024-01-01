FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy entry script
COPY entry.sh entry.sh

SHELL ["/bin/bash", "-c"] 

# Set execute permissions
RUN chmod +x entry.sh

# Run the entry script by default

ARG NODE_ENV

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy application code to the working directory
COPY . .

# Copy the appropriate .env file
COPY .env.${NODE_ENV} .env


ENTRYPOINT ["bash", "-c", "source entry.sh && \"$@\"", "bash"]
# Command to run your application
CMD ["npm", "run", "dev"]
