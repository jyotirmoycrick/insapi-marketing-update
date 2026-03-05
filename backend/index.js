import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';

dotenv.config();

const app = express();

// CORS - Allow all origins for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ===== CONTACT FORM MODEL =====
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: 'Contact Form Submission',
  },
  source: {
    type: String,
    default: 'home',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'responded'],
    default: 'new',
  },
});

const Contact = mongoose.model('Contact', ContactSchema);

// ===== EMAIL CONFIGURATION =====
// SAMPLE SMTP CREDENTIALS - REPLACE WITH YOUR ACTUAL CREDENTIALS
// Uncomment and update these in your .env file:
// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_SECURE=false
// SMTP_USER=your-email@gmail.com
// SMTP_PASS=your-app-specific-password
// ADMIN_EMAIL=malojyotirmoy@gmail.com
// SENDER_NAME=InsAPI Marketing
// SENDER_EMAIL=your-email@gmail.com

const createTransporter = () => {
  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️ SMTP not configured. Email functionality will be simulated.');
    return null;
  }
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const transporter = createTransporter();

// Verify transporter connection if configured
if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ SMTP Connection Error:', error.message);
    } else {
      console.log('✅ SMTP Server is ready to send emails');
    }
  });
}

// Email templates
const adminEmailTemplate = (name, email, phone, source, submissionId) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1E3A5F 0%, #4A90E2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h2 { margin: 0; font-size: 24px; }
          .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
          .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #4A90E2; }
          .field-label { font-weight: bold; color: #1E3A5F; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .field-value { color: #333; font-size: 16px; margin-top: 5px; }
          .footer { background-color: #1E3A5F; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px; }
          .badge { display: inline-block; background: #FFA500; color: #000; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎯 New Lead Received!</h2>
            <p style="margin-top: 10px; opacity: 0.9;">InsAPI Marketing - Contact Form Submission</p>
          </div>
          <div class="content">
            <div style="text-align: center; margin-bottom: 20px;">
              <span class="badge">Source: ${source.toUpperCase()}</span>
            </div>
            <div class="field">
              <div class="field-label">👤 Full Name</div>
              <div class="field-value">${name}</div>
            </div>
            <div class="field">
              <div class="field-label">📧 Email Address</div>
              <div class="field-value"><a href="mailto:${email}" style="color: #4A90E2;">${email}</a></div>
            </div>
            <div class="field">
              <div class="field-label">📱 Phone Number</div>
              <div class="field-value"><a href="tel:${phone}" style="color: #4A90E2;">+91 ${phone}</a></div>
            </div>
            <div class="field">
              <div class="field-label">🕐 Submitted At</div>
              <div class="field-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
            </div>
            <div class="field">
              <div class="field-label">🔖 Submission ID</div>
              <div class="field-value" style="font-family: monospace; font-size: 12px;">${submissionId}</div>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0;">This is an automated notification from InsAPI Marketing Website</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const userConfirmationTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1E3A5F 0%, #4A90E2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h2 { margin: 0; font-size: 28px; }
          .content { background-color: #ffffff; padding: 40px; border: 1px solid #e0e0e0; }
          .greeting { font-size: 20px; color: #1E3A5F; margin-bottom: 20px; }
          .message { color: #555; line-height: 1.8; font-size: 16px; }
          .highlight-box { background: linear-gradient(135deg, #FFF9E6 0%, #FFF3CD 100%); border-left: 4px solid #FFA500; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
          .cta { text-align: center; margin: 30px 0; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%); color: #000; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; }
          .footer { background-color: #1E3A5F; color: white; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; }
          .social-links { margin-top: 20px; }
          .social-links a { color: white; margin: 0 10px; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>✨ Thank You!</h2>
            <p style="margin-top: 15px; opacity: 0.9; font-size: 16px;">We've received your inquiry</p>
          </div>
          <div class="content">
            <div class="greeting">Hello ${name},</div>
            <div class="message">
              <p>Thank you for reaching out to <strong>InsAPI Marketing</strong>! We're excited to connect with you.</p>
              <p>Your inquiry has been successfully received, and our team of digital marketing experts is already on it.</p>
            </div>
            <div class="highlight-box">
              <strong>🚀 What happens next?</strong>
              <p style="margin: 10px 0 0 0; color: #666;">Our team will review your inquiry and get back to you within <strong>24-48 business hours</strong>. We're committed to helping your business grow!</p>
            </div>
            <div class="message">
              <p>In the meantime, feel free to explore our services and learn more about how we can help transform your digital presence.</p>
            </div>
            <div class="cta">
              <a href="https://insapimarketing.com" class="cta-button">Explore Our Services</a>
            </div>
            <div class="message" style="text-align: center; color: #888; font-size: 14px;">
              <p>If you have any urgent questions, don't hesitate to reach out to us directly.</p>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0; font-size: 14px;">InsAPI Marketing - Your Growth Partner</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">© 2024 InsAPI Marketing. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Send emails function
const sendEmails = async (contactData) => {
  const { name, email, phone, source, _id } = contactData;
  const adminEmail = process.env.ADMIN_EMAIL || 'malojyotirmoy@gmail.com';
  
  if (!transporter) {
    console.log('📧 [SIMULATED] Admin notification email would be sent to:', adminEmail);
    console.log('📧 [SIMULATED] Confirmation email would be sent to:', email);
    return { adminSent: true, userSent: true, simulated: true };
  }

  const results = { adminSent: false, userSent: false };

  try {
    // Send admin notification
    await transporter.sendMail({
      from: `"${process.env.SENDER_NAME || 'InsAPI Marketing'}" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🎯 New Lead: ${name} - ${source} page`,
      html: adminEmailTemplate(name, email, phone, source, _id),
      replyTo: email,
    });
    console.log('✅ Admin email sent to:', adminEmail);
    results.adminSent = true;
  } catch (error) {
    console.error('❌ Error sending admin email:', error.message);
  }

  try {
    // Send user confirmation
    await transporter.sendMail({
      from: `"${process.env.SENDER_NAME || 'InsAPI Marketing'}" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting InsAPI Marketing!',
      html: userConfirmationTemplate(name),
    });
    console.log('✅ Confirmation email sent to:', email);
    results.userSent = true;
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error.message);
  }

  return results;
};

// ===== CONTACT FORM ROUTES =====
const contactRouter = express.Router();

// Submit contact form
contactRouter.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, subject, source } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ status: 'error', message: 'Name is required' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ status: 'error', message: 'Valid email is required' });
    }
    if (!phone || phone.length < 10) {
      return res.status(400).json({ status: 'error', message: 'Valid phone number is required' });
    }

    // Save to database
    const contact = new Contact({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      subject: subject || 'Contact Form Submission',
      source: source || 'home',
    });

    const savedContact = await contact.save();
    console.log('✅ Contact saved:', savedContact._id);

    // Send emails (non-blocking)
    sendEmails(savedContact).then(result => {
      console.log('📧 Email results:', result);
    }).catch(err => {
      console.error('📧 Email error:', err.message);
    });

    res.status(201).json({
      status: 'success',
      message: 'Thank you for your response! We will reach you soon ASAP.',
      submissionId: savedContact._id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while processing your request. Please try again.',
    });
  }
});

// Get all contacts (admin only)
contactRouter.get('/all', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/marketing-site')
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL || 'malojyotirmoy@gmail.com'}`);
  console.log(`📧 SMTP configured: ${!!transporter}`);
});
