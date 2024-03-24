import Express from "Express"



const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));


export { app };