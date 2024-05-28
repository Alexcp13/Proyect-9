const { insertManyLaptops, getAllLaptops, updateLaptop, deleteLaptop } = require("../controllers/laptop");

const laptopsRouter = require("express").Router();


laptopsRouter.post("/extraer", insertManyLaptops);
laptopsRouter.get("/", getAllLaptops);
laptopsRouter.put("/:id", updateLaptop);
laptopsRouter.delete("/:id", deleteLaptop);



module.exports = laptopsRouter;