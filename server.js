const express = require("express")
const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage")
const path = require("path")
const crypto = require("crypto")
const url = "mongodb://localhost:27017/myfiles"
const mongoose = require("mongoose")
const fs = require("fs")
const cors = require("cors")
const { rejects } = require("assert")

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
const storage = new GridFsStorage({
  url: url,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  file: (req, file) => {
    return {
      filename: Date.now() + "" + path.extname(file.originalname),
      bucketName: file.mimetype === "image/jpeg" ? "photos" : "fs"
    }
  }
})

//ready to multer converting files into actual fromat like req.file.
const upload = multer({ storage: storage })

const app = express()

//intializing middleware.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connection.on("open", () => {
  let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "photos"
  })
  app.get("/", (req, res) => {
    console.log("triggered")
    bucket.find().toArray((err, results) => {
      res.send(results)
    })
  })
  app.post("/", upload.array("images"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("sucess")
  })
  app.get("/images/:filename", (req, res) => {
    bucket.find({ filename: req.params.filename }).toArray((err, result) => {
      bucket.openDownloadStream(result[0]._id).pipe(res)
    })
  })
  app.delete("/delete/:filename", (req, res) => {
    const filename = req.params.filename
    bucket.find({ filename: filename }).toArray((err, result) => {
      if (result.length !== 0) {
        bucket.delete(result[0]._id, () => {
          res.send("success....!!")
        })
      }
    })
  })
})

app.listen(3001, () => {
  console.log("server is running on 3001")
})
