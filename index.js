const express = require("express");
const crypto = require("crypto"); // to generate uuid
const { request } = require("http");
const app = express();

app.use(express.json());

const products = [
    {
        "id": "d8f5eac5-85b9-42cf-bff5-5cdc1e9deea3",
        "name": "lap",
        "price": 400.43,
        "quant": 4,
        "active": true
    },
    {
        "id": "d8f5eac5-85b9-42cf-bff5-5cdc1e9deea2",
        "name": "monitor",
        "price": 4.43,
        "quant": 44,
        "active": true
    },
    {
        "id": "d8f5eac5-85b9-42cf-bff5-5cdc1e9deea1",
        "name": "keyboard",
        "price": 20.5,
        "quant": 10,
        "active": true
    }
];

app.get('/', (request, response) => { 
    response.send("testing...");
});

app.get('/products', (request, response) => {
    response.json(products);
});

app.post('/products', (request, response) => {
    // console.log(request.body); // Log the request body to check the received data

    const { name, price, quant, active } = request.body

    // Requiring the name field; otherwise, it won't proceed
    if (!name) {
        return response.status(422).json({ message: "Name is required" });
    }

    // Generating UUID and adding the product to the array
    const id = crypto.randomUUID();
    const newProduct = {
        id,
        name,
        price,
        quant,
        active
    };

    products.push(newProduct);

    response.status(201).json({ message: "Product created successfully", id });
})

app.get('/products/:id' ,(request, response) => {
const product = products.find(product => product.id == request.params.id)

if(!product){
    return response.status(404).json({message: "Product not found"})
}
response.status(200).json(product)

})

// to uopdate the product

app.put("/products/:id", (request,response) => {
    const product = products.find(product => product.id == request.params.id)
    if(!product){
        return response.status(404).json({message: "Product not found"})
    }

    const { name, price, quant, active } = request.body

    if ( name ){
        product.name = name
    }
    if ( price ){
        product.price = price
    }
    if ( quant ){
        product.quant = quant
    }
    if ( 'active' in request.body ){
        product.active = active
    }

    response.status(200).json({message : "product update suc...."})
})

app.listen(3000, () => console.log('Server started on port 3000'));
