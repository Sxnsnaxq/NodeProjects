const express = require("express");
const rateLimit = require("express-rate-limit");
// const apiLimiter = rateLimit({
//     windowMs: 1000*60*3,   // 3 minutes
//     max: 10,
//     message: 'Too many requests, please try again after 3 minutes!'
// });
const router = express.Router();
const customerController = require("../controllers/customers");
const productController = require("../controllers/products");
const orderController = require("../controllers/orders");
const authController = require("../controllers/auth");
const userController = require('../controllers/users');
router.post("/customers", customerController.createCustomer);
router.put("/customers", customerController.updateCustomer);
router.delete("/customers/:id", customerController.deleteCustomer);
router.get("/customers/:id", customerController.getCustomer);
router.get("/customers/q/:term", customerController.getCustomersByTerm);
router.get("/customers", customerController.getCustomers);
router.get('/customers', authController.verifyToken, customerController.getCustomers);

router.post("/products", productController.createProduct);
router.put("/products", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get("/products/:id", productController.getProduct);
router.get("/products/q/:term", productController.getProductsByTerm);
router.get("/products", productController.getProducts);
router.post("/orders", orderController.createOrder);

router.post('/users', userController.createUser);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;

/**
 * @swagger
 * components:
 *    schemas:
 *      Customer:
 *        type: object
 *        properties:
 *          customer_id:
 *            type: integer
 *            description: The unique identifier of the customer.
 *          first_name:
 *            type: string
 *            description: The customer's first name.
 *          last_name:
 *            type: string
 *            description: The customer's last name.
 *          address:
 *            type: string
 *            description: The customer's address.
 *          email:
 *            type: string
 *            description: The customer's email (unique).
 *          phone_number:
 *            type: string
 *            description: The customer's phone number.
 *        required:
 *          - none
 */

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Get All Customers
 *     tags: [Customers]
 *     description: Returns a list of all customers in the database.
 *     responses:
 *       200:
 *         description: A list of customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Get Customer by ID
 *     tags: [Customers]
 *     description: Returns a single customer object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the customer.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Customer object found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating customer not found.
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Create a new Customer
 *     tags: [Customers]
 *     description: Create a new customer in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer object created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers:
 *   put:
 *     summary: Update a Customer
 *     tags: [Customers]
 *     description: Update an existing customer in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer object updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Delete a Customer by ID
 *     tags: [Customers]
 *     description: Delete a customer from the database based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the customer.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Customer object deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers/q/{term}:
 *   get:
 *     summary: Search Customers
 *     tags: [Customers]
 *     description: Search for customers based on a term (name or email).
 *     parameters:
 *       - in: path
 *         name: term
 * 
 * 
 *         description: The search term for finding customers.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A list of matching customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customers not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating customers not found.
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          product_id:
 *            type: integer
 *            description: The unique identifier of the product.
 *          name:
 *            type: string
 *            description: The product's name.
 *          description:
 *            type: string
 *            description: The product's description.
 *          price:
 *            type: number
 *            description: The product's price.
 *          category:
 *            type: string
 *            description: The product's category.
 *          image_url:
 *            type: string
 *            description: The product's image URL.
 *        required:
 *          - name
 *          - description
 *          - price
 *          - category
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get All Products
 *     tags: [Products]
 *     description: Returns a list of all products in the database.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get Product by ID
 *     tags: [Products]
 *     description: Returns a single product object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the product.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Product object found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating product not found.
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new Product
 *     tags: [Products]
 *     description: Create a new product in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product object created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/products:
 *   put:
 *     summary: Update a Product
 *     tags: [Products]
 *     description: Update an existing product in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product object updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a Product by ID
 *     tags: [Products]
 *     description: Delete a product from the database based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the product.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Product object deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/products/q/{term}:
 *   get:
 *     summary: Search Products
 *     tags: [Products]
 *     description: Search for products based on a term (name or description).
 *     parameters:
 *       - in: path
 *         name: term
 *         description: The search term for finding products.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A list of matching products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
 *       404:
 *         description: Products not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating products not found.
 *       500:
 *         description: Internal server error.
 *
 */
