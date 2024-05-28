
const laptops = require("../../../portatiles.json");
const Laptop = require("../models/laptop");


const insertManyLaptops = async (req, res, next) => {
    try {
        await Laptop.insertMany(laptops.results);
        return res.status(201).json("Los pc han sido subidos a la BBDD")
    } catch (error) {
        return res.statstus(400).json(error)
    }

}


const getAllLaptops = async (req, res, next) => {
    try {
        const allLaptops = await Laptop.find()
        return res.status(200).json(allLaptops)
    } catch (error) {
        return res.statstus(400).json(error)
    }
}


const deleteLaptop = async (req, res, next) => {

    try {

        const { id } = req.params;
        const laptopDeleted = await Laptop.findByIdAndDelete(id);

        return res.status(200).json(laptopDeleted);

    } catch (error) {
        return res.status(400).json("Error");
    }
}


const updateLaptop = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newLaptop = new Laptop(req.body);

        newLaptop._id = id;

        const up = await Laptop.findByIdAndUpdate(id, newLaptop, { new: true });
        return res.status(200).json(up)



    } catch (error) {
        return res.status(400).json("Error")

    }
}

module.exports = { insertManyLaptops, getAllLaptops, deleteLaptop, updateLaptop }
