const request = require("supertest");
const app = require("../app")

describe("Test hello path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/hello")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the templates path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/api/templates")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the POST method without request body", done => {
    request(app)
      .post("/api/templates")
      .then(response => {
        expect(response.statusCode).toBe(500);
        done();
      });
  });
});