import app from "./index";
const port = process.env.port || 3001;
app.listen(port, function () {
  console.log({
    APP_SECRET_KEY: process.env.SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  });
  console.log(`Running on http://localhost:${port}`);
});
