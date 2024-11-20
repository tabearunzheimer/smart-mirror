# SmartMirror

## Table of Contents
- [SmartMirror](#smartmirror)
  - [Table of Contents](#table-of-contents)
  - [Project Setup](#project-setup)
  - [Running the App Locally](#running-the-app-locally)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running the Docker Container](#running-the-docker-container)
  - [Docker Compose](#docker-compose)
  - [Project Structure](#project-structure)
  - [License](#license)

## Project Setup

1. **Clone the Repository**:

   ```bash
   git clone {{your-repository-url}}
   cd smart-mirror
   ```

2. Install Dependencies:
Before running or building the app, install the required dependencies:
    ```bash
    npm install
    ```

## Running the App Locally
To start the app locally during development (without Docker):

1. Serve the Angular App:
Use the Angular CLI to start the development server:
    ```bash 
    npm start
    ```
    The app will be available at http://localhost:4200.

## Building the Docker Image
To build the Docker image for production:

1. Build the Docker Image:
   
    Run the following command to build the Docker image:
    ```bash
    npm run docker-build
    ```
    This will use the `Dockerfile` in the `scripts/docker/` directory to build the image and tag it as your-angular-app.

1. Build the Docker Image (using Docker Compose):

    Alternatively, you can use Docker Compose to build and start the container:
    ```bash
    npm run docker-compose-up
    ```
    This will build the image and start the container as defined in the `docker-compose.yml` file.

## Running the Docker Container

Once the Docker image is built, you can run it with Docker:

1. Run the Docker Container:
    ```bash
    npm run docker-run
    ```
    This will start the container and map port 80 inside the container to port 8080 on your local machine. You can access the app at http://localhost:8080.

2. Access the App:

    After running the container, visit http://localhost:8080 in your browser to see the app.

## Docker Compose
Docker Compose allows you to run multiple services in one command (e.g., for API backend services or databases). Here’s how to use it.

1. Start Services Using Docker Compose:

    If you're using Docker Compose to manage services, run:
    ```bash
    npm run docker-compose-up
    ```
    This will build and start all the services defined in docker-compose.yml (located in scripts/docker/).

2. Stop and Remove Containers:

    To stop and remove the containers, use:
    ```bash
    npm run docker-compose-down
    ```

## Project Structure
Here's an overview of the project structure:

```
your-angular-app/
├── src/
├── dist/
├── angular.json
├── package.json
├── scripts/
│   ├── docker/          
│   ├── weather-today.sh
└── README.md
```

- `src/`: Contains the source code for the Angular app.
- `dist/`: The folder where the built app is output after running ng build.
- `scripts/docker/`: Contains all the Docker-related files, including `Dockerfile` and `docker-compose.yml`.
- `weather-today.sh`: Sample script to fetch weather data from german provider wetter.com.
- `deploy.sh`: A deployment script for pushing your Docker image to a registry or deploying to a server.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
