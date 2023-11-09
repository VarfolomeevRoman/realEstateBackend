"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect('mongodb+srv://Admin:Password@realestatecluster.jta6bwb.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Data base okay'))
    .catch((err) => console.log('DB error', err));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 4444;
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.post('/auth/login', (req, res) => {
    console.log(req.body);
    const token = jsonwebtoken_1.default.sign({
        email: req.body.email,
        fullName: 'Ivan Ivanov',
    }, 'secret123 ');
    res.json({
        success: true,
        token,
    });
});
app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Server okay');
});
