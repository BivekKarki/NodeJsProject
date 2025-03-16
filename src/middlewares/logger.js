const logger = (res, req, next)=> {

    console.log("Hello from logger");

    next();

}

export default logger;