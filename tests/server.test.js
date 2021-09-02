const app = require("./testserver");
// const Post = require("../models/Post");
const mongoose = require("mongoose");
const supertest = require("supertest");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Category } = require("../models/category");

dotenv.config();
beforeEach((done) => {
  mongoose.connect(
    process.env.TESTDB,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
  app.close();
});
describe("Users Endpoints", () => {
  test("GET /api/users", async () => {
    const user = await User.create({
      firstName: "trevor",
      lastName: "test",
      email: "test123@gmail.com",
      password: "1234test",
      phone: "254740902461",
      address: "10106  nyeri",
      role: "farmer",
    });

    await supertest(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);

        // Check data

        expect(response.body[0].firstName).toBe(user.firstName);
        expect(response.body[0].email).toBe(user.email);
        expect(response.body[0].phone).toBe(user.phone);
      });
  });
});

// test("POST /api/posts", async () => {
//   const data = { title: "Post 1", content: "Lorem ipsum" };

//   await supertest(app)
//     .post("/api/products")
//     .send(data)
//     .expect(200)
//     .then(async (response) => {
//       // Check the response
//       expect(response.body._id).toBeTruthy();
//       expect(response.body.title).toBe(data.title);
//       expect(response.body.content).toBe(data.content);

//       // Check data in the database
//       const product = await Product.findOne({ _id: response.body._id });
//       expect(product).toBeTruthy();
//       expect(product.title).toBe(data.title);
//       expect(product.content).toBe(data.content);
//     });
// });
describe("Category Endpoints", () => {
  test("POST /api/category/create", async () => {
    const data = {
      categoryName: "testCategory",
    };

    await supertest(app)
      .post("/api/category/create")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.data._id).toBeTruthy();
        expect(response.body.data.categoryName).toBe(data.categoryName);
        // Check data in the database
        const category = await Category.findOne({
          _id: response.body.data._id,
        });
        expect(category).toBeTruthy();

        expect(category.categoryName).toBe(data.categoryName);
      });
  });
});
// test("GET /api/posts/:id", async () => {
//   const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });

//   await supertest(app).get("/api/posts/" + post.id)
//     .expect(200)
//     .then((response) => {
//       expect(response.body._id).toBe(post.id);
//       expect(response.body.title).toBe(post.title);
//       expect(response.body.content).toBe(post.content);
//     });
// });

// test("PATCH /api/posts/:id", async () => {
//   const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });

//   const data = { title: "New title", content: "dolor sit amet" };

//   await supertest(app).patch("/api/posts/" + post.id)
//     .send(data)
//     .expect(200)
//     .then(async (response) => {
//       // Check the response
//       expect(response.body._id).toBe(post.id);
//       expect(response.body.title).toBe(data.title);
//       expect(response.body.content).toBe(data.content);

//       // Check the data in the database
//       const newPost = await Post.findOne({ _id: response.body._id });
//       expect(newPost).toBeTruthy();
//       expect(newPost.title).toBe(data.title);
//       expect(newPost.content).toBe(data.content);
//     });
// });

// test("DELETE /api/posts/:id", async () => {
//   const post = await Post.create({
//     title: "Post 1",
//     content: "Lorem ipsum",
//   });

//   await supertest(app)
//     .delete("/api/posts/" + post.id)
//     .expect(204)
//     .then(async () => {
//       expect(await Post.findOne({ _id: post.id })).toBeFalsy();
//     });
// });