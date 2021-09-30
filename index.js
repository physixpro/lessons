const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const ObjectID = require("mongodb").ObjectId;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//connect to mongoDb database

mongoose.connect(
  "mongodb+srv://data:1234@cluster0.qvhok.mongodb.net/olympians?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
// console.log("wrong",require("mongodb").ObjectID)

// console.log("right", require("mongodb").ObjectId)

//listen for any errors and log if found

db.on("error", console.error.bind(console, "connection error"));

//once db is open, confirm everything is up and running

db.once("open", function callback() {
  console.log("database is up and running");
});

//route handler

/**************** Get requests *************/

app.get("/athletes", async (req, res) => {
  //use .find to get info from the athletes
  const sprinters = await db.collection("athletes").find({}).toArray();
  res.json(sprinters);
});

app.get("/gymnasts", async (req, res) => {
  const gymnasts = await db.collection("gymnasts").find({}).toArray();
  res.json(gymnasts);
});

app.get("/swimmers", async (req, res) => {
  const swim = await db.collection("swimmers").find({}).toArray();
  res.json(swim);
});

app.get("/karate", async (req, res) => {
  const fight = await db.collection("Karate").find({}).toArray();
  res.json(fight);
});

/*************** Post requests ******************/

app.post("/athletes", async (req, res) => {
  const person = req.body;
  const x = await db.collection("athletes").insertOne(person);
  console.log(person);
  res.json("person added successfully");
});

app.post("/karate", async (req, res) => {
  const fighter = req.body;
  const x = await db.collection("Karate").insertOne(fighter);
  console.log(fighter);
  res.json("fighter added successfully!");
});

app.post("/gymnasts", async (req, res) => {
  const gym = req.body;
  const x = await db.collection("gymnasts").insertOne(gym);
  console.log(gym);
  res.json("gymnast added successfully!");
});

app.post("/swimmers", async (req, res) => {
  const postSwimmer = req.body;
  const x = await db.collection("swimmers").insertOne(postSwimmer);
  console.log(postSwimmer);
  res.json("swimmer successfully added!");
});

/************** Delete Request ************/

app.delete("/athletes/:athleteId", async (req, res) => {
  const id = req.params.athleteId;
  const x = await db
    .collection("athletes")
    .findOneAndDelete({_id: new ObjectID (id)});
    console.log(id)
  res.json("athlete deleted");
});

app.delete("/gymnasts/:gymnastId", async(req,res) => {
  const id = req.params.gymnastId;
  const x = await db
  .collection("gymnasts")
  .deleteOne({_id: new ObjectID(id)})
  console.log(id)
  res.json("gymnast deleted")
})

app.delete("/swimmers/:swimmerId", async(req,res) => {
  const id = req.params.swimmerId;
  const x = await db
  .collection("swimmers")
  .findOneAndDelete({_id: new ObjectID(id)})
  console.log(id)
  res.json("swimmer deleted")
})

app.delete("/karate/:karateId", async (req,res) => {
  const id = req.params.karateId
  const x = await db.collection("Karate").findOneAndDelete({_id: new ObjectID(id)})
  console.log(id)
  res.json(`${id} deleted`)
})


/********************** Edit/PUT request ******************/
app.put("/athletes/:athleteId", async (req,res) => {
  const athleteId = req.params.athleteId;
  const body = req.body;
  const x = await db.collection("athletes").updateOne({_id: new ObjectID(athleteId)},
  {$set: {name: body.name, description: body.description, country: body.country}});
  console.log(x)
  res.json(x)
}) 

//port

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));
