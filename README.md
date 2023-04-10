# Blog JS Dose - Your Daily Dose of JS (blog-megak-back)

![image](https://user-images.githubusercontent.com/81775473/230876412-fe1d2319-2630-4706-91a0-386f2eb91882.png)


## Table of content

- [General Info](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#general-info)
- [Demo](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#demo)
- [Technologies/frameworks/libraries used on back-end side of project](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#technologiesframeworkslibraries-used-on-front-end-side-of-project)
- [Routes](https://github.com/Muniox/blog-megak-back/tree/develop#routes)
- [How to get token and test api with Insomia or Postman](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#how-to-get-token-and-test-api-with-insomia-or-postman)
- [How to make user with admin privilage]()
- [What has been accomplished on the back-end](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#what-has-been-accomplished-on-the-back-end)
- [What has not been accomplished on the back-end](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#what-has-not-been-accomplished-on-the-back-end)
- [How to run api](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#how-to-run-api)
- [Link to front-end](https://github.com/Muniox/blog-megak-front)

## General info

I created a blog on JavaScript as a project for completion for the following reasons:

- Showcase Skills: Creating a blog about JavaScript allows me to demonstrate my skills and knowledge in JavaScript programming, web development, and related technologies.

- Personal Interest: JavaScript is a popular and widely used programming language for web development, and I have a keen interest in learning and exploring its various aspects.

- Relevance to Course/Subject: The project is relevant to the course or subject for which I am seeking completion, as it aligns with the curriculum or learning objectives related to JavaScript or web development.

- Practical Application: Creating a blog on JavaScript provides a practical application of the concepts and techniques learned during the course, allowing me to apply theoretical knowledge to real-world scenarios.

- Creative Expression: Designing and developing a blog allows me to exercise my creativity and express my ideas, thoughts, and coding skills in a practical and visually appealing manner.

Overall, creating a JavaScript-focused blog as a project for completion allows me to demonstrate my skills, apply theoretical knowledge, and express my creativity, while aligning with the course requirements.

## Demo

Here is a working live demo: https://blog.truemuniox.usermd.net/

## Technologies/frameworks/libraries used on back-end side of project

<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a> TypeScript

<a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express.svg" width="36" height="36" alt="Express" /></a> Express

<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mysql-colored.svg" width="36" height="36" alt="MySQL" /></a> Mysql

## Routes

#### Posts
  - GET /posts - *get all posts*
  - GET /posts/:id - *get single post with provided id*
  - POST /posts - *add post (only logged users and admins)*
  - DELETE /posts/:id - *delete single post with provided id (only logged users and admins)*
  - PUT /posts/:id - *edit single post with provided id (only logged users and admins)*
  
#### Users
  - GET /users/search/:name? - *search for all users with specified name, if name will not provided all users will be returned (only admins)*
  - GET /users/:id - *get single user with provided id (only admins)*
  - GET /users - *get logged user data (only logged users and admins)*
  - POST /users/register - *register user*
  - POST /users/login - *log in user*
  - POST /logout - *log out user*
  - DELETE /users/:id - *delete user with provided id (only admins)*
  - PUT /users/:id - *update user with provided id (only admins)*
  - PUT /users - *uppdate logged user data (only logged users and admins)*
  
  #### Api
  - POST /api/upload - *image upload (only logged users and admins)*

## How to get token and test api with Insomia or Postman

1. Make POST request to 
```
http://localhost:3000/users/register
```
![image](https://user-images.githubusercontent.com/81775473/230908361-0f067005-b123-457a-a587-4417c56cdbf9.png)
2. Make POST request to 
```
http://localhost:3000/users/login
```
![image](https://user-images.githubusercontent.com/81775473/230885230-19470167-8d3e-48f6-a384-9ca6d0a103c5.png)
3. Check token after success log in ![image](https://user-images.githubusercontent.com/81775473/230908806-e2e454cb-9806-4339-949a-0f8302a8a4e8.png)

## How to make user with admin privilage

Change role in database from user to admin
![image](https://user-images.githubusercontent.com/81775473/230920782-57e84d7c-5b4a-43b7-ac37-58e7b284b7af.png)


## What has been accomplished on the back-end

- [x] Authentication
- [x] Authorization (JWT token)
- [x] Asynchronous api
- [x] Databse connection
- [x] Active Records pattern
- [x] CRUD for posts
- [x] CRUD for users
- [x] Permision scope for user/admin
- [x] Verifying environment variables in the .env file
- [x] File storage with multer
- [x] Hashing passwords (bcrypt)
- [x] Error handling
- [x] Development/Production mode (NODE_ENV)
- [x] strategy for limiting network traffic (express-rate-limit)
- [x] CORS

## What has not been accomplished on the back-end

- [ ] Hashing passwords with salt
- [ ] The category is hardcoded, but it should be designed to be easily expandable. 
- [ ] Sanitazing post title and description should be on back-end for better UX
- [ ] Unit tests are incomplete due to a lack of time
- [ ] Lack of return types in methods in Active Records

## How to run api

Clone repository:

```
clone https://github.com/Muniox/blog-megak-back.git
```

Create database:

run SQL script file in blog-megak-back
![image](https://user-images.githubusercontent.com/81775473/230881330-1785fa4a-8ef1-4862-83ff-2700005a5929.png)

OR create database with tables as below

#### posts

![image](https://user-images.githubusercontent.com/81775473/230881149-b31b1195-f97f-4501-b887-9e449cd525b3.png)

#### users

![image](https://user-images.githubusercontent.com/81775473/230881235-f0c77402-f2e9-4d53-b94c-0d570b7f6987.png)


In order to run the API locally on your PC, the .env file should contain the following variables (Fill in according to your own database configuration):

```
NODE_ENV='development'
PORT=3000
ADDRESS='0.0.0.0'

DBHOST='localhost'
DBPORT=3306
DBNAME='db_name'
DBPASSWORD='password'
DBUSER='root'

SECRET='secret_key'
```

Then run commands in console:

```
npm i
```

```
npm run dev
```

If you forget any of the above environment variables, you will receive an error indicating that the variable is missing.

 example:<p style="vertical-align: middle">![image](https://user-images.githubusercontent.com/81775473/230882449-28f665bc-4815-4c33-9672-1cc0562c9f16.png)</p>

## Front-end

Here is a front-end repository: https://github.com/Muniox/blog-megak-front
