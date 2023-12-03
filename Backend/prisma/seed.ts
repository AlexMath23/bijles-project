// Add default data to database

import { db } from "../src/utils/db.server";

type Buyer = {
  firstName: string;
  lastName: string;
};

type Car = {
  name: string;
  type: string;
  price: number;
};

async function seed() {
  getBuyers().map((buyer) => {
    return db.buyer.create({
      data: {
        firstName: buyer.firstName,
        lastName: buyer.lastName,
      },
    });
  });
  const buyer = await db.buyer.findFirst({
    where: {
      firstName: "Tom",
    },
  });

  if (buyer) {
    getCars().map((car) => {
      const { name, type, price } = car;
      return db.car.create({
        data: {
          name,
          type,
          price,
          buyerId: buyer.id,
        },
      });
    });
  }
}

function getBuyers(): Array<Buyer> {
  return [
    {
      firstName: "Tom",
      lastName: "Peters",
    },
    {
      firstName: "Anna",
      lastName: "Janssens",
    },
    {
      firstName: "Dirk",
      lastName: "Kouters",
    },
  ];
}

function getCars(): Array<Car> {
  return [
    {
      name: "Tesla X",
      type: "SUV",
      price: 120.0,
    },
    {
      name: "Mercedes",
      type: "Coupé",
      price: 30.0,
    },
    {
      name: "BMW",
      type: "SUV",
      price: 70.0,
    },
  ];
}

seed();
