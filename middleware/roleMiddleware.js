// middleware/roleMiddleware.js

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // 'req.user' was populated by the 'protect' middleware right before this
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access Denied: Your role (${req.user.role}) is not authorized for this action.` 
            });
        }
        // If the role matches
        next();
    };
};