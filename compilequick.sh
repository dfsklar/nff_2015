/bin/rm -rf /home/nffusa/www
harp compile webapp /home/nffusa/www
cp webapp/htaccess /home/nffusa/www/.htaccess
cd /home/nffusa/www
/bin/mv indexproduction.html index.html
