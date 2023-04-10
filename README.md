# Blog JS Dose - Your Daily Dose of JS (blog-megak-back)

## Table of content

- [General Info](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#general-info)
- [Demo](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#demo)
- [Technologies/frameworks/libraries used on back-end side of project](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#technologiesframeworkslibraries-used-on-front-end-side-of-project)
- [Routes]()
- [What has been accomplished on the front-end](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#what-has-been-accomplished-on-the-front-end)
- [What has not been accomplished on the front-end](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#what-has-not-been-accomplished-on-the-front-end)
- [How to run client](https://github.com/Muniox/blog-megak-back/blob/develop/README.md#how-to-run-client)
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

- TypeScript
- Express
- Mysql

## Routes

#### Posts
  - GET /posts (get all posts)
  - GET /posts/:id (get single post with provided id)
  - POST /posts (add post) (only logged users and admins)
  - DELETE /posts/:id (delete single post with id) (only logged users and admins)
  - PUT /posts/:id (edit single post with id) (only logged users and admins)
  
#### Users
  - GET /users/search/:name? (search for all users with specified name, if name will not provided all users will be returned ) (only admins)
  - GET /users/:id (get single user with provided id) (only admins)
  - GET /users (get logged user data) (only logged users and admins)
  - POST /users/register (register user)
  - POST /users/login (log in user)
  - POST /logout (log out user)
  - DELETE /users/:id (delete user with provided id) (only admins)
  - PUT /users/:id (update user with provided id) (only admins)
  - PUT /users (uppdate logged user data) (only logged users and admins)
  



## What has been accomplished on the front-end

- Authentication (React Context)
- Authorization (JWT TOKEN)
- Routing
- Responsive web design (mobile first)
- Fetch posts data and show on Home page
- Filter posts by category on Home page
- Sanitize output from backend on front-end using "dompurify" package
- Integration with simple rich text editor
- User can create post
- User can edit his own post
- User can delete his own post
- Implementation of pages using React and Tailwind (Home, Login, Register, Single, Write)

## What has not been accomplished on the front-end

- Errors only apper in console (modal should be implemented to show errors)
- Serch input that should find posts by name not work
- User can't change avatar (default avatar for all users)
- There is no implementation of a user interface to edit their own data.
- There is no implementation of a admin interface to CRUD user data.
- Implementation of missing pages using React and Tailwind (About, Contact)
- No loaders
- No costom 404 page for routing

## How to run api

To run client localy on pc, file .env.development should have variable:

```
VITE_PATH='http://localhost:3000/'
```

Then run commands in console:

```
npm i
```

```
npm run dev
```

## Back-end

Here is a back-end repository: https://github.com/Muniox/blog-megak-back
