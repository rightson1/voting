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
            const { positionId, read, _id } = req.query;
            if (positionId && _id) {
                const candidates = await Applicants.find({ positionId, _id });
                res.status(200).json(candidates);
            } else if (read) {
                const candidates = await Applicants.find({ read });
                res.status(200).json(candidates);
            } else if (_id) {
                const candidates = await Applicants.findOne({ _id });
                res.status(200).json(candidates);
            } else {
                const candidates = await Applicants.find();
                res.status(200).json(candidates);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "PUT") {
        const { _id } = req.query;
        if (_id) {
            try {
                const candidate = await Applicants.findByIdAndUpdate(_id, req.body, {
                    new: true,
                });
                res.status(200).json(candidate);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            try {
                const candidate = await Applicants.findByIdAndUpdate(
                    req.body._id, { read: req.body.read, allow: req.body.allow }, {
                        new: true,
                    }
                );
                res.status(200).json(candidate);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    } else if (req.method === "DELETE") {
        const { _id } = req.query;
        try {
            const candidate = await Applicants.findByIdAndDelete(_id);
            res.status(200).json({ success: "Successfully deleted!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}