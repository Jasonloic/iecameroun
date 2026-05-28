import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { env } from './config/env';
import { sequelize } from './models';
import routes from './routes';
import { trackerMiddleware } from './middlewares/tracker.middleware';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

const app = express();

app.use(helmet());
const allowedOrigins = [
    'https://admin.iecameroun.cm',
    'https://iecameroun.cm',
    'https://www.iecameroun.cm'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Bloqué par la politique CORS de IE237'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
}));

const strictLimiter = rateLimit({ windowMs: 60 * 1000, max: 10 });
app.use('/api/newsletter/subscribe', strictLimiter);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(trackerMiddleware);

app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date() }));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const start = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Base de données connectée');
        app.listen(env.port, () =>
            console.log(`Serveur démarré sur le port ${env.port}`)
        );
    } catch (err) {
        console.error('Erreur de démarrage:', err);
        process.exit(1);
    }
};

start();