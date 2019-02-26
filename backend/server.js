// server for final project
const express = require("express");
const cors = require("cors");
const sha256 = require("sha256");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const url = "mongodb://admin:password1@ds149365.mlab.com:49365/familie";
// const fs = require("fs");
let dbs = undefined;
MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
  if (err) {
    return console.log(err);
  }
  dbs = allDbs;
});
//the { useNewUrlParser: true }, bit is only to remove the parse error we continually get
let app = express();
app.use(cors());
<<<<<<< Updated upstream

let upload = multer({ dest: __dirname + "/images/" });
app.use(express.static(__dirname + "/images"));

app.post("/addProfile", upload.single("profilePicture"), (req, res) => {
  console.log(req.file);
  console.log("new file location", req.file.path);
  console.log("req.body", req.body.toString());

  let extension = req.file.originalname.split(".").pop();
  fs.rename(req.file.path, req.file.path + "." + extension, () => {});
  console.log("req.body", req.body);
  let profile = req.body;
  profile = { ...profile, fileName: req.file.path + "." + extension };
  console.log("profiles", profile);
  let db = dbs.db("finalproject");
  //deal with images here
  db.collection("profiles").insertOne(profile, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Profile successfully created",
      _id: ress._id
    };
    res.send(JSON.stringify(response));
    console.log("end of profiles");
    console.log("response", response);
  });
  console.log("body", req.body);
});

// app.use(bodyParser.raw({ type: "*/*" }));

app.post("/addevent", upload.single("eventPicture"), (req, res) => {
  console.log("--------------addevent. with joy-------------------");
  // console.log("req.body", req.body.toString());

  let extension = req.file.originalname.split(".").pop();
  fs.rename(req.file.path, req.file.path + "." + extension, () => {});
  console.log("req.body", req.body);
  let event = req.body;
  event = { ...event, fileName: req.file.path + "." + extension };
  console.log("event", event);
  let db = dbs.db("finalproject");

  db.collection("events").insertOne(event, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Event successfully inserted"
    };
    res.send(JSON.stringify(response));
  });
});

app.post("/add-family", upload.single("familyPicture"), (req, res) => {
  console.log(req.file);
  console.log("new file location", req.file.path);
  console.log("req.body", req.body.toString());

  let extension = req.file.originalname.split(".").pop();
  fs.rename(req.file.path, req.file.path + "." + extension, () => {});
  console.log("req.body", req.body);
  let profile = req.body;
  profile = { ...profile, fileName: req.file.path + "." + extension };
  console.log("family", profile);
  let db = dbs.db("finalproject");
  //deal with images here
  db.collection("profiles").insertOne(profile, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Profile successfully created",
      _id: ress._id
    };
    res.send(JSON.stringify(response));
    console.log("end of add-family");
    console.log("response", response);
  });
  console.log("body", req.body);
});

=======
>>>>>>> Stashed changes
app.use(bodyParser.raw({ type: "*/*" }));
// this parse everything received.
app.use((req, res, next) => {
  try {
    req.body = JSON.parse(req.body.toString());
    next();
  } catch (error) {
    next();
  }
});
app.post("/signup", (req, res) => {
  let db = dbs.db("familie");
  db.collection("users").findOne(
    { username: req.body.username },
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result) {
        res.send(JSON.stringify({ success: false }));
      } else {
        let user = {
          username: req.body.username,
          password: sha256(req.body.password)
        };
        db.collection("users").insertOne(user, (err, result) => {
          if (err) {
            if (err) return res.status(500).send(err);
          }
        });
        res.send(JSON.stringify({ success: true }));
      }
    }
  );
});
/******** Login *********/
app.post("/login", (req, res) => {
  let db = dbs.db("familie");
  db.collection("users").findOne(
    { username: req.body.username },
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result) {
        if (result.password === sha256(req.body.password)) {
          res.send(
            JSON.stringify({
              success: true,
              user: {
                userId: result._id,
                username: result.username,
                location: result.location
              }
            })
          );
        } else {
          res.send(JSON.stringify({ success: false }));
        }
      } else {
        res.send(JSON.stringify({ success: false }));
      }
    }
  );
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENTS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// events should have 7 components:
// 1- the Image
// 2-the name of the event
// 3-the time ( day, month, year)
// 4-coordinate (i'm guessing coodinates)
// 5-guests : list of all users attending the event
// 6- description : a text description of the event
// 7- creator: the user who created the event
//{"name":"Bearded park walkie!","time":"23,02,2019","location":"1515 rue de mencon, a Bruti, j2h 4u8","coordinate":{"lat":40.741895,"lon":-73.989308},"guests":["Bob"],"description":"who does not like beards???","creator":"Vincent"}
//{name:"Beard trimming",time:"22,02,2019",location:"centre de coiffure quelconque",coordinate:{"lat":40.741895,"lon":-73.989308},guests:["Bearded Bill"],description:"for the beard!",creator:"Vincent"}
app.post("/addevent", (req, res) => {
  console.log("req.body", req.body.toString());
  let event = req.body;
  console.log("event", event);
  let db = dbs.db("familie");
  //image to string and then to the database here
  // const fileType = req.body.pictureType;
  // const extension = fileType.substring(
  //   fileType.indexOf("/") + 1,
  //   fileType.length
  // );
  // let replaceBase64 = new RegExp(`^data:image\/${extension};base64,`);
  // var base64Data = req.body.picture.replace(replaceBase64, "");
  // var eventId = new ObjectID();
  // let fileName = `image_${eventId}.${extension}`;
  // let filePath = `${__dirname}/pictures/${fileName}`;
  // fs.writeFileSync(filePath, base64Data, "base64");
  // end of the input of the image in the db
  db.collection("events").insertOne(event, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Event successfully inserted"
    };
    res.send(JSON.stringify(response));
  });
});
app.get("/allEvents", (req, res) => {
  console.log("you made it to allEvents");
  let db = dbs.db("familie");
  db.collection("events")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        events: result
      };
      res.send(JSON.stringify(response));
      console.log("response", response);
      console.log("success at /allEvents!!!!!");
    });
});
app.post("/attendingEvents", (req, res) => {
  console.log("you made it to attendingEvents");
  let event = req.body;
  console.log("event", event);
  let db = dbs.db("familie");
  let user = event.user;
  console.log("user", user);
  db.collection("events")
    .find({
      guests: user
    })
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        events: result
      };
      res.send(JSON.stringify(response));
      console.log("response", response);
      console.log("success at /attendingEvents!!");
    });
});
app.post("/hostingEvents", (req, res) => {
  console.log("you made it to hostingEvents");
  let db = dbs.db("familie");
  let user = req.body;
  console.log("user", user);
  db.collection("events")
    .find({
      userId: user
    })
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        attending: result
      };
      res.send(JSON.stringify(response));
      console.log("response", response);
      console.log("success at /hostingEvents!!!");
    });
});
app.get("/event/:id", (req, res) => {
  const id = req.params.id;
  let db = dbs.db("familie");
  db.collection("events")
    .find({ _id: ObjectID(id) })
    .toArray((err, array) => {
      if (err) throw err;
      let response = {
        success: true,
        result: array[0]
      };
      res.send(JSON.stringify(response));
    });
});
app.post("/attendEvent", (req, res) => {
  console.log("you made it to attendEvent");
  console.log(req.body);
  let db = dbs.db("familie");
  let request = req.body;
  let user = request.user;
  let chosenEvent = request.eventId;
  let bob = [];
  db.collection("events").findOne({ _id: ObjectID(chosenEvent) }, function(
    err,
    result
  ) {
    console.log(result);
    if (err) throw err;
    if (result.guests) bob = result.guests;
    bob.push(user);
    //console.log("bob", bob);
    db.collection("events").updateOne(
      { _id: ObjectID(chosenEvent) },
      { $set: { guests: bob } }
    );
    res.send(JSON.stringify({ success: true }));
  });
  console.log("success at /attendEvent!!!!!");
});
// addEventListener.post("/oneEvent", (req, res) => {
//   console.log("you made it to /oneEvent");
//   let db = dbs.db("finalproject");
//   db.collection("events").createIndex({
//     name: "text",
//     time: "text",
//     location: "text",
//     coordinate: {},
//     guests: [],
//     description: "text",
//     creator: "text"
//   });
//   db.collection("events")
//     .find({ $text: { $search: req.body.query } })
//     .toArray((err, result) => {
//       if (err) return res.status(500).send(err);
//       res.send(JSON.stringify({ success: true, event: result }));
//     });
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROFILE
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Profile should have these components:S
// 1- firstName
// 2- lastName
// 3- cameraRollPicture
// 4- newTakenPicture
// 5- gender
// 6- relationshipStatus
// 7- occupation
// 8- dateOfBirth
// 9- location
// 10-interests
// 11-userID
//{"firstName":"bob","lastName":"Dabob","gender":"male","relationshipStatus":"single","occupation":"burocrat","dateOfBirth":"14,03,1974","location":"1 rue de mencon, a bruti","interest":"nose picking"}
app.post("/addProfile", (req, res) => {
  console.log("req.body", req.body.toString());
  let profile = req.body;
  console.log("profiles", profile);
  let db = dbs.db("familie");
  //image to string and then to the database here
  // const fileType = req.body.pictureType;
  // const extension = fileType.substring(
  //   fileType.indexOf("/") + 1,
  //   fileType.length
  // );
  // let replaceBase64 = new RegExp(`^data:image\/${extension};base64,`);
  // var base64Data = req.body.picture.replace(replaceBase64, "");
  // var eventId = new ObjectID();
  // let fileName = `image_${eventId}.${extension}`;
  // let filePath = `${__dirname}/pictures/${fileName}`;
  // fs.writeFileSync(filePath, base64Data, "base64");
  db.collection("profiles").insertOne(profile, (err, ress) => {
    if (err) throw err;
    let response = {
      success: true,
      message: "Profile successfully created",
      _id: ress._id
    };
    res.send(JSON.stringify(response));
  });
});
app.get("/all-parents", (req, res) => {
  let db = dbs.db("familie");
  db.collection("profiles")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      let response = {
        success: true,
        parents: result
      };
      res.send(JSON.stringify(response));
    });
});
app.listen(4000, function() {
  console.log("Server started on port 4000");
});
