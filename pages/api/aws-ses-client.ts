import { NextApiHandler } from "next";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const contactFormHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST").json({});
  }
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const recipientEmail = process.env.AWS_SES_TO_EMAIL;
  const senderEmail = process.env.AWS_SES_FROM_EMAIL;
  const { email, message } = req.body;

  if (!accessKeyId || !secretAccessKey) {
    return res.status(500).json({ error: "Invalid credentials" });
  }
  if (!email || !message) {
    return res.status(400).json({ error: "No data to send" });
  }
  if (!senderEmail || !recipientEmail) {
    return res.status(500).json({ error: "Sender or recipient not provided" });
  }

  const client = new SESClient({
    region: "eu-central-1",
    apiVersion: "2010-12-01",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const params = {
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `The Shop message from email: ${email}`,
      },
    },
    Source: senderEmail,
  };

  try {
    const command = new SendEmailCommand(params);
    const data = await client.send(command);
    console.log(data);
    return res.status(200).json({ message: "all good" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default contactFormHandler;
