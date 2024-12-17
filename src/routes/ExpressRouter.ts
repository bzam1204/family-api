import express from "express";

export class ExpressRouter {
    protected router = express.Router();

    public useRoutes = () => this.router;
}
