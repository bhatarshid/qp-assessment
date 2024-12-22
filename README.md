# Grocery App

## Description
The Grocery App is an Express.js application that provides routes for managing grocery items and user operations. It uses Prisma ORM for database interactions and supports both user and admin functionalities.

## Features
- User Routes:
  - Add User
  - View Grocery Items
  - Book Grocery Items
- Admin Routes:
  - Add Grocery Item
  - Get Grocery Items
  - Delete Grocery Item
  - Update Grocery Item
  - Add Quantity to Item

## Getting Started

### Prerequisites
- Node.js (version 20)
- PostgreSQL

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/bhatarshid/qp-assessment.git
    ```
2. Navigate to the project directory:
    ```bash
    cd qp-assessment
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
1. DATABASE_URL=your_postgres_connection_string
2. PORT=3000


### Running the Application
1. Run Migration
    ```bash
    npx prisma migrate dev --name init
    ```
2. Generate Prisma client:
    ```bash
    npx prisma generate
    ```
3. To run the application. Follow one of the following:
   - Method 1:
       - Build the application:
        ```bash
        npm run build
        ```
       - Start the application:
        ```bash
        node dist/index.js
        ```
   - Method 2:
       ```bash
        npm run buildStart
        ```
   - Method 3:
       ```bash
       npm start
       ```
The application will be running on `http://localhost:3000`.

### Postman Collection.
You can find the Postman collection [here](https://github.com/bhatarshid/qp-assessment/blob/main/collection/qp-assessment.postman_collection.json).<br /> 
To use the collection, import it into your Postman.

### Using Docker
To run the application using Docker, use the provided `Dockerfile`.

1. Build the Docker image:
    ```bash
    docker build -t qp-assessment .
    ```
2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 <imageId>
    ```

## API Endpoints

### User Routes
- `POST /api/user/add`: Add a new user.
- `GET /api/user/grocery`: View grocery items.
- `PUT /api/user/grocery`: Book grocery items.

### Admin Routes
- `POST /api/admin/item`: Add a new grocery item.
- `GET /api/admin/item`: Get all grocery items.
- `DELETE /api/admin/item/:id`: Delete a grocery item by ID.
- `PUT /api/admin/item`: Update a grocery item.
- `PUT /api/admin/item/:id/quantity/:count`: Add or remove quantity of a grocery item. Use `?type=add` or `?type=remove` query parameter.

