const FactDataBase = require("../database/schema/factSchema");


const createFacts = async (req, res) => {
    const body = req.body
    var newDate = new Date();
    console.log(body)
    try {
        const fact = await FactDataBase.create({ ...body, date: newDate })
        console.log(fact)
        res.status(200).send(fact)
    } catch (err) {
        res.status(500).send(error)
    }
};

const getFacts = async (req, res) => {
    try {
        const facts = await FactDataBase.find();
        res.status(200).send(facts);
    } catch (err) {
        res.status(500).send({ message: "Internal Error" })
    }
}

const getUserfacts = async (req, res) => {
    const params = req.params
    try {
        const facts = await FactDataBase.find({ userID: params.userID })
        console.log(facts)
        res.status(200).send(facts);
    } catch (err) {
        res.status(500).send({ message: "Internal Error" })
    }

}

const deleteFacts = async (req, res) => {
    const factId = req.params.factID
    try {
        const facts = await FactDataBase.findByIdAndDelete(factId)
        if (facts) {
            res.status(200).send(facts._id);
        } else {
            res.status(404).send("Fact not found.");
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Error" })
    }
}

const updateFacts = async (req, res) => {
    const factID = req.params.factID
    const body = req.body
    try {
        const updatedFact = await FactDataBase.findByIdAndUpdate(factID, { title: body.title, fact: body.fact }, { new: true })
        res.status(200).send(updatedFact);

    } catch (err) {
        res.status(500).send({ message: "Internal Error" })

    }

}

const addLikes = async (req, res) => {
    try {
        const factId = req.params.factID
        const userId = req.params.userID
        const fact = await FactDataBase.findById(factId)
        const updatedDislikes = fact.dislikes.filter(id => id !== userId)
        const isUserLiked = fact.likes.includes(userId)
        const updatedLikes = isUserLiked ? fact.likes : [...fact.likes, userId]
        const updatedFact = await FactDataBase.findByIdAndUpdate(factId, {
            dislikes: updatedDislikes,
            likes: updatedLikes
        }, { new: true })
        res.status(200).send(updatedFact)
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const addDislikes = async (req, res) => {
    const factId = req.params.factID
    const userId = req.params.userID
    const fact = await FactDataBase.findById(factId)
    const updatedLikes = fact.likes.filter(id => id !== userId)
    const isUserDisliked = fact.dislikes.includes(userId)
    const updatedDislikes = isUserDisliked ? fact.dislikes : [...fact.dislikes, userId]
    const updatedFact = await FactDataBase.findByIdAndUpdate(factId, {
        likes: updatedLikes,
        dislikes: updatedDislikes
    }, { new: true })
    res.status(200).send(updatedFact)
}


module.exports = { createFacts, getFacts, getUserfacts, deleteFacts, updateFacts, addLikes, addDislikes }