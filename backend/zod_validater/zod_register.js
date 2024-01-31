const {z}= require("zod")

const registerValidatioin = z.object({
    username: z
    .string({required_error: "name is reqired"})
    .trim()
    .min(3,{message:"name should be minum 3 letters plz"})
    .max(50,{message :"name must not bemore  than 50 letters"}),

    email: z
    .string({required_error: "email reqire"})
    .trim()
    .email({ message:"email is in vallid"})
    .min(3,{message:"enter proper email"})
    .max (50,{message :"email must not bemore  than 50 letters"}),

    phone: z
    .string({required_error: "phone number reqire"})
    .trim()
    .min(10,{message:"number not valid"})
    .max (12,{message :"number is more than 10 or 12 digits"}),

    password: z
    .string({required_error: "pwd is reqire"})
    .trim()
    .min(8,{message:"npwd too short"})
    .max (50,{message :"password is not valide"}),
})

const loginVAlidater= z.object({
    email: z
    .string({required_error: "email reqire"})
    .trim()
    .email({ message:"email is in vallid"})
    .min(3,{message:"enter proper email"})
    .max (50,{message :"email must not bemore  than 50 letters"}),

    password: z
    .string({required_error: "pwd is reqire"})
    .trim()
    .min(8,{message:"npwd too short"})
    .max (50,{message :"password is not valide"}),

})

module.exports= {registerValidatioin,loginVAlidater}