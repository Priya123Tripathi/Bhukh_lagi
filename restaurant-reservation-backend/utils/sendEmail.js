const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendReservationEmail = async (
  to,
  restaurant,
  date,
  time,
  guests
) => {
  try {
    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"BhukhLagi" <${process.env.SMTP_USER}>`,
      to,
      subject: "🎉 Reservation Confirmed - BhukhLagi",
      html: `
        <div style="font-family:Arial;padding:20px">

          <h2 style="color:#f97316">
            Reservation Confirmed 🎉
          </h2>

          <p>Your reservation has been successfully confirmed.</p>

          <hr>

          <p><strong>Restaurant:</strong> ${restaurant}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Guests:</strong> ${guests}</p>

          <hr>

          <p>Thank you for choosing <b>BhukhLagi</b>.</p>

        </div>
      `,
    });

    console.log("Email Sent Successfully");
    console.log(info.messageId);

  } catch (err) {

    console.log("Email Error:", err);

  }
};

module.exports = sendReservationEmail;