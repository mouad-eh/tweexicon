const { db } = require("../datastore/index");

async function listCategoriesHandler(req, res) {
    const categories = await db.listCategories(res.locals.userId);
    return res.send(categories);
}

async function createCategoryHandler(req, res) {
    const category = req.body; // {name: "",color:""}
    const result = await db.createCategory(res.locals.userId, category);
    // if (!result.modifiedCount) {
    //     return res.status(500).send({ error: "New category creation failed." });
    // }
    // if this happens that means the user is not found
    // this case is not possible since the user is already authenticated
    // since we don't have any special treament for this fail in the frontend
    // the if statement above is commented
    return res.send({ creation: "success" });
}

async function deleteCategoryHandler(req, res) {
    const result = await db.deleteCategory(res.locals.userId, req.params.name);
    // if (!result.modifiedCount) {
    //     return res.status(500).send({ error: "Failed to delete the category." });
    // }
    return res.send({ deletion: "success" });
}

module.exports = { listCategoriesHandler, createCategoryHandler, deleteCategoryHandler };