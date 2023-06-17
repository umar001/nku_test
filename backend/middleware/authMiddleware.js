const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization header provided' });
    }

    try {
        // Extract the token from the authorization header
        const token = authHeader.split(' ')[1];

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded token to the request object
        req.user = decodedToken;

        next();
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
