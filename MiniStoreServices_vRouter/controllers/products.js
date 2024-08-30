const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    const { product_id, name, description , price, category, image_url } = req.body;
    try {
        const prod = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                
            }
        });
        res.status(200).json(prod);
    } catch (err) {        
        res.status(500).json(err);
    }
};

const updateProduct =  async (req, res) => {
    const { id, name, description, price, category,  } = req.body;
    try {
        const cust = await prisma.products.update({
            data: {
                name,
                description,
                price,
                category,
                
            },
            where: { product_id: Number(id) }
        });
        res.status(200).json(cust);
    } catch (err) {
        res.status(500).json(err);
    }
};
// delete customer by customer_id
const deleteProduct =  async (req, res) => {
    const id = req.params.id;
    try {
        const cust = await prisma.products.delete({
            where: {
                product_id: Number(id),
            },
        })
        res.status(200).json(cust)
    } catch (err) {
        res.status(500).json(err);
    }
};
// get all customers
const getProducts =  async (req, res) => {
    const custs = await prisma.products.findMany()
    res.json(custs)
};
// get only one customer by customer_id
const getProduct =  async (req, res) => {
    const id = req.params.id;
    try {
        const cust = await prisma.products.findUnique({
            where: { product_id: Number(id) },
        });
        if (!cust) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(cust);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
// search any product by name or description
const getProductsByTerm = async (req, res) => {
    const searchString = req.params.term;
    try {
        const products = await prisma.products.findMany({
            where: { 
                OR: [
                    {
                        name: {
                            contains: searchString,
                        }
                    },
                    {
                        description: {
                            contains: searchString,
                        }
                    }
                ]
            },
        });
        if (!products || products.length === 0) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(products);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports = { 
    createProduct , updateProduct , deleteProduct , getProducts ,
    getProduct , getProductsByTerm 
};
