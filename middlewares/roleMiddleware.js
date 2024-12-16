// middleware/roleMiddleware.js
/**
 * Middleware to check if the user has the 'vendedor' role.
 * If the user has the 'vendedor' role, the request is passed to the next middleware or route handler.
 * Otherwise, a 403 Forbidden response is sent with an appropriate message.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The user object attached to the request.
 * @param {string} req.user.role - The role of the user.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware or route handler.
 */
const roleMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'vendedor') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado. Debes ser vendedor para realizar esta acción.' });
    }
  };
  
  module.exports = roleMiddleware;
  