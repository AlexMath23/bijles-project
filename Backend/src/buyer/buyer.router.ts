import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";

import * as BuyerService from "./buyer.service";

export const buyerRouter = express.Router();


// GET: List of all buyers
buyerRouter.get("/", async (request: Request, response: Response) => {
    try{
        const buyers = await BuyerService.listBuyers()
        return response.status(200).json(buyers)
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// GET: A single buyer by ID
buyerRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try{
        const buyer = await BuyerService.getBuyer(id)
        if(buyer){
            return response.status(200).json(buyer)
        }
        return response.status(404).json("Buyer could not be found");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// POST: Create a buyer (params: firstName, lastName)
buyerRouter.post("/", body("firstName").isString(), body("lastName").isString(), async(request: Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({ errors: errors.array() })
    }
    try{
        const buyer = request.body
        const newBuyer = await BuyerService.createBuyer(buyer)
        return response.status(201).json(newBuyer);
    } catch (error: any){
        return response.status(500).json(error.message);
    }
});

// PUT: Update a buyer
buyerRouter.put("/:id", body("firstName").isString(), body("lastName").isString(), async(request: Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({ errors: errors.array() })
    }
    const id: number = parseInt(request.params.id, 10)
    try{
        const buyer = request.body
        const updatedBuyer = await BuyerService.updateBuyer(buyer, id)
        return response.status(200).json(updatedBuyer);
    } catch (error: any){
        return response.status(500).json(error.message);
    }
});

// DELETE: Delete a buyer (ID)
buyerRouter.delete("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try{
        await BuyerService.deleteBuyer(id)
        return response.status(204).json("Buyer deletion: succes!")
    } catch (error: any){
        return response.status(500).json(error.message);
    }
});