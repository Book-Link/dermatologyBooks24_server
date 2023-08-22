const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// mongodb config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.drs3jae.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const termsConditionCollection = client
    .db("dermatologybooks24")
    .collection("termsAndCondition");

  const frontPageTopImgCollection = client
    .db("dermatologybooks24")
    .collection("topImg");

  const frontPageMiddleImgCollection = client
    .db("dermatologybooks24")
    .collection("middleImg");

  const frontPageDisclaimerCollection = client
    .db("dermatologybooks24")
    .collection("disclaimer");

  const displayBookBannerImg = client
    .db("dermatologybooks24")
    .collection("displayBookImage");

  const authenticationCollection = client
    .db("dermatologybooks24")
    .collection("authData");

  const bookCollection = client.db("dermatologybooks24").collection("books");

  // INSERT terms and condition data AT THE DATABASE
  app.post("/addTermsCondition", async (req, res) => {
    try {
      const data = await req.body;
      const result = await termsConditionCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the terms and Condition data from  collection
  app.get("/getTermsCondition", async (req, res) => {
    try {
      const allTermsAndCondition = await termsConditionCollection
        .find()
        .toArray();
      if (allTermsAndCondition.length > 0) {
        res.send(allTermsAndCondition);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //delete the terms and condition data from database
  app.delete("/termsConditiondelete/:id", async (req, res) => {
    try {
      const termsCondtionId = req.params.id;
      const result = await termsConditionCollection.deleteOne({
        _id: ObjectId(termsCondtionId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT Top Image  AT THE DATABASE home page
  app.post("/addFrontPageTopImage", async (req, res) => {
    try {
      const data = await req.body;
      const result = await frontPageTopImgCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the front page Top Image from  collection home page
  app.get("/getFrontPageTopImage", async (req, res) => {
    try {
      const topImg = await frontPageTopImgCollection.find().toArray();
      if (topImg.length > 0) {
        res.send(topImg);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // delete the front page Top Image from  collection home page
  app.delete("/topImgdelete/:id", async (req, res) => {
    try {
      const FrontTopImgId = req.params.id;
      const result = await frontPageTopImgCollection.deleteOne({
        _id: ObjectId(FrontTopImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT middle Image AT THE DATABASE home page
  app.post("/addFrontPageMiddleImage", async (req, res) => {
    try {
      const data = await req.body;
      const result = await frontPageMiddleImgCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the front page middle Image from  collection home page
  app.get("/getFrontPageMiddleImage", async (req, res) => {
    try {
      const midImg = await frontPageMiddleImgCollection.find().toArray();
      if (midImg.length > 0) {
        res.send(midImg);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // delete the front page middle Image from  collection home page
  app.delete("/middleImgdelete/:id", async (req, res) => {
    try {
      const midImgId = req.params.id;
      const result = await frontPageMiddleImgCollection.deleteOne({
        _id: ObjectId(midImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT disclaimer data AT THE DATABASE home page
  app.post("/addFrontPageDisclaimer", async (req, res) => {
    try {
      const data = await req.body;
      const result = await frontPageDisclaimerCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the front page disclaimer from  collection home page
  app.get("/getFrontPageDisclaimer", async (req, res) => {
    try {
      const disclaimer = await frontPageDisclaimerCollection.find().toArray();
      if (disclaimer.length > 0) {
        res.send(disclaimer);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // delete the front page disclaimer from  collection home page
  app.delete("/disclaimerDelete/:id", async (req, res) => {
    try {
      const disclaimerId = req.params.id;
      const result = await frontPageDisclaimerCollection.deleteOne({
        _id: ObjectId(disclaimerId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //Insert display book top banner Image books display page
  app.post("/addDisplayBookTopImage", async (req, res) => {
    try {
      const data = await req.body;
      const result = await displayBookBannerImg.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  //get the display books top banner
  app.get("/DisplayBookTopImage", async (req, res) => {
    try {
      const displayBook = await displayBookBannerImg.find().toArray();
      if (displayBook.length > 0) {
        res.send(displayBook);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //delete the display book banner
  app.delete("/bookDisplayImgdelete/:id", async (req, res) => {
    try {
      const displayBooksBannerImgId = req.params.id;
      const result = await displayBookBannerImg.deleteOne({
        _id: ObjectId(displayBooksBannerImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT Books DATA AT THE DATABASE
  app.post("/addBookData", async (req, res) => {
    try {
      const data = await req.body;
      const result = await bookCollection.insertOne(data);
      res.send(result.acknowledged);
    } catch (error) {
      console.log("err", error);
    }
  });

  // get the Books DATA from  collection
  app.get("/getBookData", async (req, res) => {
    try {
      const bookData = await bookCollection.find().toArray();
      if (bookData.length > 0) {
        res.send(bookData);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //get the single book for editing from collection
  app.get("/singleBook/:id", async (req, res) => {
    try {
      const books = await bookCollection
        .find({ _id: ObjectId(req.params.id) })
        .toArray();
      if (books.length > 0) {
        res.send(books[0]);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //update book image
  app.patch("/updateBookImage/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookImg: req.body.bookImg,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update book name
  app.patch("/updateBookName/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookName: req.body.bookName,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update author name
  app.patch("/updateBookAuthorName/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            authorName: req.body.authorName,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update isbn
  app.patch("/updateBookIsbn/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            isbn: req.body.isbn,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update number
  app.patch("/updateBookNumber/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookNumber: req.body.bookNumber,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update book link
  app.patch("/updateBookLink/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookLink: req.body.bookLink,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update book download link
  app.patch("/updateBookDownloadLink/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            downloadBookLink: req.body.downloadBookLink,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //update book subject
  app.patch("/updateBookSubject/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookSubject: req.body.bookSubject,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.patch("/updateSourceName/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            sourceName: req.body.sourceName,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //delete the books data from colletion
  app.delete("/bookDelete/:id", async (req, res) => {
    try {
      const booksId = req.params.id;
      const result = await bookCollection.deleteOne({
        _id: ObjectId(booksId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //singup data added
  app.post("/addSignupData", (req, res) => {
    const { email, phoneNumber } = req.body;
    authenticationCollection
      .findOne({ email })
      .then((existingUserWithEmail) => {
        if (existingUserWithEmail) {
          return res.status(400).send({ error: "Email already in use" });
        } else {
          authenticationCollection
            .findOne({ phoneNumber })
            .then((existingUserWithPhone) => {
              if (existingUserWithPhone) {
                return res
                  .status(400)
                  .send({ error: "Phone number already in use" });
              } else {
                authenticationCollection.insertOne(req.body).then((result) => {
                  res.send(result);
                });
              }
            });
        }
      });
  });

  //get login data
  app.get("/getAuthData", async (req, res) => {
    authenticationCollection
      .find({
        phoneNumber: req.query?.phoneNumber,
        password: req.query?.password,
        active: true,
      })
      .toArray((err, documents) => {
        if (err) {
          console.error(err);
          res.status(500).send({
            message:
              "An error occurred while retrieving the authentication data.",
          });
        } else {
          res.send(documents);
        }
      });
  });

  app.patch("/editPass/:email", async (req, res) => {
    const email = req.params.email;
    const password = req.body.password;

    await authenticationCollection
      .updateOne({ email: email }, { $set: { password: password } })
      .then((result) => {
        res.status(200).send({ message: "Password updated successfully" });
      })
      .catch((error) => {
        res.status(500).send({ message: "Error updating password" });
        console.log(error);
      });
  });

  //// get all the users
  app.get("/getAllUser", async (req, res) => {
    try {
      const data = await authenticationCollection.find({}).toArray();
      if (data.length > 0) {
        res.send(data);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //mathing gmail for the fortopassword gmail send to inbox and go to the link
  app.get("/getMatchedEmailData", (req, res) => {
    const receivedEmail = req.query.email;
    authenticationCollection
      .find({
        email: receivedEmail,
      })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  //user delete
  app.delete("/userDelete/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await authenticationCollection.deleteOne({
        _id: ObjectId(userId),
      });
      if (result) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //user update for start and stop account from admin
  app.patch("/userUpdate/:id", async (req, res) => {
    try {
      const filter = { _id: new ObjectId(req.params.id) };
      const update = { $set: req.body };
      const result = await authenticationCollection.updateOne(filter, update);
      if (result.modifiedCount > 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // mongodb connected message
  console.log("database connected");
});

// root url route
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("app listening");
});
