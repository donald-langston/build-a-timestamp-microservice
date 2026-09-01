import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api{/:date}", (req, res) => {
  const { date } = req.params;
  
  let dateString;

  if(!date) {
    dateString = new Date();
  }else if(/^\d+$/.test(date)) {
    dateString = new Date(parseInt(date));
  } else {
    dateString = new Date(date);
  }
  
  if (isNaN(dateString.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  const timestamp = dateString.getTime();
  const utcDate = dateString.toUTCString();

  res.json({
    unix: timestamp,
    utc: utcDate
  });
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
