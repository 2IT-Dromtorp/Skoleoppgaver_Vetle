# Dromtorp borrowing system

## Database-model

### Database fields

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
