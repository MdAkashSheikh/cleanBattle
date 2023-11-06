const typeWorkSc = require("../model/typeWorkSc");

const postTypeWork = async(req, res) => {
    const name = req.body.name;
    const basePrice = req.body.basePrice;
    const details = req.body.details;

    try {
        await typeWorkSc.create({
            "name": name,
            "basePrice": basePrice,
            "details": details,
        })

        res.send(req.body);

    } catch (err) {
        res.status(400).send(err);
    }
}

const editTypeWork = async(req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const basePrice = req.body.basePrice;
    const details = req.body.details;

    try {
        const oneData = await typeWorkSc.findByIdAndUpdate(id, {
            "name": name,
            "basePrice": basePrice,
            "details": details,
        })

        res.send(oneData);

    } catch (err) {
       res.status(400).send(err); 
    }
}

const getTypeWork = async(req, res) => {

    try {
        const AllData = await typeWorkSc.find({}).sort('-date');
        res.send({AllData});

    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteTypeWork = async(req, res) => {
    const id = req.params.id;

    try {
        await typeWorkSc.findByIdAndRemove(id)
        res.send('Deleted');

    } catch (err) {
        res.status(400).send(err);
    }
}

const toggleTypeWork = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.params;

    try {
        const oneData = await typeWorkSc.findByIdAndUpdate(id, {
            "is_active": is_active,
        })
        res.send(oneData)

    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    postTypeWork,
    editTypeWork,
    getTypeWork,
    deleteTypeWork,
    toggleTypeWork
}