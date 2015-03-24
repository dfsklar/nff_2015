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
      veteransvc: "Veterans' services",
      youthdevel: "Youth development",
      other_yn: "Other"
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

    arts_source_competition_: {
      movies: "Movies",
      tv: "Television",
      sports: "Sports",
      newcult: "New cultural organizations in your area",
      freecult: "Free cultural alternatives in your area",
      onlinecult: "Online cultural alternatives",
      onlinecommunities: "Online communities",
      videogames: "Video games",
      dontknow: "Don't know",
      other: "Other"
    },

    arts_aud_: {
      data_inform_programs: "Data collection on audience/visitor preferences/behaviors to inform programs",
      data_inform_fundr: "Data collection on audiences/visitors to inform fundraising",
      participation: "Offering participatory programming",
      targeting: "Developing programs that are relevant for target audiences or visitor segments",
      planning: "Involving audiences/visitors in program planning",
      tech: "Engaging audiences/visitors through technology",
      mkting: "Implementing new marketing strategy(ies)",
      pricing: "Implementing new pricing model(s)",
      oddspaces: "Offering cultural experiences in unconventional spaces",
      educollab: "Arts education programs or partnerships with schools",
      // none: "We did not make a meaningful investment in development or engagement strategies",
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

    arts_audience_dev_results_: {
      audgrew: "We saw some audience/visitor segments grow",
      audshrank: "We saw some audience/visitor segments decline",
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
      //Killed in 2015?  div_funding: "Diversifying funding sources",
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
      staff_retain: "Ability to retain staff / offer competitive staff",
      staff_environ_health: "Environmental health hazarsds and risks",
      staff_unavoidable_costs: "Increases in unavoidable costs",
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

    debt_fin_no_: {
      noneedcurrently: "Do not need currently (but perhaps in future)",
      never: "Do not need currently and throughout forseeable future",
      averse: "Management is averse to debt",
      noqual: "Do not feel lenders would find us qualified",
      pasttrauma: "Past debt has traumatized our organization",
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

    addtl_debt_fin_use_: {
      exp_prog: "Expand programs or services",
      facility_exp: "Expand or renovate a facility my organization leases or owns",
      facility_new: "Purchase a facility",
      delays_gov: "Manage delays in payment from our government contracts",
      tech: "Invest in information technology",
      cashflow: "Manage gaps or unevenness in revenue",
      delays_grant: "Cover costs while waiting for a grant to come in",
      emergloc: "Have a line of credit to handle emergencies",
      other_yn: "Other",
      unidentified: "(No response)"
    },

    arts_grants_: {
      open_dialog: "Invite your nonprofit to discuss financial health and long-term financial needs",
      strategy_input: "Invite your nonprofit to give input on a funder's strategy",
      non_monetary: "Provide useful non-monetary resources or knowledge (e.g., convenings, referrals, advice)",
      streamline: "Simplify the grant application and/or due diligence process",
      reporting_burden: "Require reporting that was outsized relative to the size of the grant",
      overhead_restr: "Restrict allowable overhead rate on grants",
      got_unrestr: "Give unrestricted funding",
      help_change_habits: "Give your organization capital to help change the way you raise or spend money",
      help_build_reserves: "Give your organization capital to build reserves",
      surplus_bad: "Deny your grant because your nonprofit had a surplus or savings",
      surplus_good: "Approve your grant because your nonprofit had a surplus or savings",
      none: "None of the above"
    },

    unmet_demand_svc_: {
      otherorg: "Seek similar services from another organization",
      remainunmet: "Needs remain unmet",
      family: "Seek assistance from personal networks (family, friends, etc.)",
      govprograms: "Access direct government assistance through programs not outsourced to nonprofits",
      dontknow: "Don't know",
      other_yn: "Other"
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

    funding_all_gov_delay_: {
      resp: "Use reserves",
      vendors: "Delay payments to vendors and/or creditors",
      board_loan: "Borrow from personal funds of our leadership or board",
      partner_loan: "Borrow from partner or parent organization",
      loc: "Rely on a loan, line of credit, or other type of debt",
      red_serv: "Reduce services",
      red_staff: "Downsize staff-related costs",
      red_opp_cost: "Downsize non-staff-related operating costs (e.g., rent, office supplies)",
      emergency_grant: "Ask for emergency grant / Pull from other program funding",
      ready: "Budget for delays in advance",
      reserves: "Use other unrestricted or earned income",
      payroll: "Delay payroll for all or part of the staff",
      na: "N/A",
      other_yn: "Other"
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


    gov_payment_sources_: {
      fed: "Federal",
      state: "State",
      local: "Local",
      none: "None of the above"
    },

    action_staff: {
      ".0": "Hire staff for new positions",
      ".1": "Reduce staff",
      ".2": "Make replacement hires",
      ".3": "Freeze all replacement hires",
      ".4": "Retain all existing personnel",
      ".5": "Rely more on volunteers",
      ".6": "Reduce staff hours (short weeks, furloughs, etc.)",
      ".7": "Engage more closely with board\n via more frequent reports/meetings",
      ".8": "Leadership succession planning",
      ".9": "Invest money/time in professional development for staff",
      ".10": "Give COLA salary increases to staff",
      ".11": "Give raises beyond just COLA",
      ".12": "Freeze or reduce salaries",
      ".13": "Spend more on staff benefits",
      ".14": "Spend less on staff benefits",
      ".15": "None of the above"
    },

    action_prog_service: {
      ".0": "Add or expand programs/services",
      ".1": "Reduce or eliminate programs/services",
      ".2": "Expand geographies served",
      ".3": "Reduce or significantly restructure geographies served",
      ".4": "Increase the number of people served / audience served",
      ".5": "Decrease the number of people served / audience served",
      ".6": "Increase amount of service per client or programs per visitor/audience member",
      ".7": "Decrease amount of service per client or programs per visitor/audience member",
      ".8": "Collaborate with another organization to improve/increase programs or services offered",
      ".9": "Use, purchase, or upgrade software specifically to capture data on program impact", 
      ".10": "Upgrade hardware/software to improve service or program delivery", 
      ".11": "Modify target demographics",
      ".12": "Employ an integrated approach to holistically address client needs",
      ".13": "None of the above"
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

    action_ops_finance: {
      ".0": "Collaborate with another organization\n to reduce administrative expenses",
      ".1": "Merge with another organization",
      ".2": "Change how you raise and spend money",
      ".3": "Pursue an earned revenue venture",
      ".4": "Advocate to government on behalf\n of your organization's cause", //?
      ".5": "Seek funding other than grants and contracts,\n such as loans or other investments",  //?
      ".6": "Add to reserve funds",
      ".7": "Use reserve funds",
      ".8": "Launch a capital campaign",
      ".9": "Undergo organizational restructuring",
      ".10": "Conduct long-term strategic or financial planning",
      ".11": "Use outside help to improve financial knowledge or capacity",
      ".12": "Upgrade hardware or software to improve organizational efficiency",
      ".13": "Delay vendor payments",
      ".14": "Purchase a facility, or renovate a facility you own",
      ".15": "Lease a facility, or renovate a facility you lease",
      ".16": "Sell a facility",
      ".17": "Renovate a facility that you lease or own",
      ".18": "Pursue funding that requires measurement/achievement of outcomes",
      ".19": "Receive funding that requires measurement/achievement of outcomes",
      ".20": "None of the above"
    },

    current_year_org_outlook_: {
      harder: "Harder than 2014",
      easier: "Easier than 2014",
      same: "More or less the same as 2014"
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
