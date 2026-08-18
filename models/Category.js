import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "name is required"],
            trim : true,
        },
        description : 
        {
            type: String,
            required : [true,"description is required"],

        }
    },
    {
        timestamps : true
    }
)

export default mongoose.model("Category",categorySchema);
