const categorySc = require("../model/categorySc");

const postCategory = async(req, res) => {
    const name = req.body.name;
    const details = req.body.details;

    try {
        await categorySc.create({
            "name": name,
            "details": details,
        })
        res.send(req.body);

    } catch (err) {
        res.status(400).send(err);
    }
}

const editCategory = async(req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const details = req.body.details;

    try {
        const oneData = await categorySc.findByIdAndUpdate(id, {
            "name": name,
            "details": details,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

const getCategory = async(req, res) => {
    try {
        const AllData = await categorySc.find({}).sort('-date');
        res.send({ AllData });

    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteCategory = async(req, res) => {
    const id = req.params.id;
    
    try {
        await categorySc.findByIdAndRemove(id);
        res.send("Deleted");

    } catch (err) {
        res.status(400).send(err);
    }
}

const toggleCategory = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await categorySc.findByIdAndUpdate(id, {
            "is_active": is_active,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    postCategory,
    editCategory,
    getCategory,
    deleteCategory,
    toggleCategory,
}