import db from "../../../models/db";
import Voter from "../../../models/Voter";
import Candidate from "../../../models/Candidate";
const handler = async(req, res) => {
    await db();
    if (req.method === "POST") {
        try {
            const voter = await Voter.create(req.body);
            res.status(201).json({ voter });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        const { email } = req.query;
        const { admn } = req.query;
        if (email) {
            try {
                const voter = await Voter.findOne({ email });

                res.status(200).json(voter);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else if (admn) {
            try {
                const voter = await Voter.findOne({ admn });

                res.status(200).json(admn);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            try {
                const voter = await Voter.find();

                res.status(200).json(admin);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    } else if (req.method === "PUT") {
        const { admn } = req.query;
        try {
            const voter = await Voter.findOneAndUpdate({ admn }, req.body, {
                new: true,
            });
            res.status(200).json({ voter });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        try {
            const voter = await Voter.findOneAndDelete({ _id: id });
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;