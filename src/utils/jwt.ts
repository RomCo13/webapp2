import jwt from 'jsonwebtoken';

export const createToken = (userId: string): string => {
  return jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
}; 