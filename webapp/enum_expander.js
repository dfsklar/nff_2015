(function() {

  window.nfforg.convertEnumToEnglish = function(idChart, enumm) {
    if (window.nfforg.MAPenumToEnglish[idChart])
      if (window.nfforg.MAPenumToEnglish[idChart][enumm])
        return window.nfforg.MAPenumToEnglish[idChart][enumm];
    return enumm;
  };


  window.nfforg.MAPenumToEnglish = {
    lmi_: {
      culture: "Access to cultural opportunities (theater, museums, etc.)",
      health: "Access to healthcare",
      food: "Access to healthy foods",
      housing: "Affordable housing",
      retail: "Availability of commercial goods/services",
      transit: "Availability of public transportation",
      childcare: "Childcare / after-school care",
      jobs: "Job availability",
      job_training: "Job training",
      mentalhealth: "Mental health services",
      recreation: "Recreational opportunities",
      seniorcare: "Senior care",
      schools: "Strong, well-performing schools",
      substanceabuse: "Substance abuse services",
      other_yn: "Other",
      na: "N/A"
    },

    arts_funding_: {
      exp_prog: "Expanding programs",
      new_facility: "Acquiring or renovating a facility",
      op_reserve: "Developing reserves for operating needs",
      facility_needs: "Developing reserves for long-term facility or fixed asset needs",
      risk_reserve: "Developing reserves for artistic risk-taking",
      working_capital: "Working capital (cash-flow needs)",
      change_capital: "Flexible capital for organizational change/growth",
      pay_off_loans: "Paying off loans",
      gos: "General operating support",
      multi_year: "Multi-year funding"
    },

    arts_aud_: {
      data: "Collecting data on audience/visitor preferences and behaviors",
      participation: "Offering participatory programming",
      targeting: "Developing programs that are relevant for target audiences or visitor segments",
      planning: "Involving audiences/visitors in program planning",
      tech: "Engaging audiences/visitors through technology",
      mkting: "Implementing new marketing strategy(ies)",
      pricing: "Implementing new pricing model(s)",
      oddspaces: "Offering cultural experiences in unconventional spaces",
      none: "We did not make a meaningful investment in development or engagement strategies",
      other_yn: "Other"
    },

    arts_org_type: {
      "Arts education": "Arts education",
      "Arts service": "Arts service",
      "Dance": "Dance",
      "Multi-disciplinary": "Multi-disciplinary",
      "Museum": "Museum",
      "Music - non-orchestra": "Music - non-orchestra",
      "Opera": "Opera",
      "Performing arts presenter": "Performing arts presenter",
      "Symphony orchestra": "Symphony orchestra",
      "Theatre": "Theatre",
      "Visual art / craft - non-museum": "Visual art / craft - non-museum",
      "Other arts/culture/humanities": "Other arts/culture/humanities",
      "Unidentified": "Unidentified"
    },

    arts_aud_rslts_: {
      growth: "We saw some audience/visitor segments grow",
      decline: "We saw some audience/visitor segments decline",
      youth: "We attracted younger audiences/visitors",
      representative: "We attracted an audience/visitor segment that is more representative of our community",
      nochange: "The number and composition of audiences/visitors has not changed",
      moretix: "Our ticket revenue grew",
      moredonors: "Our donor base grew",
      finimpv: "Our surplus/deficit improved",
      nofinimpv: "Our financial results did not improve",
      dontknow: "Don't know",
      other_yn: "Other"
    },

    challenge_: {
      demand: "Meeting community demand for services or programs",
      div_funding: "Diversifying funding sources",
      cut_gov_fund: "Cuts in government funding",
      delay_gov_fund: "Delays in government funding",
      longterm_sust: "Achieving long-term financial sustainability",
      cover_full_costs: "Raising funding that covers full costs",
      raise_gos: "Raising unrestricted revenue/GOS",
      cashflow: "Having regular, reliable cash flow",
      cash_reserve: "Developing cash reserves",
      revenue: "Insufficient revenue",
      fixed_assets: "Managing a facility or fixed asset",
      growth: "Managing or pursuing growth",
      impact_meas: "Measuring impact",
      program_innov: "Pursuing program innovation",
      board_support: "Not enough support from board",
      need_staff: "Not enough staff",
      marketing: "Marketing, outreach, and community engagement",
      it_needs: "IT concerns",
      demographics: "Adapting to changing community demographics",
      aca_changes: "Adapting to changes due to the Affordable Care Act",
      volunteers: "Engaging and mobilizing volunteers",
      other_yn: "Other"
    },


    arts_comp_: {
      decline_overall: "Decline in overall attendance",
      decline_repeat: "Decline in repeat attendance",
      pricing_pressure: "Downward pricing pressure",
      lower_earned: "Lower earned revenue",
      lower_contrib: "Lower contributed revenue",
      bottom_line: "Declining bottom line",
      none: "We have not experienced increased competition",
      other_yn: "Other"
    },

    loan_no_: {
      need: "Do not need",
      pending: "Applied, and a decision is pending",
      denied: "Applied and were denied",
      unsure_use: "Not sure how to use",
      unsure_apply: "Not sure how to apply",
      other_yn: "Other"
    },

    loan_yes_: {
      exp_prog: "Expand programs or services",
      facility_exp: "Expand or renovate a facility my organization leases or owns",
      facility_new: "Purchase a facility",
      delays_gov: "Manage delays in payment from our government contracts",
      tech: "Invest in technology such as computers or IT systems",
      cashflow: "Manage gaps or unevenness in revenue",
      delays_grant: "Cover costs while waiting for a grant to come in",
      other_yn: "Other"
    },

    loan_want_: {
      exp_prog: "Expand programs or services",
      facility_exp: "Expand or renovate a facility my organization leases or owns",
      facility_new: "Purchase a facility",
      delays_gov: "Manage delays in payment from our government contracts",
      tech: "Invest in technology such as computers or IT systems",
      cashflow: "Manage gaps or unevenness in revenue",
      delays_grant: "Cover costs while waiting for a grant to come in",
      other_yn: "Other",
      unidentified: "(No response)"
    },

    arts_grants_: {
      overhead_restr: "Applied for a grant that restricted allowable overhead rate",
      surplus_bad: "Denied because of a track record of surpluses and savings",
      surplus_good: "Approved due to track record of strong financial management & surpluses",
      open_dialog: "Invited to discuss financial health and long-term financial needs",
      strategy_input: "Invited to give input on a funder's strategy",
      non_monetary: "Benefited from a funder's non-monetary resources or knowledge",
      streamline: "Benefited from a streamlined application/due-diligence process",
      reporting_burden: "Faced reporting requirements that were outsized relative to the size of the grant"
    },

    data_collect_: {
      no_staff: "Not enough staff or time",
      no_experts: "Don't have right staff expertise",
      no_money: "Don't have resources to hire outside consultant to help collect data",
      no_tech: "Don't have necessary technology or computer systems",
      no_culture: "Data collection isn't integrated into our organizational culture/practices",
      no_time: "Can't track clients over long enough period of time",
      unmeasurable_factors: "There are societal factors that we cannot MEASURE affecting outcomes",
      no_control_factors: "There are societal factors that we cannot CONTROL affecting outcomes",
      confidential: "Confidentiality concerns prevent us from collecting or aggregating sufficient data",
      no_theory: "Don't have a theory of change",
      no_interest: "No one asks for it",
      not_sure: "Not sure",
      no_other_yn: "Other"
    },

    funding_all_gov_: {
      delay_resp: "Use reserves",
      delay_vendors: "Delay payments to vendors and/or creditors",
      board_loan: "Borrow from personal funds of our leadership or board",
      delay_partner_loan: "Borrow from partner or parent organization",
      delay_loc: "Rely on a loan, line of credit, or other type of debt",
      delay_red_serv: "Reduce services",
      delay_red_staff: "Downsize staff-related costs",
      delay_red_opp_cost: "Downsize non-staff-related operating costs (e.g., rent, office supplies)",
      delay_emergency_grant: "Ask for emergency grant / Pull from other program funding",
      delay_ready: "Budget for delays in advance",
      delay_reserves: "Use other unrestricted or earned income",
      delay_payroll: "Delay payroll for all or part of the staff",
      delay_na: "N/A",
      delay_other_yn: "Other"
    },

    arts_comp_resp_: {
      focus: "Narrowed or changed program focus",
      audience_base: "Narrowed or changed target audience/visitor base",
      audience_strat: "Adapted audience/visitor engagement strategy",
      lower_prices: "Lowered prices",
      venue: "Changed venues",
      collab: "Collaborated with another organization",
      tech: "Invested in new technology/social media",
      none: "We have not made any changes",
      other_yn: "Other"
    },

    dialog_: {
      exp_prog: "Expanding programs",
      new_facility: "Acquiring or renovating a facility",
      op_reserve: "Developing reserves for operating needs (\"rainy day fund\")",
      facility_needs: "Developing reserves for long-term facility or fixed asset needs",
      working_cash_flow: "Working capital (cash-flow needs)",
      change_capital: "Flexible capital for organizational change/growth",
      pay_off_loans: "Paying off loans",
      gos: "General operating support",
      multi_year: "Multi-year funding",
      other_yn: "Other reserves or topics",
      none: "My funders are not willing to engage on any of these"
    },


    funding_gov_: {
      yn: "Federal",
      state_yn: "State",
      local_yn: "Local",
      none: "None of the above"
    },

    action_staff: {
      hire_staff: "Hire staff for new positions",
      red_staff: "Reduce staff",
      replace_staff: "Make replacement hires",
      freeze_staff: "Freeze all replacement hires",
      kept_staff: "Retain all existing personnel",
      gave_raises: "Give raises",
      red_salaries: "Freeze or reduce salaries",
      inc_staff_bens: "Improve or increase staff benefits",
      red_staff_bens: "Reduce staff benefits",
      volunteers: "Rely more on volunteers",
      red_staff_hours: "Reduce staff hours (short weeks, furloughs, etc.)",
      board: "Engage more closely with board\n via more frequent reports/meetings",
      leader_succession: "Leadership succession planning",
      exec_coaching: "Invest money/time in coaching or training for executive leadership",
      staff_profdev: "Invest money/time in professional development for staff",
      networking: "Attend conference or otherwise network\n to build relationships",
      // THESE WILL APPEAR IN A DIFFERENT SECTION:
      //inc_fees: "Increase fees",
      //dec_fees: "Decrease fees",
      //inc_artists: "Increase number of artists in program",
      //dec_artists: "Decrease number of artists in program",
      staff_na_2014: "N/A"
    },


    arts_action_staff: {
      hire_staff: "Hire staff for new positions",
      red_staff: "Reduce staff",
      replace_staff: "Make replacement hires",
      freeze_staff: "Freeze all replacement hires",
      kept_staff: "Retain all existing personnel",
      gave_raises: "Give raises",
      red_salaries: "Freeze or reduce salaries",
      inc_staff_bens: "Improve or increase staff benefits",
      red_staff_bens: "Reduce staff benefits",
      volunteers: "Rely more on volunteers",
      red_staff_hours: "Reduce staff hours (short weeks, furloughs, etc.)",
      board: "Engage more closely with your board through more frequent reports/meetings",
      leader_succession: "Leadership succession planning",
      exec_coaching: "Invest money/time in coaching or training for executive leadership",
      staff_profdev: "Invest money/time in professional development for staff",
      networking: "Attend conference or otherwise network to build relationships",
      inc_fees: "Increase artist fees",
      dec_fees: "Decrease artist fees",
      inc_artists: "Increase # of contracted artists",
      dec_artists: "Decrease # of contracted artists",
      staff_na_2014: "N/A"
    },

    action_management: {
      collab_admin: "Collaborate with another organization\n to reduce administrative expenses",
      merge: "Merge with another organization",
      change_fundraising: "Change how you raise and spend money",
      earned_revenue: "Pursue an earned revenue venture",
      advocacy: "Advocate to government on behalf\n of your organization's cause", //?
      alt_funds: "Seek funding other than grants and contracts,\n such as loans or other investments",  //?
      add_reserve: "Add to reserve funds",
      use_reserve: "Use reserve funds",
      capital_camp: "Launch a capital campaign",
      org_restructure: "Undergo organizational restructuring",
      strat_plan: "Conduct long-term strategic or financial planning",
      fin_consultants: "Use outside help to improve financial knowledge or capacity",
      tech_upgrade: "Upgrade hardware or software to improve organizational efficiency",
      borrow_board: "Borrow from board members or staff to pay current expenses",
      delay_vendors: "Delay vendor payments",
      buy_facility: "Purchase a facility, or renovate a facility you own",
      lease_facility: "Lease a facility, or renovate a facility you lease",
      sell_facility: "Sell a facility",
      na_mgmt_2014: "N/A"
    },

    action_service: {
      add_prog: "Add or expand programs/services",
      red_prog: "Reduce or eliminate programs/services",
      expand_geo: "Expand geographies served",
      red_geo: "Reduce or significantly restructure geographies served",
      inc_clients: "Increase the number of people served / audience served",
      dec_clients: "Decrease the number of people served / audience served",
      inc_serv_per: "Increase amount of service per client or programs per visitor/audience member",
      dec_serv_per: "Decrease amount of service per client or programs per visitor/audience member",
      collab_serv: "Collaborate with another organization to improve/increase programs or services offered",
      new_org_tech: "Use, purchase, or upgrade software specifically to capture data on program impact", //?
      new_serv_tech: "Upgrade hardware/software to improve service or program delivery",  //?
      na_serv: "N/A"
    },

    action_services_abbrev: {
      add_prog: "Add or expand programs/services",
      red_prog: "Reduce or eliminate programs/services",
      expand_geo: "Expand geographies served",
      red_geo: "Reduce or restructure geographies served",
      inc_clients: "Increase the number of people served",
      dec_clients: "Decrease the number of people served",
      inc_serv_per: "Increase amount of service per client",
      dec_serv_per: "Decrease amount of service per client",
      collab_serv: "Collaborate with another organization",
      new_org_tech: "Purchase/upgrade software to measure impact", //?
      new_serv_tech: "Purchase/upgrade hardware/software\n to improve service",
      na_serv: "N/A"
    }

  };

})();
