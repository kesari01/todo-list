const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

var items = []
var day = []
var workItems = []

app.get("/", function(req, res) {

  var today = new Date()

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  day[0] = today.toLocaleDateString("en-US", options)
  // dayEng[1] = today.toLocaleDateString("hi-IN", options)

  res.render("index", {
    listTitle: day,
    newListItems: items
  })
  // res.render("index", {dayTypeHindi: dayHindi})
})

app.post("/", function(req, res) {

  var item = req.body.newItem

  if (req.body.list === "Work List") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }
})


app.get("/work", function(req, res) {
  res.render("index", {
    listTitle: "Work List",
    newListItems: workItems
  })
})

app.post("/work", function(req, res) {
  var item = req.body.newItem
  workItems.push(item)
  res.redirect("/work")
})

// app.get("/about", function(req, res){
//   res.
// })


app.listen(3000, function() {
  console.log("server started on port 3000")
})
