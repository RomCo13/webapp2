"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader)
        return res.status(401).send('Access denied. No token provided.');
    try {
        const token = authHeader.split(' ')[1];
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(401).send('Invalid token.');
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth_middleware.js.map