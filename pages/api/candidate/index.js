import db from "../../../models/db";
import Candidate from "../../../models/Candidate";

export default async function handler(req, res) {
    await db();
    if (req.method === "POST") {
        try {
            const { adm } = req.body;
            const admCandidate = await Candidate.findOne({ adm });
            if (admCandidate) {
                return res.status(200).json({ error: "Candidate already exists" });
            }
            const candidate = await Candidate.create(req.body);
            res.status(201).json(candidate);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        try {
            const { id } = req.query;
            const candidates = await Candidate.find({ positionId: id });
            res.status(200).json(candidates);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "PUT") {
        try {
            const { id } = req.query;
            const candidate = await Candidate.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(candidate);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "DELETE") {
        try {
            const { id } = req.query;
            const candidate = await Candidate.findByIdAndDelete(id);
            res.status(200).json(candidate);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}