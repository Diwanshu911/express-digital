import express from "express";

const app = express();
const port = 3004;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  res.status(200).send(tea);
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }

  teaData.splice(index, 1);
  res.status(204).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
// Got to postman -> open 2 tabs -> 1 for "get" another for "post"
// In "post" tab - click body -> select raw -> write {"name": "masala tea", "price": "100 rupees"}... -> click send
// Now go to "get" tab -> click send for checking that the data is coming or not

// import express from 'express'
// const app = express()
// const port = 3004
// app.get("/", (req, res) =>{
//     res.send('Hello World!')
// })
// app.get("/ice-tea", (req, res) =>{
//     res.send('what ice tea would you prefer?')
// })
// app.get("/twitter", (req, res) =>{
//     res.send('Twitter.com')
// })
// app.listen(port, () =>{
//     console.log(`Server is running at port: ${port}...`);
// })
