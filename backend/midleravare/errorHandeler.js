const errorHandeler = (err, req, res,next)=>{
    const status = err.statusCode || 500;
    const message = err.message ||"erroe";
    res.status(status).json({status,message})
}
module.exports = errorHandeler

// this ia a error errorHandeler in express
// when ever we want to throu gh an erroe we use next()functon which will triger this errhandelr and throw an err
