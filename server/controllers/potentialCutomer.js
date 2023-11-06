const potentialCustomerSc = require("../model/potentialCustomerSc");

const postPotential = async(req, res) => {
    const name = req.body.name;
    const details = req.body.details;

    try {
        await potentialCustomerSc.create({
            "name": name,
            "details": details,
        })
        res.send(req.body);

    } catch (err) {
        res.status(400).send(err);
    }
}

const editPotential = async(req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const details = req.body.details;

    try {
        const oneData = await potentialCustomerSc.findByIdAndUpdate(id, {
            "name": name,
            "details": details,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

const getPotential = async(req, res) => {
    try {
        const AllData = await potentialCustomerSc.find({}).sort('-date');
        res.send({ AllData })

    } catch (err) {
        res.status(400).send(err);
    }
}

const deletePotential = async(req, res) => {
    const id = req.params.id;

    try {
        await potentialCustomerSc.findByIdAndRemove(id);
        res.send("Deleted");

    } catch (err) {
        res.status(400).send(err);
    }
}

const togglePotential = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await potentialCustomerSc.findByIdAndUpdate(id, {
            "is_active": is_active,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}


module.exports = {
    postPotential,
    editPotential,
    getPotential,
    deletePotential,
    togglePotential,
}