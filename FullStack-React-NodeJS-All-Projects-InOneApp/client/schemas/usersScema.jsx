import { z } from "zod";

const registerValidation = z.object({

    name: z.string().min(2,{message:"Name must be larger or equal two latters!"}).max(25,{message:"too much!"}),
    email: z.string().email(),
    password: z.string()
    .min(8,{message:"Password must be at least 8 characters."})
    .regex(/(?=.*[a-z])/,{message:"Password must contain at least one lowercase letter."})
    .regex(/(?=.*[A-Z])/,{message:"Password must contain at least one uppercase letter."})
    .regex(/(?=.*\d)/,{message:"Password must contain at least one digit."})
    .regex(/(?=.*[@$!%*?&])/,{message:"Password must contain at least one special character."})
    
});

const loginValidation = z.object({

    email: z.string().email(),
    password: z.string()
});

export { registerValidation , loginValidation };

