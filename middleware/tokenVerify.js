import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next ) => {
    console.log("Token Verication called");
    const authorizationHeader = req.headers.authorization;
    console.log("Auth token===================",authorizationHeader);
    let result;
    
	if (authorizationHeader) {
		const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
		const options = {
			expiresIn: '1h',
		};
		try {
			result = jwt.verify(token,'secret', options);
            req.decoded = result;
            next();
            return req.decoded
           
		} catch (err) {
			console.log("Middleware token",err, options);
			res.status(500).send("Token Expired");
		}
	} else {
		result = {
			error: 'Authentication error. Token required.',
			status: "UNAUTHORIZED",
		};
		res.status(500).json(result);
	}
};