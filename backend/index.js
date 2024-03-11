const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");

const courseRoute = require("./routes/course.route");
const studentRouter = require("./routes/student.route");
const adminRouter = require("./routes/admin.route");
const tutorRouter = require("./routes/tutor.route");
const app = express();

app.use(express.json());
app.use(cors());


app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);
app.use("/course", courseRoute);



app.listen(8000, async () => {
  try {
    await connection;
    console.log("Server connected to port 8000");
  } catch (error) {
    console.log(error);
  }
});
