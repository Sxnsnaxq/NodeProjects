const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCustomer = async (req, res) => {
  const { customer_id, first_name, last_name, email, address, phone_number } = req.body;
  try {
    const customer = await prisma.customers.create({
        data: {
          customer_id,
          first_name,
          last_name,
          email,
          address,
          phone_number
        },
      });
      res.status(200).json(customer);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCustomer = async (req, res) => {
    const { id , first_name , last_name , address , email , phone_number } = req.body;
    try {
        const customer = await prisma.customers.update({
            data: {
                first_name,
                last_name,
                address,
                email,
                phone_number
            },
            where:{
                customer_id: Number(id) // ชื่อฟิลด์ : ค่าที่ส่งมา
            }
        });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const customer = await prisma.customers.delete({
            where:{
                customer_id: Number(id)
            }
        });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getCustomers = async (req, res) => {
    try {
        const cuts = await prisma.customers.findMany();
        // console.log("sSS");
        res.status(200).json(cuts);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const customer = await prisma.customers.findUnique({
            where:{
                customer_id: Number(id)
            }
        });
        if (!customer) {
            res.status(404).json({message: 'Customer not found'});
        } else {
            res.status(200).json(customer);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const getCustomersByTerm = async (req, res) => {
    const  searchString  = req.params.term;
    try {
        const custs = await prisma.customers.findMany({
            where: { 
                OR: [
                    {
                        first_name: {
                            contains: searchString
                        }
                    },
                    {
                        email: {
                            contains: searchString
                        }
                    }
                ]
            },
        });
        if (!custs || custs.length == 0) {
            res.status(404).json({ 'message': 'Customer not found!' });
        } else {
            res.status(200).json(custs);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { 
    createCustomer, updateCustomer, 
    deleteCustomer, getCustomers, 
    getCustomer, getCustomersByTerm
}