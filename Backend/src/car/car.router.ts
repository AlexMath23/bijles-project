import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CarService from "./car.service";
import { HttpError } from "../error-types";

export const carRouter = express.Router();

// GET: List of all cars
carRouter.get("/", async (request: Request, response: Response) => {
  try {
    const cars = await CarService.listCars();
    return response.status(200).json(cars);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: A single car by ID
carRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const car = await CarService.getCar(id);
    if (car) {
      return response.status(200).json(car);
    }
    return response.status(404).json("Car could not be found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// // // POST: Create a car (params: name, type, price, owner)
carRouter.post(
  "/",
  body("name").isString(),
  body("type").isString(),
  body("price").isNumeric(),
  body("buyerId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const car = request.body;
      const newCar = await CarService.createCar(car);
      return response.status(201).json(newCar);
    } catch (error: any) {
      if (error instanceof HttpError && error.statusCode == 404) {
        return response.status(404).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }
);

// // PUT: Update a car
// carRouter.put(
//   "/:id",
//   body("name").isString(),
//   body("type").isString(),
//   body("price").isNumeric(),
//   body("owner").isString(),
//   async (request: Request, response: Response) => {
//     const errors = validationResult(request);
//     if (!errors.isEmpty()) {
//       return response.status(400).json({ errors: errors.array() });
//     }
//     const id: number = parseInt(request.params.id, 10);
//     try {
//       const car = request.body;
//       const updatedCar = await CarService.updateCar(car, id);
//       return response.status(200).json(updatedCar);
//     } catch (error: any) {
//       return response.status(500).json(error.message);
//     }
//   }
// );

// // DELETE: Delete a car (ID)
// carRouter.delete("/:id", async (request: Request, response: Response) => {
//   const id: number = parseInt(request.params.id, 10);
//   try {
//     await CarService.deleteCar(id);
//     return response.status(204).json("Car deletion: succes!");
//   } catch (error: any) {
//     return response.status(500).json(error.message);
//   }
// });
