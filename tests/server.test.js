const app = require("./testserver");
// const Post = require("../models/Post");
const mongoose = require("mongoose");
const supertest = require("supertest");
const express = require("express");
const dotenv = require("dotenv");
const { User } = require("../models/user");

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
  let testToken, userId, userProfile;

  test("GET /api/login", async () => {
    const user = {
      firstName: "trevor",
      lastName: "test",
      email: "testmail@gmail.com",
      password: "1234test",
      phone: "254740902461",
      address: "10106  nyeri",
      role: "farmer",
    };
    await supertest(app)
      .post("/api/register")
      .send(user)
      .then(async (response) => {
        userId = response.body.user._id;
      });

    await supertest(app)
      .post("/api/login")
      .send({
        email: "testmail@gmail.com",
        password: "1234test",
      })
      .then(async (response) => {
        testToken = response.body.token;
      });
    await supertest(app)
      .get(`/api/user/${userId}`)
      .expect(200)
      .then((response) => {
        userProfile = response.body;
        expect(JSON.stringify(response.body._id)).toStrictEqual(
          JSON.stringify(userId)
        );
      });
  });
  describe("Users Endpoints", () => {
    test("GET /api/users", async () => {
      const user = await User.create(
        {
          firstName: "trevor",
          lastName: "test",
          email: "test123@gmail.com",
          password: "1234test",
          phone: "254740902461",
          address: "10106  nyeri",
          role: "farmer",
        },
        {
          firstName: "test",
          lastName: "test",
          email: "test@gmail.com",
          password: "1234test",
          phone: "254740902461",
          address: "10106  nyeri",
          role: "farmer",
        }
      );

      await supertest(app)
        .get(`/api/users`)
        .expect(200)
        .then((response) => {
          expect(response.body[0].email).toStrictEqual(user[0].email);
          expect(response.body[1].email).toStrictEqual(user[1].email);
        });
    });

    test("GET /api/users", async () => {
      const farmer = await User.create({
        firstName: "trevor",
        lastName: "test",
        email: "test123@gmail.com",
        password: "1234test",
        phone: "254740902461",
        address: "10106  nyeri",
        role: "farmer",
      });
      await supertest(app)
        .get("/api/farmers")
        .expect(200)
        .then((response) => {
          // Check type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
          // Check data

          expect(response.body[0].role).toBe(farmer.role);
        });

      const buyer = await User.create({
        firstName: "trevor",
        lastName: "test",
        email: "test123@gmail.com",
        password: "1234test",
        phone: "254740902461",
        address: "10106  nyeri",
        role: "buyer",
      });
      await supertest(app)
        .get("/api/buyers")
        .expect(200)
        .then((response) => {
          // Check type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
          // Check data

          expect(response.body[0].role).toBe(buyer.role);
        });

      const driver = await User.create({
        firstName: "trevor",
        lastName: "test",
        email: "test123@gmail.com",
        password: "1234test",
        phone: "254740902461",
        address: "10106  nyeri",
        role: "driver",
      });
      await supertest(app)
        .get("/api/drivers")
        .expect(200)
        .then((response) => {
          // Check type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
          // Check data

          expect(response.body[0].role).toBe(driver.role);
        });
    });
  });

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
    test("GET /api/category/:categoryId", async () => {
      const category = await Category.create({
        categoryName: "pumpkins",
      });

      await supertest(app)
        .get(`/api/category/${category._id}`)
        .expect(200)
        .then((response) => {
          expect(JSON.stringify(response.body._id)).toStrictEqual(
            JSON.stringify(category._id)
          );
          expect(response.body.categoryName).toStrictEqual(
            category.categoryName
          );
        });
    });

    test("GET /api/categories", async () => {
      const category = await Category.create(
        {
          categoryName: "pumpkins",
        },
        {
          categoryName: "cereals",
        }
      );

      await supertest(app)
        .get(`/api/categories`)
        .expect(200)
        .then((response) => {
          expect(response.body[0].categoryName).toStrictEqual(
            category[0].categoryName
          );
          expect(response.body[1].categoryName).toStrictEqual(
            category[1].categoryName
          );
        });
    });
  });

  describe("orders Endpoints", () => {});
});
