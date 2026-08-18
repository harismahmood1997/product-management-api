import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "product name is required"],
            trim : true,
        },
        description : 
        {
            type: String,
        },
        price : 
        {
            type : Number,
            required : [true,"price is necessary"],
            min : [50,"price must be above 50"]
        },
        stock:
         {
            type: Number,
            required: [true, "Stock count is required"],
            min: [0, "Stock cannot be negative"],
         },
        image:
         {
            type: String,
            required: [true, "Image path is required"],
        },
        category:
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "A product must belong to a category"],
         },
    },
    {
        timestamps : true
    }
)

export default mongoose.model("Product",productSchema);
