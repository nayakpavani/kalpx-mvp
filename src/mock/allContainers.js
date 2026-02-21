export const PortalContainer = {
  container_id: "portal",
  states: {
    splash_portal: {
      tone: { theme: "gold_dark", mood: "steady" },
      blocks: [{ type: "lotus_logo" }],
      actions: { primary: null, secondary: null },
    },

    welcome_portal: {
      tone: { theme: "gold_dark", mood: "steady" },
      blocks: [
        { type: "lotus_logo" },
        { type: "headline", content: "KalpX Companion" },
        { type: "subtext", content: "Step into structure. Begin your scan." },
        {
          type: "chip_list",
          key: "entry_intent",
          options: [
            { id: "seek_growth", label: "Growth" },
            { id: "seek_clarity", label: "Clarity" },
            { id: "seek_pressure", label: "Pressure" },
            { id: "seek_purpose", label: "Purpose" },
            { id: "seek_peace", label: "Peace" },
            { id: "seek_strength", label: "Strength" },
          ],
        },
        {
          type: "primary_button",
          label: "Initiate Prana Scan →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              variant: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "start_cycle", secondary: null },
    },

    void_state: {
      tone: { theme: "gold_dark", mood: "neutral" },
      blocks: [
        { type: "headline", content: "You have no active cycle." },
        { type: "subtext", content: "Without structure, identity drifts." },
        {
          type: "primary_button",
          label: "Begin New Cycle →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              variant: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "begin_new", secondary: null },
    },

    post_completion: {
      tone: { theme: "gold_dark", mood: "reflective" },
      blocks: [
        { type: "headline", content: "Cycle Complete." },
        { type: "subtext", content: "Integration begins with reflection." },
        {
          type: "primary_button",
          label: "Begin Again →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              variant: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "restart_cycle", secondary: "view_insights" },
    },

    re_entry_portal: {
      tone: { theme: "gold_dark", mood: "steady" },
      blocks: [
        { type: "headline", content: "Return to Structure." },
        { type: "subtext", content: "Your previous rhythm awaits." },
        {
          type: "primary_button",
          label: "Resume Cycle →",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress", // FIXED
              variant: "resume_restart_recalibrate",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "resume_cycle", secondary: "restart_cycle" },
    },

    reset_portal: {
      tone: { theme: "gold_dark", mood: "grounded" },
      blocks: [
        { type: "headline", content: "Structure has softened." },
        { type: "subtext", content: "Begin again with intention." },
        {
          type: "primary_button",
          label: "Restart Cycle →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              variant: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
      actions: { primary: "reset_cycle", secondary: null },
    },
  },
};

export const ChoiceStackContainer = {
  container_id: "choice_stack",

  states: {
    // 1️⃣ MODE TOGGLE
    mode_toggle: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Choose your cycle length.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Short focus or sustained shift.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "single_auto_advance",
          options: [
            {
              id: "7_day",
              title: "7-Day Cycle",
              description: "Focused correction. Rapid reset.",
            },
            {
              id: "14_day",
              title: "14-Day Cycle",
              description: "Deeper conditioning. Structural shift.",
            },
          ],
        },
      ],
    },

    // 2️⃣ DISCIPLINE SELECT (this replaces scan_focus)
    discipline_select: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Select your core discipline.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Strength grows through repetition.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "manual",
          options: [
            {
              id: "careerprosperity",
              title: "Career & Prosperity",
              description: "For leadership, success, and wealth.",
            },
            {
              id: "peacecalm",
              title: "Peace & Calm",
              description: "For clarity and silencing the noise.",
            },
            {
              id: "emotionalhealing",
              title: "Emotional Healing",
              description: "For release and heart connection.",
            },
            {
              id: "focusmotivation",
              title: "Focus & Motivation",
              description: "For mental drive and sharp clarity.",
            },
            {
              id: "gratitudepositivity",
              title: "Gratitude & Positivity",
              description: "For joy and attracting abundance.",
            },
            {
              id: "healthwellbeing",
              title: "Health & Wellbeing",
              description: "For physical vigor and balance.",
            },
            {
              id: "spiritualgrowth",
              title: "Spiritual Growth",
              description: "For deep connection and wisdom.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Continue →",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              variant: "domain_select",
            },
          },
          style: "gold",
          position: "footer",
        },
      ],
    },

    // 3️⃣ DOMAIN SELECT
    domain_select: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Choose your life domain.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Where does this discipline apply?",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "manual",
          options: [
            {
              id: "wealth",
              title: "Wealth",
              description: "Financial awareness & discipline.",
            },
            {
              id: "relationships",
              title: "Relationships",
              description: "Conscious communication.",
            },
            {
              id: "health",
              title: "Health",
              description: "Energy & physical integrity.",
            },
            {
              id: "work",
              title: "Work",
              description: "Professional steadiness.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Continue →",
          action: {
            type: "navigate",
            target: {
              container_id: "composer",
              variant: "sankalp_composer",
            },
          },
          style: "gold",
          position: "footer",
        },
      ],
    },

    // 4️⃣ DEEPEN SELECTION (reused later)
    deepen_select: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Select deeper layer.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "manual",
          options: [
            {
              id: "increase_reps",
              title: "Increase mantra reps",
              description: "Deepen repetition.",
            },
            {
              id: "increase_anchor",
              title: "Increase anchor duration",
              description: "Extend stabilization.",
            },
            {
              id: "add_refinement",
              title: "Add refinement layer",
              description: "Increase awareness discipline.",
            },
          ],
        },
      ],
    },
  },
};

export const ComposerContainer = {
  container_id: "composer",

  states: {
    // 1️⃣ MAIN COMPOSER (Fresh Write)
    sankalp_composer: {
      tone: { theme: "light_sandal", mood: "steady" },

      meta: {
        min_length: 12,
        max_length: 120,
        allow_ai_assist: true,
      },

      blocks: [
        {
          type: "headline",
          content: "Write your Sankalp.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Short. Clear. Behavioral.",
          position: "header",
        },
        {
          type: "textarea",
          id: "sankalp_input",
          character_limit: 120,
        },
        {
          type: "chip_list",
          options: [
            { id: "raise_voice", label: "I respond without raising my voice." },
            { id: "complete_begin", label: "I complete what I begin." },
            { id: "before_react", label: "I pause before reacting." },
            { id: "act_financial", label: "I act with financial awareness." },
          ],
        },
        // {
        //   type: "helper_text",
        //   content: "A Sankalp is behavioral. Not aspirational.",
        // },
        {
          type: "subtext",
          content: "Need suggestions?",
          variant: "link",
          action: {
            type: "navigate",
            target: {
              container_id: "composer",
              variant: "ai_suggestions",
            },
          },
          position: "footer",
        },

        {
          type: "primary_button",
          label: "Continue ",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              variant: "mantra_reps_picker",
            },
          },
          validation: {
            min_length: 12,
          },
          style: "gold",
          position: "footer",
        },
      ],
    },

    // 2️⃣ AI SUGGESTIONS OVERLAY
    ai_suggestions: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Suggested Sankalps",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            {
              id: "s1",
              title: "I pause before responding in tension.",
            },
            {
              id: "s2",
              title: "I complete tasks before switching.",
            },
            {
              id: "s3",
              title: "I speak honestly without aggression.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Proceed",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              variant: "mode_toggle",
            },
          },
          style: "gold",
        },
      ],
    },

    // 3️⃣ VALIDATION WARNING (Too Vague / Too Short)
    validation_warning: {
      tone: { theme: "light_sandal", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Refine your Sankalp.",
        },
        {
          type: "subtext",
          content: "Make it behavioral and specific.",
        },
        {
          type: "primary_button",
          label: "Edit",
          action: {
            type: "navigate",
            target: {
              container_id: "composer",
              variant: "sankalp_composer",
            },
          },
        },
      ],
    },

    // 4️⃣ EDIT EXISTING SANKALP (Before Lock)
    edit_sankalp: {
      tone: { theme: "light_sandal", mood: "steady" },

      meta: {
        preload_existing: true,
      },

      blocks: [
        {
          type: "headline",
          content: "Refine your Sankalp.",
        },
        {
          type: "text_input",
          id: "sankalp_input",
          preload_existing: true,
          character_limit: 120,
        },
        {
          type: "primary_button",
          label: "Update",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_locked",
              variant: "locked_summary",
            },
          },
        },
      ],
    },

    // 5️⃣ LOCKED REDIRECT (If Cycle Already Active)
    locked_redirect: {
      tone: { theme: "light_sandal", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Your Sankalp is already active.",
        },
        {
          type: "subtext",
          content: "Adjust structure intentionally if needed.",
        },
        {
          type: "primary_button",
          label: "View Structure",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_locked",
              variant: "locked_summary",
            },
          },
        },
      ],
    },
  },
};

export const LockRitualContainer = {
  container_id: "lock_ritual_overlay",

  states: {
    // 1️⃣ CYCLE LOCK FRICTION STATE
    hold_to_lock: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "steady" },

      meta: {
        hold_duration_ms: {
          "7_day": 1800,
          "14_day": 2400,
        },
        block_background_interaction: true,
        cancel_on_release: true,
      },

      blocks: [
        {
          type: "micro_label",
          content: "FINALIZE STRUCTURE",
          style: "uppercase_subtle",
        },
        {
          type: "headline",
          content: "Hold to lock your cycle.",
        },
        {
          type: "subtext",
          content: "Commit to this structure for the selected duration.",
        },
        {
          type: "hold_button",
          label: "Hold",
          interaction: {
            type: "press_and_hold",
            progress_ring: true,
            glow_intensity: "gradual_gold",
            haptic_feedback: {
              mid_point: true,
              completion: true,
            },
          },
          on_complete: {
            type: "navigate",
            target: {
              container_id: "lock_ritual_overlay",
              variant: "lock_confirmation",
            },
          },
        },
        {
          type: "helper_text",
          content: "Structure builds identity.",
        },
      ],
    },

    // 2️⃣ CYCLE LOCK CONFIRMATION (GOLDEN TRANSITION)
    lock_confirmation: {
      overlay: true,
      tone: { theme: "gold_accent", mood: "grounded" },

      meta: {
        transition_duration_ms: 900,
        gold_edge_highlight: true,
        radial_glow_outward: true,
        persist_cycle_to_backend: true,
        generate_cycle_id: true,
        initialize_day_one: true,
      },

      blocks: [
        {
          type: "headline",
          content: "Cycle Locked.",
        },
        {
          type: "subtext",
          content: "Begin tomorrow with clarity.",
        },
        {
          type: "primary_button",
          label: "Enter Day 1",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
          style: "dark",
        },
      ],
    },
  },
};

export const RoutineBuilderContainer = {
  container_id: "routine_builder",

  states: {
    // 1️⃣ MANTRA FREQUENCY PICKER
    mantra_reps_picker: {
      tone: { theme: "light_sandal", mood: "structured" },

      blocks: [
        {
          type: "headline",
          content: "Mantra Repetitions",
        },
        {
          type: "subtext",
          content: "Select your daily repetition count.",
        },
        {
          type: "option_picker",
          id: "mantra_reps",
          options: [9, 18, 27, 54],
          selection_mode: "single",
        },
        {
          type: "primary_button",
          label: "Next →",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              variant: "anchor_duration_picker",
            },
          },
        },
      ],
    },

    // 2️⃣ ANCHOR DURATION SLIDER
    anchor_duration_picker: {
      tone: { theme: "light_sandal", mood: "structured" },

      blocks: [
        {
          type: "headline",
          content: "Anchor Duration",
        },
        {
          type: "subtext",
          content: "Select your daily stabilization time.",
        },
        {
          type: "option_picker",
          id: "anchor_duration",
          options: [3, 5, 8, 12],
          selection_mode: "single",
          unit: "minutes",
        },
        {
          type: "primary_button",
          label: "Next →",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              variant: "refinement_layer_menu",
            },
          },
        },
      ],
    },

    // 3️⃣ REFINEMENT LAYER MENU
    refinement_layer_menu: {
      tone: { theme: "light_sandal", mood: "structured" },

      blocks: [
        {
          type: "headline",
          content: "Choose refinement layer",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "observation", title: "Observation" },
            { id: "embodiment", title: "Embodiment" },
            { id: "stability", title: "Stability" },
          ],
        },
        {
          type: "primary_button",
          label: "Review Routine →",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              variant: "routine_review_summary",
            },
          },
        },
      ],
    },

    // 4️⃣ AI SUGGESTION MODAL
    ai_suggestion_modal: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Suggested Adjustments",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            {
              id: "reduce_anchor",
              title: "Reduce anchor to maintain consistency",
            },
            {
              id: "increase_reps",
              title: "Increase reps for deeper repetition",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Apply Suggestion",
          action: { type: "apply_adjustment" },
        },
      ],
    },

    // 5️⃣ OVER-STACKING WARNING
    over_stacking_warning: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "caution" },

      blocks: [
        {
          type: "headline",
          content: "Structure may be too intense.",
        },
        {
          type: "subtext",
          content: "Too much change reduces consistency.",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "simplify", title: "Simplify Structure" },
            { id: "proceed_anyway", title: "Proceed Anyway" },
          ],
        },
      ],
    },

    // 6️⃣ ROUTINE REVIEW SUMMARY
    routine_review_summary: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Routine Summary",
        },
        {
          type: "summary_block",
          fields: [
            { label: "Mantra", value_key: "mantra_reps" },
            { label: "Anchor", value_key: "anchor_duration" },
            { label: "Refinement", value_key: "refinement_layer" },
            { label: "Sankalp", value_key: "sankalp_text" },
          ],
        },
        {
          type: "primary_button",
          label: "Lock Structure →",
          action: {
            type: "navigate",
            target: {
              container_id: "lock_ritual_overlay",
              variant: "hold_to_lock",
            },
          },
          style: "gold",
        },
      ],
    },
  },
};

export const RoutineLockedContainer = {
  container_id: "routine_locked",

  states: {
    // 1️⃣ ROUTINE LOCKED STATE (READ-ONLY)
    locked_summary: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Your cycle is locked.",
        },
        {
          type: "subtext",
          content: "Consistency creates identity.",
        },
        {
          type: "summary_block",
          fields: [
            { label: "Sankalp", value_key: "sankalp_text" },
            { label: "Mantra Repetitions", value_key: "mantra_reps" },
            { label: "Anchor Duration", value_key: "anchor_duration" },
            { label: "Refinement Layer", value_key: "refinement_layer" },
          ],
        },
        {
          type: "link_text",
          content: "Adjust with intention",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_locked",
              variant: "adjust_with_intention",
            },
          },
        },
      ],
    },

    // 2️⃣ ADJUST WITH INTENTION PORTAL
    adjust_with_intention: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "caution" },

      meta: {
        requires_confirmation: true,
      },

      blocks: [
        {
          type: "headline",
          content: "Adjusting will reset structural consistency.",
        },
        {
          type: "subtext",
          content: "This action should be intentional.",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            {
              id: "continue_adjust",
              title: "Continue to Adjust",
            },
            {
              id: "cancel_adjust",
              title: "Cancel",
            },
          ],
        },
      ],

      on_select: {
        continue_adjust: {
          type: "navigate",
          target: {
            container_id: "routine_builder",
            variant: "mantra_reps_picker",
          },
        },
        cancel_adjust: {
          type: "navigate",
          target: {
            container_id: "routine_locked",
            variant: "locked_summary",
          },
        },
      },
    },

    // 3️⃣ CONFIRMATION OF ADJUSTED STRUCTURE
    adjusted_confirmation: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Structure updated intentionally.",
        },
        {
          type: "subtext",
          content: "Continue your cycle with clarity.",
        },
        {
          type: "primary_button",
          label: "Return to Dashboard",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
        },
      ],
    },
  },
};

export const CompanionDashboardContainer = {
  container_id: "companion_dashboard",

  states: {
    // 1️⃣ COMMAND DASHBOARD (Day X of 14)
    day_active: {
      tone: { theme: "dark_base", mood: "steady" },

      meta: {
        requires_active_cycle: true,
        reactive_updates: true,
      },

      blocks: [
        {
          type: "micro_label",
          content: "DAY {{day_number}} OF {{total_days}}",
        },
        {
          type: "headline",
          content: "{{identity_headline}}",
        },
        {
          type: "subtext",
          content: "{{identity_subtext}}",
        },

        // Identity State Indicator block rendered separately
        {
          type: "identity_indicator",
          state: "{{identity_state}}", // steady | reactive | drifting
        },

        // Practice Access Cards
        {
          type: "practice_card",
          id: "mantra_practice",
          title: "Mantra Practice",
          meta: "{{mantra_progress}}",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              variant: "mantra_runner",
            },
          },
        },
        {
          type: "practice_card",
          id: "sankalp_embodiment",
          title: "Sankalp Embodiment",
          meta: "{{sankalp_status}}",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              variant: "sankalp_embody",
            },
          },
        },
        {
          type: "practice_card",
          id: "anchor_practice",
          title: "Anchor Stability",
          meta: "{{anchor_status}}",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              variant: "anchor_timer",
            },
          },
        },

        // Embodiment Challenge Entry
        {
          type: "practice_card",
          id: "embodiment_challenge",
          title: "Dharma in Action",
          meta: "{{challenge_text}}",
          action: {
            type: "navigate",
            target: {
              container_id: "embodiment_challenge_runner",
              variant: "challenge_view",
            },
          },
        },

        // Persistent Trigger Entry
        {
          type: "floating_button",
          label: "I feel triggered",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              variant: "trigger_entry", // FIXED
            },
          },
        },
      ],
    },

    // 2️⃣ IDENTITY STATE INDICATOR
    identity_state_view: {
      tone: { theme: "dark_base", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "You are {{identity_state}}.",
        },
        {
          type: "subtext",
          content: "{{identity_guidance}}",
        },
        {
          type: "identity_indicator",
          state: "{{identity_state}}",
        },
      ],
    },

    // 3️⃣ LIVE ADAPTATION NOTIFICATION
    adaptation_toast: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "neutral" },

      meta: {
        auto_dismiss_ms: 4000,
        non_blocking: true,
      },

      blocks: [
        {
          type: "toast_message",
          content: "{{adaptation_message}}",
        },
      ],
    },
  },
};

export const PracticeRunnerContainer = {
  container_id: "practice_runner",

  states: {
    // 1️⃣ MANTRA PRACTICE SCREEN (21)
    mantra_runner: {
      tone: { theme: "deep_focus", mood: "immersive" },

      meta: {
        disable_navigation: true,
        persist_progress: true,
      },

      blocks: [
        {
          type: "mantra_display",
          text_key: "mantra_text",
        },
        {
          type: "rep_counter",
          total_key: "reps_total",
          completed_key: "reps_completed",
        },
        {
          type: "tap_zone",
          interaction: "increment_rep",
        },
      ],

      on_complete: {
        type: "navigate",
        target: {
          container_id: "practice_runner",
          variant: "mantra_complete",
        },
      },
    },

    // 2️⃣ MANTRA REP COUNTER FEEDBACK (22)
    mantra_feedback: {
      tone: { theme: "deep_focus", mood: "active" },

      blocks: [
        {
          type: "rep_counter_feedback",
          animation: "subtle_scale",
          haptic: true,
        },
      ],
    },

    // 3️⃣ MANTRA COMPLETION STATE (23)
    mantra_complete: {
      tone: { theme: "deep_focus", mood: "grounded" },

      blocks: [
        {
          type: "headline",
          content: "Mantra complete.",
        },
        {
          type: "subtext",
          content: "Stability reinforced.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
        },
      ],
    },

    // 4️⃣ SANKALP EMBODIMENT SCREEN (24)
    sankalp_embody: {
      tone: { theme: "deep_focus", mood: "reflective" },

      blocks: [
        {
          type: "sankalp_display",
          text_key: "sankalp_text",
        },
        {
          type: "instruction_text",
          content: "Read slowly. Internalize. Commit.",
        },
        {
          type: "primary_button",
          label: "Activate",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              variant: "sankalp_confirm",
            },
          },
        },
      ],
    },

    // 5️⃣ SANKALP ACTIVATION CONFIRMATION (25)
    sankalp_confirm: {
      tone: { theme: "deep_focus", mood: "grounded" },

      blocks: [
        {
          type: "headline",
          content: "Embodiment set.",
        },
        {
          type: "subtext",
          content: "Live this today.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
        },
      ],
    },

    // 6️⃣ ANCHOR TIMER SCREEN (26)
    anchor_timer: {
      tone: { theme: "deep_focus", mood: "immersive" },

      meta: {
        persist_timer_background: true,
      },

      blocks: [
        {
          type: "timer_display",
          duration_key: "anchor_duration",
          format: "mm:ss",
        },
        {
          type: "timer_controls",
          options: ["start", "pause", "resume"],
        },
      ],

      on_complete: {
        type: "navigate",
        target: {
          container_id: "practice_runner",
          variant: "anchor_complete",
        },
      },
    },

    // 7️⃣ ANCHOR COMPLETION STATE (27)
    anchor_complete: {
      tone: { theme: "deep_focus", mood: "grounded" },

      blocks: [
        {
          type: "headline",
          content: "Anchor complete.",
        },
        {
          type: "subtext",
          content: "Nervous system stabilized.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
        },
      ],
    },
  },
};

export const EmbodimentChallengeRunnerContainer = {
  container_id: "embodiment_challenge_runner",

  states: {
    // 1️⃣ DAILY EMBODIMENT CHALLENGE CARD (28)
    challenge_view: {
      tone: { theme: "dark_base", mood: "grounded" },

      meta: {
        requires_active_cycle: true,
        single_daily_instance: true,
      },

      blocks: [
        {
          type: "micro_label",
          content: "DHARMA IN ACTION",
        },
        {
          type: "headline",
          content: "Today's Embodiment",
        },
        {
          type: "challenge_text",
          text_key: "challenge_text",
        },
        {
          type: "subtext",
          content: "Did this occur today?",
        },
        {
          type: "choice_card",
          id: "embodiment_outcome",
          selection_mode: "single",
          options: [
            { id: "completed", title: "Completed" },
            { id: "avoided", title: "Avoided" },
            { id: "not_tested", title: "Not Tested" },
          ],
        },
      ],

      on_select: {
        completed: {
          type: "navigate",
          target: {
            container_id: "embodiment_challenge_runner",
            variant: "challenge_confirm",
          },
        },
        avoided: {
          type: "navigate",
          target: {
            container_id: "embodiment_challenge_runner",
            variant: "challenge_confirm",
          },
        },
        not_tested: {
          type: "navigate",
          target: {
            container_id: "embodiment_challenge_runner",
            variant: "challenge_confirm",
          },
        },
      },
    },

    // 2️⃣ EMBODIMENT OUTCOME CONFIRMATION (29)
    challenge_confirm: {
      tone: { theme: "dark_base", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Outcome recorded.",
        },
        {
          type: "subtext",
          content: "Behavior logged for today.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
        },
      ],
    },
  },
};

export const AwarenessTriggerContainer = {
  container_id: "awareness_trigger",

  states: {
    // 1️⃣ MID-DAY AWARENESS PROMPT
    midday_prompt: {
      tone: { theme: "dark_base", mood: "reflective" },

      blocks: [
        {
          type: "headline",
          content: "Pause and check in.",
        },
        {
          type: "subtext",
          content: "What are you experiencing right now?",
        },
        {
          type: "primary_button",
          label: "Check In",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              variant: "response_matrix",
            },
          },
        },
      ],
    },

    // 2️⃣ AWARENESS RESPONSE MATRIX
    response_matrix: {
      tone: { theme: "dark_base", mood: "neutral" },

      blocks: [
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "irritation", title: "Irritation" },
            { id: "anxiety", title: "Anxiety" },
            { id: "urgency", title: "Urgency" },
            { id: "fatigue", title: "Fatigue" },
            { id: "avoidance", title: "Avoidance" },
          ],
        },
      ],

      on_select: {
        default: {
          type: "navigate",
          target: {
            container_id: "awareness_trigger",
            variant: "breath_reset",
          },
        },
      },
    },

    // 3️⃣ PERSISTENT “I FEEL TRIGGERED” ENTRY
    trigger_entry: {
      tone: { theme: "dark_base", mood: "alert" },

      blocks: [
        {
          type: "headline",
          content: "You feel triggered.",
        },
        {
          type: "primary_button",
          label: "Begin Reset",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              variant: "breath_reset",
            },
          },
        },
      ],
    },

    // 4️⃣ 3-BREATH RESET ANIMATION
    breath_reset: {
      tone: { theme: "deep_focus", mood: "calming" },

      blocks: [
        {
          type: "breath_animation",
          cycles: 3,
        },
      ],

      on_complete: {
        type: "navigate",
        target: {
          container_id: "awareness_trigger",
          variant: "quick_mantra",
        },
      },
    },

    // 5️⃣ QUICK MANTRA LOOP SCREEN
    quick_mantra: {
      tone: { theme: "deep_focus", mood: "steady" },

      blocks: [
        {
          type: "mantra_display",
          text_key: "mantra_text",
        },
        {
          type: "rep_counter",
          total: 9,
        },
      ],

      on_complete: {
        type: "navigate",
        target: {
          container_id: "awareness_trigger",
          variant: "trigger_reflection",
        },
      },
    },

    // 6️⃣ TRIGGER REFLECTION PROMPT
    trigger_reflection: {
      tone: { theme: "dark_base", mood: "reflective" },

      blocks: [
        {
          type: "headline",
          content: "What triggered this?",
        },
        {
          type: "text_input",
          id: "trigger_reflection_input",
          optional: true,
        },
        {
          type: "primary_button",
          label: "Continue",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              variant: "dharmic_response",
            },
          },
        },
      ],
    },

    // 7️⃣ DHARMIC RESPONSE SELECTION
    dharmic_response: {
      tone: { theme: "dark_base", mood: "grounded" },

      blocks: [
        {
          type: "headline",
          content: "How will you respond?",
        },
        {
          type: "choice_card",
          selection_mode: "single",
          options_key: "dharmic_response_options",
        },
      ],

      on_select: {
        default: {
          type: "navigate",
          target: {
            container_id: "awareness_trigger",
            variant: "post_trigger_reinforcement",
          },
        },
      },
    },

    // 8️⃣ POST-TRIGGER REINFORCEMENT MESSAGE
    post_trigger_reinforcement: {
      tone: { theme: "dark_base", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Return steady.",
        },
        {
          type: "subtext",
          content: "You interrupted reaction.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
        },
      ],
    },

    // 9️⃣ TRIGGER PATTERN INSIGHT GRAPH
    trigger_pattern_graph: {
      tone: { theme: "dark_base", mood: "analytical" },

      blocks: [
        {
          type: "graph",
          graph_type: "trigger_pattern",
          data_key: "trigger_pattern_data",
        },
      ],
    },

    // 🔟 EMOTIONAL DRIFT SOFT WARNING
    drift_warning: {
      overlay: true,
      tone: { theme: "dark_overlay", mood: "gentle" },

      blocks: [
        {
          type: "headline",
          content: "Emotional drift detected.",
        },
        {
          type: "subtext",
          content: "Return to your anchor.",
        },
      ],
    },

    // 1️⃣1️⃣ NERVOUS SYSTEM STABILIZATION PROMPT
    nervous_stabilization: {
      tone: { theme: "deep_focus", mood: "calming" },

      blocks: [
        {
          type: "headline",
          content: "Stabilize your nervous system.",
        },
        {
          type: "primary_button",
          label: "Begin 3-Minute Anchor",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              variant: "anchor_timer",
            },
          },
        },
      ],
    },
  },
};

export const InsightsProgressContainer = {
  container_id: "insights_progress",

  states: {
    // -------- RESISTANCE & EGO --------

    resistance_detected: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Resistance detected." },
        { type: "subtext", content: "Avoidance patterns observed." },
        {
          type: "primary_button",
          label: "Reflect",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              variant: "resistance_reflection",
            },
          },
        },
      ],
    },

    resistance_reflection: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "What are you avoiding?" },
        { type: "text_input", id: "resistance_input" },
        { type: "primary_button", label: "Submit" },
      ],
    },

    ego_inflation_check: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Ego inflation detected." },
        { type: "subtext", content: "Overconfidence reduces awareness." },
      ],
    },

    // -------- ADAPTIVE STATES --------

    plateau_notice: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Plateau detected." },
        { type: "subtext", content: "Consistency without depth." },
      ],
    },

    stability_pivot: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [{ type: "headline", content: "Stability Mode Activated." }],
    },

    escalation_suggestion: {
      tone: { theme: "light_sandal", mood: "growth" },
      blocks: [
        { type: "headline", content: "Increase intensity?" },
        {
          type: "primary_button",
          label: "Deepen",
          action: {
            type: "navigate",
            target: { container_id: "choice_stack", variant: "deepen_select" },
          },
        },
      ],
    },

    inactivity_recovery: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Cycle inactive." },
        { type: "subtext", content: "Resume or reset." },
      ],
    },

    resume_restart_recalibrate: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "resume", title: "Resume" },
            { id: "restart", title: "Restart" },
            { id: "recalibrate", title: "Recalibrate" },
          ],
        },
      ],
    },

    intentional_pause: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [{ type: "headline", content: "Pause cycle intentionally?" }],
    },

    gentle_exit: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [{ type: "headline", content: "Exit confirmed." }],
    },

    continue_confirmation: {
      tone: { theme: "light_sandal", mood: "steady" },
      blocks: [{ type: "headline", content: "Continue your path." }],
    },

    cross_cycle_integrity: {
      tone: { theme: "light_sandal", mood: "neutral" },
      blocks: [
        { type: "headline", content: "Integrity maintained across cycles." },
      ],
    },

    // -------- REFLECTION & HARVEST --------

    reflection_prompt_7day: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "7-Day Reflection" },
        { type: "text_input", id: "reflection_input" },
      ],
    },

    voice_reflection_prompt: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "Record your reflection." },
        { type: "voice_recorder" },
      ],
    },

    structured_written_reflection: {
      tone: { theme: "light_sandal", mood: "reflective" },
      blocks: [
        { type: "headline", content: "Structured Reflection" },
        { type: "form_fields", fields_key: "reflection_questions" },
      ],
    },

    insight_summary: {
      tone: { theme: "light_sandal", mood: "analytical" },
      blocks: [
        { type: "headline", content: "Insight Summary" },
        { type: "summary_block", data_key: "insight_data" },
      ],
    },

    identity_delta_visualization: {
      tone: { theme: "light_sandal", mood: "analytical" },
      blocks: [{ type: "graph", graph_type: "identity_delta" }],
    },

    legacy_timeline: {
      tone: { theme: "light_sandal", mood: "analytical" },
      blocks: [{ type: "timeline", data_key: "cycle_history" }],
    },
  },
};

export const CycleTransitionsContainer = {
  container_id: "cycle_transitions",

  states: {
    // 1️⃣ DEEPEN SELECTION SCREEN
    deepen_selection: {
      tone: { theme: "light_sandal", mood: "growth" },

      blocks: [
        { type: "headline", content: "Deepen your practice?" },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "increase_reps", title: "Increase mantra reps" },
            { id: "increase_anchor", title: "Increase anchor duration" },
            { id: "add_refinement", title: "Add refinement layer" },
          ],
        },
      ],
    },

    // 2️⃣ DEEPEN CONFIRMATION
    deepen_confirmation: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        { type: "headline", content: "Practice deepened." },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
        },
      ],
    },

    // 3️⃣ EXTENSION ACTIVATION
    extension_activation: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        { type: "headline", content: "Extend this cycle?" },
        {
          type: "primary_button",
          label: "Extend 7 More Days",
          action: { type: "activate_extension" },
        },
      ],
    },

    // 4️⃣ SWITCH FOCUS WARNING
    switch_focus_warning: {
      tone: { theme: "light_sandal", mood: "caution" },

      blocks: [
        { type: "headline", content: "Switching focus resets momentum." },
        {
          type: "choice_card",
          selection_mode: "single",
          options: [
            { id: "continue_switch", title: "Switch Focus" },
            { id: "stay", title: "Stay on Current Path" },
          ],
        },
      ],
    },

    // 5️⃣ NEW FOCUS CONFIRMATION
    new_focus_confirmation: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        { type: "headline", content: "New focus activated." },
        {
          type: "primary_button",
          label: "Begin New Cycle",
          action: {
            type: "navigate",
            target: { container_id: "choice_stack", variant: "mode_toggle" },
          },
        },
      ],
    },

    // 6️⃣ CROSS-CYCLE INTEGRITY MESSAGE
    cross_cycle_integrity: {
      tone: { theme: "light_sandal", mood: "neutral" },

      blocks: [
        {
          type: "headline",
          content: "Your previous cycle remains part of your identity.",
        },
      ],
    },

    // 7️⃣ CONTINUE SAME PATH
    continue_same_path: {
      tone: { theme: "light_sandal", mood: "steady" },

      blocks: [
        {
          type: "headline",
          content: "Continue this path.",
        },
        {
          type: "primary_button",
          label: "Proceed",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              variant: "day_active",
            },
          },
        },
      ],
    },

    // 8️⃣ RESET WITH AWARENESS
    reset_with_awareness: {
      tone: { theme: "light_sandal", mood: "neutral" },

      blocks: [
        { type: "headline", content: "Reset with awareness." },
        {
          type: "primary_button",
          label: "Return to Portal",
          action: {
            type: "navigate",
            target: { container_id: "portal", variant: "welcome_portal" },
          },
        },
      ],
    },
  },
};
export const ContainerRegistry = {
  portal: PortalContainer,
  choice_stack: ChoiceStackContainer,
  composer: ComposerContainer,
  lock_ritual_overlay: LockRitualContainer,
  routine_builder: RoutineBuilderContainer,
  routine_locked: RoutineLockedContainer,
  companion_dashboard: CompanionDashboardContainer,
  practice_runner: PracticeRunnerContainer,
  embodiment_challenge_runner: EmbodimentChallengeRunnerContainer,
  awareness_trigger: AwarenessTriggerContainer,
  insights_progress: InsightsProgressContainer,
  cycle_transitions: CycleTransitionsContainer,
};
