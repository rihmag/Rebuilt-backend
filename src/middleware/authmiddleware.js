import user from "../models/usermodel.js"
import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
    try {
         const authHeader = req.headers["authorization"]
         const token = authHeader && authHeader.split(" ")[1]

         console.log(token)
         if(!token){
            return res.status(400).json({message:"user does not have a token"})
         }
         let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
         if(!verifyToken)
         {
            return res.status(400).json({message:"user does not have a valid token"})
         }
         req.user_id=verifyToken.id
         next()
        } 
    catch(error)
    {
        console.log(error)
    }
    
// Example of a route to get all courses
// const courses = await Course.find({}).populate('instructor', 'username email'); 
// // This will fetch courses and replace the instructor ID with the user's username and email.
//         console.log(error, "isAuthError");
//         // If the token is invalid or expired, jwt.verify will throw an error.
//         return res.status(401).json({ message: "Authentication failed: Invalid token." });
//     }
}
 export default isAuthenticated;