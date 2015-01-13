#use feature 'unicode_strings';
#use utf8;

print "window.nfforg.database_unindexed.respondents = [ \n";

@fieldstoemit = (
                 'orgid', 'state', 'org_type', 'lmi_loc', 'lifeline', 'lmi_needs',
                 'lmi_serve', 'past_demand_serv', 'met_past_demand_serv', 'fut_demand_serv', 'opp_exp_max',
                 'surplus_deficit_prior',
                 'surplus_deficit_current',
                 'surplus_prior_perc',  #This and its deficit compatriot are mut-excl to be considered a single chart
                 #      'deficit_prior_perc',   #See comment on previous line
                 'months_cash',
                 'action_staff.{timeframe}',
                 'action_management.{timeframe}',
                 'action_service.{timeframe}',
                 'greatest_challenges',
                 'arts_org_type',
                 'opp_exp_max',
                 'gov_payment_sources',
                 'gov_delay_response',
                 'gov_delay.0',  #FED
                 'gov_delay.1',  #STATE
                 'gov_delay.2',   #LOCAL
                 'impact_barriers',
                 'impact_funder_request',
                 'impact_funder_cost.0',
                 'funder_dialogue',
                 'yes_loan',
                 'no_loan',
                 'want_loan',
                 'loan',
                 'arts_audience_dev',
                 'arts_audience_dev_results',
                 'arts_competition',
                 'arts_competition_response',
                 'arts_grantmaking_receive',
                 'arts_grantmaking_practices',
                 'current_year_client_outlook',
                 'current_year_org_outlook'
                );

# Once we find this particular mult-column field during
# our scan of the column headers,
# the value will change to show the number of 
# colheaders of this special field that have been
# seen thus far.
# The $fieldkeys will be given unique keys for
# each column, e.g. "greatest_challenges.1", ".2", etc.
# Note it is one-based indexing.
%fieldsWithMultColumns;
$fieldsWithMultColumns{'greatest_challenges'} = 1;
$fieldsWithMultColumns{'lmi_needs'} = 1;
$fieldsWithMultColumns{'gov_payment_sources'} = 1;
$fieldsWithMultColumns{'gov_delay_response'} = 1;
$fieldsWithMultColumns{'impact_barriers'} = 1;
$fieldsWithMultColumns{'funder_dialogue'} = 1;
$fieldsWithMultColumns{'yes_loan'} = 1;
$fieldsWithMultColumns{'no_loan'} = 1;
$fieldsWithMultColumns{'want_loan'} = 1;
$fieldsWithMultColumns{'arts_audience_dev'} = 1;
$fieldsWithMultColumns{'arts_audience_dev_results'} = 1;
$fieldsWithMultColumns{'arts_competition'} = 1;
$fieldsWithMultColumns{'arts_competition_response'} = 1;
$fieldsWithMultColumns{'arts_grantmaking_receive'} = 1;
$fieldsWithMultColumns{'arts_grantmaking_practices'} = 1;



$_ = <STDIN>;
chomp;
@fields = split(/\t/, $_);
%fieldkeys;
$fieldkeys{'orgid'} = 1;

%enums;

$colidx = 0;


foreach $colheader (@fields) {
  $colheader =~ s/^\"//;
  $colheader =~ s/\"$//;
  if ($colheader =~ /\[(.+?)\]/) {
    $fieldkey = $1;
    if ($fieldkey =~ /\./) {
      # Special mult-col field that has unique field names in the column headers
      if ($colheader =~ /\|(.*?)\{/m) {
        $valueEnglish = $1;
        $valueEnglish =~ s/^\s+//;
        $valueEnglish =~ s/\s+$//;
        $enums{$fieldkey} = "\"$valueEnglish\"";
        print STDERR $valueEnglish . "\n";
      }
      if ($colheader =~ /\[PLANNING/m) {
        $fieldkey .= ".next";
      }
      if ($colheader =~ /\[TAKEN/m) {
        $fieldkey .= ".last";
      }
      if (! $fieldkeys{$fieldkey}) {
        $fieldkeys{$fieldkey} = $colidx;
      }
    }
    elsif ($fieldsWithMultColumns{$fieldkey}) {
      # Special mult-col field that does NOT have unique field names
      if ($colheader =~ /\[.*?\].*\[(.*?)\]$/m) {
        $forhuman = $1;
        # The next condition makes sure we ignore the column
        # that simply stores the non-structured text entered by those who
        # chose "Other" on the survey.
        if ($forhuman ne "text") {
          $curMCIndex = $fieldsWithMultColumns{$fieldkey};
          $fieldkeys{$fieldkey.".".$curMCIndex} = $colidx;
          $fieldsWithMultColumns{$fieldkey} = $curMCIndex + 1;
          $enums{$fieldkey.".".$curMCIndex} = "\"$forhuman\"";
          print STDERR $forhuman . "\n";
        }
      }else{
        die $colheader;
      }
    }
    elsif (! $fieldkeys{$fieldkey}) {
      $fieldkeys{$fieldkey} = $colidx;
      # print STDERR "Registering $fieldkey at $colidx\n";
    }
    # Above line is VERIFIED GOOD!
  }
  $colidx++;
}



sub emitTimeframeBasedValue {
  my $base = $_[0];
  $base =~ s/\.\{.*\}//;
  my $result = "\t\"$base\" : {\n";

  my $atleastone = 0;
  my $proctime = "last";
  my $idx = 0;
  my $prefix = "";
  $result .= "\t\t$proctime: [ ";
  while (1) {
    my $generatedfieldname = $base . "." . $idx . "." . $proctime;
    if ($fieldkeys{$generatedfieldname}) {
      $value = $fields[$fieldkeys{$generatedfieldname}];
      if ($value) {
        $result .= $prefix . $enums{"${base}.$idx"};
        $atleastone = 1;
        $prefix = " , ";
      }
    }else{
      $result .= " ]\n";
      last;
    }
    $idx++;
  }

  my $proctime = "next";
  my $idx = 0;
  my $prefix = "";
  $result .= "\t\t,\n\t\t$proctime: [ ";
  while (1) {
    my $generatedfieldname = $base . "." . $idx . "." . $proctime;
    if ($fieldkeys{$generatedfieldname}) {
      $value = $fields[$fieldkeys{$generatedfieldname}];
      if ($value) {
        $result .= $prefix . $enums{"${base}.$idx"};
        $atleastone = 1;
        $prefix = " , ";
      }
    }else{
      $result .= " ]\n";
      last;
    }
    $idx++;
  }
  $result .= "\t},";
  print $result if ($atleastone);
}









sub emitMultColBasedValue {
  my $base = $_[0];
  my $result = "\t\"$base\" : [ ";
  my $prefix = "";

  my $atleastone = 0;

  my $idx = 1;
  while (1) {
    my $generatedfieldname = $base . "." . $idx;
    if ($fieldkeys{$generatedfieldname}) {
      $value = $fields[$fieldkeys{$generatedfieldname}];
      if ($value) {
        $result .= $prefix . $enums{"${base}.$idx"};
        $atleastone = 1;
        $prefix = " , ";
      }
    }else{
      $result .= " ],\n";
      last;
    }
    $idx++;
  }

  print $result if ($atleastone);
}


# Now visit the data rows
while (<STDIN>) {
  @fields = split(/\t/, $_);
  next if ($fields[0] =~ /^Status/);
  next if ($fields[0] =~ /^Incomplete/);
  print "{\n";
  foreach $goodfield (@fieldstoemit) {
      
    if ($goodfield =~ /\{timeframe\}/) {
      &emitTimeframeBasedValue($goodfield);
    }
    elsif ($fieldsWithMultColumns{$goodfield}) {
      &emitMultColBasedValue($goodfield);
    }
    else{
      $value = $fields[$fieldkeys{$goodfield}];
      if ($goodfield eq "surplus_prior_perc") {
        if (!($value)) {
          $value = $fields[$fieldkeys{"deficit_prior_perc"}];
          if ($value) {
            $value = "deficit " . $fields[$fieldkeys{"deficit_prior_perc"}];
          }
        }
      }
      if ($value) {
        $value =~ s/^\"//;
        $value =~ s/\"$//;
        $value =~ s/^\s+//;
        $value =~ s/\s+$//;
        print "\t\"$goodfield\" : \"$value\",\n";
      }
    }
  }
  print "\t\"fin\" : 0\n";
  print "},\n";
}

print "{}];\n";
