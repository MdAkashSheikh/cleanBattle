const zoneSc = require("../model/zoneSc");

const postZone = async(req, res) => {
    const name = req.body.name;
    const details = req.body.details;

    try {
        await zoneSc.create({
            "name": name,
            "details": details,
        })
        res.send(req.body);

    } catch (err) {
        res.status(400).send(err);
    }
}

const editZone = async(req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const details = req.body.details;

    try {
        const oneData = await zoneSc.findByIdAndUpdate(id, {
            "name": name,
            "details": details,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}


const getZone = async(req, res) => {
    try {
        const AllData = await zoneSc.find({}).sort('-date');
        res.send({ AllData });

    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteZone = async(req, res) => {
    const id = req.params.id;

    try {
        await zoneSc.findByIdAndRemove(id);
        res.send("Deleted");

    } catch (err) {
        res.status(400).send(err);
    }
}

const toggleZone = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await zoneSc.findByIdAndUpdate(id, {
            "is_active": is_active,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    postZone,
    editZone,
    getZone,
    deleteZone,
    toggleZone,
}