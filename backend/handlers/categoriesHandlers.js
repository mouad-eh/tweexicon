const { mongoDataStore: db } = require("../datastore/mongoDB/index");

async function listCategoriesHandler(req, res) {
    const categories = await db.listCategories(res.locals.userId);
    return res.send(categories);
}

async function createCategoryHandler(req, res) {
    const category = req.body; // {name: "",color:""}
    const result = await db.createCategory(res.locals.userId, category);
    if (!result.modifiedCount) {
        return res.status(500).send({ error: "New category creation failed." });
    }
    return res.send({ creation: "Success." });
}

async function deleteCategoryHandler(req, res) {
    const result = await db.deleteCategory(res.locals.userId, req.params.name);
    if (!result.modifiedCount) {
        return res.status(500).send({ error: "Failed to delete the category." });
    }
    return res.send({ deletion: "success" });
}

module.exports = { listCategoriesHandler, createCategoryHandler, deleteCategoryHandler };