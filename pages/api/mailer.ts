// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { email } = req.body;
  if (req.method !== "POST") {
    // Status Code: 405 Method Not Allowed
    return res.status(405).setHeader("Allow", "POST").json({});
  }
  if (typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    return res
      .status(500)
      .json({ error: "Nie podano zmiennych środowiskowych" });
  }
  const response = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-MailerLite-ApiDocs": "true",
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": `${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email: "null",
        resubscribe: false,
        autoresponders: true,
        type: "null",
      }),
    }
  );

  // mozna te sprawdzić czy response >= 400
  if (!response.ok) {
    return res.status(400).json({ error: "There was a problem with singnup" });
  }
  //data nas juz nie interesuje bo jak jest ok to jest zapisany i ok
  // const data = response.json();

  // status code 201. Created.
  res.status(201).json({});
};
export default handler;
