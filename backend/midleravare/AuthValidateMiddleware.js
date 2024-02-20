const validater = (schema)=>async(req,res,next)=>{
    try {
        const parceBody = await schema.parseAsync(req.body);
        req.body = parceBody;
        next()
    } catch (err) {
        const status = 400
        const message = err.errors[0].message
        // console.log(statusCode,message);
        const error ={message,status}
        // console.log(error);
        next(error)
  
        
    }
}
module.exports = validater