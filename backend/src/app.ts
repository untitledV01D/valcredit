import express from "express";
import cors from "cors";

import creditApplicationRoutes from "./routes/creditApplication.routes";
import adminRoutes from "./routes/admin.routes";
import customerRoutes from "./routes/customer.routes";

import errorHandler from "./middlewares/error.middleware";

const app = express();
app.use(
    cors({
        origin: true, // Multi-environment support: reflects request origin
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json());

app.use("/api/request", creditApplicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customers", customerRoutes);

app.use(errorHandler);

export default app;
