# This next line declares that the incoming file is in Mac format (line ending is just a ^R).
local $/ = "\r";

print "window.nfforg.database_unindexed.respondents = [ \n";

$processingLimit = 9999999;

@fieldsMultChoice = (
                     'lmi_(.*)',   # 1 or blank are the only legal values
                     'challenge_(.*)',
                     'gov_payment_sources_(.*)',  # in 2014 was named: 'funding_gov_(.*)'
                     'funding_all_gov_(.*)',  # seems to be about how the org responds to late incoming payments (e.g. "delay payment to my vendors", etc)
                     # from 2014 but no longer valid: 'data_collect_(.*)',
                     # from 2014 but no longer valid: 'arts_grants_(.*)',
                     'dialog_(.*)',
                     'arts_source_competition_(.*)',   # NEW 2015!
                     # from 2014 but no longer valid: 'loan_no_(.*)',
                     'loan_yes_(.*)',
                     'debt_fin_applied_no_debt_(.*)',  # NEW 2015!
                     'addtl_debt_fin_(.*)',  # NEW 2015!
                     'future_debt_fin_(.*)',  # NEW 2015!
                     'unmet_demand_svc_(.*)',  # NEW 2015!
                     # from 2014 but no longer valid: 'loan_want_(.*)',
                     # from 2014 but no longer valid: 'arts_comp_resp_(.*)',
                     # from 2014 but no longer valid: 'arts_comp_(.*)',
                     'arts_audience_dev_results_(.*)',   # NEW 2015 (or name change)
                     'arts_aud_(.*)',
                     'arts_funder_(.*)',   # NEW 2015 (or name change) *** BUT I HAVEN'T TAGGED THESE YET ***
                     # from 2014 but no longer valid: 'arts_funding_(.*)'
                     
                     # New approach for handling the plan/taken mult choice
                     'action_prog_service(.*)',
                     'action_ops_finance(.*)',
                     'action_staff(.*)'
                    );
@regexFieldsMultChoice;
foreach $strPattern (@fieldsMultChoice) {
  push(@regexFieldsMultChoice, qr/$strPattern/);
}



@fieldstoemit = (
                 'orgid', 'state', 
                 'org_type', 
                 'arts_org_type',
                 'lmi_serve_expanded',   # Full long text, with <strong>primarily</strong>, <strong>exclusively</strong>, etc
                 'lmi_loc',  #Yes/No
                 'loan_yn',
                 'lifeline', 
                 'past_demand_serv', 'met_past_demand_serv', 'fut_demand_serv', 'meet_fut_demand_serv', 
                 'opp_exp_max',
                 'year_founded_range',
                 'funding_reporting_hours_range',

                 'aicr_fed_range',
                 'aicr_state_range',
                 'aicr_loc_range',

                 'employee_count_fte_range',
                 'employee_count_pte_range',

                 'funding_local_full_cost',
                 'funding_state_full_cost',
                 'funding_fed_full_cost',
                 'funding_foundation_full_cost',
                 'funding_corporation_full_cost',
                 'funding_individual_full_cost',

                 'funding_fed_trend',
                 'funding_state_trend',
                 'funding_loc_trend',

                 'expense_gos_perc_range',

                 'funding_gov_days_late',
                 'funding_gov_state_days_late',
                 'funding_gov_loc_days_late',

                 'aicr_fed_trend',
                 'aicr_state_trend',
                 'aicr_loc_trend',

                 'surplus_deficit_prior',
                 'surplus_deficit_current',
                 'surplus_prior_perc',  #This and its deficit compatriot are mut-excl to be considered a single chart
                 #      'deficit_prior_perc',   #See comment on previous line
                 'months_cash',

                 'current_year_client_outlook',
                 'current_year_org_outlook',
                 
                 'impact_action_eval',
                 'impact_action_prog_data',
                 'impact_action_lives_data',
                 'impact_action_cmty_data',

                 'impact_funder_request',  # All of our funders, ...
                 'impact_funder_metrics',  # Strongly Agree, ...
                 'impact_funder_cost'  # sometimes, never, rarely
                 #'arts_audience_dev',
                 #'arts_audience_dev_results',
                 #'arts_grantmaking_practices',
                );

%mapFieldsToEmit = map { $_ => 1 } @fieldstoemit;




%multchoicesets;

$multchoicesets{'action_management'} = ["acted_collab_admin",	"plan_collab_admin",	"acted_merge",	"plan_merge",	"acted_change_fundraising",	"plan_change_fundraising",	"acted_earned_revenue",	"plan_earned_revenue",	"acted_advocacy",	"plan_advocacy",	"acted_alt_funds",	"plan_alt_funds",	"acted_add_reserve",	"plan_add_reserve",	"acted_use_reserve",	"plan_use_reserve",	"acted_capital_camp",	"plan_capital_camp",	"acted_org_restructure",	"plan_org_restructure",	"acted_strat_plan",	"plan_strat_plan",	"acted_fin_consultants",	"plan_fin_consultants",	"acted_tech_upgrade",	"plan_tech_upgrade",	"acted_borrow_board",	"plan_borrow_board",	"acted_delay_vendors",	"plan_delay_vendors",	"acted_buy_facility",	"plan_buy_facility",	"acted_lease_facility",	"plan_lease_facility",	"acted_sell_facility",	"plan_sell_facility",	"acted_na_mgmt_2014", "plan_na_mgmt_2014"];



##### UNUSED !!!!
sub autogenMultChoiceSet_takenplanned {
  my($base) = $_[0];
  my($maxidx) = $_[1];
  my(@lst) = ();
  for (my $i=0; $i <= $maxidx; $i++) {
    push(@lst, "$base".".".$i.".TAKEN");
    push(@lst, "$base".".".$i.".PLANNING");
  }

  return \@lst;
}




%converters;





# Change for 2015: the headers are now found in TWO ROWS.
# The column header is taken from the first row unless that cell is empty, in which case taken from second row.

# READ THE FIRST HEADER ROW
$_ = <STDIN>;
chomp;
@fields1 = split(/[\t\r\n]/, $_);

%fieldkeys;
$fieldkeys{'orgid'} = 2;


# READ THE SECOND HEADER ROW
# It is the "real" header row generated by NFF so its length is more accurate.
# But anything on the 1st header row supersedes this header row.
$_ = <STDIN>;
chomp;
@fields = split(/[\t\r\n]/, $_);

for (my $i=0; $i < $#fields; $i++) {
  if ($fields1[$i]) {
    print STDERR "About to overwrite $fields[$i] with this: $fields1[$i]\n";
    $fields[$i] = $fields1[$i];
  }else{
    # The only part of the field that is desired if the field came from row #2 is
    # the part that lies in square brackets:
    $origField = $fields[$i];
    if ($fields[$i] =~ /\[(.*?)\]/) {
      $fields[$i] = $1;
      $fields[$i] .= ".TAKEN" if ($origField =~ /\[TAKEN/);
      $fields[$i] .= ".PLANNING" if ($origField =~ /\[PLANN/);
      print STDERR $fields[$i] . "\n";
      # THESE ARE PROPERLY GENERATED AS:  action_prog_service.0.TAKEN  action_prog_service.0.PLANNING ...
    }else{
      # This is benign.  Some of the very first columns have no "[...]" format e.g. "IP Address".
    }
  }
}
print STDERR "------------------------------------------------------\n";


%enums;


$colidx = 0;
foreach $colheader (@fields) {

  $handled = 0;

  # 1) Is it a standard multiple-columns header name matching a regex?
  if (! $mapFieldsToEmit{$colheader}) {
    $idxRegex = 0;
    foreach $regex (@regexFieldsMultChoice) {
      if ($colheader =~ $regex) {
        # For example:  $colheader = "lmi_housing
        $valueEnglish = $1;
        # For example:  "housing"
        $fieldkey = $fieldsMultChoice[$idxRegex];
        # $fieldkey =~ s/\(\.\*\)//;
        # For example:  "lmi_"
        $enums{$colheader} = "\"$valueEnglish\"";
        if (! $fieldkeys{$fieldkey}) {
          $fieldkeys{$fieldkey} = $colidx;
        }
        if (! $multchoicesets{$fieldkey}) {
          print STDERR "Creating empty array for fieldkey of $fieldkey\n";
          $multchoicesets{$fieldkey} = ();
        }
        push (@{$multchoicesets{$fieldkey}}, $valueEnglish);
        #print STDERR "$valueEnglish\n";
        $fieldkeys{$colheader} = $colidx;
        last;
      }
      $idxRegex++;
    }
  }

  if ( ! $handled) {
    # 2) Is it a special mult-choice set that cannot be determined via a pattern match of the header alone?
  }


  if ( ! $handled) {
    # 3) We simply log this as a header that matches exactly one survey question
    $fieldkey = $colheader;
    $fieldkeys{$fieldkey} = $colidx;
    #print STDERR "Registering $fieldkey at $colidx\n";
    $handled = 1;
  }

  $colidx++;
}




# Used for planning vs already-acted field sets
# Example parameter would be:  "action_staff"
sub emitTimeframeBasedValue {
  my $base = $_[0] . "(.*)";
  my $basefordisplay = $_[0];
  my $options = $_[1];
  my $thisenum;

  # print STDERR "*****************************************\n";

  my $atleastone;

  my $tryprefix_arts = '';    # In 2014 this was:  ($base eq "action_staff");  
  my $forceprefix_arts = ($options eq "arts_only");

  if ($forceprefix_arts) {
    $basefordisplay = "arts_" . $base;
  }

  my $result = "\t\"$basefordisplay\" : {\n";

  my $value1, $value2, $value;


  #  FIRST:  HANDLE "acted" (past tense)

  my $prefix;
  my $onlyHandleIf;

  my %converter = %{$converters{$base}};

  # die @{$multchoicesets{$base."(.*)"}};

  # Example of a good lookup in the fieldkeys:  $fieldkeys{"action_prog_service.1.TAKEN"}

  # PREVIOUS YEAR
  $prefix = "";
  $result .= "\t\tlast: [ ";
  $onlyHandleIf = qr/(.*)\.TAKEN/;
  
  #print STDERR $base . "\n";
  #print STDERR @{$multchoicesets{$base}} . "\n";

  foreach $_generatedfieldname (@{$multchoicesets{$base}}) {
    next if ( ! ($_generatedfieldname =~ $onlyHandleIf) );
    #print STDERR " --- " . $_generatedfieldname . "\n";
    $thisenum = $1;
    $thisenum = $converter{$thisenum} if ($converter{$thisenum});
    $value1 = "";
    $value2 = "";

    $generatedfieldname = $basefordisplay . $_generatedfieldname;
    # die $generatedfieldname;

    if (! $forceprefix_arts) {
      if ($fieldkeys{$generatedfieldname}) {
        $value1 = $fields[$fieldkeys{$generatedfieldname}];
      }
    }
    if ($tryprefix_arts) {
      die $generatedfieldname if !($fieldkeys{"arts_$generatedfieldname"});
      $value2 = $fields[$fieldkeys{"arts_$generatedfieldname"}];
    }
    $value = $value1 || $value2;
    if ($value) {
      $result .= $prefix . "\"$thisenum\"";
      $atleastone = 1;
      $prefix = " , ";
    }
  }
  $result .= " ],\n";



  # NEXT:  HANDLE "planned" (future tense)

  $prefix = "";
  $result .= "\t\tnext: [ ";
  $onlyHandleIf = qr/(.*)\.PLANNING/;
  foreach $_generatedfieldname (@{$multchoicesets{$base}}) {
    next if ( ! ($_generatedfieldname =~ $onlyHandleIf) );
    $thisenum = $1;
    $thisenum = $converter{$thisenum} if ($converter{$thisenum});
    $value1 = "";
    $value2 = "";
    $generatedfieldname = $basefordisplay . $_generatedfieldname;
    if (! $forceprefix_arts) {
      if ($fieldkeys{$generatedfieldname}) {
        $value1 = $fields[$fieldkeys{$generatedfieldname}];
      }
    }
    if ($tryprefix_arts) {
      die if !($fieldkeys{"arts_$generatedfieldname"});
      $value2 = $fields[$fieldkeys{"arts_$generatedfieldname"}];
    }
    $value = $value1 || $value2;
    if ($value) {
      $result .= $prefix . "\"$thisenum\"";
      $atleastone = 1;
      $prefix = " , ";
    }
  }
  $result .= " ]\n";

  $result .= "\t},\n";

  # die $result;

  print $result if ($atleastone);
}









sub emitMultColBasedValue {
  my $base = $_[0];
  my $baseClean = $base;
  $baseClean =~ s/\(\.\*\)//;
  my $result = "\t\"$baseClean\" : [ ";
  my $prefix = "";

  # print STDERR "emitMultColBasedValue ( $base ) \n";

  my $atleastone = 0;

  my $generatedfieldname;
  my $enumval;
  my $value;

  foreach $enumval (@{$multchoicesets{$base}}) {
    next if ($enumval =~ /other_(yn_)?text/);
    $generatedfieldname = $base;
    $generatedfieldname =~ s/\(\.\*\)/$enumval/;
    if ($fieldkeys{$generatedfieldname}) {
      $value = $fields[$fieldkeys{$generatedfieldname}];
      if ($value) {
        $result .= $prefix . "\"$enumval\"";
        $atleastone = 1;
        $prefix = " , ";
      }
    }
  }

  $result .= " ],\n";

  print $result if ($atleastone);
}




#######################   EMISSION   ####################
#######################   EMISSION   ####################
#######################   EMISSION   ####################


# die keys(%multchoicesets);


$curLineNum = 0;

# Now visit the data rows
while (<STDIN>) {
  chomp;

  $curLineNum++;
  last if ($curLineNum > $processingLimit);

  # print $_;

  @fields = split(/\t/, $_);
  next if ($fields[0] =~ /^status$/i);

  # For now, ignore all incomplete survey-result rows
  next if ($fields[0] =~ /^Incomplete/i);


  if ( ! ($fields[1] =~ /\d\d\d\d\d\d\d\d/) ) {
    print STDERR "Row seen that did not have a valid internal ID, so ceasing processing.\n";
    print STDERR $fields[1] . "\n";
    last;
  }

  print "{\n";


  &emitTimeframeBasedValue("action_staff");
  #&emitTimeframeBasedValue("action_staff", "arts_only");
  #&emitTimeframeBasedValue("action_management");

  # &emitTimeframeBasedValue("action_prog_service");


  # MULTIPLE-CHOICE FIELDS BASED ON REGEX PATTERNS (e.g. "lmi_(.*)")
  foreach $goodfield (keys(%multchoicesets)) {
    next if $goodfield =~ /action_/;
    &emitMultColBasedValue($goodfield);
  }
  

  # REGULAR FIELDS
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
        die $_ if ($value eq "health");
        print "\t\"$goodfield\" : \"$value\",\n";
      }
    }
  }
  print "\t\"fin\" : 0\n";
  print "},\n";
}

print "];\n";
