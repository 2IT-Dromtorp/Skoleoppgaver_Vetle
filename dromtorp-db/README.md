# Dromtorp borrowing system

## What is this

This is an app created so the students at dromtorp vgs can borrow the schools equipment in an easy way.

## Installation

Run `npm i .` in both the server and frontend folder

For testing run `npm run dev` in both the server and frontend folder

For production run `npm run build` in the frontend folder, and `npm run server` i nthe server folder

### External libraries

#### Front-end

| Package name             | URL                                            |
| ------------------------ | ---------------------------------------------- |
| radix-ui                 | https://www.radix-ui.com                       |
| tanstack                 | https://tanstack.com                           |
| autoprefixer             | https://www.npmjs.com/package/autoprefixer     |
| class-variance-authority | https://cva.style/docs                         |
| clsx                     | https://www.npmjs.com/package/clsx             |
| lucide-react             | https://lucide.dev/guide/packages/lucide-react |
| next-themes              | https://www.npmjs.com/package/next-themes      |
| postcss                  | https://postcss.org                            |
| react                    | https://react.dev                              |
| react-hook-form          | https://react-hook-form.com                    |
| react-spinners           | https://www.npmjs.com/package/react-spinners   |
| sonner                   | https://sonner.emilkowal.ski                   |
| tailwindcss              | https://tailwindcss.com                        |
| zod                      | https://zod.dev                                |
| axios                    | https://axios-http.com                         |
| react-router-dom         | https://reactrouter.com/en/main                |
| typescript               | https://www.typescriptlang.org                 |
| vite                     | https://vitejs.dev                             |

#### Back-end

| Package name | URL                                                |
| ------------ | -------------------------------------------------- |
| express      | https://expressjs.com                              |
| jsonwebtoken | https://www.npmjs.com/package/jsonwebtoken         |
| mongodb      | https://www.mongodb.com/docs/drivers/node/current/ |

## API endpoints

All api endpoints are prefixed with /api.

**protected** means that the endpoint requires a valid Authorization header. This also means the endpoint has access to the user.

### get /api/health

Returns "Server running as expected".

### post /api/login

#### Parameters

-   username: string (the users username or loginName)
-   password: string (the users password)

#### Function

Checks if user exists and if passwords match, and if they do, creates a jwt and sends it back.

### protected post /api/addStudent

#### Parameters

-   firstName: string (the students first name)
-   lastName: string (the students last name)
-   username: string (the users username, should be the same as loginName)
-   mail: string (the students email address)
-   phone: number (the students phone number)
-   relatives: array (an array of all the students relatives)
    -   firstName: string (the relatives first name)
    -   lastName: string (the relatives last name)
    -   phone: string (the relatives phone number)
    -   mail: string (the relatives email address)
    -   address: string (the relatives address)
-   birtdate: string (the students birthdate)
-   address: object (the students full address)
    -   street: string (the students street)
    -   zipcode: number (the students zipcode)
    -   city: string (the students city)

#### Function

Adds a student to the database.

### protected post /api/addUser

#### Parameters

-   loginName: string (the users login name, should be the same as username if it's a student)
-   roles: array (the users roles, the only important roles as of now are: "student", "teacher" and "admin")
-   requirePasswordChange: boolean (id this user requires a password change next time the log on to the website)

#### Function

Adds a user with the password "Skole123" to the database.

### protected post /api/addEquipment

#### Parameters

-   name: string (the name of the equipment)

#### Function

Adds equipment to the database.

### protected get /api/getAllEquipment

Sends an array of all the equipment in the database.

### protected put /api/borrowRequest

#### Parameters

-   equipment: string (the equipments id)

#### Function

Adds a new document to the database with a reference to the user and equipment. Will only work with a student!

### protected get /api/whoami

Sends back the users data from the database.

### protected get /api/student-data

Sends back the student information for the user.

### protected get /api/requested-equipment

Sends an array of all requests in the database.

### protected post /api/answer-request

#### Parameters

-   id: string (the id of the request document i nthe database)
-   result: boolean (if the request should be approved or not)

#### Function

Removes the request and based on the result, changes the equipment to not be available and adds a reference to the student.

### protected post /api/return-equipment

#### Parameters

-   id: string (the id of the equipment to return)

#### Function

Sets the equipment to available, and removes the reference to the student.

### protected post /api/change-password

#### Parameters

-   oldPassword: string (the old password)
-   newPassword: string (the new password)

#### Function

Changes the password of the user to newPassword.

## Coding conventions

### Naming

-   For file names and JSX functions, use pascal case
-   For variables and other functions, use camel case

### Files

-   All pages should be added to the pages folder
-   All components should be added to the components folder
-   Any type declarations should be in Types.ts in assets
-   Any schema declaratiosn should be in Schemas.ts in assets
-   Any new API calls should be in UseApi as a function

## Database

This project uses **MongoDB**

### Database tree

```
dromtorp (database)
 ┣ elever (collection)
 ┃ ┣ address (json object)
 ┃ ┃ ┣ city (the students home city)
 ┃ ┃ ┣ street (the students home street)
 ┃ ┃ ┗ zipcode (the students zip code)
 ┃ ┣ birthdate (the students date of birth)
 ┃ ┣ firstName (the students first name)
 ┃ ┣ lastName (the students middle and last name)
 ┃ ┣ mail (the students school email address)
 ┃ ┣ phone (the students phone number)
 ┃ ┣ relatives (array of json objects)
 ┃ ┃ ┣ address (the relatives full address)
 ┃ ┃ ┣ firstName (the relatives first name)
 ┃ ┃ ┣ lastName (the relatives laast name)
 ┃ ┃ ┣ mail (the relatives private email address)
 ┃ ┃ ┗ phone (the relatives phone number)
 ┃ ┣ username (the students username, same as loginName in "users" collection)
 ┃ ┗ _id (the built MongoDb id)
 ┃
 ┣ requests (collection)
 ┃ ┣ date (date of creation)
 ┃ ┣ equipment (reference to "utstyr" collection)
 ┃ ┣ student (reference to "elever" collection)
 ┃ ┗ _id (the built MongoDb id)
 ┃
 ┣ users (collection)
 ┃ ┣ loginName (the name the user uses to log in, the same as a students username)
 ┃ ┣ password (the users password)
 ┃ ┣ requirePasswordChange (if the user is required to change password)
 ┃ ┣ roles (the users roles)
 ┃ ┣ salt (the passwords salt)
 ┃ ┗ _id (the built MongoDb id)
 ┃
 ┗ utstyr (collection)
   ┣ available (if the equipment is availbale or not)
   ┣ borrower (if the equipment is borrowed, a reference to "elever" collection)
   ┣ borrowRequesters (an array of the id's of the students who wants to borrow the equipment)
   ┣ name (the equipments name)
   ┗ _id (the built MongoDb id)
```

### Database references

dromtorp.requests.**equipment** -> dromtorp.**utstyr** \
dromtorp.requests.**student** -> dromtorp.**elever** \
dromtorp.utstyr.**borrower?** -> dromtorp.**elever**

## License

MIT License

Copyright (c) 2023 2IT-Dromtorp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
