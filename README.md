# React Flash Card App - README

## Introduction

Welcome to the Flash Card App! This application is an interactive learning tool that utilizes flashcards to enhance educational experiences. It's built using React and uses a JSON server for backend data management.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js and npm (Node Package Manager)
- Git (for cloning the repository)

## Installation

### Cloning the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/your-username/flash-card-app.git
cd flash-card-app
```

### Installing Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

This command will install all dependencies listed in the `package.json` file.

## Running the Application

### Starting the React App

To start the React app, run the following command in the project directory:

```bash
npm start
```

This will launch the app on `http://localhost:3000`. Open your web browser and navigate to this address to view the application.

### Starting the JSON Server

The app uses JSON Server to simulate a backend. To start the server, run:

```bash
npx json-server --watch db.json --port 5000
```

This will start the JSON Server on `http://localhost:5000`, where the app will make API requests.

## Using the Application

Once both the React app and JSON Server are running, you can use the application as follows:

- **Home Page:** Displays various projects and information.
- **Flash Cards:** Here, you can create, edit, delete, and reorder flashcards. The drag-and-drop feature allows for easy reordering.
- **Contact Me:** A form to send messages which are saved to the backend server.

## GitHub Page

You can also visit the hosted version of the app at:

[Flash Card App](https://apricityyyy.github.io/react-flashcard-app)

This link will take you to a live version of the app hosted using GitHub Pages.

## Conclusion

That's all you need to set up and run the Flash Card App locally. Enjoy exploring and using the app for your educational needs! For any issues or contributions, feel free to raise an issue or submit a pull request on the repository.
