import app from "./app";
import { configDotenv } from "dotenv";

configDotenv();

const PORT: number = parseInt(process.env.PORT!) || 3000;

app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`));
