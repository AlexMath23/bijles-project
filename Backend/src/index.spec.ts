import app from "./index";

const request = require("supertest");
const assert = require("assert");

// Disabling until I create real test
// describe("GET /", () => {
//   it("responds with json", function (done) {
//     request(app)
//       .get("/")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
// });

// describe("POST /api/cars/", () => {
//   it("Test response if buyer does not exist", function (done) {
//     request(app)
//       .post("/api/cars/")
//       .send({
//         name: "BMW",
//         type: "SUV",
//         price: 20000,
//         buyerId: 20,
//       })
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(404, done);
//   });
// });

// describe("POST /api/cars/", () => {
//   it("Test response if data is incorrect format", function (done) {
//     request(app)
//       .post("/api/cars/")
//       .send({
//         name: "BMW",
//         type: "SUV",
//         price: 20000,
//         //Should be Int
//         buyerId: "hello",
//       })
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(400, done);
//   });
// });
