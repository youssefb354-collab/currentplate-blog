'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Function for your Contact Form
export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Basic validation
  if (!name || !email || !message) {
    return { error: 'All fields are required.' };
  }

  try {
    await resend.emails.send({
      from: 'CurrentPlate Contact <onboarding@resend.dev>', 
      to: 'youssefb354@gmail.com', 
      subject: `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true };
  } catch (error) {
    return { error: 'Something went wrong. Please try again.' };
  }
}

// Function for your Newsletter Subscription Form
export async function subscribeToNewsletter(formData: FormData) {
  console.log("🟢 1. SERVER ACTION TRIGGERED");
  
  const email = formData.get('email') as string;
  console.log("📧 2. Email received from form:", email);

  if (!email) {
    console.log("🔴 ERROR: No email found in formData");
    return { error: 'Email is required.' };
  }

  try {
    console.log("⏳ 3. Sending request to Resend...");
    
    const response = await resend.contacts.create({
      email: email,
      unsubscribed: false,
    });

    console.log("✅ 4. Raw Resend Response:", response);

    if (response.error) {
      console.log("🔴 5. RESEND API REJECTED IT:", response.error);
      return { error: response.error.message };
    }

    console.log("🎉 6. SUCCESS!");
    return { success: true };
    
  } catch (error) {
    console.log("💥 FATAL ERROR IN CODE:", error);
    return { error: 'Something went wrong. Please try again.' };
  }
}