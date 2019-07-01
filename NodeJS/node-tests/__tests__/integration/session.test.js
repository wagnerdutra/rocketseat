const request = require("supertest");

const truncate = require("../utils/truncate");

const app = require("../../src/app");
const { User } = require("../../src/app/models");

const initialUser = {
  name: "Wagner",
  email: "wagnerdutra1010@gmail.com",
  password: "123"
};

const createUser = async () => {
  const user = await User.create(initialUser);
  return user;
};

const makeLogin = async (loginUser = {}) => {
  const response = await request(app)
    .post("/sessions")
    .send({ ...initialUser, ...loginUser });

  return { response };
};

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should be able to authenticate with valid credentials", async () => {
    await createUser();
    const { response } = await makeLogin();
    expect(response.status).toBe(200);
  });

  it("should not be able to authenticate with invalid credentials", async () => {
    await createUser();
    const { response } = await makeLogin({ password: "123456" });
    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    await createUser();
    const { response } = await makeLogin();
    expect(response.body).toHaveProperty("token");
  });

  it("should be able to acces private routes when authenticated", async () => {
    const user = await createUser();
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });

  it("should not be able to acces private routes when not authenticated", async () => {
    const response = await request(app).get("/dashboard");
    expect(response.status).toBe(401);
  });

  it("should not be able to acces private routes when not authenticated", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", "Bearer 1231231");
    expect(response.status).toBe(401);
  });
});
