tstamp=`date '+%Y%m%d%H%M%S'`
dest=/var/www/SKLARDEVELOPMENT/nff/nff_analyzer2015_$tstamp.taz
tar cvfz $dest   /home/nffusa/www
echo Has been constructed in: $dest

