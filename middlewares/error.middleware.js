const errorMiddleware = (err, req, res, next) => {
  try {
    let error = {...err};

    error.message = err.message
    console.error(err);

    //type of error detection it may be (Mongoose bad ObjectId)
  } catch(error){
    next(error);
  }
}