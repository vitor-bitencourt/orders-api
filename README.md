
# Orders API

Project proposed by Jitterbit to test development skills, this project is a simple CRUD to create orders in the DB using an API Rest


## Tech Stack

**Backend:** NodeJS

**Server:** MongoDB


## Screenshots

![App Screenshot](https://github.com/vitor-bitencourt/orders-api/blob/main/src/img/api-screenshot.png?raw=true)


## Referencies that helped me

 - [NPM Doc](https://www.npmjs.com/)
 - [Mongoose Doc](https://mongoosejs.com/)
 - [Express Doc](https://expressjs.com/)



## Features

- Read the Orders by ID
- Create New Orders
- List All Orders
- Delete the Orders
- Update the Orders



## Environment Set Up

To run this project you will need to have the Postman to send the requests and use this collection: [Postman Collection](https://github.com/vitor-bitencourt/orders-api/blob/main/src/docs/Orders.postman_collection.json).

Once you have the collection, you gotta connect the application to your database, the way I did it was by creating a DB at the MongoDB Atlas and connected the DB into the application passing the access key of the database. The key seems like this: 

**mongodb+srv://username:password@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority**

Below you can access the MongoDB Atlas to create your account and your DB

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

After creating you DB, you gotta open the index.js and change the key in this block of code:

```javascript

app.listen(port, () => {
  mongoose.connect("YOUR ACCESS KEY", {
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
  });
});

```
