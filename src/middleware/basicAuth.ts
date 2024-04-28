import { Request, Response, NextFunction } from 'express';

// Middleware function to authenticate API requests using an API key
const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
    // Retrieve the API key from the request headers
    const apiKey = req.headers['x-api-key'];

    // Check if the API key is present in the request
    if (!apiKey) {
        // If not, respond with a 401 Unauthorized status and an error message
        res.status(401).send({ error: 'API key is missing' });
        return;
    }

    // Retrieve the expected API key from environment variables
    const expectedApiKey = process.env.API_KEY; 

    // Compare the provided API key with the expected API key
    if (apiKey === expectedApiKey) {
        // If they match, proceed to the next middleware
        next();
    } else {
        // If they do not match, respond with a 403 Forbidden status and an error message
        res.status(403).send({ error: 'Invalid API key' });
    }
};

// Export the apiKeyAuth middleware to be used in other parts of the application
export { apiKeyAuth };
