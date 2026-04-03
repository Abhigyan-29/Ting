import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate, createResetPasswordEmailTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Ting!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome Email sent successfully", data);
};

export const sendResetPasswordEmail = async (email, name, resetURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Reset Your Password",
    html: createResetPasswordEmailTemplate(name, resetURL),
  });

  if (error) {
    console.error("Error sending reset email:", error);
    throw new Error("Failed to send reset email");
  }

  console.log("Reset Email sent successfully", data);
};
