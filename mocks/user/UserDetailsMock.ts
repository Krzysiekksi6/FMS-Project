import { UserDetails } from "../../src/entity/user/UserDetails";

export const createMockUserDetails = (): UserDetails => {
  return {
    id: 1,
    age: 25,
    weight: 70,
    height: 175,
    chestCircumference: 90,
    waistCircumference: 75,
    hipCircumference: 95,
    armCircumference: 30,
    thighCircumference: 50,
    calfCircumference: 35,
    bmi: 0,
  };
};

export const createMockUserInvalidDetails = () => {
  return {
    id: 1,
    age: undefined,
    weight: 70,
    height: 175,
    chestCircumference: 90,
    waistCircumference: 75,
    hipCircumference: 95,
    armCircumference: 30,
    thighCircumference: 50,
    calfCircumference: 35,
    bmi: 0,
  };
};
