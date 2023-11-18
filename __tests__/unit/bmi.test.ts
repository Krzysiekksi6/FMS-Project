import { UserDetailsController } from "../../src/controller/UserDetailsController";

describe("UsedDetailsController BMI Calculator", () => {
  const userDetailsController = new UserDetailsController();

  describe("TC_BMI_003: calculateBMI", () => {
    it("should calculate BMI correctly for normal weight", () => {
      // Given
      const weight = 70;
      const height = 175;
      // When
      const bmi = userDetailsController.calculateBMI(weight, height);
      // Then
      expect(bmi).toBeGreaterThanOrEqual(18.5);
      expect(bmi).toBeLessThan(24.9);
    });

    it("TC_BMI_004: should calculate BMI correctly for underweight", () => {
      // Given
      const weight = 50;
      const height = 175;
      // When
      const bmi = userDetailsController.calculateBMI(weight, height);
      // Then
      expect(bmi).toBeLessThan(18.5);
    });
    it("TC_BMI_005: should calculate BMI correctly for overweight", () => {
      // Given
      const weight = 90;
      const height = 175;
      // When
      const bmi = userDetailsController.calculateBMI(weight, height);
      // Then
      expect(bmi).toBeGreaterThan(24.9);
    });

    it("TC_BMI_006: should handle zero height correctly", () => {
      // Given
      const weight = 60;
      const height = 0;

      // When
      const bmi = userDetailsController.calculateBMI;

      // Then
      expect(() => bmi(weight, height)).toThrowError(
        "Invalid input. Weight must be a positive number, and height must be a positive non-zero number."
      );
    });
  });
});
