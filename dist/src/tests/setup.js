"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
beforeAll(() => {
    dotenv_1.default.config({ path: '.env.test' });
    process.env.JWT_SECRET = 'test_jwt_secret';
    process.env.JWT_REFRESH_SECRET = 'test_jwt_refresh_secret';
    process.env.JWT_EXPIRATION = '1h';
});
//# sourceMappingURL=setup.js.map