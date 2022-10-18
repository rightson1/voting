import db from "../../../models/db";
import Admin from "../../../models/Admin";
const handler = async(req, res) => {
    await db();
    if (req.method === "POST") {
        const { name, email, adm, password, avatar, pic } = req.body;
        console.log(req.body);

        try {
            const admin = await Admin.create({
                name,
                email,
                adm,
                password,
                pic,
                avatar,
            });
            res.status(201).json({ admin });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        try {
            const { email } = req.query;
            const admin = await Admin.findOne({ email });

            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;