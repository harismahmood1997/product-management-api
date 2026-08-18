import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const formatResponse = (success, data = null, message = null) => ({
  success,
  ...(data && { data }),
  ...(message && { message }),
})

export const register = async (req , res) =>
{
    try {
    const {name,email,password} = req.body
    
    if(!name || !email || !password)
        {
    return res.status(400).json(false,null,"All field are required")
        }

    const existingUser = await User.findOne({email})
    if(existingUser)
    {
     return res.status(400).json(false,null,"EmaIAL already exists")   
    }

    const hashingPass = await bcrypt.hash(password,15)

    const user = await User.create(
        {
            name,
            email,
            password : hashingPass
        })
    res.status(201).json(formatResponse(true, {id:user._id , name : user.name , password: user.password},
        "User Registered Successfulluy"
    ))
    }
    catch(error)
    {
        return res.status(500).json(formatResponse(false, null, error.message));
    }
} 

export const login =  async(req,res) =>
{   
    try{
        const { email, password } = req.body;

    if (!email || !password)
         {
        return res.status(400).json(formatResponse(false, null, "All fields are required"));
        }

        const user = await User.findOne( {email})
        
        if(!user)
        {
        return res.status(401).json(formatResponse(false, null, "Invalid email aur password"))
        }

        const checkingPass = await bcrypt.compare(password, user.password)
         
        if (!checkingPass)
         {
            return res.status(401).json(formatResponse(false, null, "Invalid email or password"))
         }
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    
         return res.status(200).json(formatResponse(true,{ token,
            user: { id: user._id, name: user.name, email: user.email },},"Login successful"))

        }
         catch (error) 
         {
        return res.status(500).json(formatResponse(false, null, error.message))
         }
}     
    
    
    
