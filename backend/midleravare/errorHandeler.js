const errorHandeler = (error, req, res,next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message ||"erroe";
    res.status(statusCode).json({statusCode,message})
}
module.exports = errorHandeler

// this ia a error errorHandeler in express
// when ever we want to throu gh an erroe we use next()functon which will triger this errhandelr and throw an err
