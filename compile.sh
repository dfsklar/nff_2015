/bin/rm -rf www
harp compile webapp www
gtar cvfz www_nff.taz www
sftp nffusa@linode.sklardevelopment.com <<EOF
put www_nff.taz
put dataprep/extract_final.pl
EOF
