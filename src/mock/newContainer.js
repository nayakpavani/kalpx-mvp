/**
 * =====================================================
 * CONTAINER 1 — PORTAL
 * Identity Threshold State
 * =====================================================
 *
 * Renders ONLY when:
 * cycle_state.status === "none" || "archived"
 *
 * NEVER render when:
 * active | paused | transition | recovery | syncing
 */

export const PortalContainerSeed = {
  container_id: "portal",

  /**
   * =====================================================
   * STATIC META (DESIGN + BEHAVIOR CONTRACT)
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    sacred_threshold: true,

    layout: {
      type: "centered_threshold",
      max_width: 520,
      vertical_safe_zones: {
        top: "20%",
        center: "40%",
        bottom: "20%",
      },
    },

    background: {
      type: "gradient",
      top: "#111827",
      bottom: "#0B1220",
      radial_glow_opacity: 0.08,
      breathing_animation: {
        enabled: true,
        inhale_ms: 4000,
        exhale_ms: 4000,
      },
    },

    animation: {
      enter: "fade_in_300ms",
      button_press_scale: 0.97,
      allow_motion: ["fade", "micro_scale"],
      disallow_motion: ["slide", "bounce", "confetti", "gamified_effects"],
    },

    analytics: {
      lightweight: true,
      events: {
        viewed: "portal_viewed",
        cta_pressed: "portal_cta_pressed",
      },
    },

    routing: {
      root_entry: true,
      next_container: "choice_stack",
      next_variant: "mode_toggle",

      /**
       * BACK NAVIGATION RULES
       * Portal should NOT be in deep navigation stack.
       */
      back_behavior: "exit_app_or_close_flow",
    },

    ai_rules: {
      allow_ai_copy_override: true,
      allow_ai_layout_override: false,
      allow_ai_component_injection: false,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS (CRITICAL — DO NOT CHANGE)
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["none", "archived"],
    block_if_status: ["active", "paused", "transition", "recovery", "syncing"],
  },

  /**
   * =====================================================
   * STATE VARIANTS
   * =====================================================
   */
  states: {
    /**
     * -------------------------------------------------
     * SPLASH PORTAL (Experienced)
     * Quick transition to Dashboard
     * -------------------------------------------------
     */
    splash_portal: {
      tone: "calm",
      blocks: [
        {
          type: "lotus_logo",
          symbol: "om",
          size: "large",
          animation: "soft_pulse",
        },
        {
          type: "headline",
          content: "KalpX",
          typography: { font: "CormorantGaramond", size: 42 },
        },
      ],
    },

    /**
     * -------------------------------------------------
     * WELCOME PORTAL
     * -------------------------------------------------
     */
    welcome_portal: {
      tone: "calm",
      blocks: [
        {
          type: "micro_label",
          content: "IDENTITY PRACTICE",
        },
        {
          type: "headline",
          content: "Enter the Cycle.",
        },
        {
          type: "subtext",
          content: "Choose a discipline.\nCommit to a structured shift.",
        },
        {
          type: "primary_button",
          label: "Begin",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              state_id: "mode_toggle",
            },
          },
          style: {
            background: "#1F2937",
            radius: 14,
            text_color: "#FFFFFF",
          },
        },
        {
          type: "subtext",
          variant: "micro_link",
          content: "Learn how this works",
          action: { type: "open_sheet", sheet_id: "learn_how" },
        },
      ],
    },

    /**
     * -------------------------------------------------
     * VOID STATE
     * -------------------------------------------------
     */
    void_state: {
      tone: "neutral",
      blocks: [
        {
          type: "micro_label",
          content: "IDENTITY PRACTICE",
        },
        {
          type: "headline",
          content: "You have no active cycle.",
        },
        {
          type: "subtext",
          content: "Without structure,\nidentity drifts.",
        },
        {
          type: "primary_button",
          label: "Start a 7 or 14 Day Cycle",
          action: {
            type: "navigate",
            target: {
              container_id: "choice_stack",
              state_id: "mode_toggle",
            },
          },
          style: {
            background: "#1F2937",
            radius: 14,
            text_color: "#FFFFFF",
          },
        },
        {
          type: "subtext",
          variant: "micro_link",
          content: "Learn how this works",
          action: { type: "open_sheet", sheet_id: "learn_how" },
        },
      ],
    },
  },
};

/**
 * =====================================================
 * CONTAINER 2 — CHOICE STACK
 * Structured Decision Layer
 * =====================================================
 *
 * Covers States:
 * 2 — Mode Toggle
 * 3 — Discipline Selection
 * 4 — Domain Mapping
 * + reusable for deepen/focus selection later
 *
 * IMPORTANT:
 * - DOES NOT create cycle
 * - Writes only to cycle_draft
 */

export const ChoiceStackContainerSeed = {
  container_id: "choice_stack",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    layout: {
      type: "stacked_choice_surface",
      max_width: 520,
      spacing: 16,
    },

    background: {
      type: "gradient",
      top: "#111827",
      bottom: "#0B1220",
    },

    card_style: {
      background: "#1F2937",
      border: "#374151",
      radius: 16,
      hover_border: "#4B5563",
      selected_background: "#273244",
    },

    animation: {
      enter: "fade_in_250ms",
      card_select_delay: 150,
      allow_motion: ["fade", "soft_glow"],
      disallow_motion: ["slide", "bounce", "gamified"],
    },

    analytics: {
      lightweight: true,
      events: {
        viewed: "choice_stack_viewed",
        option_selected: "choice_option_selected",
        continue_pressed: "choice_continue_pressed",
      },
    },

    routing: {
      /**
       * Centralized routing guards
       */
      steps: ["mode_toggle", "discipline_select", "domain_select"],

      next_map: {
        mode_toggle: "discipline_select",
        discipline_select: "domain_select",
        domain_select: "composer",
      },

      /**
       * Prevent invalid deep navigation.
       */
      require_previous_selection: true,

      back_behavior: {
        mode_toggle: "portal",
        discipline_select: "mode_toggle",
        domain_select: "discipline_select",
      },
    },

    ai_rules: {
      allow_ai_copy_override: true,
      allow_ai_layout_override: false,
      allow_ai_option_injection: true, // safe for future dynamic disciplines
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["none", "draft"],
    block_if_status: ["active", "paused", "transition", "recovery", "syncing"],
  },

  /**
   * =====================================================
   * STATE VARIANTS
   * =====================================================
   */
  states: {
    mode_toggle: {
      tone: "grounded",
      blocks: [
        {
          type: "micro_label",
          content: "DEFINE YOUR STRUCTURE",
          position: "header",
        },
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
          id: "cycle_length_picker",
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
              Recommended: true,
            },
          ],
          target: {
            container_id: "choice_stack",
            state_id: "discipline_select",
          },
        },
      ],
    },
    discipline_select: {
      tone: "grounded",
      blocks: [
        { type: "micro_label", content: "CORE STRENGTH", position: "header" },
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
          id: "discipline_picker",
          selection_mode: "single",
          options: [
            {
              id: "calm_stability",
              title: "Calm Stability",
              description: "Train non-reactivity.",
            },
            {
              id: "integrity",
              title: "Integrity",
              description: "Align action with truth.",
            },
            {
              id: "strength",
              title: "Strength",
              description: "Build inner firmness.",
            },
            {
              id: "clarity",
              title: "Clarity",
              description: "Reduce mental noise.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Continue →",
          position: "footer",
          action: {
            type: "navigate",
            target: { container_id: "choice_stack", state_id: "domain_select" },
          },
        },
      ],
    },
    domain_select: {
      tone: "grounded",
      blocks: [
        { type: "micro_label", content: "LIFE AREA", position: "header" },
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
          id: "domain_picker",
          selection_mode: "single",
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
          label: "Next Step →",
          position: "footer",
          action: {
            type: "navigate",
            target: { container_id: "composer", state_id: "sankalp_composer" },
          },
        },
      ],
    },
  },
};

/**
 * =====================================================
 * CONTAINER 3 — COMPOSER
 * Sankalp Authorship Layer
 * =====================================================
 *
 * Covers State:
 * 5 — Sankalp Composer
 *
 * IMPORTANT:
 * - Writes only to cycle_draft.sankalp
 * - DOES NOT create cycle yet
 */

export const ComposerContainerSeed = {
  container_id: "composer",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",

    layout: {
      type: "centered_composer",
      max_width: 520,
      vignette_opacity: 0.07,
    },

    background: {
      type: "gradient",
      top: "#111827",
      bottom: "#0B1220",
      focus_dimming: true,
    },

    input_style: {
      background: "#1F2937",
      border: "#374151",
      radius: 18,
      padding: 24,
      min_height: 120,
      max_height: 180,
      focus_border: "#4B5563",
    },

    animation: {
      enter: "fade_in_250ms",
      placeholder_fade: true,
      allow_motion: ["fade", "soft_focus"],
      disallow_motion: ["typing_effect", "bounce", "gamified"],
    },

    analytics: {
      lightweight: true,
      events: {
        viewed: "composer_viewed",
        text_started: "composer_text_started",
        ai_opened: "composer_ai_opened",
        continued: "composer_continue_pressed",
      },
    },

    routing: {
      /**
       * Composer must only open AFTER
       * mode + discipline + domain selected.
       */
      required_draft_keys: ["cycle_length", "discipline", "domain"],

      next_container: "routine_builder",
      next_variant: "routine_builder_setup",

      back_behavior: "domain_select",
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_suggestion_modal: true,
      require_user_trigger: true,
      allow_auto_generation: false,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["draft"],
    block_if_status: [
      "none",
      "active",
      "paused",
      "transition",
      "recovery",
      "syncing",
    ],
  },

  /**
   * =====================================================
   * STATE CONFIG
   * =====================================================
   */
  /**
   * =====================================================
   * STATE CONFIG
   * =====================================================
   */
  states: {
    sankalp_composer: {
      tone: "quiet_intentional",

      blocks: [
        {
          type: "micro_label",
          content: "DEFINE YOUR INTENTION",
        },
        {
          type: "headline",
          content: "Write your Sankalp.",
        },
        {
          type: "subtext",
          content: "Short. Clear. Behavioral.",
        },
        {
          type: "textarea",
          draft_key: "sankalp",
          placeholder_examples: [
            "I respond without raising my voice.",
            "I complete what I begin.",
            "I pause before reacting.",
            "I act with financial awareness.",
          ],
        },
        {
          type: "primary_button",
          label: "Continue",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              state_id: "routine_builder_setup",
            },
          },
          style: {
            background: "#1F2937",
            radius: 14,
          },
        },
      ],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    persistence: {
      save_to: "cycle_draft.sankalp",
      autosave: true,
      silent: true,
    },

    cta_enable_rules: {
      min_length_required: true,
      block_if_empty: true,
    },

    soft_validation: {
      verb_missing_nudge: true,
      generic_phrase_nudge: true,
      blocking: false,
    },

    keyboard_behavior: {
      mobile_sticky_cta: true,
      avoid_keyboard_overlap: true,
    },

    interruption_handling: {
      preserve_text_on_exit: true,
      restore_on_resume: true,
    },

    ai_insert_behavior: {
      require_confirmation: true,
      animate_soft_fade: true,
    },
  },
};

/**
 * =====================================================
 * CONTAINER 4 — LOCK RITUAL OVERLAY
 * Commitment Gate Overlay
 * =====================================================
 *
 * Covers States:
 * 6 — Hold to Lock
 * 7 — Lock Confirmation Transition
 *
 * IMPORTANT:
 * - This is an OVERLAY, not a full screen.
 * - Blocks background interaction.
 * - Creates the cycle on successful completion.
 */

export const LockRitualOverlaySeed = {
  container_id: "lock_ritual_overlay",
  type: "overlay",

  /**
   * =====================================================
   * STATIC META (VISUAL + SYSTEM CONTRACT)
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    sacred_commitment_layer: true,

    overlay_background: {
      color: "#000000",
      opacity: 0.6,
      blur_px: 7,
      block_scroll: true,
    },

    card_style: {
      max_width: 420,
      background: "#111827",
      border: "#374151",
      radius: 20,
      padding: 32,
      shadow: "soft",
    },

    animation: {
      enter: "fade_in_250ms",
      confirmation_transition_ms: 900,
      allow_motion: [
        "progress_ring",
        "soft_glow",
        "fade_transition",
        "ambient_tone_shift",
      ],
      disallow_motion: [
        "confetti",
        "celebration_icons",
        "achievement_badges",
        "sound_effects",
      ],
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_structure_override: false,
      allow_ai_tone_shift: false,
    },

    analytics: {
      events: {
        overlay_opened: "lock_overlay_opened",
        hold_started: "lock_hold_started",
        hold_cancelled: "lock_hold_cancelled",
        cycle_locked: "cycle_locked",
      },
    },

    routing: {
      overlay_blocks_navigation: true,
      disallow_back_during_hold: true,
      next_container: "companion_dashboard",
      next_variant: "day_active",
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["draft"],
    required_draft_complete: true,
    block_if_status: [
      "none",
      "active",
      "paused",
      "transition",
      "recovery",
      "syncing",
    ],
  },

  /**
   * =====================================================
   * STATE CONFIGURATION
   * =====================================================
   */
  states: {
    hold_to_lock: {
      tone: "serious_grounded",
      blocks: [
        {
          type: "micro_label",
          content: "FINALIZE STRUCTURE",
          position: "header",
        },
        {
          type: "headline",
          content: "Hold to lock your cycle.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Commit to this structure for 14 days.",
          position: "header",
        },
        {
          type: "hold_button", // Special internal block for the overlay
          label: "Hold to Lock",
          on_complete: {
            type: "navigate",
            target: {
              container_id: "lock_ritual_overlay",
              state_id: "lock_confirm_transition",
            },
          },
        },
        {
          type: "subtext",
          content: "Structure builds identity.",
          position: "footer",
        },
      ],
    },

    lock_confirm_transition: {
      tone: "quiet_resolve",
      blocks: [
        {
          type: "lotus_logo",
          symbol: "om",
          size: "medium",
          position: "header",
        },
        {
          type: "headline",
          content: "Cycle Locked.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Day 1 begins now.",
          position: "header",
        },
        {
          type: "primary_button",
          label: "Enter Day 1",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
          style: {
            background: "#1F2937",
            radius: 14,
          },
        },
      ],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    overlay_behavior: {
      block_background_interaction: true,
      allow_escape_key: false,
      allow_swipe_close: false,
    },

    haptics: {
      halfway_pulse: true,
      completion_pulse: true,
    },

    lifecycle: {
      /**
       * IMPORTANT:
       * Cycle should only be created AFTER hold completes.
       */
      on_hold_complete: {
        actions: [
          "persist_cycle_to_backend",
          "generate_cycle_id",
          "initialize_day_one",
          "update_cycle_state_active",
        ],
      },

      interruption_handling: {
        reset_progress_on_interrupt: true,
        preserve_draft: true,
        prevent_partial_lock: true,
      },
    },

    backend_contract: {
      create_cycle_endpoint: "/cycle/create",
      required_payload: ["cycle_length", "discipline", "domain", "sankalp"],
    },
  },
};

/**
 * =====================================================
 * CONTAINER 5 — ROUTINE BUILDER
 * Structural Configuration Layer
 * =====================================================
 *
 * Covers States:
 * 9 — Mantra Frequency Picker
 * 10 — Anchor Duration Picker
 * 14 — Routine Review Summary
 *
 * IMPORTANT:
 * - Writes ONLY to cycle_draft
 * - Does NOT create cycle
 * - Lock Ritual Overlay commits structure
 */

export const RoutineBuilderContainerSeed = {
  container_id: "routine_builder",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",

    layout: {
      type: "vertical_structural_stack",
      max_width: 520,
      spacing: 18,
    },

    background: {
      type: "gradient",
      top: "#111827",
      bottom: "#0B1220",
    },

    card_style: {
      base_background: "#1F2937",
      highlight_background: "#273244",
      border: "#374151",
      radius: 16,
      padding: 20,
    },

    animation: {
      enter: "fade_in_250ms",
      allow_motion: ["fade", "numeric_transition", "soft_highlight"],
      disallow_motion: ["drag_slider", "bounce", "gamified_effects"],
    },

    analytics: {
      lightweight: true,
      events: {
        viewed: "routine_builder_viewed",
        mantra_selected: "routine_mantra_selected",
        anchor_selected: "routine_anchor_selected",
        lock_pressed: "routine_lock_pressed",
      },
    },

    routing: {
      required_draft_keys: ["cycle_length", "discipline", "domain", "sankalp"],

      back_behavior: "composer",

      /**
       * Lock ritual overlay appears next.
       */
      next_overlay: "lock_ritual_overlay",
      next_variant: "hold_to_lock",
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_structure_override: false,
      allow_ai_suggestion_hint: true,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["draft"],
    block_if_status: [
      "none",
      "active",
      "paused",
      "transition",
      "recovery",
      "syncing",
    ],
  },

  /**
   * =====================================================
   * STATE CONFIGURATION
   * =====================================================
   */
  states: {
    routine_builder_setup: {
      tone: "precise_grounded",

      blocks: [
        {
          type: "micro_label",
          content: "BUILD YOUR ROUTINE",
        },
        {
          type: "headline",
          content: "Define your daily structure.",
        },
        {
          type: "subtext",
          content: "Small repetitions. Compounded identity.",
        },
        {
          type: "option_picker",
          id: "mantra_reps",
          title: "Mantra Repetitions",
          options: [9, 18, 27, 54, 108],
          unit: "Reps",
        },
        {
          type: "option_picker",
          id: "anchor_duration",
          title: "Anchor Duration",
          options: [3, 5, 7, 11, 21],
          unit: "Min",
        },
        {
          type: "primary_button",
          label: "Review & Lock",
          action: {
            type: "navigate",
            target: {
              container_id: "lock_ritual_overlay",
              state_id: "hold_to_lock",
            },
          },
        },
      ],
    },
    mantra_frequency_picker: {
      tone: "precise_grounded",
      blocks: [
        { type: "micro_label", content: "MANTRA FREQUENCY", position: "header" },
        { type: "headline", content: "Set your daily repetitions.", position: "header" },
        { type: "subtext", content: "Choose a count that challenges without overwhelming.", position: "header" },
        {
          type: "picker",
          id: "mantra_rep_picker",
          data_key: "reps_total",
          options: [
            { value: 9, label: "9 reps", description: "Gentle start" },
            { value: 21, label: "21 reps", description: "Standard" },
            { value: 54, label: "54 reps", description: "Deep practice" },
            { value: 108, label: "108 reps", description: "Full mala" },
          ],
        },
        {
          type: "primary_button",
          label: "Next",
          position: "footer",
          action: { type: "navigate", target: { container_id: "routine_builder", state_id: "anchor_duration_slider" } },
        },
      ],
    },
    anchor_duration_slider: {
      tone: "precise_grounded",
      blocks: [
        { type: "micro_label", content: "ANCHOR DURATION", position: "header" },
        { type: "headline", content: "Set your anchor time.", position: "header" },
        { type: "subtext", content: "Minutes of focused stillness per day.", position: "header" },
        {
          type: "slider",
          id: "anchor_slider",
          data_key: "anchor_minutes",
          min: 2, max: 30, step: 1, default: 5, unit: "min",
        },
        {
          type: "primary_button",
          label: "Next",
          position: "footer",
          action: { type: "navigate", target: { container_id: "routine_builder", state_id: "refinement_layer_menu" } },
        },
      ],
    },
    refinement_layer_menu: {
      tone: "precise_grounded",
      blocks: [
        { type: "micro_label", content: "REFINEMENT LAYER", position: "header" },
        { type: "headline", content: "Add an optional layer.", position: "header" },
        { type: "subtext", content: "Observation, embodiment, or stability.", position: "header" },
        {
          type: "choice_card",
          id: "refinement_picker",
          selection_mode: "auto",
          options: [
            { id: "observation", title: "Observation", description: "Notice patterns without judgment." },
            { id: "embodiment", title: "Embodiment", description: "Daily micro-challenge." },
            { id: "stability", title: "Stability", description: "Emotional regulation drills." },
            { id: "none", title: "Skip", description: "No refinement layer." },
          ],
        },
        {
          type: "primary_button",
          label: "Review Routine",
          position: "footer",
          action: { type: "navigate", target: { container_id: "routine_builder", state_id: "routine_review_summary" } },
        },
      ],
    },
    ai_suggestion_modal: {
      tone: "gentle",
      blocks: [
        { type: "micro_label", content: "AI SUGGESTION", position: "header" },
        { type: "headline", content: "A recommendation for you.", position: "header" },
        {
          type: "summary_block",
          id: "ai_recommendation",
          content: "Based on your selections, consider adjusting for maximum impact.",
          tone: "supportive",
        },
        {
          type: "primary_button",
          label: "Apply Suggestion",
          position: "footer",
          action: { type: "navigate", target: { container_id: "routine_builder", state_id: "routine_review_summary" } },
        },
        {
          type: "primary_button",
          label: "Keep My Choices",
          position: "footer",
          style_variant: "outline",
          action: { type: "navigate", target: { container_id: "routine_builder", state_id: "routine_review_summary" } },
        },
      ],
    },
    over_stacking_warning: {
      tone: "gentle",
      blocks: [
        { type: "micro_label", content: "WARNING", position: "header" },
        { type: "headline", content: "You may be over-structuring.", position: "header" },
        { type: "subtext", content: "High reps + long anchor + refinement layer may cause burnout.", position: "header" },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            { id: "simplify", title: "Simplify", description: "Reduce to sustainable level", action: { type: "navigate", target: { container_id: "routine_builder", state_id: "routine_builder_setup" } } },
            { id: "proceed", title: "Proceed Anyway", description: "I understand the commitment", action: { type: "navigate", target: { container_id: "routine_builder", state_id: "routine_review_summary" } } },
          ],
        },
      ],
    },
    routine_review_summary: {
      tone: "precise_grounded",
      blocks: [
        { type: "micro_label", content: "REVIEW", position: "header" },
        { type: "headline", content: "Your Structure.", position: "header" },
        {
          type: "summary_card",
          fields: [
            { label: "MANTRA REPS", value_key: "reps_total" },
            { label: "ANCHOR DURATION", value_key: "anchor_minutes" },
            { label: "DISCIPLINE", value_key: "focus_name" },
          ],
        },
        {
          type: "primary_button",
          label: "Lock Routine →",
          position: "footer",
          action: { type: "navigate", target: { container_id: "lock_ritual_overlay", state_id: "hold_to_lock" } },
        },
        {
          type: "primary_button",
          label: "Edit",
          position: "footer",
          style_variant: "outline",
          action: { type: "navigate", target: { container_id: "routine_builder", state_id: "routine_builder_setup" } },
        },
      ],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    persistence: {
      save_to: "cycle_draft",
      autosave: true,
      silent: true,
    },

    defaults: {
      apply_on_mount: true,
      based_on_cycle_length: true,
    },

    validation: {
      required_fields: ["mantra_reps", "anchor_minutes", "sankalp"],
      enable_cta_when_valid: true,
    },

    picker_behavior: {
      component: "BottomSheetPicker",
      close_on_select: true,
      highlight_changed_block: true,
    },

    interruption_handling: {
      preserve_draft_on_exit: true,
      restore_on_resume: true,
      prevent_cycle_creation: true,
    },

    multi_device_sync: {
      if_cycle_activated_elsewhere: "unmount_container",
    },
  },
};

/**
 * =====================================================
 * CONTAINER 6 — ROUTINE LOCKED (READ-ONLY STRUCTURE)
 * =====================================================
 *
 * Covers States:
 * 15 — Routine Locked State
 * 16 — Adjust With Intention Portal
 * 17 — Confirmation of Adjusted Structure
 *
 * IMPORTANT:
 * - READ ONLY by default
 * - Adjustment requires modal confirmation
 * - NEVER creates new cycle
 */

export const RoutineLockedContainerSeed = {
  container_id: "routine_locked",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    structure_surface: true,

    layout: {
      type: "centered_single_card",
      max_width: 520,
    },

    background: {
      type: "gradient",
      top: "#111827",
      bottom: "#0B1220",
    },

    card_style: {
      background: "#1F2937",
      border: "#374151",
      radius: 18,
      padding: 24,
    },

    animation: {
      enter: "fade_in_250ms",
      allow_motion: ["fade", "soft_highlight"],
      disallow_motion: ["expand_collapse", "slide_panels", "gamified_effects"],
    },

    analytics: {
      lightweight: true,
      events: {
        viewed: "routine_locked_viewed",
        adjust_clicked: "routine_adjust_clicked",
        structure_adjusted: "structure_adjusted",
      },
    },

    routing: {
      /**
       * Accessible from dashboard anytime.
       */
      access_from: ["companion_dashboard"],

      /**
       * Adjustment flow returns to Routine Builder.
       */
      adjust_route_target: "routine_builder",

      back_behavior: "dashboard",
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_structure_override: false,
      allow_ai_adjust_prompt: false,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["active"],
    block_if_status: [
      "none",
      "draft",
      "paused",
      "transition",
      "recovery",
      "syncing",
    ],
  },

  /**
   * =====================================================
   * STATE CONFIGURATION
   * =====================================================
   */
  states: {
    locked_summary: {
      tone: "stable_formal",
      blocks: [
        { type: "micro_label", content: "ACTIVE STRUCTURE" },
        { type: "headline", content: "Your cycle is locked." },
        { type: "subtext", content: "Consistency creates identity." },
        {
          type: "summary_block",
          fields: [
            { label: "SANKALP", value_key: "sankalp_text" },
            { label: "MANTRA REPETITIONS", value_key: "mantra_reps" },
            { label: "ANCHOR DURATION", value_key: "anchor_duration" },
          ],
        },
        {
          type: "primary_button",
          label: "Dashboard →",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    adjust_with_intention: {
      tone: "grounded",
      blocks: [
        { type: "micro_label", content: "ADJUST WITH INTENTION", position: "header" },
        { type: "headline", content: "Adjusting is intentional.", position: "header" },
        { type: "subtext", content: "Changes reset structural consistency tracking.", position: "header" },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            { id: "adjust", title: "Continue to Adjust", description: "Open routine builder", action: { type: "navigate", target: { container_id: "routine_builder", state_id: "routine_builder_setup" } } },
            { id: "cancel", title: "Keep Current", description: "Return to locked view", action: { type: "navigate", target: { container_id: "routine_locked", state_id: "locked_summary" } } },
          ],
        },
      ],
    },
  },

  /**
   * =====================================================
   * OVERLAYS
   * =====================================================
   */
  overlays: {
    adjust_confirm_modal: {
      type: "ModalConfirm",

      headline: "Adjusting will reset structural consistency.",

      subtext: "This action should be intentional.",

      buttons: [
        {
          label: "Continue to Adjust",
          action: {
            type: "navigate",
            target: {
              container_id: "routine_builder",
              state_id: "routine_builder_setup",
            },
          },
          style: "primary_dark",
        },
        {
          label: "Cancel",
          action: { type: "back" },
          style: "secondary_text",
        },
      ],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    adjustment_rules: {
      require_confirmation_modal: true,
      preserve_cycle_id: true,
      reset_structure_consistency: true,
      reset_streak_counters: true,
    },

    validation: {
      hide_adjust_when: ["cycle_status === completing_today"],
    },

    adjustment_flow: {
      /**
       * When user confirms adjustment:
       */
      on_adjust_confirm: {
        actions: ["route_to_routine_builder", "prefill_with_active_values"],
      },

      /**
       * When user returns from Routine Builder
       */
      on_adjust_complete_return: {
        show_toast: {
          message: "Structure updated intentionally.",
          tone: "neutral",
        },
      },
    },

    multi_device_sync: {
      if_cycle_becomes_inactive: "unmount_container",
    },
  },
};

/**
 * =====================================================
 * CONTAINER 7 — COMPANION DASHBOARD
 * Live Cycle Operating System
 * =====================================================
 *
 * Covers States:
 * 18 — Command Dashboard
 * 19 — Identity State Indicator
 * 20 — Live Adaptation Notification
 */

export const CompanionDashboardContainerSeed = {
  container_id: "companion_dashboard",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    runtime_surface: true,

    layout: {
      type: "single_column_dashboard",
      max_width: 520,
      radial_depth_center: true,
    },

    background: {
      type: "gradient",
      top: "#111827",
      bottom: "#0B1220",
    },

    animation: {
      enter: "fade_in_250ms",
      allow_motion: ["soft_card_elevation", "identity_dot_pulse", "toast_fade"],
      disallow_motion: [
        "confetti",
        "streak_fireworks",
        "gamified_effects",
        "animated_charts",
      ],
    },

    analytics: {
      events: {
        viewed: "dashboard_viewed",
        practice_entry_clicked: "practice_entry_clicked",
        trigger_entry_clicked: "trigger_entry_clicked",
      },
    },

    routing: {
      access_when: "active_cycle_only",

      redirect_if: {
        paused: "cycle_transitions",
        completed: "reflection_harvest",
        none: "portal",
      },

      practice_routes: {
        mantra: {
          container: "practice_runner",
          variant: "mantra_runner",
        },
        sankalp: {
          container: "practice_runner",
          variant: "sankalp_embody",
        },
        anchor: {
          container: "practice_runner",
          variant: "anchor_timer",
        },
        challenge: {
          container: "embodiment_challenge_runner",
          variant: "challenge_view",
        },
        trigger: {
          container: "awareness_trigger",
          variant: "trigger_sos",
        },
      },
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_card_injection: false,
      allow_ai_toast: true,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["active"],
    block_if_status: [
      "none",
      "draft",
      "paused",
      "transition",
      "recovery",
      "syncing",
      "completed",
    ],
  },

  /**
   * =====================================================
   * STATE CONFIGURATION
   * =====================================================
   */
  /**
   * =====================================================
   * STATE CONFIGURATION
   * =====================================================
   */
  states: {
    day_active: {
      day_number: "{{day_number}}",
      blocks: [
        {
          type: "micro_label",
          content: "DAY {{day_number}} OF 14",
          position: "header",
        },
        {
          type: "headline",
          content: "{{identity_headline}}",
          position: "header",
        },
        {
          type: "identity_indicator",
          state: "{{identity_state}}",
          position: "header",
        },
        {
          type: "practice_card",
          id: "practice_chant",
          title: "Mantra Practice",
          description: "{{mantra_text}}",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              state_id: "mantra_runner",
            },
          },
        },
        {
          type: "practice_card",
          id: "practice_embody",
          title: "Sankalp Embodiment",
          description: "{{sankalp_text}}",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              state_id: "sankalp_embody",
            },
          },
        },
        {
          type: "practice_card",
          id: "practice_anchor",
          title: "Anchor Stability",
          description: "{{anchor_minutes}} minutes",
          action: {
            type: "navigate",
            target: {
              container_id: "practice_runner",
              state_id: "anchor_timer",
            },
          },
        },
        {
          type: "practice_card",
          id: "practice_act",
          category: "awareness",
          title: "Dharma in Action",
          description: "{{challenge_text}}",
          action: {
            type: "navigate",
            target: {
              container_id: "embodiment_challenge_runner",
              state_id: "challenge_view",
            },
          },
        },
        {
          type: "primary_button",
          label: "Quick Check-in",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "checkin_step_1",
            },
          },
          position: "footer",
          style_variant: "outline",
        },
        {
          type: "primary_button",
          id: "trigger_sos",
          label: "I Feel Triggered",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "breath_reset",
            },
          },
          position: "footer",
          style_variant: "gold",
        },
        {
          type: "primary_button",
          id: "evening_close",
          label: "Evening Accountability",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "evening_quick_close",
            },
          },
          position: "footer",
          style_variant: "outline",
        },
        { type: "dev_tools", position: "footer" },
      ],
    },
    identity_state_display: {
      tone: "ambient",
      blocks: [
        { type: "micro_label", content: "IDENTITY STATE", position: "header" },
        { type: "headline", content: "{{identity_headline}}", position: "header" },
        { type: "subtext", content: "{{identity_subtext}}", position: "header" },
        { type: "identity_map", id: "identity_pulse", data_key: "identity_map_data" },
        {
          type: "primary_button",
          label: "Back to Dashboard",
          position: "footer",
          action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } },
        },
      ],
    },
    day_completion_seal: {
      tone: "sacred",
      blocks: [
        {
          type: "micro_label",
          content: "DAY COMPLETE",
          position: "header",
        },
        {
          type: "headline",
          content: "Seal this day.",
          position: "header",
        },
        {
          type: "subtext",
          content: "All practices completed. Lock your progress.",
          position: "header",
        },
        {
          type: "identity_map",
          id: "seal_day_radar",
          data_key: "identity_map_data",
        },
        {
          type: "primary_button",
          label: "Seal Day {{day_number}}",
          position: "footer",
          action: {
            type: "seal_day",
          },
        },
      ],
    },
    partial_completion_alert: {
      tone: "gentle",
      blocks: [
        {
          type: "micro_label",
          content: "INCOMPLETE",
          position: "header",
        },
        {
          type: "headline",
          content: "Some practices remain.",
          position: "header",
        },
        {
          type: "subtext",
          content: "You can continue or seal the day as-is.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "continue",
              title: "Continue Practicing",
              description: "Return to dashboard",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
            {
              id: "seal_anyway",
              title: "Seal Day Anyway",
              description: "Partial progress recorded",
              action: {
                type: "seal_day",
              },
            },
          ],
        },
      ],
    },
  },

  /**
   * =====================================================
   * LIVE ADAPTATION TOAST
   * =====================================================
   */
  overlays: {
    live_adaptation_toast: {
      type: "Toast",
      auto_dismiss_ms: 4000,
      fade_in_ms: 300,
      positions: ["top", "bottom"],
      tones: ["gentle", "firm"],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    reactive_updates: {
      full_screen_rerender: false,
      update_targets: ["identity_state", "practice_cards", "challenge"],
    },

    identity_state_engine: {
      source: "backend_signal",
      allow_manual_override: false,
      pulse_on_change: true,
    },

    practice_completion_updates: {
      update_card_status: true,
      update_identity_state_if_needed: true,
      trigger_soft_haptic: true,
    },

    adaptation_handling: {
      show_toast_when_present: true,
      never_block_ui: true,
    },

    multi_device_sync: {
      if_cycle_paused_elsewhere: "redirect_cycle_transitions",
      if_cycle_completed_elsewhere: "redirect_reflection",
    },
  },
};

/**
 * =====================================================
 * CONTAINER 8 — PRACTICE RUNNER
 * Execution Chamber
 * =====================================================
 *
 * Covers States:
 * 21 — Mantra Practice
 * 22 — Rep Counter Feedback
 * 23 — Mantra Completion
 * 24 — Sankalp Embodiment
 * 25 — Sankalp Activation Confirmation
 * 26 — Anchor Timer
 * 27 — Anchor Completion
 */

export const PracticeRunnerContainerSeed = {
  container_id: "practice_runner",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    immersive_execution: true,

    layout: {
      type: "full_screen_practice",
      background_color: "#0B1220",
      center_focus: true,
    },

    animation: {
      enter: "fade_in_200ms",
      allow_motion: [
        "soft_scale_feedback",
        "counter_increment",
        "completion_glow",
      ],
      disallow_motion: [
        "confetti",
        "badges",
        "loud_transitions",
        "gamified_effects",
      ],
    },

    navigation_rules: {
      disable_bottom_nav: true,
      exit_control: "top_left_subtle",
      block_dashboard_overlay: true,
    },

    analytics: {
      events: {
        practice_started: "practice_started",
        practice_completed: "practice_completed",
        practice_abandoned: "practice_abandoned",
      },
    },

    routing: {
      return_target: "companion_dashboard",
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_structure_override: false,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["active"],
    block_if_status: [
      "none",
      "draft",
      "paused",
      "transition",
      "recovery",
      "completed",
      "syncing",
    ],
  },

  /**
   * =====================================================
   * VARIANTS
   * =====================================================
   */
  states: {
    mantra_runner: {
      tone: "focused",
      blocks: [
        { type: "micro_label", content: "MANTRA PRACTICE" },
        { type: "mantra_display", content: "{{mantra_text}}" },
        {
          type: "rep_counter",
          id: "mantra_reps",
          target: "{{reps_total}}",
          on_complete: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },

    mantra_rep_feedback: {
      tone: "stabilizing",
      blocks: [
        { type: "micro_label", content: "REP FEEDBACK" },
        { type: "headline", content: "{{reps_total}} repetitions." },
        { type: "subtext", content: "Each rep anchors your intention deeper." },
        { type: "rep_counter", id: "mantra_reps_live", target: "{{reps_total}}" },
        {
          type: "primary_button",
          label: "Complete",
          action: { type: "navigate", target: { container_id: "practice_runner", state_id: "mantra_completion" } },
        },
      ],
    },
    mantra_completion: {
      tone: "sacred",
      blocks: [
        { type: "micro_label", content: "MANTRA COMPLETE" },
        { type: "headline", content: "Practice sealed." },
        { type: "subtext", content: "{{reps_total}} repetitions completed." },
        {
          type: "primary_button",
          label: "Return to Dashboard",
          action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } },
        },
      ],
    },
    sankalp_embody: {
      tone: "resonant",
      blocks: [
        { type: "micro_label", content: "SANKALP EMBODIMENT" },
        { type: "headline", content: "{{sankalp_text}}" },
        { type: "subtext", content: "Read slowly. Internalize. Commit." },
        {
          type: "primary_button",
          label: "I Embody This →",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
          style: "gold",
        },
      ],
    },

    sankalp_activation_confirm: {
      tone: "sacred",
      blocks: [
        { type: "micro_label", content: "SANKALP ACTIVATED" },
        { type: "headline", content: "Your intention is alive." },
        { type: "subtext", content: "Carry this through your day." },
        {
          type: "primary_button",
          label: "Return to Dashboard",
          action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } },
        },
      ],
    },
    anchor_timer: {
      tone: "stabilizing",
      blocks: [
        { type: "micro_label", content: "ANCHOR DURATION" },
        {
          type: "timer_display",
          id: "anchor_timer",
          duration: "{{anchor_minutes}}",
        },
        { type: "timer_controls", target_id: "anchor_timer" },
        {
          type: "primary_button",
          label: "Complete Practice",
          visible_when: "anchor_timer_finished",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    anchor_completion: {
      tone: "sacred",
      blocks: [
        { type: "micro_label", content: "ANCHOR COMPLETE" },
        { type: "headline", content: "Stillness recorded." },
        { type: "subtext", content: "{{anchor_minutes}} minutes anchored." },
        {
          type: "primary_button",
          label: "Return to Dashboard",
          action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } },
        },
      ],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    mantra_rules: {
      increment_limit_strict: true,
      ignore_rapid_double_taps_ms: 250,
      auto_complete_when_reached: true,
    },

    sankalp_rules: {
      require_manual_activation: true,
      no_auto_complete: true,
    },

    anchor_rules: {
      timer_persists_on_background: true,
      resume_from_timestamp: true,
      prevent_screen_sleep: true,
    },

    completion_flow: {
      do_not_auto_exit: true,
      require_user_return_tap: true,
      dashboard_live_update: true,
    },

    interruption_handling: {
      preserve_progress_on_app_pause: true,
      mark_abandoned_if_exit_before_completion: true,
    },

    multi_device_sync: {
      if_practice_completed_elsewhere: "show_completion_state",
    },
  },
};

/**
 * =====================================================
 * CONTAINER 9 — EMBODIMENT CHALLENGE RUNNER
 * Real-World Behavioral Execution
 * =====================================================
 *
 * Covers States:
 * 28 — Daily Embodiment Challenge Card
 * 29 — Outcome Toggle
 */

export const EmbodimentChallengeRunnerContainerSeed = {
  container_id: "embodiment_challenge_runner",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    embodiment_surface: true,

    layout: {
      type: "centered_single_card",
      max_width: 520,
      warm_center_radial: "#111827",
      base_background: "#0B1220",
    },

    animation: {
      enter: "fade_in_200ms",
      allow_motion: ["soft_toggle_highlight", "reflection_fade_in"],
      disallow_motion: [
        "emoji_reactions",
        "reward_effects",
        "celebratory_states",
        "gamified_feedback",
      ],
    },

    analytics: {
      events: {
        embodiment_viewed: "embodiment_viewed",
        embodiment_completed: "embodiment_completed",
        embodiment_avoided: "embodiment_avoided",
        embodiment_not_tested: "embodiment_not_tested",
      },
    },

    routing: {
      return_target: "companion_dashboard",
      require_active_cycle: true,
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_challenge_injection: true,
      allow_ai_tone_shift: false,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["active"],
    single_instance_per_day: true,
    block_if_status: [
      "none",
      "draft",
      "paused",
      "transition",
      "recovery",
      "completed",
      "syncing",
    ],
  },

  /**
   * =====================================================
   * STATE CONFIGURATION
   * =====================================================
   */
  states: {
    challenge_view: {
      blocks: [
        { type: "micro_label", content: "DHARMA IN ACTION" },
        { type: "headline", content: "Today’s Embodiment" },
        { type: "subtext", content: "Behavior over intention." },
        { type: "challenge_text", content: "{{challenge_text}}" },
        {
          type: "primary_button",
          label: "Mark Complete →",
          action: {
            type: "submit",
            payload: { practiceId: "practice_act", completed: true },
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    embodiment_outcome_toggle: {
      tone: "reflective",
      blocks: [
        { type: "micro_label", content: "OUTCOME" },
        { type: "headline", content: "How did the challenge go?" },
        {
          type: "choice_card",
          id: "embodiment_outcome",
          selection_mode: "auto",
          options: [
            { id: "completed", title: "Completed", description: "Fully embodied", action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } } },
            { id: "avoided", title: "Avoided", description: "Chose not to engage", action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } } },
            { id: "not_tested", title: "Not Tested", description: "Situation didn't arise", action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } } },
          ],
        },
      ],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    persistence: {
      save_to: "cycle_day_log.embodiment",
      autosave: true,
      silent: true,
    },

    outcome_rules: {
      allow_single_selection_only: true,
      require_selection_before_exit: true,
    },

    dashboard_sync: {
      update_challenge_status: true,
      influence_identity_state: true,
    },

    identity_impact_model: {
      completed: {
        effect: "stability_reinforced",
      },
      avoided: {
        effect: "reactive_probability_increase",
      },
      not_tested: {
        effect: "neutral",
      },
    },

    evening_nudge: {
      if_no_interaction_by: "evening_threshold",
      send_dashboard_reminder: true,
    },

    interruption_handling: {
      preserve_selection_on_background: true,
      restore_reflection_input: true,
    },

    multi_device_sync: {
      if_outcome_logged_elsewhere: "lock_selection_and_show_state",
    },
  },
};

/**
 * =====================================================
 * CONTAINER 10 — AWARENESS & TRIGGER
 * Real-Time Stabilization System
 * =====================================================
 *
 * Covers States:
 * 32–39 — Awareness & Trigger Flow
 * 63 — Evening Close Identity Signal
 * 69 — Evening Quick Close Variant
 */

export const AwarenessTriggerContainerSeed = {
  container_id: "awareness_trigger",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    stabilization_surface: true,

    layout: {
      full_screen_background: "#0B1220",
      radial_desaturation_opacity: 0.07,
      single_column_stack: true,
    },

    animation: {
      enter: "fade_in_200ms",
      step_transition: "soft_fade",
      allow_motion: ["text_fade", "tap_counter_increment"],
      disallow_motion: [
        "celebratory_feedback",
        "motivational_animation",
        "therapy_visuals",
      ],
    },

    analytics: {
      events: {
        trigger_initiated: "trigger_initiated",
        trigger_completed: "trigger_completed",
        emotion_selected: "emotion_selected",
        dharmic_response_selected: "dharmic_response_selected",
        evening_quick_close_selected: "evening_quick_close_selected",
      },
    },

    routing: {
      return_target: "companion_dashboard",
      interrupt_dashboard: true,
      allow_exit_mid_flow: true,
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_flow_override: false,
      allow_ai_option_injection: true,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["active"],
    accessible_anytime: true,
  },

  /**
   * =====================================================
   * ENTRY MODES
   * =====================================================
   */
  states: {
    checkin_step_1: {
      tone: "reflective",
      blocks: [
        { type: "micro_label", content: "STEP 1/3 — AWARENESS" },
        { type: "headline", content: "What are you experiencing?" },
        {
          type: "choice_grid",
          id: "state_matrix",
          options: [
            { id: "steady", label: "Steady", icon: "feather" },
            { id: "reactive", label: "Reactive", icon: "bolt" },
            { id: "drifting", label: "Drifting", icon: "wind" },
            { id: "distracted", label: "Distracted", icon: "cloud" },
          ],
        },
        {
          type: "primary_button",
          label: "Next Step",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "checkin_step_2",
            },
          },
        },
      ],
    },
    checkin_step_2: {
      tone: "equanimous",
      blocks: [
        { type: "micro_label", content: "STEP 2/3 — DHARMA" },
        { type: "headline", content: "How will you respond?" },
        {
          type: "choice_card",
          id: "dharmic_choice",
          options: [
            {
              id: "observe",
              title: "Observe only",
              description: "Notice the sensation without reacting.",
            },
            {
              id: "anchor",
              title: "Anchor breath",
              description: "Stabilize with 3 conscious breaths.",
            },
          ],
        },
        {
          type: "primary_button",
          label: "Apply Choice",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "checkin_result",
            },
          },
        },
      ],
    },
    checkin_result: {
      tone: "supportive",
      blocks: [
        { type: "headline", content: "Stability Reinforced." },
        { type: "subtext", content: "Conscious choice builds identity." },
        {
          type: "primary_button",
          label: "Return to Dashboard",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    midday_awareness_prompt: {
      tone: "reflective",
      blocks: [
        {
          type: "micro_label",
          content: "MIDDAY CHECK-IN",
          position: "header",
        },
        {
          type: "headline",
          content: "How is your rhythm?",
          position: "header",
        },
        {
          type: "subtext",
          content: "A brief pause to recalibrate.",
          position: "header",
        },
        {
          type: "choice_card",
          id: "midday_check",
          selection_mode: "auto",
          options: [
            {
              id: "steady",
              title: "Steady",
              description: "On track",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
            {
              id: "drifting",
              title: "Drifting",
              description: "Losing focus",
              action: {
                type: "navigate",
                target: {
                  container_id: "awareness_trigger",
                  state_id: "awareness_response_matrix",
                },
              },
            },
            {
              id: "reactive",
              title: "Reactive",
              description: "Triggered",
              action: {
                type: "navigate",
                target: {
                  container_id: "awareness_trigger",
                  state_id: "breath_reset",
                },
              },
            },
          ],
        },
      ],
    },
    awareness_response_matrix: {
      tone: "equanimous",
      blocks: [
        {
          type: "micro_label",
          content: "AWARENESS MATRIX",
          position: "header",
        },
        {
          type: "headline",
          content: "What are you experiencing?",
          position: "header",
        },
        {
          type: "choice_grid",
          id: "awareness_matrix",
          options: [
            { id: "irritation", label: "Irritation", icon: "flame" },
            { id: "anxiety", label: "Anxiety", icon: "wave" },
            { id: "urgency", label: "Urgency", icon: "bolt" },
            { id: "fatigue", label: "Fatigue", icon: "moon" },
            { id: "avoidance", label: "Avoidance", icon: "cloud" },
            { id: "other", label: "Other", icon: "circle" },
          ],
        },
        {
          type: "primary_button",
          label: "Acknowledge & Reset",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "breath_reset",
            },
          },
        },
      ],
    },
    breath_reset: {
      tone: "stabilizing",
      blocks: [
        { type: "headline", content: "Three Breaths." },
        { type: "breath_animation", cycles: 3 },
        {
          type: "primary_button",
          label: "I am Centered",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "quick_mantra_loop",
            },
          },
        },
      ],
    },
    quick_mantra_loop: {
      tone: "stabilizing",
      blocks: [
        { type: "micro_label", content: "QUICK MANTRA" },
        { type: "headline", content: "Repeat 9 times." },
        { type: "subtext", content: "Tap to count each repetition." },
        {
          type: "mantra_display",
          id: "mantra_text_display",
          data_key: "mantra_text",
        },
        { type: "rep_counter", id: "sos_rep_counter", total: 9 },
        {
          type: "primary_button",
          label: "Continue",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "trigger_reflection",
            },
          },
        },
      ],
    },
    trigger_reflection: {
      tone: "reflective",
      blocks: [
        { type: "micro_label", content: "REFLECTION" },
        { type: "headline", content: "What triggered this?" },
        { type: "subtext", content: "One line. Optional." },
        {
          type: "text_input",
          id: "trigger_note",
          placeholder: "What happened...",
          max_length: 120,
          required: false,
        },
        {
          type: "primary_button",
          label: "Next",
          action: {
            type: "navigate",
            target: {
              container_id: "awareness_trigger",
              state_id: "dharmic_response",
            },
          },
        },
      ],
    },
    dharmic_response: {
      tone: "equanimous",
      blocks: [
        { type: "micro_label", content: "DHARMIC RESPONSE" },
        { type: "headline", content: "How will you respond?" },
        { type: "subtext", content: "Select your conscious response." },
        {
          type: "choice_card",
          id: "dharmic_response_select",
          selection_mode: "auto",
          options: [
            {
              id: "patient",
              title: "Radical Patience",
              description: "Wait with zero internal friction.",
              action: {
                type: "navigate",
                target: {
                  container_id: "awareness_trigger",
                  state_id: "post_trigger_message",
                },
              },
            },
            {
              id: "disciplined",
              title: "Focused Action",
              description: "Execute without overthinking.",
              action: {
                type: "navigate",
                target: {
                  container_id: "awareness_trigger",
                  state_id: "post_trigger_message",
                },
              },
            },
            {
              id: "surrendered",
              title: "Graceful Yield",
              description: "Let go of control entirely.",
              action: {
                type: "navigate",
                target: {
                  container_id: "awareness_trigger",
                  state_id: "post_trigger_message",
                },
              },
            },
            {
              id: "compassionate",
              title: "Silent Empathy",
              description: "Feel without reacting.",
              action: {
                type: "navigate",
                target: {
                  container_id: "awareness_trigger",
                  state_id: "post_trigger_message",
                },
              },
            },
          ],
        },
      ],
    },
    post_trigger_message: {
      tone: "supportive",
      blocks: [
        { type: "headline", content: "Return steady." },
        {
          type: "subtext",
          content: "You interrupted reaction. Identity preserved.",
        },
        {
          type: "primary_button",
          label: "Return to Day",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    trigger_entry_persistent: {
      tone: "stabilizing",
      blocks: [
        { type: "micro_label", content: "TRIGGERED" },
        { type: "headline", content: "You tapped 'I Feel Triggered'." },
        { type: "subtext", content: "Let's interrupt the reaction." },
        {
          type: "primary_button",
          label: "Begin SOS Reset",
          action: { type: "navigate", target: { container_id: "awareness_trigger", state_id: "breath_reset" } },
        },
        {
          type: "primary_button",
          label: "Cancel",
          style_variant: "outline",
          action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } },
        },
      ],
    },
    evening_quick_close: {
      tone: "gentle",
      blocks: [
        { type: "headline", content: "Did you live your Sankalp today?" },
        {
          type: "subtext",
          content: "",
          id: "sankalp_preview",
          data_key: "sankalp_text",
        },
        {
          type: "choice_card",
          id: "evening_sankalp_check",
          selection_mode: "auto",
          options: [
            {
              id: "fully",
              title: "Fully",
              description: "Steady",
              action: {
                type: "set_and_navigate",
                key: "identity_state",
                value: "steady",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
            {
              id: "partially",
              title: "Partially",
              description: "Reactive",
              action: {
                type: "set_and_navigate",
                key: "identity_state",
                value: "reactive",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
            {
              id: "not_today",
              title: "Not Today",
              description: "Drifting",
              action: {
                type: "set_and_navigate",
                key: "identity_state",
                value: "drifting",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    emotional_drift_warning: {
      tone: "gentle",
      blocks: [
        { type: "micro_label", content: "DRIFT DETECTED", position: "header" },
        { type: "headline", content: "You seem to be drifting.", position: "header" },
        { type: "subtext", content: "A gentle nudge to recalibrate.", position: "header" },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            { id: "reset", title: "Quick Breath Reset", description: "3 breaths", action: { type: "navigate", target: { container_id: "awareness_trigger", state_id: "breath_reset" } } },
            { id: "acknowledge", title: "Acknowledged", description: "Continue as-is", action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } } },
          ],
        },
      ],
    },
    nervous_system_stabilization: {
      tone: "stabilizing",
      blocks: [
        { type: "micro_label", content: "STABILIZATION", position: "header" },
        { type: "headline", content: "Nervous system activation detected.", position: "header" },
        { type: "subtext", content: "Slow down. Ground yourself.", position: "header" },
        { type: "breath_animation", cycles: 5 },
        {
          type: "primary_button",
          label: "I Am Grounded",
          action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } },
        },
      ],
    },
  },
};

/**
 * =====================================================
 * CONTAINER 11 — INSIGHTS & PROGRESS
 * Pattern Reflection System
 * =====================================================
 *
 * Covers States:
 * 40–42 — Weekly Insight + Graph + Radar
 * 63–68 — Narrative + Completion + History
 * 70 — Weekly Voice Reflection Prompt
 * 71 — Legacy Timeline View
 */

export const InsightsProgressContainerSeed = {
  container_id: "insights_progress",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    reflection_surface: true,

    layout: {
      type: "single_column_reflection",
      max_width: 620,
      background_gradient: ["#0B1220", "#111827"],
    },

    animation: {
      enter: "fade_in_250ms",
      allow_motion: ["soft_fade"],
      disallow_motion: [
        "confetti",
        "gamified_charts",
        "celebration_animations",
      ],
    },

    analytics: {
      events: {
        insights_viewed: "insights_viewed",
        evening_reflection_selected: "evening_reflection_selected",
        voice_reflection_saved: "voice_reflection_saved",
        legacy_timeline_opened: "legacy_timeline_opened",
      },
    },

    routing: {
      deepen_target: "cycle_transitions",
      history_detail_target: "legacy_timeline_detail",
    },

    ai_rules: {
      allow_ai_narrative_only: true,
      allow_ai_layout_override: false,
      enforce_analytical_tone: true,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["active", "complete"],
  },

  /**
   * =====================================================
   * SECTIONS CONFIGURATION
   * =====================================================
   */
  states: {
    weekly_insights: {
      tone: "reflective",
      blocks: [
        { type: "micro_label", content: "PATTERN INSIGHTS" },
        { type: "headline", content: "You remained steady 62% of the time." },
        {
          type: "subtext",
          content: "Reactivity peaked on Tuesday afternoons.",
        },
        { type: "graph", id: "stability_trend", data_key: "reps_consistency" },
        {
          type: "identity_map",
          id: "trait_radar_insights",
          data_key: "identity_map_data",
        },
        {
          type: "insight_box",
          content:
            "You are most steady in the morning. Reactivity increases after 4 PM.",
          tone: "analytical",
        },
        {
          type: "primary_button",
          label: "Trigger Patterns",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "trigger_pattern_graph",
            },
          },
          style_variant: "outline",
        },
        {
          type: "primary_button",
          label: "Behavioral Insight",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "behavioral_summary",
            },
          },
          style_variant: "outline",
        },
        {
          type: "primary_button",
          label: "Voice Reflection",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "voice_reflection",
            },
          },
          style_variant: "outline",
        },
        {
          type: "primary_button",
          label: "Dashboard",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    milestone_7_day: {
      tone: "holy_gold",
      blocks: [
        { type: "micro_label", content: "7-DAY MILESTONE", position: "header" },
        { type: "headline", content: "Cycle Complete.", position: "header" },
        {
          type: "subtext",
          content: "You have completed Phase 1 of your transformation.",
          position: "header",
        },
        {
          type: "identity_map",
          id: "trait_radar_milestone",
          data_key: "identity_map_data",
        },
        {
          type: "primary_button",
          label: "Review Progress",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "weekly_insights",
            },
          },
        },
        {
          type: "primary_button",
          label: "Continue / Deepen",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "cycle_transitions",
              state_id: "continue_deepen",
            },
          },
        },
      ],
    },
    cycle_graduation: {
      tone: "sacred",
      blocks: [
        {
          type: "headline",
          content: "You are no longer the same person who began.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Cycle Graduation (Day 14)",
          position: "header",
        },
        {
          type: "image",
          url: "/graduation_emblem.png",
          position: "content",
          style: {
            maxWidth: "280px",
            margin: "0 auto 32px",
            border: "none",
            boxShadow: "0 0 50px rgba(201, 162, 39, 0.3)",
          },
        },
        {
          type: "identity_map",
          id: "grad_radar",
          data_key: "identity_map_data",
          position: "content",
        },
        {
          type: "summary_block",
          content:
            "You have maintained focus for 14 days, crossing the threshold of habit into integrated rhythm.",
          tone: "sacred",
          position: "content",
        },
        {
          type: "primary_button",
          label: "Enter Legacy Timeline",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "legacy_timeline",
            },
          },
        },
      ],
    },
    legacy_timeline: {
      tone: "analytical",
      blocks: [
        { type: "micro_label", content: "HISTORY", position: "header" },
        {
          type: "headline",
          content: "Your Evolution Archive.",
          position: "header",
        },
        { type: "timeline", id: "history_timeline", data_key: "cycle_history" },
        {
          type: "primary_button",
          label: "Back to Dashboard",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    identity_reflection_portal: {
      tone: "reflective",
      blocks: [
        { type: "micro_label", content: "IDENTITY REFLECTION", position: "header" },
        { type: "headline", content: "Who are you becoming?", position: "header" },
        { type: "subtext", content: "A moment to observe your trajectory.", position: "header" },
        { type: "identity_map", id: "reflection_radar", data_key: "identity_map_data" },
        {
          type: "summary_block",
          content: "Your Sankalp shapes your identity. Observe the shift.",
          tone: "sacred",
        },
        {
          type: "primary_button",
          label: "View Trait Radar",
          position: "footer",
          action: { type: "navigate", target: { container_id: "insights_progress", state_id: "trait_strength_radar" } },
        },
        {
          type: "primary_button",
          label: "Back to Dashboard",
          position: "footer",
          style_variant: "outline",
          action: { type: "navigate", target: { container_id: "companion_dashboard", state_id: "day_active" } },
        },
      ],
    },
    trait_strength_radar: {
      tone: "analytical",
      blocks: [
        { type: "micro_label", content: "TRAIT RADAR", position: "header" },
        { type: "headline", content: "Your Strength Profile.", position: "header" },
        { type: "subtext", content: "5 axes of character development.", position: "header" },
        { type: "identity_map", id: "full_trait_radar", data_key: "identity_map_data" },
        {
          type: "insight_box",
          content: "Stability and Awareness are your strongest axes. Follow-through has room for growth.",
          tone: "analytical",
        },
        {
          type: "primary_button",
          label: "Back to Insights",
          position: "footer",
          action: { type: "navigate", target: { container_id: "insights_progress", state_id: "weekly_insights" } },
        },
      ],
    },
    trigger_pattern_graph: {
      tone: "analytical",
      blocks: [
        {
          type: "micro_label",
          content: "TRIGGER PATTERNS",
          position: "header",
        },
        { type: "headline", content: "Your Trigger Map.", position: "header" },
        {
          type: "subtext",
          content: "Frequency and timing of reactive episodes.",
          position: "header",
        },
        {
          type: "graph",
          id: "trigger_frequency_graph",
          data_key: "trigger_patterns",
        },
        {
          type: "insight_box",
          content:
            "Most triggers occur between 2–5 PM. Consider an anchor session before meetings.",
          tone: "analytical",
        },
        {
          type: "primary_button",
          label: "Back to Insights",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "weekly_insights",
            },
          },
        },
      ],
    },
    behavioral_summary: {
      tone: "analytical",
      blocks: [
        {
          type: "micro_label",
          content: "BEHAVIORAL INSIGHT",
          position: "header",
        },
        {
          type: "headline",
          content: "Your Pattern Narrative.",
          position: "header",
        },
        {
          type: "summary_block",
          id: "behavioral_narrative",
          content:
            "You demonstrate strongest stability in mornings, with a consistent pattern of reactivity increasing post-lunch. Your mantra completion rate of 89% suggests strong discipline, but anchor sessions are frequently shortened. Consider prioritizing full anchor duration over additional mantra reps.",
          tone: "analytical",
        },
        {
          type: "identity_map",
          id: "narrative_radar",
          data_key: "identity_map_data",
        },
        {
          type: "primary_button",
          label: "Back to Insights",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "weekly_insights",
            },
          },
        },
      ],
    },
    voice_reflection: {
      tone: "reflective",
      blocks: [
        {
          type: "micro_label",
          content: "WEEKLY REFLECTION",
          position: "header",
        },
        {
          type: "headline",
          content: "One minute on this week.",
          position: "header",
        },
        {
          type: "subtext",
          content:
            "What felt different in your body when you lived your Sankalp?",
          position: "header",
        },
        { type: "voice_recorder", id: "weekly_voice", max_duration: 60 },
        {
          type: "primary_button",
          label: "Skip",
          style_variant: "outline",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "insights_progress",
              state_id: "weekly_insights",
            },
          },
        },
      ],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    data_source: "backend_aggregated",

    identity_state_updates: {
      evening_reflection_updates_identity: true,
    },

    voice_reflection_flow: {
      auto_stop_at_limit: true,
      allow_background_recording: false,
      require_user_consent: true,
    },

    legacy_unlocking: {
      auto_enable_after_cycles: 3,
    },

    performance_rules: {
      heavy_computation_client_side: false,
      graph_data_streamed: true,
    },

    multi_device_sync: {
      if_voice_saved_elsewhere: "update_behavioral_narrative_live",
    },
  },
};

/**
 * =====================================================
 * CONTAINER 12 — CYCLE TRANSITIONS
 * Adaptive Governance Engine
 * =====================================================
 *
 * Covers States:
 * 43–62 — Adaptive Intelligence + Structural Decisions
 */

export const CycleTransitionsContainerSeed = {
  container_id: "cycle_transitions",

  /**
   * =====================================================
   * STATIC META
   * =====================================================
   */
  meta: {
    theme: "dark_only",
    governance_surface: true,

    layout: {
      type: "single_decision_card",
      max_width: 520,
      background_gradient: ["#0B1220", "#111827"],
    },

    animation: {
      enter: "fade_in_200ms",
      allow_motion: ["soft_fade", "border_highlight"],
      disallow_motion: [
        "dramatic_animation",
        "warning_flash",
        "achievement_feedback",
      ],
    },

    analytics: {
      events: {
        transition_shown: "transition_shown",
        transition_action_selected: "transition_action_selected",
      },
    },

    routing: {
      block_dashboard_until_resolved: true,
      return_target: "companion_dashboard",
    },

    ai_rules: {
      allow_ai_copy_override: false,
      allow_ai_layout_override: false,
      allow_ai_trigger_only: true,
    },
  },

  /**
   * =====================================================
   * RENDER CONDITIONS
   * =====================================================
   */
  render_rules: {
    allowed_cycle_status: ["active", "paused", "transition", "complete"],
    frontend_does_not_trigger: true,
  },

  /**
   * =====================================================
   * TRANSITION STATES
   * =====================================================
   */
  states: {
    resistance: {
      blocks: [
        {
          type: "micro_label",
          content: "PATTERN DETECTED",
          position: "header",
        },
        {
          type: "headline",
          content: "Resistance is increasing.",
          position: "header",
        },
        {
          type: "subtext",
          content: "You skipped 3 consecutive anchors.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "simplify",
              title: "Simplify Today",
              description: "Stability Pivot",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "stability_pivot",
                },
              },
            },
            {
              id: "maintain",
              title: "Maintain Structure",
              description: "Keep pushing",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    resistance_reflection: {
      blocks: [
        {
          type: "micro_label",
          content: "REFLECTION",
          position: "header",
        },
        {
          type: "headline",
          content: "What caused this resistance?",
          position: "header",
        },
        {
          type: "subtext",
          content: "Optional. One line.",
          position: "header",
        },
        {
          type: "text_input",
          id: "resistance_note",
          placeholder: "What happened...",
          max_length: 120,
          required: false,
        },
        {
          type: "primary_button",
          label: "Continue",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "cycle_transitions",
              state_id: "stability_pivot",
            },
          },
        },
      ],
    },
    ego_check: {
      blocks: [
        {
          type: "micro_label",
          content: "STRUCTURAL AUDIT",
          position: "header",
        },
        {
          type: "headline",
          content: "Structure feels effortless.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Ensure you’re not over-extending.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "maintain",
              title: "Maintain Current Level",
              description: "Verify stability",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
            {
              id: "deepen",
              title: "Deepen Layer",
              description: "Challenge self",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "deepen_select",
                },
              },
            },
          ],
        },
      ],
    },
    refinement_suggestion: {
      blocks: [
        {
          type: "micro_label",
          content: "REFINEMENT",
          position: "header",
        },
        {
          type: "headline",
          content: "Consider refining your approach.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Small adjustments can deepen impact without adding complexity.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "refine",
              title: "Apply Refinement",
              description: "Adjust current layer",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "deepen_select",
                },
              },
            },
            {
              id: "maintain",
              title: "Keep Current",
              description: "No changes",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    escalation_suggestion: {
      blocks: [
        {
          type: "micro_label",
          content: "ESCALATION",
          position: "header",
        },
        {
          type: "headline",
          content: "You may be ready to escalate.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Sustained stability detected. Consider deepening structure.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "escalate",
              title: "Deepen Practice",
              description: "Advance layer",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "deepen_select",
                },
              },
            },
            {
              id: "maintain",
              title: "Maintain Current",
              description: "Stay at this level",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    plateau: {
      blocks: [
        {
          type: "micro_label",
          content: "STABILITY REACHED",
          position: "header",
        },
        {
          type: "headline",
          content: "Progress has stabilized.",
          position: "header",
        },
        {
          type: "subtext",
          content: "You may be ready to deepen.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "deepen",
              title: "Deepen Practice",
              description: "Advance layer",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "deepen_select",
                },
              },
            },
            {
              id: "continue",
              title: "Continue Current Cycle",
              description: "Refine current level",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    stability_pivot: {
      blocks: [
        { type: "micro_label", content: "ADAPTIVE PIVOT", position: "header" },
        {
          type: "headline",
          content: "Simplify to stabilize.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Reduce reps temporarily to preserve rhythm.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "reduce",
              title: "Reduce Structure",
              description: "Preserve rhythm",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            }, // Logic to scale down
            {
              id: "maintain",
              title: "Maintain",
              description: "Try again",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    inactivity: {
      blocks: [
        { type: "micro_label", content: "CYCLE SUSPENDED", position: "header" },
        { type: "headline", content: "Structure paused.", position: "header" },
        {
          type: "subtext",
          content: "You have been inactive for 4 days.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "resume",
              title: "Resume",
              description: "Continue same day count",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
            {
              id: "restart",
              title: "Restart",
              description: "Reset day counter",
              action: {
                type: "navigate",
                target: { container_id: "portal", state_id: "welcome_portal" },
              },
            },
            {
              id: "recalibrate",
              title: "Recalibrate",
              description: "Adjust structure",
              action: {
                type: "navigate",
                target: {
                  container_id: "choice_stack",
                  state_id: "mode_toggle",
                },
              },
            },
          ],
        },
      ],
    },
    pause: {
      blocks: [
        {
          type: "micro_label",
          content: "INTENTIONAL SUSPENSION",
          position: "header",
        },
        { type: "headline", content: "Pause Cycle?", position: "header" },
        {
          type: "subtext",
          content: "Structure will suspend without reset.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "pause",
              title: "Pause",
              description: "Suspend structure",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "re_entry_warm_start",
                },
              },
            },
            {
              id: "cancel",
              title: "Cancel",
              description: "Return to dashboard",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    exit: {
      blocks: [
        { type: "micro_label", content: "CLOSURE", position: "header" },
        { type: "headline", content: "Exit Cycle?", position: "header" },
        {
          type: "subtext",
          content: "This will close your active structure.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "exit",
              title: "Exit",
              description: "End current cycle",
              action: {
                type: "navigate",
                target: { container_id: "portal", state_id: "welcome_portal" },
              },
            },
            {
              id: "continue",
              title: "Continue",
              description: "Stay in flow",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    continue_deepen: {
      blocks: [
        {
          type: "micro_label",
          content: "MILESTONE REACHED",
          position: "header",
        },
        { type: "headline", content: "7 Days Complete.", position: "header" },
        { type: "subtext", content: "Extend or deepen?", position: "header" },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "extend",
              title: "Continue to Day 14",
              description: "Extend Cycle",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "continue_confirmed",
                },
              },
            },
            {
              id: "deepen",
              title: "Deepen Layer",
              description: "Select new layer",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "deepen_select",
                },
              },
            },
          ],
        },
      ],
    },
    continue_confirmed: {
      tone: "holy_gold",
      blocks: [
        { type: "micro_label", content: "CYCLE EXTENDED", position: "header" },
        {
          type: "headline",
          content: "Momentum Sustained.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Your commitment is locked until Day 14.",
          position: "header",
        },
        {
          type: "primary_button",
          label: "Enter Day 8",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "cycle_transitions",
              state_id: "extension_activation",
            },
          },
        },
      ],
    },
    deepen_select: {
      blocks: [
        { type: "micro_label", content: "EVOLUTION", position: "header" },
        {
          type: "headline",
          content: "Select deeper layer.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Choose your next structural anchor.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "reps",
              title: "Increase mantra reps",
              description: "Deepen repetition",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "deepen_confirmed",
                },
              },
            },
            {
              id: "duration",
              title: "Increase anchor duration",
              description: "Deepen stillness",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "deepen_confirmed",
                },
              },
            },
            {
              id: "refinement",
              title: "Add refinement layer",
              description: "Add observation",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "deepen_confirmed",
                },
              },
            },
          ],
        },
      ],
    },
    deepen_confirmed: {
      tone: "holy_gold",
      blocks: [
        {
          type: "micro_label",
          content: "STRUCTURAL SHIFT",
          position: "header",
        },
        { type: "headline", content: "Evolution Locked.", position: "header" },
        {
          type: "subtext",
          content:
            "Deepening layer integrated. Your updated structure begins with the next ritual.",
          position: "header",
        },
        {
          type: "primary_button",
          label: "Dashboard",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    switch_focus: {
      blocks: [
        { type: "micro_label", content: "GOVERNANCE", position: "header" },
        {
          type: "headline",
          content: "Switching focus resets momentum.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Proceed intentionally.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "confirm",
              title: "Confirm Switch",
              description: "Reset cycle",
              action: {
                type: "navigate",
                target: {
                  container_id: "cycle_transitions",
                  state_id: "new_focus_confirm",
                },
              },
            },
            {
              id: "cancel",
              title: "Cancel",
              description: "Keep current focus",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
          ],
        },
      ],
    },
    integrity_guardrail: {
      blocks: [
        { type: "micro_label", content: "INTEGRITY CHECK", position: "header" },
        {
          type: "headline",
          content: "Integration is incomplete.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Consider reflection before restarting.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "continue",
              title: "Continue Anyway",
              description: "Proceed",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
            {
              id: "review",
              title: "Review Insights",
              description: "Reflect first",
              action: {
                type: "navigate",
                target: {
                  container_id: "insights_progress",
                  state_id: "weekly_insights",
                },
              },
            },
          ],
        },
      ],
    },
    extension_activation: {
      tone: "holy_gold",
      blocks: [
        {
          type: "micro_label",
          content: "EXTENSION ACTIVE",
          position: "header",
        },
        {
          type: "headline",
          content: "Extension Activated.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Your structure continues with renewed intention.",
          position: "header",
        },
        {
          type: "primary_button",
          label: "Begin Day 8",
          position: "footer",
          action: {
            type: "navigate",
            target: {
              container_id: "companion_dashboard",
              state_id: "day_active",
            },
          },
        },
      ],
    },
    new_focus_confirm: {
      tone: "holy_gold",
      blocks: [
        { type: "micro_label", content: "NEW FOCUS", position: "header" },
        {
          type: "headline",
          content: "New focus confirmed.",
          position: "header",
        },
        {
          type: "subtext",
          content: "Previous cycle archived. Begin fresh.",
          position: "header",
        },
        {
          type: "primary_button",
          label: "Begin New Cycle",
          position: "footer",
          action: {
            type: "navigate",
            target: { container_id: "portal", state_id: "welcome_portal" },
          },
        },
      ],
    },
    re_entry_warm_start: {
      blocks: [
        { type: "micro_label", content: "WELCOME BACK", position: "header" },
        { type: "headline", content: "Welcome back.", position: "header" },
        {
          type: "subtext",
          content: "Your cycle was paused. Choose how to continue.",
          position: "header",
        },
        {
          type: "choice_card",
          selection_mode: "auto",
          options: [
            {
              id: "resume",
              title: "Resume",
              description: "Continue same day count",
              action: {
                type: "navigate",
                target: {
                  container_id: "companion_dashboard",
                  state_id: "day_active",
                },
              },
            },
            {
              id: "restart",
              title: "Restart",
              description: "Reset day counter",
              action: {
                type: "navigate",
                target: { container_id: "portal", state_id: "welcome_portal" },
              },
            },
            {
              id: "recalibrate",
              title: "Recalibrate",
              description: "Adjust structure",
              action: {
                type: "navigate",
                target: {
                  container_id: "routine_builder",
                  state_id: "routine_builder_setup",
                },
              },
            },
          ],
        },
      ],
    },
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    backend_first: true,

    lifecycle_rules: {
      resume_retains_cycle_id: true,
      restart_creates_new_cycle_id: true,
      deepen_mutates_structure: true,
      extend_updates_total_days: true,
    },

    persistence: {
      update_backend_before_exit: true,
    },

    integrity_protection: {
      allow_only_one_transition: true,
      require_resolution_before_dashboard: true,
    },

    multi_device_sync: {
      if_transition_resolved_elsewhere: "close_and_refresh_dashboard",
    },
  },
};
// Adding the missing ContainerRegistry to the seed file
export const ContainerRegistry = {
  portal: PortalContainerSeed,
  choice_stack: ChoiceStackContainerSeed,
  composer: ComposerContainerSeed,
  lock_ritual_overlay: LockRitualOverlaySeed,
  routine_builder: RoutineBuilderContainerSeed,
  routine_locked: RoutineLockedContainerSeed,
  companion_dashboard: CompanionDashboardContainerSeed,
  practice_runner: PracticeRunnerContainerSeed,
  embodiment_challenge_runner: EmbodimentChallengeRunnerContainerSeed,
  awareness_trigger: AwarenessTriggerContainerSeed,
  insights_progress: InsightsProgressContainerSeed,
  cycle_transitions: CycleTransitionsContainerSeed,
};
