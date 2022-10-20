import db from "../../../models/db";
import Vote from "../../../models/Vote";

export default async function handler(req, res) {
    await db();
    console.log(req.body);
    if (req.method === "POST") {
        try {
            const exists = await Vote.findOne({
                voterId: req.body.voterId,
                positionId: req.body.positionId,
            });
            if (exists) {
                res.status(201).json("You voted already");
            }

            const vote = await Vote.create(req.body);
            res.status(201).json(vote);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else if (req.method === "GET") {
        const { voterId, positionId } = req.query;
        if (voterId && positionId) {
            try {
                const vote = await Vote.findOne({ voterId, positionId });
                res.status(200).json(vote);
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
        } else if (positionId) {
            try {
                const votes = await Vote.find({ positionId });
                res.status(200).json(votes);
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
        } else {
            try {
                const votes = await Vote.find({});
                res.status(200).json(votes);
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
        }
    } else {
        res.status(400).json({ message: "Invalid Request" });
    }
}