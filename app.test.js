import request from "supertest";
import app from "./app.js";
import fs from "fs";

describe("setup test", () => {
  test("should ensure testing works!", async () => {
    const user = { test: "testing works!" };
    expect(user.test).toBe(user.test);
  });
});

describe("test root server endpoint", () => {
    test("should be able to access server and return 200", async () => {
        const response = await request(app).get("/").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({});
      });
})
