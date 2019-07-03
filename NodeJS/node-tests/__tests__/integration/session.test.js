const request = require("supertest");

const truncate = require("../utils/truncate");

const app = require("../../src/app");
const { User } = require("../../src/app/models");

const nodemailer = require("nodemailer");

jest.mock("nodemailer");

const axios = require("axios");

const transport = {
  sendMail: jest.fn()
};

const initialUser = {
  name: "Wagner",
  email: "wagnerdutra1010@gmail.com",
  password: "123"
};

const createUser = async () => {
  // factory.create('User', { password: '123456'})
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
  beforeAll(() => {
    nodemailer.createTransport.mockReturnValue(transport);
  });

  beforeEach(() => truncate());

  it("should be able to authenticate with valid credentials", async () => {
    await createUser();
    const { response } = await makeLogin();
    console.debug(axios.get.calls);
    expect(axios.get).toHaveBeenCalledWith("teste1");
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

  it("should receve email notifications when authenticared", async () => {
    const user = await createUser();
    const { response } = await makeLogin();
    await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${response.token}`);

    expect(transport.sendMail).toHaveBeenCalledTimes(1);
    expect(transport.sendMail.mock.calls[0][0].to).toBe(
      `${user.name} <${user.email}>`
    );
  });
});
