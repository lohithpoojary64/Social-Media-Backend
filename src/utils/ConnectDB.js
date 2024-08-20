//Here I wrap the function that connects to the database database
//Iam creating this function because I can use it explictly


//This is a way of creating a wrapper function
//along with that Iam creating a middleware , so in future I can Use the middleware here.
export const ConnectDB = (func) => async(req,res,next) =>{
  try {
    await func(req,res,next)
  } catch (error) {
    console.log('There was an error , that occured while connecting to database');
    req.status(400).json({
        success:false,
        message:"Connection Failed!"
    })
  }
}
