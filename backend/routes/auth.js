const { auth } = require('../middleware/auth');

// Add verify token route
router.get('/verify', auth, authController.verifyToken); 