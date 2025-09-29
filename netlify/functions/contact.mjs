// netlify/functions/contact.mjs
import nodemailer from "nodemailer";

export default async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: cors,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const { name, email, company, budget, topic, message } = data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,              // e.g. "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT || 587),
      secure:
        process.env.SMTP_SECURE === "true" ||
        Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,            // full mailbox/user
        pass: process.env.SMTP_PASS,            // app password/SMTP pass
      },
    });

    const to = process.env.CONTACT_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"ForgeSentry Contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `Website contact: ${name || "Unknown"} (${topic || "General"})`,
      text:
        `New website inquiry\n\n` +
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\n` +
        `Budget: ${budget || "-"}\nTopic: ${topic || "-"}\n\n` +
        `Message:\n${message || "-"}`,
    });

    return { statusCode: 200, headers: cors, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};
