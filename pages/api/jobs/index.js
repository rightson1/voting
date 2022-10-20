import db from "../../../models/db";
import Job from "../../../models/Job";
import Candidate from "../../../models/Candidate";

export default async function handler(req, res) {
    await db();
    if (req.method === "POST") {
        try {
            const job = await Job.create(req.body);
            res.status(201).json(job);
        } catch (error) {
            res.status(500).json({ error });
            console.log(error);
        }
    } else if (req.method === "GET") {
        const { id } = req.query;
        if (id) {
            try {
                const jobs = await Job.findOne({ _id: id });
                return res.status(200).json(jobs);
            } catch (error) {
                return res.status(500).json({ error });
            }
        }
        try {
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ error });
            console.log(error);
        }
    } else if (req.method === "DELETE") {
        try {
            const { id } = req.query;

            const job = await Job.findByIdAndDelete(id);

            const candidates = await Candidate.findOneAndDelete({
                positionId: id,
            });
            console.log(job);
            res.status(200).json({ job, candidates });
        } catch (error) {
            res.status(500).json({ error });
            console.log(error);
        }
    } else if (req.method === "PUT") {
        try {
            const job = await Job.findByIdAndUpdate(req.body.id, req.body, {
                new: true,
            });
            res.status(200).json(job);
        } catch (error) {
            res.status(500).json({ error });
            console.log(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
}