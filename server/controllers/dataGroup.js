const dataGroupSc = require("../model/dataGroupSc");

const postDataGroup = async(req, res) => {
    const name = req.body.name;
    const details = req.body.details;

    try {
        await dataGroupSc.create({
            "name": name,
            "details": details,
        })

        res.send(req.body);

    } catch (err) {
        res.status(400).send(err);
    }
}

const editDataGroup = async(req, res) => {
    
    const id = req.params.id;
    const name = req.body.name;
    const details = req.body.details;

    try {
        const oneData = await dataGroupSc.findByIdAndUpdate(id, {
            "name": name,
            "details": details,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

const getDataGroup = async(req, res) => {
    try {
        const AllData = await dataGroupSc.find({}).sort('-date');
        res.send({ AllData })
    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteDataGroup = async(req, res) => {
    const id = req.params.id;

    try {
        await dataGroupSc.findByIdAndRemove(id);
        res.send("Deleted");

    } catch (err) {
        res.status(400).send(err);
    }
} 

const toggleDataGroup = async(req, res) => {
    
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await dataGroupSc.findByIdAndUpdate(id, {
            "is_active": is_active,
        })

        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    postDataGroup,
    editDataGroup,
    getDataGroup,
    deleteDataGroup,
    toggleDataGroup,
}