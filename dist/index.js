"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./route/product.route"));
const survey_route_1 = __importDefault(require("./route/survey.route"));
const line_route_1 = __importDefault(require("./route/line.route"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
    res.status(201).json({ message: "Welcome to Auth ts" });
});
app.get("/ping", (_req, res) => {
    res.status(200).json({ message: "Welcome Ping" });
});
app.use(product_route_1.default);
app.use(survey_route_1.default);
app.use(line_route_1.default);
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
