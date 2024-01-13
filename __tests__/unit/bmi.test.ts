import { UserDetailsController } from "../../src/controller/UserDetailsController";

describe("UsedDetailsController BMI Calculator", () => {
  const userDetailsController = new UserDetailsController();

  describe("Calculate BMI", () => {
    it("TC_BMI_003: Should calculate BMI correctly for normal weight", () => {
      // Given
      const weight = 70;
      const height = 175;
      // When
      const bmi = userDetailsController.calculateBMI(weight, height);
      // Then
      expect(bmi).toBeGreaterThanOrEqual(18.5);
      expect(bmi).toBeLessThan(24.9);
    });

    it("TC_BMI_004: Should calculate BMI correctly for underweight", () => {
      // Given
      const weight = 50;
      const height = 175;
      // When
      const bmi = userDetailsController.calculateBMI(weight, height);
      // Then
      expect(bmi).toBeLessThan(18.5);
    });
    it("TC_BMI_005: Should calculate BMI correctly for overweight", () => {
      // Given
      const weight = 90;
      const height = 175;
      // When
      const bmi = userDetailsController.calculateBMI(weight, height);
      // Then
      expect(bmi).toBeGreaterThan(24.9);
    });
  });
});
