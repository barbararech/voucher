import { jest } from "@jest/globals";
import voucherRepository from "../../src/repositories/voucherRepository";
import voucherService from "../../src/services/voucherService";
import { faker } from "@faker-js/faker";

const createVoucher = {
  code: faker.random.alphaNumeric(5),
  discount: faker.datatype.number({ min: 1, max: 100 }),
};

describe("tests voucher", () => {
  it("should create voucher", async () => {
    const { code, discount } = createVoucher;

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(voucherRepository, "createVoucher")
      .mockImplementationOnce((): any => {});

    await voucherService.createVoucher(code, discount);
    expect(voucherRepository.getVoucherByCode).toBeCalled();
  });

  it("should not create duplicated voucher", async () => {
    const { code, discount } = createVoucher;

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return {
          code,
          discount,
        };
      });

    const result = voucherService.createVoucher(code, discount);
    expect(result).rejects.toEqual({
      message: "Voucher already exist.",
      type: "conflict",
    });
  });

  it("should apply voucher", async () => {
    const { code, discount } = createVoucher;

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          code,
          discount,
          used: false,
        };
      });

    const amount = 500;

    jest
      .spyOn(voucherRepository, "useVoucher")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(voucherRepository, "useVoucher")
      .mockImplementationOnce((): any => {});

    let response = await voucherService.applyVoucher(code, amount);

    expect(response.finalAmount).toBe(amount - amount * (discount / 100));
  });

  it("should not apply voucher if voucher doesn't exist", async () => {
    const { code, discount } = createVoucher;

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return;
        undefined;
      });

    const amount = 500;

    const response = voucherService.applyVoucher(code, amount);

    expect(response).rejects.toEqual({
      message: "Voucher does not exist.",
      type: "conflict",
    });
  });

  it("should not apply voucher if voucher is already used", async () => {
    const { code, discount } = createVoucher;

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          code,
          discount,
          used: true,
        };
      });

    const amount = 500;

    const response = await voucherService.applyVoucher(code, amount);

    expect(response.finalAmount).toBe(amount);
  });

  it("should not apply voucher if amount is smaller than 100", async () => {
    const { code, discount } = createVoucher;

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          code,
          discount,
          used: true,
        };
      });

    const amount = 99;

    const response = await voucherService.applyVoucher(code, amount);

    expect(response.finalAmount).toBe(amount);
  });
});
