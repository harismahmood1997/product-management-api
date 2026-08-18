import Category from "../models/Category.js"

const formatResponse = (success, data = null, message = null) => (
    {
  success,
  ...(data && { data }),
  ...(message && { message }),
}
)

export const getCategories = async (req,res) =>
{
    try
    {
        const categories = await Category.find();
       return res.status(200).json(formatResponse(true,categories))
    }
    catch(error)
    {
       return res.status(500).json(formatResponse(false,null,error.message))
    }
}

export const getCategory = async(req,res) =>
{
    try
    {
        const categoryID = await Category.findById(req.params.id)
    
        if(!categoryID)
        {
           return  res.status(404).json(formatResponse(false,null,"CategorY Not FOund") )
        }
        return res.status(200).json(formatResponse(true, categoryID));
    }
    catch(error)
    {
     const statusCode = error.name === "CastError" ? 400 : 500
     return  res.status(statusCode).json(formatResponse(false,null,error.message) )
    }
}

export const createCategory = async (req,res) =>
{
    try
    {
        const newCategory = await Category.create(req.body)
        return res.status(201).json(formatResponse(true, newCategory))
    }
    catch(error)
    {
        const statusCode = error.name === "ValidationError" ? 400 : 500
        return res.status(statusCode).json(formatResponse(false, null, error.message))
    }
}

export const updateCategory = async(req,res) =>
{
    try 
    {
    const changingCategory = await Category.findByIdAndUpdate(
        req.params.id,req.body,
        {
            new : true,
            runValidators : true
        })
            if(!changingCategory)
            {
                return res.status(404).json(formatResponse(false, null, "Category not found"))
            }
        return res.status(200).json(formatResponse(true, changingCategory))    }
    catch(error)
    {
     const statusCode = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500
     return res.status(statusCode).json(formatResponse(false, null, error.message))
    }
}

export const deleteCategory = async(req,res) =>
{
    try
    {
        const categoryDelete = await Category.findByIdAndDelete(req.params.id)

        if(!categoryDelete)
        {
           return res.status(404).json(formatResponse(false, null, "Category not found"));
        }
        return res.status(200).json(formatResponse(true, null, "Category deleted successfully"));
    }
    catch(error)
    {
        const statusCode = error.name === "CastError" ? 400 : 500
    return res.status(statusCode).json(formatResponse(false, null, error.message))
    }
}