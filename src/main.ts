import * as dotenv from "dotenv";

import app from "./infrastructure/http/server";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`App is ready and listening on port ${port} 🚀`);
});
