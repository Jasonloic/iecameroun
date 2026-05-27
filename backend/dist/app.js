"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const models_1 = require("./models");
const routes_1 = __importDefault(require("./routes"));
const tracker_middleware_1 = require("./middlewares/tracker.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
const allowedOrigins = [
    'http://localhost:8080',
    'https://iecameroun.cm',
    'https://www.iecameroun.cm'
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Bloqué par la politique CORS de IE237'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
}));
const strictLimiter = (0, express_rate_limit_1.default)({ windowMs: 60 * 1000, max: 10 });
app.use('/api/newsletter/subscribe', strictLimiter);
app.use(express_1.default.json({ limit: '2mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
app.use(tracker_middleware_1.trackerMiddleware);
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date() }));
app.use('/api', routes_1.default);
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
const start = async () => {
    try {
        await models_1.sequelize.authenticate();
        console.log('Base de données connectée');
        app.listen(env_1.env.port, () => console.log(`Serveur démarré sur le port ${env_1.env.port}`));
    }
    catch (err) {
        console.error('Erreur de démarrage:', err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=app.js.map