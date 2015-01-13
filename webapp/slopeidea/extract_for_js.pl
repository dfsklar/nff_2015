# JUST COPY THE FIELDS VARIABLE FROM DOWNLOAD.PL
@fields = (
         "acted_add_prog",
         "acted_red_prog",
         "acted_expand_geo",
         "acted_red_geo",
         "acted_inc_clients",
         "acted_dec_clients",
         "acted_inc_serv_per",
         "acted_dec_serv_per",
         "acted_collab_serv",
         "acted_new_org_tech",
         "acted_new_serv_tech"
          );

$dataname = "data_acted_services";

print "(function() { window.nfforg.$dataname = {}; var data = window.nfforg.$dataname;\n";

foreach $X (@fields) {
  next if ! ($X =~ /acted_/);
  print "data.$X = \n";
  open FIN, " < datadumps/$X.tmp";
  $_ = <FIN>;
  close FIN;
  print $_;
  print ";\n\n";
}

print "})();\n";
