const { StatusCodes } = require('http-status-codes');
const { BadRequest: BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    //mongo
    //joi
    //check in the controller
    if (!username || !password) {
        throw new BadRequestError('Username and password not provided.');
    }

    const id = new Date().getDate();


    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(StatusCodes.OK).json({ msg: 'User created', token });
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(StatusCodes.OK).json({ msg: `Hello ${req.user.username}`, secret: `Here is your authorized data, Your lucky number is ${luckyNumber}` });
}

module.exports = { login, dashboard }