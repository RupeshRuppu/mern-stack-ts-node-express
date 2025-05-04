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

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, price, imageUrl, ...rest } = req.body;
  if (!name || !price || !imageUrl) {
    const error = new Error('All fields are required');
    res.status(400);
    return next(error);
  }
  try {
    const product = await Product.create({ name, price, imageUrl, ...rest });
    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { name, price, imageUrl } = req.body;
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
    product.name = name || product.name;
    product.price = price || product.price;
    product.imageUrl = imageUrl || product.imageUrl;
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
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
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      const error = new Error('Product not found');
      res.status(404);
      return next(error);
    }
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
