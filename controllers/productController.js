import Product from "../models/Product.js"
import fs from "fs"

const formatResponse = (success, data = null, message = null) => (
    {
  success,
  ...(data && { data }),
  ...(message && { message }),
    }
)
const deleteImageFile = (filePath) => 
    {
        if (filePath && fs.existsSync(filePath))
          {
            fs.unlink(filePath, (err) =>
              {
                if (err)
                    {
                         console.error("Failed to delete image:", err)
                    }

            })
          }
}

export const getProducts = async (req,res) =>
{
    try
    {
       const products = await Product.find().populate("category")
       return res.status(200).json(formatResponse(true,products))
    }
    catch(error)
    {
       return res.status(500).json(formatResponse(false,null,error.message))
    }
}

export const getProduct = async(req,res) =>
{
    try
    {
        const productID = await Product.findById(req.params.id)
    
        if(!productID)
        {
           return  res.status(404).json(formatResponse(false,null,"ProducT Not FOund") )
        }
           return res.status(200).json(formatResponse(true, productID))
    }
    catch(error)
    {
     const statusCode = error.name === "CastError" ? 400 : 500
     return  res.status(statusCode).json(formatResponse(false,null,error.message) )
    }
}
export const getProductsByCategory = async (req, res) =>
     {
        try
        {
            const categoryId = req.params.category;
            const products = await Product.find({ category: categoryId }).populate("category");

            return res.status(200).json(formatResponse(true, products));
        } 
        catch (error)
        {
            const statusCode = error.name === "CastError" ? 400 : 500;
            return res.status(statusCode).json(formatResponse(false, null, error.message));
        }
}

export const createProduct = async (req,res) =>
{
    try
    {
        if (!req.file) {
        return res.status(400).json(formatResponse(false, null, "Product image is required"))
    }

       const productData = {...req.body,image: req.file.path,}

       const newProduct = await Product.create(productData)
       return res.status(201).json(formatResponse(true, newProduct))}
    
       catch(error)
        {
            const statusCode = error.name === "ValidationError" ? 400 : 500
            return res.status(statusCode).json(formatResponse(false, null, error.message))
        }
}

export const updateProduct = async (req, res) => 
    {
    try {
        const existingProduct = await Product.findById(req.params.id)

        if (!existingProduct)
            {
                if (req.file) deleteImageFile(req.file.path)
                return res.status(404).json(formatResponse(false, null, "Product not found"))
            }

        const updateData = { ...req.body }
        
        if (req.file) 
            {
                updateData.image = req.file.path
                deleteImageFile(existingProduct.image) 
            }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,updateData,
        { 
            new: true, runValidators: true
        }
        ).populate("category")

        return res.status(200).json(formatResponse(true, updatedProduct))
            }
             catch (error) 
             {
                if (req.file) deleteImageFile(req.file.path)

        const statusCode = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500
        return res.status(statusCode).json(formatResponse(false, null, error.message))
    }
}

export const deleteProduct = async(req,res) =>
{
    try
    {
        const productDelete = await Product.findByIdAndDelete(req.params.id)

        if(!productDelete)
        {
           return res.status(404).json(formatResponse(false, null, "Product not found"))
        }
        deleteImageFile(productDelete.image)
        return res.status(200).json(formatResponse(true, null, "Product deleted successfully"))
    }
    catch(error)
    {
        const statusCode = error.name === "CastError" ? 400 : 500
        return res.status(statusCode).json(formatResponse(false, null, error.message))
    }
}