import { default as Koa } from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

export const app: Koa = new Koa();

app.use(cors());
app.use(bodyParser());
