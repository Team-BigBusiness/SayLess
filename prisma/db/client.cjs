require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(process.env.DATABASE_URL);

module.exports = prisma;