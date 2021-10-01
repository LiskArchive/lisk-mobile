import fetchMock from "fetch-mock";
import { getPriceTicker } from "./service";

const response = {
  getPriceTicker: {
    success: true,
    data: [
      {
        from: "LSK",
        to: "USD",
        rate: "1.236665476",
      },
      {
        from: "LSK",
        to: "EUR",
        rate: "0.0629581058",
      },
      {
        from: "LSK",
        to: "CHF",
        rate: "0.7833845341",
      },
      {
        from: "BTC",
        to: "USD",
        rate: "4010.2",
      },
      {
        from: "BTC",
        to: "EUR",
        rate: "3446.91",
      },
      {
        from: "BTC",
        to: "CHF",
        rate: "8159.81825053",
      },
    ],
  },
};

describe("api/lisk/service", () => {
  describe("getPriceTicker method", () => {
    beforeEach(() => fetchMock.reset());

    it("resolves correctly", async () => {
      fetchMock.once("*", response.getPriceTicker);
      const result = await getPriceTicker();
      expect(result).toEqual({
        USD: String(response.getPriceTicker.data[0].rate),
        EUR: String(response.getPriceTicker.data[1].rate),
        CHF: String(response.getPriceTicker.data[2].rate),
      });
    });

    it("handles non-500 errors", async () => {
      fetchMock.once("*", { status: 400 });

      try {
        await getPriceTicker();
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });

    it("handles errors", async () => {
      fetchMock.once("*", { throws: new TypeError("Failed to fetch") });

      try {
        await getPriceTicker();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
