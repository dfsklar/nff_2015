perl extract_2015.pl $* < Data_Pull_03MAR2015.txt 2> extract_stderr.txt | tee result.tmp > ../webapp/realdata.json
cat extract_stderr.txt
mkdir compressed
gzip -9 < result.tmp > compressed/realdata.json
cat cvtJSONtoJS_header.txt result.tmp cvtJSONtoJS_footer.txt > ../webapp/realdata.js
