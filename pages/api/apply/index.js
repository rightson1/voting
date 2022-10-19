import db from "../../../models/db";
import Applicants from "../../../models/Applicants";

export default async function handler(req, res) {
    await db();
    if (req.method === "POST") {
        try {
            const candidate = await Applicants.create(req.body);
            res.status(201).json(candidate);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        try {
            const { positionId, _id } = req.query;
            const candidates = await Applicants.find({ positionId, _id });
            res.status(200).json(candidates);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}