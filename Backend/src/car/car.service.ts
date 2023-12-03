import { db } from "../utils/db.server";
import type { Buyer } from "../buyer/buyer.service";
import { HttpError } from "../error-types";

type Car = {
  id: number;
  name: string;
  type: string;
  price: number;
  owner: Buyer;
  // buyer: Buyer;
  buyerId: number;
};

//GET ALL CARS FUNCTION
export const listCars = async (): Promise<Car[]> => {
  return db.car.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      price: true,
      owner: true,
      buyerId: true,
      // buyer: {
      //     select: {
      //         id: true,
      //         firstName: true,
      //         lastName: true
      //     }
      // }
    },
  });
};

//GET SINGLE CAR FUNCTION
export const getCar = async (id: number): Promise<Car | null> => {
  return db.car.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      type: true,
      price: true,
      owner: true,
      buyerId: true,
    },
  });
};

//CREATE CAR FUNCTION
export const createCar = async (car: Omit<Car, "id">): Promise<Car> => {
  const { name, type, price, buyerId } = car;
  const buyer = await db.buyer.findUnique({
    where: {
      id: buyerId,
    },
  });
  if (buyer === null) {
    throw new HttpError(404, `Buyer: ${buyerId} does not exist`);
  }
  return db.car.create({
    data: {
      name,
      type,
      price,
      buyerId,
    },
    select: {
      id: true,
      name: true,
      type: true,
      price: true,
      owner: true,
      buyerId: true,
    },
  });
};

// //UPDATE CAR FUNCTION
// export const updateCar = async (
//   car: Omit<Car, "id">,
//   id: number
// ): Promise<Car> => {
//   const { name, type, price, owner } = car;
//   return db.car.update({
//     where: {
//       id,
//     },
//     data: {
//       name,
//       type,
//       price,
//       owner,
//     },
//     select: {
//       id: true,
//       name: true,
//       type: true,
//       price: true,
//       owner: true,
//     },
//   });
// };

// //DELETE CAR FUNCTION
// export const deleteCar = async (id: number): Promise<void> => {
//   await db.car.delete({
//     where: {
//       id,
//     },
//   });
// };
