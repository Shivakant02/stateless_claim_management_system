import jwt from 'jsonwebtoken';

// Middleware to verify the token
export const verifyToken = (req, res, next) => { 
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        });
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).json({
                message:"Unauthorized"
            });
        }
        req.user=decoded;
        next();
};

//middleware to verify the role
export const verifyRole = (...roles) => {
    return (req, res, next) => {
        const currentRole = req.user.role;
        if (!roles.includes(currentRole)) {
            return res.status(403).json({
                message: "Forbidden, you are not allowed to access this route"
            });
        }
        next();
    }
}


