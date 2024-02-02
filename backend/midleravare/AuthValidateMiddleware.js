const validater = (schema)=>async(req,res,next)=>{
    try {
        const parceBody = await schema.parseAsync(req.body);
        req.body = parceBody;
        next()
    } catch (error) {
        const statusCode = 402
        const message = error.errors[0].message
        // console.log(statusCode,message);
        const err ={message,statusCode}
        next(err)
  
        
    }
}
module.exports = validater