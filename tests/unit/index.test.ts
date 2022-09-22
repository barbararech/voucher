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

    voucherService.applyVoucher(code, amount);

    expect(voucherRepository.getVoucherByCode).toBeCalled();
  });

  it("should not apply voucher if voucher doesn't exist", async () => {
    const { code, discount } = createVoucher;

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return 
          undefined
        ;
      });

    const amount = 500;

    const response = voucherService.applyVoucher(code, amount);

    expect(response).rejects.toEqual({ message: "Voucher does not exist.", type: "conflict" });
  });
});
