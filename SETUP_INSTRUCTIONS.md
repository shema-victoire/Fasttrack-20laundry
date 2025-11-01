# Fast Track Laundry - Setup Instructions

Complete guide to run the Fast Track Laundry website locally.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - Download from [nodejs.org](https://nodejs.org)
- **Git** - Download from [git-scm.com](https://git-scm.com)
- **PNPM** (Package Manager) - Install globally:
  ```bash
  npm install -g pnpm
  ```

---

## 🔑 Step 1: Set Up Twilio WhatsApp Integration

To enable WhatsApp booking notifications, you'll need a Twilio account.

### 1.1 Create a Twilio Account

1. Visit [twilio.com](https://www.twilio.com/)
2. Sign up for a free account (includes $15 trial credit)
3. Verify your phone number

### 1.2 Get WhatsApp Credentials

1. In Twilio Dashboard, go to **Phone Numbers** → **Manage** → **Active Numbers**
2. Look for your WhatsApp-enabled number (e.g., +14155238886)
3. Copy your **Account SID** and **Auth Token** from the main Dashboard

### 1.3 Note Down Your Details

You'll need these for the `.env` file:

- Account SID
- Auth Token
- Twilio WhatsApp Phone Number
- Owner's WhatsApp Phone (+250792370021 or your number for testing)

---

## 📁 Step 2: Clone & Install Project

### 2.1 Clone the Repository

```bash
git clone https://github.com/shema-victoire/Fasttrack-20laundry.git
cd Fasttrack-20laundry
```

### 2.2 Install Dependencies

```bash
pnpm install
```

This will install all required packages (React, Express, TailwindCSS, etc.)

---

## ⚙️ Step 3: Configure Environment Variables

### 3.1 Create `.env` File

In the project root directory, create a file named `.env`:

```bash
# ==========================================
# TWILIO WHATSAPP CONFIGURATION
# ==========================================
TWILIO_ACCOUNT_SID=AC8a065ac077bbe25c8bcac3f99ba39dff
TWILIO_AUTH_TOKEN=c210600e0190eee96b82ff80dcdfa207
TWILIO_WHATSAPP_PHONE=+14155238886

# ==========================================
# FAST TRACK LAUNDRY OWNER CONTACT
# ==========================================
OWNER_WHATSAPP_PHONE=+250792370021

# ==========================================
# DEVELOPMENT SETTINGS
# ==========================================
NODE_ENV=development
PING_MESSAGE=pong
```

**⚠️ IMPORTANT:**

- Replace the credentials with your actual Twilio credentials
- Keep your `.env` file private - never commit it to GitHub
- The `.env` file is listed in `.gitignore` to prevent accidental commits

### 3.2 File Structure After Setup

```
Fasttrack-20laundry/
├── .env                    (← Create this file)
├── .env.example            (← Reference template)
├── client/
│   ├── pages/
│   │   ├── Index.tsx       (Homepage with booking form)
│   │   ├── Services.tsx    (Services listing)
│   │   └── Contact.tsx     (Contact page)
│   ├── components/
│   │   └── Layout.tsx      (Shared header/footer)
│   ├── lib/
│   │   └── whatsapp.ts     (WhatsApp utilities)
│   ├── App.tsx             (Main app component)
│   ├── main.tsx            (Entry point)
│   └── global.css          (Tailwind & theme)
├── server/
│   ├── index.ts            (Express server setup)
│   └── routes/
│       ├── booking.ts      (✨ Booking endpoint - sends WhatsApp)
│       └── demo.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Step 4: Run the Project

### 4.1 Start Development Server

```bash
pnpm dev
```

This will:

- Start the Vite development server (frontend)
- Start the Express backend server
- Open the app at `http://localhost:8080`

### 4.2 Access the Application

- **Homepage:** http://localhost:8080
- **Services:** http://localhost:8080/services
- **Contact:** http://localhost:8080/contact

---

## ✅ Step 5: Test the Booking System

### 5.1 Test Booking Form

1. Go to homepage (http://localhost:8080)
2. Scroll to "Book Your Pickup" section
3. Fill in the form:
   - Full Name: Your name
   - Phone: Your phone number
   - Address: Your address in Kigali
   - Service Type: Select one (Washing, Dry Cleaning, or Pressing)
   - Pickup Date: Select a date
4. Click "Complete Booking"
5. You should receive a WhatsApp message at the owner's number (+250792370021)

### 5.2 Expected WhatsApp Message

```
🚀 NEW BOOKING FROM LAUNDRYPRO

👤 Customer Name: [Form Name]
📞 Phone: [Form Phone]
📍 Address: [Form Address]
🧺 Service: [Selected Service]
📅 Preferred Pickup: [Selected Date]
```

---

## 🛠️ Available Commands

```bash
# Start development server (frontend + backend)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Type check the project
pnpm typecheck

# Format code with Prettier
pnpm format.fix
```

---

## 📁 Project Structure & Key Files

### Frontend Files

- **`client/pages/Index.tsx`** - Homepage with booking form
- **`client/pages/Services.tsx`** - Services listing page
- **`client/pages/Contact.tsx`** - Contact information page
- **`client/components/Layout.tsx`** - Shared header & footer
- **`client/lib/whatsapp.ts`** - WhatsApp helper functions
- **`client/App.tsx`** - Main app component with routing
- **`client/main.tsx`** - React entry point
- **`client/global.css`** - Tailwind CSS & theme colors

### Backend Files

- **`server/index.ts`** - Express server configuration
- **`server/routes/booking.ts`** - ✨ **Booking endpoint** (handles form submissions and sends WhatsApp)
  - Receives: name, phone, address, serviceType, pickupDate
  - Sends: WhatsApp message to owner via Twilio

### Configuration Files

- **`tailwind.config.ts`** - Tailwind CSS theme configuration
- **`tsconfig.json`** - TypeScript configuration
- **`vite.config.ts`** - Vite frontend build configuration
- **`vite.config.server.ts`** - Vite backend build configuration
- **`package.json`** - Dependencies and scripts

---

## 🔄 How the Booking System Works

```
1. Customer fills booking form on homepage
                    ↓
2. Clicks "Complete Booking" button
                    ↓
3. Form data sent to `/api/booking` endpoint (backend)
                    ↓
4. Backend receives data and calls Twilio API
                    ↓
5. Twilio sends WhatsApp message to owner's number
                    ↓
6. Owner receives booking notification on WhatsApp
                    ↓
7. Owner responds to customer via WhatsApp to confirm
```

---

## 🐛 Troubleshooting

### Issue: "pnpm: command not found"

**Solution:** Install pnpm globally:

```bash
npm install -g pnpm
```

### Issue: Port 8080 already in use

**Solution:** The app will try the next available port. Check the console for the actual URL.

### Issue: Not receiving WhatsApp messages

**Checklist:**

- [ ] Twilio Account SID and Auth Token are correct in `.env`
- [ ] Twilio WhatsApp phone number is correct in `.env`
- [ ] Owner WhatsApp phone number is correct in `.env`
- [ ] Twilio account has enough balance (trial credit available)
- [ ] Check browser console for form submission errors

### Issue: "Missing environment variables"

**Solution:** Make sure your `.env` file has all required variables:

```bash
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_PHONE=...
OWNER_WHATSAPP_PHONE=...
```

---

## 📦 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS
- **Backend:** Express.js
- **WhatsApp Integration:** Twilio API
- **UI Components:** Radix UI + Lucide Icons
- **Package Manager:** PNPM

---

## 🌐 Deployment

To deploy this project:

### Option 1: Netlify (Recommended)

1. Push code to GitHub
2. Connect repo to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy automatically on push

### Option 2: Vercel

1. Push code to GitHub
2. Import project on Vercel
3. Set environment variables
4. Deploy automatically

### Option 3: Docker / VPS

1. Build the project: `pnpm build`
2. Run with: `pnpm start`
3. Set environment variables on your server

---

## 📞 Support

For issues or questions:

- Check the troubleshooting section above
- Visit [Twilio Docs](https://www.twilio.com/docs/whatsapp)
- Check [Vite Docs](https://vitejs.dev)

---

## 📝 License

This project is proprietary to Fast Track Laundry.

---

**Last Updated:** November 2024
**Project Version:** 1.0.0
