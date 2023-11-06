const priorityGroupSc = require("../model/priorityGroupSc");

const postPriority = async(req, res) => {
    const name = req.body.name;
    const details = req.body.details;

    try {
        await priorityGroupSc.create({
            "name": name,
            "details": details,
        })

        res.send(req.body);

    } catch (err) {
        res.status(400).send(err);
    }
}

const editPriority = async(req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const details = req.body.details;

    try {
        const oneData = await priorityGroupSc.findByIdAndUpdate(id, {
            "name": name,
            "details": details,
        })

        res.send(oneData);

    } catch (err) { 
        res.status(400).send(err);
    }
}

const getPriority = async(req, res) => {
    try {
        const AllData = await priorityGroupSc.find({}).sort('-date');
        res.send({ AllData })

    } catch (err) {
        res.status(400).send(err);
    }
}

const deletePriority = async(req, res) => {
    const id = req.params.id;

    try {
        await priorityGroupSc.findByIdAndRemove(id);
        res.send("Deleted");

    } catch (err) {
        res.status(400).send(err);
    }
}

const togglePriority = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await priorityGroupSc.findByIdAndUpdate(id, {
            "is_active": is_active,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    postPriority,
    editPriority,
    getPriority,
    deletePriority,
    togglePriority
}