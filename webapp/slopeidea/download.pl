# HUMAN CAPITAL ACTIONS
@fields = ( "acted_hire_staff",	"plan_hire_staff",	"acted_red_staff",	"plan_red_staff",	"acted_replaced_staff",	"plan_replace_staff",	"acted_froze_staff",	"plan_freeze_staff",	"acted_kept_staff",	"plan_kept_staff",	"acted_gave_raises",	"plan_gave_raises",	"acted_red_salaries",	"plan_red_salaries",	"acted_inc_staff_bens",	"plan_inc_staff_bens",	"acted_red_staff_bens",	"plan_red_staff_bens",	"acted_volunteers",	"plan_volunteers",	"acted_red_staff_hours",	"plan_red_staff_hours",	"acted_board",	"plan_board",	"acted_leader_succession",	"plan_leader_succession",	"acted_exec_coaching",	"plan_exec_coaching",	"acted_staff_profdev",	"plan_staff_profdev",	"acted_networking",	"plan_networking",	"acted_staff_na_2014",	"plan_staff_na_2014" );

# MANAGEMENT ACTIONS
@fields = (
         "acted_collab_admin",
         "acted_merge",
         "acted_change_fundraising",
         "acted_earned_revenue",
         "acted_advocacy",
         "acted_alt_funds",
         "acted_add_reserve",
         "acted_use_reserve",
         "acted_capital_camp",
         "acted_org_restructure",
         "acted_strat_plan",
         "acted_fin_consultants",
         "acted_tech_upgrade",
         "acted_borrow_board",
         "acted_delay_vendors",
         "acted_buy_facility",
         "acted_lease_facility",
         "acted_sell_facility"
          );

# PROGRAM ACTIONS
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

foreach $X (@fields) {
  print "$X\n";
  $cmd = "wget -O datadumps/$X.tmp \'http://api.survey.nonprofitfinancefund.org/v1/stats\?key=dfetTN6E\&qs=year/$X\'\n";
  #die $cmd;
  system($cmd);
}
