const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    const { product_id, name, description, price,category,image_url  } = req.body;
    try {
        const product = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            },
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateProduct = async (req, res) => {
    const { id, name, description, price,category,image_url } = req.body;
    try {
        const product = await prisma.products.update({
            data: {
                name,
                description,
                price,
                category,
                image_url
            },
            where: {
                product_id: Number(id) 
            }
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await prisma.products.delete({
            where: {
                product_id: Number(id)
            }
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProductsByTerm = async (req, res) => {
    const  searchString  = req.params.term;
    try {
        const pros = await prisma.products.findMany({
            where: { 
                OR: [
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        category: {
                            contains: searchString
                        }
                    }
                ]
            },
        });
        if (!pros || pros.length == 0) {
            res.status(404).json({ 'message': 'Products not found!' });
        } else {
            res.status(200).json(pros);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await prisma.products.findUnique({
            where: {
                product_id: Number(id)
            }
        });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByTerm,
    getProducts,
    getProduct
}