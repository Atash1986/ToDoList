const axios = {
  get: jest.fn(() => Promise.resolve({ data: "mocked data" })),
};

module.exports = axios;
