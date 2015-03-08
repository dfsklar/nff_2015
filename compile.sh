sh extract.sh
sh build_aggregate.sh
/bin/rm -rf /home/nffusa/www
harp compile webapp /home/nffusa/www
cd /home/nffusa/www
/bin/mv indexproduction.html index.html
