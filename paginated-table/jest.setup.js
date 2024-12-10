import "@testing-library/jest-dom/extend-expect";
import { enableFetchMocks } from "jest-fetch-mock";

beforeAll(() => {
  enableFetchMocks();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mocked data" }),
  })
);
