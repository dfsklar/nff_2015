perl extract_2015.pl < Data_Pull_03MAR2015.txt 2> extract_stderr.txt | tee result.tmp > ../webapp/realdata.json
cat extract_stderr.txt

