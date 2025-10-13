# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in:
   - **Project name**: lifestyle-platform
   - **Database password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing plan**: Start with Free tier

## 2. Get Your Supabase Credentials

### Database Connection String
1. Go to **Project Settings** > **Database**
2. Scroll to **Connection string** > **URI**
3. Copy the connection string (it will look like):
   ```
   postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

### API Keys
1. Go to **Project Settings** > **API**
2. You'll find:
   - **Project URL**: `https://xxxxxxxxxxxx.supabase.co`
   - **anon public**: Your public anon key
   - **service_role**: Your service role key (keep this secret!)

## 3. Create Your `.env.local` File

Create a file named `.env.local` in the root directory with:

```bash
# Database - Supabase PostgreSQL Connection
DATABASE_URL="postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# NextAuth
NEXTAUTH_URL="http://localhost:4000"
NEXTAUTH_SECRET="your-generated-secret"
```

**Important Notes:**
- Use the **pooler connection** (port 6543) for DATABASE_URL
- Use the **direct connection** (port 5432) for DIRECT_URL  
- Replace `[YOUR-PASSWORD]` with your actual database password
- For NEXTAUTH_SECRET, generate one with: `openssl rand -base64 32`

## 4. Push Your Prisma Schema to Supabase

Run these commands:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to Supabase database
npx prisma db push

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

## 5. Verify Connection

After pushing your schema, verify in Supabase:
1. Go to **Table Editor** in your Supabase dashboard
2. You should see all your tables (User, Event, Message, etc.)

## 6. Enable Row Level Security (RLS)

For production, enable RLS on your tables:
1. Go to **Authentication** > **Policies**
2. Create policies for each table based on your security requirements

## 7. Start Your Dev Server

```bash
npm run dev
```

Your app should now be connected to Supabase! Visit http://localhost:4000

## Troubleshooting

### Connection Issues
- Verify your DATABASE_URL is correct
- Check that your IP is allowed (Supabase allows all by default)
- Ensure your database password doesn't have special characters that need URL encoding

### Migration Issues
- If `prisma db push` fails, check the Supabase logs
- You might need to manually create the database if it doesn't exist

### Authentication Issues
- Verify NEXTAUTH_URL matches your dev server URL
- Ensure NEXTAUTH_SECRET is set and is a strong random string

