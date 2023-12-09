import { Request, Response } from "express";
import { In } from "typeorm";
import { connectDatabase } from "../../config/connectDatabase";
import { Diet } from "../../entity/diet/Diet";
import { DietCategory } from "../../entity/diet/DietCategory";
import { WeeklyDiet } from "../../entity/diet/WeeklyDiet";
import { DailyDiet } from "../../entity/diet/DailyDiet";
import { DailyMeal } from "../../entity/diet/DailyMeal";
import { Dish } from "../../entity/dish/Dish";

export class DietController {
  private dietRepository = connectDatabase.getRepository(Diet);
  private weeklyDietRepository = connectDatabase.getRepository(WeeklyDiet);
  private dailyDietRepository = connectDatabase.getRepository(DailyDiet);
  private dailyMealRepository = connectDatabase.getRepository(DailyMeal);
  private dishRepository = connectDatabase.getRepository(Dish);

  async getAllDiets(req: Request, res: Response) {
    const diets =  await this.dietRepository.find({
        relations: {
            dietCategory: true
        }
    });
    if (!diets) {
      return res.status(404).json({ message: "Diets not found" });
    }
    console.log(diets)

    return res.status(200).json(diets);
  }

  async createDiet(req: Request, res: Response) {
    const { name, description, durationWeeks, caloriesPerDay, dietCategoryId } =
      req.body;
    const diet = this.dietRepository.create({
      name,
      description,
      durationWeeks,
      caloriesPerDay,
      dietCategory: { id: dietCategoryId },
    });
    const createdDiet = await this.dietRepository.save(diet);
    const weeklyDiets = [];
    for (let i = 1; i <= durationWeeks; i++) {
      const weekName = `Tydzień ${i}`;
      const weeklyDiet = this.weeklyDietRepository.create({
        weekName,
        diet: { id: createdDiet.id },
      });
      weeklyDiets.push(weeklyDiet);
    }
    const savedWeeklyDiet = await this.weeklyDietRepository.save(weeklyDiets);

    res.status(201).json({
      message: "Diet created successfully",
      createdDiet,
      savedWeeklyDiet,
    });
  }

  async addDayToWeek(req: Request, res: Response) {
    const {
      weeklyDietId,
      dayOfWeek,
      date,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    } = req.body;

    const weeklyDiet = await this.weeklyDietRepository.findOne({
      where: {
        id: weeklyDietId,
      },
    });
    if (!weeklyDiet) {
      return res.status(404).json({ error: "WeeklyDiet not found" });
    }

    const newDay = this.dailyDietRepository.create({
      weeklyDiet,
      dayOfWeek,
      date,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    });
    await this.dailyDietRepository.save(newDay);

    res
      .status(201)
      .json({ message: "Day added to the week successfully", newDay });
  }

  async addMealToDay(req: Request, res: Response) {
    const { dailyDietId, mealType, dishIds } = req.body;

    // Sprawdź, czy istnieje taki dzień diety
    const dailyDiet = await this.dailyDietRepository.findOne({
      where: {
        id: dailyDietId,
      },
      relations: {
        dailyMeals: true,
      },
    });
    if (!dailyDiet) {
      return res.status(404).json({ error: "DailyDiet not found" });
    }

    const existingMeal = dailyDiet.dailyMeals.find(
      (meal) => meal.mealType === mealType
    );
    if (existingMeal) {
      return res.status(400).json({
        error: `Meal of type ${mealType} already exists for this day`,
      });
    }

    // Pobierz dania na podstawie przesłanych identyfikatorów
    const dishes = await this.dishRepository.findBy({
      id: In([...dishIds]),
    });

    // Dodaj nowy posiłek do danego dnia
    const newMeal = this.dailyMealRepository.create({
      dishes,
      mealType,
      dailyDiet,
    });
    const savedMeal = await this.dailyMealRepository.save(newMeal);

    res
      .status(201)
      .json({ message: "Meal added to the day successfully", savedMeal });
  }
}
