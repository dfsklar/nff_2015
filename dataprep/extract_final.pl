print "window.nfforg.database_unindexed.respondents = [ \n";

$processingLimit = 99999;

@fieldsMultChoice = (
                     'lmi_(.*)',   # 1 or blank are the only legal values
                     'challenge_(.*)',
                     'funding_gov_(.*)',
                     'funding_all_gov_(.*)',  # seems to be about how the org responds to late incoming payments (e.g. "delay payment to my vendors", etc)
                     'data_collect_(.*)',
                     'arts_grants_(.*)',
                     'dialog_(.*)',
                     'loan_no_(.*)',
                     'loan_yes_(.*)',
                     'loan_want_(.*)',
                     'arts_comp_resp_(.*)',
                     'arts_comp_(.*)',
                     'arts_aud_rslts_(.*)',
                     'arts_aud_(.*)',
                     'arts_funding_(.*)'
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
$multchoicesets{'action_staff'} = ["acted_hire_staff",	"plan_hire_staff",	"acted_red_staff",	"plan_red_staff",	"acted_replaced_staff",	"plan_replace_staff",	"acted_froze_staff",	"plan_freeze_staff",	"acted_kept_staff",	"plan_kept_staff",	"acted_gave_raises",	"plan_gave_raises",	"acted_red_salaries",	"plan_red_salaries",	"acted_inc_staff_bens",	"plan_inc_staff_bens",	"acted_red_staff_bens",	"plan_red_staff_bens",	"acted_volunteers",	"plan_volunteers",	"acted_red_staff_hours",	"plan_red_staff_hours",	"acted_board",	"plan_board",	"acted_leader_succession",	"plan_leader_succession",	"acted_exec_coaching",	"plan_exec_coaching",	"acted_staff_profdev",	"plan_staff_profdev",	"acted_networking",	"plan_networking", 
                                   "acted_inc_artists", "plan_inc_artists",  #//only for arts
                                   "acted_dec_artists", "plan_dec_artists",#//only for arts
                                   "acted_inc_fees", "plan_inc_fees",#//only for arts
                                   "acted_dec_fees", "plan_dec_fees",#//only for arts
                                   "acted_staff_na_2014",	"plan_staff_na_2014"];
$multchoicesets{'action_management'} = ["acted_collab_admin",	"plan_collab_admin",	"acted_merge",	"plan_merge",	"acted_change_fundraising",	"plan_change_fundraising",	"acted_earned_revenue",	"plan_earned_revenue",	"acted_advocacy",	"plan_advocacy",	"acted_alt_funds",	"plan_alt_funds",	"acted_add_reserve",	"plan_add_reserve",	"acted_use_reserve",	"plan_use_reserve",	"acted_capital_camp",	"plan_capital_camp",	"acted_org_restructure",	"plan_org_restructure",	"acted_strat_plan",	"plan_strat_plan",	"acted_fin_consultants",	"plan_fin_consultants",	"acted_tech_upgrade",	"plan_tech_upgrade",	"acted_borrow_board",	"plan_borrow_board",	"acted_delay_vendors",	"plan_delay_vendors",	"acted_buy_facility",	"plan_buy_facility",	"acted_lease_facility",	"plan_lease_facility",	"acted_sell_facility",	"plan_sell_facility",	"acted_na_mgmt_2014", "plan_na_mgmt_2014"];
$multchoicesets{'action_service'} = ["acted_add_prog",	"plan_add_prog",	"acted_red_prog",	"plan_red_prog",	"acted_expand_geo",	"plan_expand_geo",	"acted_red_geo",	"plan_red_geo",	"acted_inc_clients",	"plan_inc_clients",	"acted_dec_clients",	"plan_dec_clients",	"acted_inc_serv_per",	"plan_inc_serv_per",	"acted_dec_serv_per",	"plan_dec_serv_per",	"acted_collab_serv",	"plan_collab_serv",	"acted_new_org_tech",	"plan_new_org_tech",	"acted_new_serv_tech",	"plan_new_serv_tech",	"acted_na_serv",	"plan_na_serv"];


%converters;
$converters{'action_staff'} = {
                               replaced_staff => "replace_staff",
                               froze_staff => "freeze_staff"
                              };


$_ = <STDIN>;
chomp;
@fields = split(/[\t\r\n]/, $_);
%fieldkeys;
$fieldkeys{'orgid'} = 2;

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
        print STDERR "$valueEnglish\n";
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
  my $base = $_[0];
  my $basefordisplay = $base;
  my $options = $_[1];
  my $thisenum;

  my $atleastone;

  my $tryprefix_arts = ($base eq "action_staff");
  my $forceprefix_arts = ($options eq "arts_only");

  if ($forceprefix_arts) {
    $basefordisplay = "arts_" . $base;
  }

  my $result = "\t\"$basefordisplay\" : {\n";

  my $value1, $value2, $value;


  #  FIRST:  HANDLE "acted" (past tense)

  my $prefix;
  my $onlyHandleIf = qr/acted_(.*)/;

  my %converter = %{$converters{$base}};

  # PREVIOUS YEAR
  $prefix = "";
  $result .= "\t\tlast: [ ";
  $onlyHandleIf = qr/acted_(.*)/;
  foreach $generatedfieldname (@{$multchoicesets{$base}}) {
    next if ( ! ($generatedfieldname =~ $onlyHandleIf) );
    $thisenum = $1;
    $thisenum = $converter{$thisenum} if ($converter{$thisenum});
    $value1 = "";
    $value2 = "";
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
  $result .= " ],\n";



  # NEXT:  HANDLE "planned" (future tense)

  $prefix = "";
  $result .= "\t\tnext: [ ";
  $onlyHandleIf = qr/plan_(.*)/;
  foreach $generatedfieldname (@{$multchoicesets{$base}}) {
    next if ( ! ($generatedfieldname =~ $onlyHandleIf) );
    $thisenum = $1;
    $thisenum = $converter{$thisenum} if ($converter{$thisenum});
    $value1 = "";
    $value2 = "";
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

  @fields = split(/\t/, $_);
  next if ($fields[1] =~ /^status/i);
  #  We now include all surveys regardless of status:  next if ($fields[1] =~ /^Incomplete/);
  last if ( ! ($fields[2] =~ /\d\d\d\d\d/) );

  print "{\n";


  &emitTimeframeBasedValue("action_staff");
  &emitTimeframeBasedValue("action_staff", "arts_only");
  &emitTimeframeBasedValue("action_management");
  &emitTimeframeBasedValue("action_service");


  # MULTIPLE-CHOICE FIELDS BASED ON REGEX PATTERNS (e.g. "lmi_(.*)")
  foreach $goodfield (keys(%multchoicesets)) {
    next if ($goodfield =~ /^action_/);
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
