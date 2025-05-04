import { Request, Response, NextFunction } from 'express';
import Product from '../models/product.model';
import mongoose from 'mongoose';

export const getAllProducts = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid product ID');
    res.status(400);
    return next(error);
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      res.status(404);
      return next(error);
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};
