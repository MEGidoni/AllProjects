import {z} from "zod";


const productsValidation = z.object({
    product_name : z.string().min(2,{message: 'Invalid product name!'}) , 
    amount : z.number().positive({message: 'Amount must be greater than zero!'})
});

export {productsValidation}