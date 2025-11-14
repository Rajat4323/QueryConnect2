# QueryConnect Documentation
## Project Overview
QueryConnect is a community-driven platform designed for users to ask questions, provide answers, and connect with others who share similar interests or expertise. It aims to facilitate knowledge sharing and collaborative learning.
### Key Features
*   **Question Posting:** Users can post questions on various topics.
*   **Answer Submission:** Users can submit answers to questions posted by others.
*   **User Authentication:** Secure user registration and login system.
*   **User Profiles:** Users can view their profile, including questions and answers they've posted.
*   **Commenting:** Users can comment on answers to provide feedback or ask for clarification.
*   **Voting:** Users can upvote answers they find helpful.
*   **Responsive Design:** The platform is designed to be accessible and usable on various devices.
### Supported Platforms/Requirements
*   Node.js (version 20.x)
*   npm (or yarn)
*   MongoDB
## Getting Started
### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```
    
2.  **Navigate to the project directory:**
    ```bash
    cd QueryConnect2
    ```
    
3.  **Install dependencies:**
    ```bash
    npm install
    ```
        or
    ```bash
    yarn install
    ```
    
4.  **Set up environment variables:**
    *   Create a `.env` file in the root directory.
    *   Add the following variables, replacing the placeholders with your actual values:
                DATABASE_LINK=<your_mongodb_connection_string>
        PORT=3000
        
5.  **Run the application:**
    ```bash
    npm run dev
    ```
        or
    ```bash
    npm start
    ```
    
    This will start the server, and you can access the application in your browser at `http://localhost:3000` (or the port you specified in your `.env` file).
### Dependencies
The project relies on the following dependencies:
*   **bcrypt:** For password hashing.
*   **body-parser:** For parsing request bodies.
*   **cookie-parser:** For handling cookies.
*   **dotenv:** For loading environment variables from a `.env` file.
*   **ejs:** For templating.
*   **express:** For creating the web application.
*   **highlight.js:** For syntax highlighting (though not directly used in the provided code).
*   **jsonwebtoken:** For creating and verifying JSON Web Tokens (JWTs) for authentication.
*   **mongoose:** For interacting with MongoDB.
*   **mongoose-update-if-current:** For handling concurrent updates in Mongoose.
*   **validator:** For validating user input.
## License
This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
