import express, {Application} from 'express'
import helmet from "helmet";
import cors from 'cors'
const app: Application = express();
import dotenv from "dotenv";
import { AppDataSource } from './dataSource';
import { router } from './router';
import cookieParser from 'cookie-parser';
const allowedOrigins = ['http://localhost:5173'];

app.use(helmet());
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, origin?: boolean) => void) => {
        if (allowedOrigins.indexOf(origin || '') !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // This is important to allow cookies and other credentials
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

dotenv.config({ path: __dirname+'/.env' });
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/api', router)

const PORT = process.env.PORT as number | undefined

const start = async () => {
  try {
    AppDataSource.initialize();
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

    
  } catch (e) {
    console.log(e);
  }
}

start();