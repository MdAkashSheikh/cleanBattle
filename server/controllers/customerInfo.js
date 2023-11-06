const customerInfoSc = require("../model/customerInfoSc");

const postCustomerInfo = async(req, res) => {
    const zone = req.body.zone;
    const category = req.body.category;
    const name = req.body.name;
    const address = req.body.address;
    const asset = req.body.asset;
    const phone = req.body.phone;
    const email = req.body.email;
    const whatsapp = req.body.whatsapp;
    const details = req.body.details;

    try {
        await customerInfoSc.create({
            "zone": zone,
            "category": category,
            "name": name,
            "address": address,
            "asset": asset,
            "phone": phone,
            "email": email,
            "whatsapp": whatsapp,
            "details": details,
        })
        res.send(req.body);

    } catch (err) {
        res.status(400).send(err);
    }
}

const editCustomerInfo = async(req, res) => {
    const id = req.params.id;
    const zone = req.body.zone;
    const category = req.body.category;
    const name = req.body.name;
    const address = req.body.address;
    const asset = req.body.asset;
    const phone = req.body.phone;
    const email = req.body.email;
    const whatsapp = req.body.whatsapp;
    const details = req.body.details;

    try {
        const oneData = await customerInfoSc.findByIdAndUpdate(id, {
            "zone": zone,
            "category": category,
            "name": name,
            "address": address,
            "asset": asset,
            "phone": phone,
            "email": email,
            "whatsapp": whatsapp,
            "details": details,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

const getCustomerInfo = async(req, res) => {
    try {
        const AllData = await customerInfoSc.find({}).sort('-date');
        res.send({ AllData });

    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteCustomerInfo = async(req, res) => {
    const id = req.params.id;

    try {
        await customerInfoSc.findByIdAndRemove(id);
        res.send("Deleted");

    } catch (err) {
        res.status(400).send(err);
    }
}

const toggleCustomerInfo = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await customerInfoSc.findByIdAndUpdate(id, {
            "is_active": is_active,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

const editManagerPanel = async(req, res) => {
    const id = req.params.id;
    const follows = req.body.follows;
    console.log(req.body);

    try {
        const oneData = await customerInfoSc.findByIdAndUpdate(id, {
            "follows": follows,
        })
        res.send(oneData);

    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    postCustomerInfo,
    editCustomerInfo,
    getCustomerInfo,
    deleteCustomerInfo,
    toggleCustomerInfo,
    editManagerPanel,

}