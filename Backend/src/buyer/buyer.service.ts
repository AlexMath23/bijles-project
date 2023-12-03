import { db } from "../utils/db.server";

export type Buyer = {
  id: number;
  firstName: string;
  lastName: string;
};

//GET ALL BUYERS FUNCTION
export const listBuyers = async (): Promise<Buyer[]> => {
  return db.buyer.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

//GET SINGLE BUYER FUNCTION
export const getBuyer = async (id: number): Promise<Buyer | null> => {
  return db.buyer.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

//CREATE FUNCTION
export const createBuyer = async (buyer: Omit<Buyer, "id">): Promise<Buyer> => {
  const { firstName, lastName } = buyer;
  return db.buyer.create({
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

//UPDATE FUNCTION
export const updateBuyer = async (
  buyer: Omit<Buyer, "id">,
  id: number
): Promise<Buyer> => {
  const { firstName, lastName } = buyer;
  return db.buyer.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

//DELETE FUNCTION
export const deleteBuyer = async (id: number): Promise<void> => {
  await db.buyer.delete({
    where: {
      id,
    },
  });
};
