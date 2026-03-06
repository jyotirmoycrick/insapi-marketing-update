# VPS Deployment Checklist ✅

## Pre-Deployment

- [ ] VPS purchased and accessible via SSH
- [ ] Domain name purchased (optional)
- [ ] Domain DNS pointed to VPS IP
- [ ] Code ready and tested locally
- [ ] Database backup created

## Server Setup

- [ ] Connected to VPS via SSH
- [ ] System updated (`apt update && apt upgrade`)
- [ ] Node.js installed (v18+)
- [ ] Python installed (v3.10+)
- [ ] MongoDB installed and running
- [ ] Nginx installed and running
- [ ] Firewall configured (UFW)
- [ ] PM2 installed globally

## Code Deployment

- [ ] Code uploaded to `/var/www/myapp`
- [ ] Backend dependencies installed
- [ ] Backend `.env` file created
- [ ] Frontend dependencies installed
- [ ] Frontend `.env` file created
- [ ] Frontend built (`npm run build`)
- [ ] Upload directory created with correct permissions

## Service Configuration

- [ ] Backend started with PM2
- [ ] PM2 configured to start on boot
- [ ] Nginx configuration created
- [ ] Nginx configuration enabled
- [ ] Nginx configuration tested (`nginx -t`)
- [ ] Nginx reloaded

## SSL Setup

- [ ] Certbot installed
- [ ] SSL certificate obtained
- [ ] HTTP to HTTPS redirect enabled
- [ ] Auto-renewal tested

## Database Setup

- [ ] MongoDB running
- [ ] Database created
- [ ] Admin user created (optional)
- [ ] Connection string updated in `.env`

## Testing

- [ ] Backend accessible: `curl http://localhost:8000/api/pages`
- [ ] Frontend accessible: `curl http://localhost`
- [ ] Site accessible from browser: `https://yourdomain.com`
- [ ] Admin panel accessible: `https://yourdomain.com/admin`
- [ ] Can login to admin panel
- [ ] Can create/edit pages
- [ ] Images upload working
- [ ] Page builder working
- [ ] Published pages visible

## Security

- [ ] Admin password changed from default
- [ ] MongoDB authentication enabled (optional)
- [ ] Firewall rules configured
- [ ] Fail2Ban installed (optional)
- [ ] Regular backup script created
- [ ] SSL certificate auto-renewal working

## Monitoring

- [ ] PM2 logs accessible: `pm2 logs`
- [ ] Nginx logs accessible: `tail -f /var/log/nginx/error.log`
- [ ] MongoDB logs accessible: `tail -f /var/log/mongodb/mongod.log`
- [ ] Disk space monitored: `df -h`
- [ ] Memory monitored: `free -h`

## Documentation

- [ ] Server IP documented
- [ ] Domain name documented
- [ ] Admin credentials documented (securely)
- [ ] Database credentials documented (securely)
- [ ] Deployment process documented
- [ ] Backup process documented

## Post-Deployment

- [ ] Test all features
- [ ] Monitor logs for errors
- [ ] Setup monitoring alerts (optional)
- [ ] Schedule regular backups
- [ ] Document any issues
- [ ] Create update/deployment script

## Quick Commands Reference

### Check Status
```bash
pm2 status                          # Backend status
sudo systemctl status nginx         # Nginx status
sudo systemctl status mongod        # MongoDB status
```

### View Logs
```bash
pm2 logs backend                    # Backend logs
sudo tail -f /var/log/nginx/error.log  # Nginx errors
sudo tail -f /var/log/mongodb/mongod.log  # MongoDB logs
```

### Restart Services
```bash
pm2 restart backend                 # Restart backend
sudo systemctl restart nginx        # Restart Nginx
sudo systemctl restart mongod       # Restart MongoDB
```

### Update Code
```bash
cd /var/www/myapp
git pull
cd backend && source venv/bin/activate && pip install -r requirements.txt && pm2 restart backend
cd ../frontend && npm install && npm run build && sudo systemctl reload nginx
```

## Troubleshooting

### Site Not Loading
1. Check Nginx: `sudo systemctl status nginx`
2. Check Nginx config: `sudo nginx -t`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
4. Restart Nginx: `sudo systemctl restart nginx`

### Backend Not Working
1. Check PM2: `pm2 status`
2. Check logs: `pm2 logs backend`
3. Check port: `sudo lsof -i :8000`
4. Restart: `pm2 restart backend`

### Database Issues
1. Check MongoDB: `sudo systemctl status mongod`
2. Check logs: `sudo tail -f /var/log/mongodb/mongod.log`
3. Restart: `sudo systemctl restart mongod`
4. Test connection: `mongosh`

### SSL Issues
1. Check certificate: `sudo certbot certificates`
2. Renew: `sudo certbot renew`
3. Check Nginx config for SSL

## Success Criteria

✅ Site loads at https://yourdomain.com
✅ Admin panel accessible
✅ Can login and edit content
✅ Changes save and publish correctly
✅ Images upload successfully
✅ No errors in logs
✅ SSL certificate valid
✅ All services running

## Next Steps After Deployment

1. **Monitor** - Check logs regularly for first few days
2. **Backup** - Setup automated daily backups
3. **Optimize** - Enable caching, compression
4. **Secure** - Regular security updates
5. **Scale** - Monitor resources, upgrade if needed

---

**Deployment Complete!** 🎉

Your site is now live at: **https://yourdomain.com**
