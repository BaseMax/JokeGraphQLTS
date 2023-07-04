# Joke API

This repository contains a GraphQL-based API project built with TypeScript and Apollo GraphQL. It provides various functionalities related to jokes, including retrieving jokes, filtering and ordering them, searching within jokes, adding new jokes, editing existing jokes, and deleting jokes. Additionally, the API supports user authentication for admin access, while allowing guest users to access most of the available queries. Users can also like jokes, add comments to jokes, retrieve all comments sorted by criteria, and admins have the ability to activate or deactivate comments. The project includes tests and can be deployed using Docker.

## Installation

Clone the repository:

```shell
git clone https://github.com/BaseMax/JokeGraphQLTS
cd JokeGraphQLTS
```

Install the dependencies:

```shell
npm install
```

## Usage

Configure the environment variables by creating a .env file in the project's root directory. You can use the .env.example file as a template.

Build the project:

```shell
npm run build
```

Start the server:

```shell
npm start
```

The API should now be accessible at http://localhost:4000.

## API Documentation

The API documentation can be accessed by visiting http://localhost:4000/graphql while the server is running. The documentation provides details about available queries, mutations, and their input/output types.

## Screenshots
![graphql](https://raw.githubusercontent.com/BaseMax/JokeGraphQLTS/e7a6a3af1d8d6511eae8083af8ea60fbbbb68fe2/screenshots/Screenshot%20from%202023-07-04%2020-18-58.png?token=GHSAT0AAAAAACD3HLG5WDDIJ6MJLBT2ZBJGZFEK3XA)
![graphql]([http://url/to/img.png](https://raw.githubusercontent.com/BaseMax/JokeGraphQLTS/main/screenshots/Screenshot%20from%202023-07-04%2020-47-15.png?token=GHSAT0AAAAAACD3HLG5DWFNYHGAPVZWYU6IZFEK4SA))
![graphql]([http://url/to/img.png](https://raw.githubusercontent.com/BaseMax/JokeGraphQLTS/main/screenshots/Screenshot%20from%202023-07-04%2020-47-04.png?token=GHSAT0AAAAAACD3HLG42YE272TNOLLKYD7MZFEK43A))
![graphql](https://raw.githubusercontent.com/BaseMax/JokeGraphQLTS/main/screenshots/Screenshot%20from%202023-07-04%2020-43-16.png?token=GHSAT0AAAAAACD3HLG42TRDNTAZKVMJAIMQZFEK5HQ)
![graphql](https://raw.githubusercontent.com/BaseMax/JokeGraphQLTS/main/screenshots/Screenshot%20from%202023-07-04%2020-46-00.png?token=GHSAT0AAAAAACD3HLG4RIFS26QJM7XEHERIZFEK5GA)

## Authentication

The API supports user authentication using JSON Web Tokens (JWT). In order to perform admin actions, you need to authenticate as an admin user. Here's how you can obtain an access token:

- Make a mutations request to /graphql with valid login credentials.
- If the login is successful, you will receive a response containing an access token.
- Include the access token in the Authorization header of subsequent requests using the format: Bearer <access_token>.

Please note that admin authentication is required for mutations related to adding, editing, and deleting jokes, as well as managing comments.

## Queries

The following queries are available:

- `getAllJokes`: Retrieves all jokes.
- `getJokesByFilter`: Retrieves jokes based on specified filters (e.g., category, rating).
- `searchJokes`: Searches for jokes based on a provided query string.
- `getCommentsByJoke`: Retrieves all comments for a specific joke, sorted by specified criteria (e.g., newest, highest rated).
- `getHotJokes`: Retrieves the hottest jokes based on likes and comment activity.
- `getJokeById`: Retrieves a joke by its unique identifier.
- `getTopJokes`: Retrieves the top-rated jokes based on user ratings.
- `getRandomJoke`: Retrieves a random joke from the collection.
- `getUserLikedJokes`: Retrieves jokes that a specific user has liked.

Guest users can access all of these queries.

## Mutations

The following mutations are available:

- `addJoke`: Adds a new joke to the system. Requires admin authentication.
- `editJoke`: Edits an existing joke. Requires admin authentication.
- `deleteJoke`: Deletes a joke. Requires admin authentication.
- `likeJoke`: Likes a joke.
- `reportJoke`: Report a joke
- `addComment`: Adds a comment to a joke.
- `activateComment`: Activates a comment. Requires admin authentication.
- `deactivateComment`: Deactivates a comment. Requires admin authentication.
- `registerUser`: Registers a new user in the system.
- `loginUser`: Login user in system
- `rateJoke`: Rates a joke with a given score (e.g., 1-5 stars).
- `updateUserProfile`: Updates the profile information for a user.
- `deleteUser`: Deletes a user from the system.
- `addCategory`: Adds a new category for jokes.
- `editCategory`: Edits the details of an existing category.
- `deleteCategory`: Deletes a category from the system.
- `createTag`: create a new tag
- `addTagToJoke`: Adds a tag to a joke for better categorization.
- `removeTagFromJoke`: Removes a tag from a joke.
- `getPopularTags`: Retrieves the most popular tags used for jokes.

Please note that the likeJoke, addComment, activateComment, and deactivateComment mutations require user authentication.

## Subscriptions

The following subscriptions are available:

- `jokeAdded`: Real-time display of a new joke that adds to the system

## Testing

To run the tests, use the following command:

```shell
npm run test:e2e
```

This will execute the test suite and provide the test results.

## Deployment

To deploy the API using Docker, follow these steps:

Build the Docker image:

```shell
docker build -t joke-api .
```

Run the Docker container:
```shell
docker run -p 4000:4000 joke-api
```

Also you can run api and postgres with docker-compose:
```shell
docker compose up -d
```

The API will be accessible at http://localhost:4000 within the Docker container.

## Migration

integrates with prisma schema for data modeling in deveolpment stage:
```shell
npm run migrate:dev
```

production stage: 
```shell
npm run migrate:prod
```

push current init migration: 
```shell
npm run db:push
```

## Models

**Joke Model**

```typescript
interface Joke {
  id: string;
  text: string;
  category: Category;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  tags: string[];
}
```

**Comment Model**

```typescript
interface Comment {
  id: string;
  text: string;
  user: User;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**User Model**

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  likedJokes: Joke[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Category Model**

```typescript
interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Tag Model**

```typescript
interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Rating Model**

```typescript
interface Rating {
  id: string;
  joke: Joke;
  user: User;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}
```

**Like Model**

```typescript
interface Like {
  id: string;
  joke: Joke;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
```

**TagCategory Model**

```typescript
interface TagCategory {
  id: string;
  tag: Tag;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}
```

**UserProfile Model**

```typescript
interface UserProfile {
  id: string;
  user: User;
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Report Model**

```typescript
interface Report {
  id: string;
  joke: Joke;
  user: User;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Admin Model**

```typescript
interface Admin {
  id: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
```

**Activity Model**

```typescript
interface Activity {
  id: string;
  joke: Joke;
  comment: Comment;
  user: User;
  type: string; // e.g., "like", "comment", "rating"
  createdAt: Date;
  updatedAt: Date;
}
```

**Notification Model**

```typescript
interface Notification {
  id: string;
  user: User;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

Feel free to extend or modify these models based on the specific requirements and additional fields you may need for your Joke API.

## Contributing

Contributions to this project are welcome. Feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License.

Copyright 2023, Max Base
