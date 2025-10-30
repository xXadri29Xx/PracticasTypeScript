
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

type book = {
    _id: string,
    title: string,
    author: string,
    pages: number,
    createdAt: Date,
    updatedAt: Date
};

let books: book[] = [
  { _id: crypto.randomUUID(), title: "Libro 1", author: "Autor 1", pages: 80, createdAt: new Date(), updatedAt: new Date()},
  { _id: crypto.randomUUID(), title: "Libro 2", author: "Autor 1", pages: 100, createdAt: new Date(), updatedAt: new Date()},
  { _id: crypto.randomUUID(), title: "Libro 3", author: "Autor 2", pages: 70, createdAt: new Date(), updatedAt: new Date()},
  { _id: crypto.randomUUID(), title: "Libro 4", author: "Autor 2", pages: 30, createdAt: new Date(), updatedAt: new Date()}
];

app.get("/api/books", (req, res)=>{
    res.status(200).json(books);
})

app.post("/api/books", (req, res)=>{
    if(req.body.title && req.body.author && req.body.pages && typeof(req.body.title)=="string" && typeof(req.body.author)=="string" && typeof(req.body.pages)=="number"){
        const newBook:book = {
            _id: crypto.randomUUID(),
            title:req.body.title,
            author: req.body.author,
            pages: req.body.pages,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        books.push(newBook);
        res.status(201).json(newBook)
    }
    else{
        res.status(400).json({
            message: "Error creating the book, error in the parameters"
        })
    }
})


app.put("/api/books/:id", (req, res)=>{
    const id = req.params.id;
    const index = books.find((elem)=>elem._id==id)
    const position = books.findIndex((elem)=>elem._id==id)

    if(!index){
        return res.status(404).json({"message": "Not found" })
    }
    if((req.body.title || index.title) && (req.body.author || index.author) && (req.body.pages || index.pages) && 
    (typeof(req.body.title)=="string" || typeof(index.title)=="string") && (typeof(req.body.author)=="string" || typeof(index.author)=="string") && 
    (typeof(req.body.pages)=="number" || typeof(index.pages)=="string")){
        const newBook:book = {
            _id:index._id,
            title:req.body.title || index.title,
            author:req.body.author || index.author,
            pages:req.body.pages || index.pages,
            createdAt: index.createdAt,
            updatedAt:new Date()
        }        
        books[position] = newBook;
        res.status(200).json(newBook);    
    }
    else{
        res.status(400).json({
            message: "Error updating the book, error in the parameters"
        })
    }
})

app.delete("/api/books/:id", (req, res)=>{
    const id = req.params.id;
    const exist = books.some((elem)=>elem._id==id);

    if(!exist){
        return res.status(404).json({"message": "Not found" })
    }

    books = books.filter((elem)=>elem._id !== id)
    res.status(200).json({"message": "Deleted successfully"})
})

app.listen(port, () => console.log("Servidor en http://localhost:3000"));


const testApi = async () => {
  try {
    const Books1 = (await axios.get<book[]>("http://localhost:3000/api/books")).data;
    console.log("Libros iniciales:", Books1);

    const nuevoBook:book = (await axios.post("http://localhost:3000/api/books", {title: "Libro 10", author: "Autor 3", pages: 300})).data;

    const Books2 = (await axios.get<book[]>("http://localhost:3000/api/books")).data;
    console.log("Después de añadir:", Books2);

    await axios.put<book[]>(`http://localhost:3000/api/books/${nuevoBook._id}`, {title: "Libro 20", author: "Autor 4", pages: 800})
    const Books3 = (await axios.get<book[]>("http://localhost:3000/api/books")).data;
    console.log("Después de actualizar:", Books3);

    await axios.delete(`http://localhost:3000/api/books/${nuevoBook._id}`);

    const Books4 = (await axios.get<book[]>("http://localhost:3000/api/books")).data;
    console.log("Después de eliminar:", Books4);

  } catch (err) {
    console.error("Error en la API:", err);
  }
}


setTimeout(() => {
  testApi();
},1000);

