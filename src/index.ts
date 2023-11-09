import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
mongoose
    .connect(
        'mongodb+srv://Admin:Password@realestatecluster.jta6bwb.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => console.log('Data base okay'))
    .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
const port = 4444;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
});

app.post('/auth/login', (req: Request, res: Response) => {
    console.log(req.body);

    const token = jwt.sign(
        {
            email: req.body.email,
            fullName: 'Ivan Ivanov',
        },
        'secret123 '
    );

    res.json({
        success: true,
        token,
    });
});
app.listen(port, (err?: Error) => {
    if (err) {
        return console.error(err);
    }
    console.log('Server okay');
});
