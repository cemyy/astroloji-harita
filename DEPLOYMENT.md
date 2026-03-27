# Deployment Guide

This guide covers how to deploy the Astrology Application to production.

## Option 1: Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account (or other Git provider)
- Vercel account (free at vercel.com)
- OpenAI API key (for AI features)
- Supabase project (optional, for database/user accounts)

### Steps

1. **Push to GitHub**
   ```bash
   # Initialize git if needed
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/astroloji-harita.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables** in Vercel Project Settings
   - `NEXT_PUBLIC_OPENAI_API_KEY` - Your OpenAI API key
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (if using database)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (server-side)

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `https://YOUR_PROJECT.vercel.app`

### Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., astrology.example.com)
3. Follow DNS configuration instructions

## Option 2: Deploy to Netlify

### Steps

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Set Node version to 18

3. **Add Environment Variables**
   - Go to Site Settings → Build & deploy → Environment
   - Add all required environment variables

4. **Deploy**
   - Netlify will build and deploy automatically

## Option 3: Deploy to Your Own Server

### Prerequisites
- Server/VPS with Node.js 18+
- PostgreSQL (alternative to Supabase)
- Domain name
- SSL certificate (Let's Encrypt recommended)

### Steps

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Upload to Server**
   ```bash
   scp -r . user@your-server:/path/to/app
   ssh user@your-server
   cd /path/to/app
   npm install --production
   ```

3. **Set Up Environment Variables**
   ```bash
   # Create .env.local on server
   echo "NEXT_PUBLIC_OPENAI_API_KEY=your_key" >> .env.local
   echo "NEXT_PUBLIC_SUPABASE_URL=..." >> .env.local
   # ... add all required variables
   ```

4. **Run with PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name "astrology-app"
   pm2 startup
   pm2 save
   ```

5. **Set Up Nginx Reverse Proxy**
   ```nginx
   server {
     listen 80;
     server_name astrology.example.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

6. **Enable HTTPS with Certbot**
   ```bash
   sudo certbot --nginx -d astrology.example.com
   ```

## Environment Variables Explained

### OpenAI Integration
- **NEXT_PUBLIC_OPENAI_API_KEY**: Get from https://platform.openai.com/api-keys
  - Required for AI interpretations
  - Can be left empty for template-based interpretations
  - Usage-based billing

### Supabase Configuration
- **NEXT_PUBLIC_SUPABASE_URL**: Your project URL from Supabase dashboard
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Anon key for client-side operations
- **SUPABASE_SERVICE_ROLE_KEY**: Service role key for server-side operations (keep secret)
- Free tier includes 500 MB storage and 2 GB bandwidth

### Optional Services
- **NEXT_PUBLIC_GOOGLE_MAPS_API_KEY**: For astrocartography map visualization

## Post-Deployment Setup

### 1. Initialize Database (if using Supabase)
```bash
# In Supabase SQL Editor, run:
# Copy contents of SUPABASE_SETUP.sql and execute
```

### 2. Test API Endpoints
```bash
# Test chart interpretation API
curl -X POST https://astrology.example.com/api/interpret \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Test prompt"}'
```

### 3. Monitor Performance
- Use Vercel Analytics for real-time monitoring
- Set up error tracking with Sentry (optional)
- Monitor API usage in OpenAI dashboard

## Scaling Considerations

### For High Traffic (1000s of users)
1. Enable Vercel Edge Caching
2. Use Supabase connection pooling
3. Implement rate limiting for API endpoints
4. Cache interpretation results

### Cost Optimization
- OpenAI: ~$0.01 per interpretation
- Supabase: Free tier includes 500MB storage
- Vercel: Free tier for static sites, $20/month for Pro

## Troubleshooting

### Deployment Fails
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify Node version compatibility

### Environment Variables Not Working
1. Verify variables are set in deployment platform
2. Check for typos in variable names
3. Require rebuild after changing env vars

### Database Connection Issues
1. Check Supabase connection parameters
2. Verify IP whitelist settings
3. Test connection from command line

### OpenAI API Errors
1. Verify API key in environment
2. Check API rate limits and billing
3. Ensure API key has required permissions

## Monitoring & Maintenance

### Weekly
- Check error logs
- Review API usage
- Monitor response times

### Monthly
- Update dependencies: `npm update`
- Review Supabase analytics
- Check OpenAI usage and costs

### Quarterly
- Security audit
- Performance optimization
- Backup database

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **OpenAI Docs**: https://platform.openai.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

For questions or issues, create an issue on the GitHub repository.
