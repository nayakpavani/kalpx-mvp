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
     * WELCOME PORTAL
     * -------------------------------------------------
     * Used when:
     * - first install
     * - manual reset
     */
    welcome_portal: {
      tone: "calm",

      copy_context: {
        reason: ["first_open", "manual_reset"],
      },

      blocks: {
        header_label: {
          text: "IDENTITY PRACTICE",
          typography: {
            font: "Inter",
            size: 13,
            letter_spacing: 1.5,
            opacity: 0.6,
          },
        },

        headline: {
          text: "Enter the Cycle.",
          typography: {
            font: "CormorantGaramond",
            size: 38,
            weight: 500,
            color: "#F3F4F6",
          },
        },

        subtext: {
          text: "Choose a discipline.\nCommit to a structured shift.",
          typography: {
            font: "Inter",
            size: 16,
            opacity: 0.7,
            line_height: 1.5,
          },
        },

        primary_cta: {
          label: "Begin",
          action: "ROUTE_MODE_TOGGLE",
          style: {
            background: "#1F2937",
            radius: 14,
            text_color: "#FFFFFF",
          },
        },

        secondary_cta: {
          label: "Learn how this works",
          action: "OPEN_LEARN_SHEET",
          type: "micro_link",
        },
      },
    },

    /**
     * -------------------------------------------------
     * VOID STATE
     * -------------------------------------------------
     * Used when:
     * - cycle completed
     * - exited intentionally
     * - archived
     */
    void_state: {
      tone: "neutral",

      /**
       * Backend should pass reason for emotional tuning.
       * Frontend layout DOES NOT change.
       */
      copy_context: {
        reason: ["cycle_completed", "user_exited", "long_inactive"],
      },

      blocks: {
        header_label: {
          text: "IDENTITY PRACTICE",
        },

        headline: {
          text: "You have no active cycle.",
        },

        subtext: {
          text: "Without structure,\nidentity drifts.",
        },

        primary_cta: {
          label: "Start a 7 or 14 Day Cycle",
          action: "ROUTE_MODE_TOGGLE",
          style: {
            background: "#1F2937",
            radius: 14,
            text_color: "#FFFFFF",
          },
        },

        secondary_cta: {
          label: "Learn how this works",
          action: "OPEN_LEARN_SHEET",
          type: "micro_link",
        },
      },
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
    /**
     * -------------------------------------------------
     * VARIANT — MODE TOGGLE
     * Auto-advance on selection
     * -------------------------------------------------
     */
    mode_toggle: {
      tone: "grounded",

      headline: "Choose your cycle length.",
      subtext: "Short focus or sustained shift.",

      selection_mode: "single_auto_advance",
      draft_key: "cycle_length",

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
          tag: "Recommended",
          recommended: true,
        },
      ],
    },

    /**
     * -------------------------------------------------
     * VARIANT — DISCIPLINE SELECT
     * Manual confirmation required
     * -------------------------------------------------
     */
    discipline_select: {
      tone: "grounded",

      headline: "Select your core discipline.",
      subtext: "Strength grows through repetition.",

      selection_mode: "single",
      draft_key: "discipline",

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

    /**
     * -------------------------------------------------
     * VARIANT — DOMAIN SELECT
     * Manual confirmation required
     * -------------------------------------------------
     */
    domain_select: {
      tone: "grounded",

      headline: "Choose your life domain.",
      subtext: "Where does this discipline apply?",

      selection_mode: "single",
      draft_key: "domain",

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

      next_container: "lock_ritual",
      next_variant: "hold_to_lock",

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
  state: {
    tone: "quiet_intentional",

    header_label: "DEFINE YOUR INTENTION",
    headline: "Write your Sankalp.",
    subtext: "Short. Clear. Behavioral.",

    draft_key: "sankalp",

    placeholder_examples: [
      "I respond without raising my voice.",
      "I complete what I begin.",
      "I pause before reacting.",
      "I act with financial awareness.",
    ],

    input_rules: {
      min_length: 12,
      recommended_length: 120,
      hard_cap: 180,
      show_counter: true,
    },

    validation_rules: {
      require_verb: true,
      disallow_generic: true,
      generic_patterns: ["be better", "improve", "grow", "be happy"],
    },

    guardrail_microcopy: "A Sankalp is behavioral. Not aspirational.",

    help_sheet: {
      title: "What makes a strong Sankalp?",
      examples: [
        "I pause before responding.",
        "I complete daily tasks before distraction.",
        "I speak clearly without avoidance.",
      ],
      anti_examples: ["I want to be better.", "I will become successful."],
    },

    ai_assist: {
      enabled: true,
      label: "Need suggestions?",
      action: "OPEN_AI_SANKALP_MODAL",
    },

    primary_cta: {
      label: "Continue",
      action: "ROUTE_LOCK_RITUAL",
      style: {
        background: "#1F2937",
        radius: 14,
      },
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
    /**
     * -------------------------------------------------
     * STATE 1 — HOLD TO LOCK
     * -------------------------------------------------
     */
    hold_to_lock: {
      tone: "serious_grounded",

      micro_label: "FINALIZE STRUCTURE",

      headline: "Hold to lock your cycle.",

      subtext_template: "Commit to this structure for {cycle_length} days.",

      hold_button: {
        label: "Hold",
        height: 56,
        radius: 28,
        background: "#1F2937",
        border: "#4B5563",
        progress_ring: true,
        glow_color: "#C9A227",
      },

      hold_rules: {
        duration_map: {
          7: 1800,
          14: 2400,
        },
        cancel_on_release: true,
        cancel_on_app_blur: true,
        cancel_on_navigation_attempt: true,
      },

      microcopy: "Structure builds identity.",
    },

    /**
     * -------------------------------------------------
     * STATE 2 — LOCK CONFIRMATION
     * -------------------------------------------------
     */
    lock_confirm_transition: {
      tone: "quiet_resolve",

      headline: "Cycle Locked.",

      subtext_variants: {
        immediate_start: "Day 1 begins now.",
        delayed_start: "Begin tomorrow with clarity.",
      },

      visual_accent: {
        gold_edge_color: "#C9A227",
        opacity: 0.3,
      },

      primary_cta: {
        label: "Enter Day 1",
        action: "ROUTE_DASHBOARD",
        background: "#1F2937",
        radius: 14,
      },
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
  state: {
    tone: "precise_grounded",

    header_label: "BUILD YOUR ROUTINE",
    headline: "Define your daily structure.",
    subtext: "Small repetitions. Compounded identity.",

    blocks: {
      mantra_frequency: {
        draft_key: "mantra_reps",

        title: "Mantra Repetitions",
        subtext: "Daily repetition count.",

        picker: {
          type: "bottom_sheet_picker",
          options: [9, 18, 27, 54],
          unit: "repetitions",
          default_map: {
            7: 9,
            14: 18,
          },
        },
      },

      anchor_duration: {
        draft_key: "anchor_minutes",

        title: "Anchor Duration",
        subtext: "Daily stabilization time.",

        picker: {
          type: "bottom_sheet_picker",
          options: [3, 5, 8, 12],
          unit: "minutes",
          default_value: 5,
        },
      },

      routine_review: {
        visible_when: "mantra_reps && anchor_minutes && sankalp",

        title: "Routine Summary",
        editable_action: "SCROLL_TO_TOP",

        highlight_background: "#273244",

        fields: [
          {
            label: "Mantra",
            source: "mantra_reps",
            suffix: "repetitions",
          },
          {
            label: "Anchor",
            source: "anchor_minutes",
            suffix: "minutes",
          },
          {
            label: "Sankalp",
            source: "sankalp",
          },
        ],
      },
    },

    primary_cta: {
      label: "Lock Structure",
      action: "OPEN_LOCK_RITUAL_OVERLAY",
      background: "#1F2937",
      radius: 14,
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
  state: {
    tone: "stable_formal",

    header_label: "ACTIVE STRUCTURE",
    headline: "Your cycle is locked.",
    subtext: "Consistency creates identity.",

    structure_sections: [
      {
        key: "sankalp",
        label: "SANKALP",
        source: "activeCycle.sankalp",
        type: "text_block",
      },
      {
        key: "mantra_reps",
        label: "MANTRA REPETITIONS",
        source: "activeCycle.mantra_reps",
        suffix: "repetitions",
      },
      {
        key: "anchor_duration",
        label: "ANCHOR DURATION",
        source: "activeCycle.anchor_minutes",
        suffix: "minutes daily",
      },
    ],

    adjust_entry: {
      label: "Adjust with intention",
      style: "subtle_text_button",
      action: "OPEN_ADJUST_CONFIRM_MODAL",
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
          action: "ROUTE_TO_ROUTINE_BUILDER",
          style: "primary_dark",
        },
        {
          label: "Cancel",
          action: "CLOSE_MODAL",
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
  state: {
    identity_header: {
      label_template: "DAY {day_number} OF {total_days}",

      headline_map: {
        steady: "You are steady.",
        reactive: "You are slightly reactive.",
        drifting: "Your structure is weakening.",
      },

      subtext_map: {
        steady: "Maintain rhythm.",
        reactive: "Pause before acceleration.",
        drifting: "Re-enter with simplicity.",
      },

      identity_bar: {
        positions: ["drifting", "reactive", "steady"],
        colors: {
          drifting: "#B45309",
          reactive: "#C2410C",
          steady: "#065F46",
        },
        muted: true,
      },
    },

    practice_cards: {
      dynamic_ordering: true,
      reorder_incomplete_first: true,

      cards: [
        {
          key: "mantra",
          title: "Mantra Practice",
          subtext_template: "{reps_remaining} repetitions remaining.",
          completed_text: "Completed today.",
        },
        {
          key: "sankalp",
          title: "Sankalp Embodiment",
          subtext: "Live your intention.",
          completed_text: "Activated today.",
        },
        {
          key: "anchor",
          title: "Anchor Stability",
          subtext_template: "{duration} minutes.",
          completed_text: "Completed.",
        },
      ],
    },

    embodiment_challenge: {
      title: "Dharma in Action",
      background: "#273244",
    },

    trigger_entry: {
      label: "I feel triggered",
      style: "floating_pill_button",
      opacity: 0.8,
      persistent: true,
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
    /**
     * -------------------------------------------------
     * VARIANT — MANTRA RUNNER
     * -------------------------------------------------
     */
    mantra_runner: {
      type: "tap_counter_execution",

      center_display: {
        show_mantra_text: true,
        counter_style: "large_fraction",
      },

      interaction: {
        tap_zone: "full_center_area",
        haptic_on_increment: true,
        prevent_double_tap_overflow: true,
      },

      completion: {
        headline: "Mantra complete.",
        subtext: "Stability reinforced.",
        cta_label: "Return to Day",
      },
    },

    /**
     * -------------------------------------------------
     * VARIANT — SANKALP EMBODY
     * -------------------------------------------------
     */
    sankalp_embody: {
      type: "activation_mode",

      center_display: {
        show_sankalp_text: true,
        instruction: "Read slowly. Internalize. Commit.",
      },

      action_button: {
        label: "Activate",
        confirm_state: true,
      },

      completion: {
        headline: "Embodiment set.",
        subtext: "Live this today.",
        cta_label: "Return to Day",
      },
    },

    /**
     * -------------------------------------------------
     * VARIANT — ANCHOR TIMER
     * -------------------------------------------------
     */
    anchor_timer: {
      type: "countdown_timer",

      timer_display: {
        format: "MM:SS",
        monospace: true,
        large_centered: true,
      },

      controls: {
        start: true,
        pause: true,
        resume: true,
        minimal_icons: true,
      },

      completion: {
        headline: "Anchor complete.",
        subtext: "Nervous system stabilized.",
        cta_label: "Return to Day",
      },
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
  state: {
    header_label: "DHARMA IN ACTION",
    headline: "Today’s Embodiment",
    subtext: "Behavior over intention.",

    challenge_card: {
      text_style: {
        font: "serif",
        size_range: [22, 26],
        line_height: 1.6,
        centered: true,
      },

      background: "#1F2937",
      border: "#374151",
      radius: 20,
      padding: 28,
    },

    outcome_section: {
      question: "Did this occur today?",

      options: [
        {
          id: "completed",
          label: "Completed",
        },
        {
          id: "avoided",
          label: "Avoided",
        },
        {
          id: "not_tested",
          label: "Not Tested",
        },
      ],

      button_style: {
        background: "#111827",
        border: "#374151",
        radius: 14,
      },
    },

    reflection_input: {
      visible_when: "outcome === avoided",
      placeholder: "What interrupted you?",
      optional: true,
      single_line: true,
    },

    completion_microcopy: {
      visible_when: "outcome === completed",
      text: "Behavior reinforced.",
      opacity: 0.7,
    },

    primary_cta: {
      label: "Return to Day",
      action: "ROUTE_DASHBOARD",
      require_outcome_selection: true,
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
  modes: {
    midday_checkin: {
      tone: "reflective",
      full_screen: true,
      include_breath_reset: false,
    },

    trigger_sos: {
      tone: "stabilizing",
      full_screen: true,
      include_breath_reset: true,
    },

    evening_quick_close: {
      tone: "gentle_closure",
      presentation: "bottom_sheet",
      auto_trigger_window: "21:00-23:00",
      non_blocking: true,
    },
  },

  /**
   * =====================================================
   * STEP FLOW
   * =====================================================
   */
  flow: [
    {
      id: "state_acknowledgment",
      type: "single_select",
      question: "What are you experiencing?",
      options: [
        "Irritation",
        "Anxiety",
        "Urgency",
        "Fatigue",
        "Avoidance",
        "Other",
      ],
      auto_advance: true,
    },

    {
      id: "breath_reset",
      type: "breath_cycle",
      cycles: 3,
      visible_when: "mode === trigger_sos",
      haptic_optional: true,
    },

    {
      id: "quick_mantra_loop",
      type: "tap_counter",
      reps_fixed: 9,
      auto_advance_on_complete: true,
    },

    {
      id: "trigger_reflection",
      type: "single_line_input",
      question: "What triggered this?",
      optional: true,
      visible_when: "allow_reflection === true",
    },

    {
      id: "dharmic_response",
      type: "single_select",
      question: "How will you respond?",
      dynamic_options: true,
    },

    {
      id: "reinforcement",
      type: "message_screen",
      messages: ["Return steady.", "You interrupted reaction."],
      cta_label: "Return to Day",
    },
  ],

  /**
   * =====================================================
   * EVENING QUICK CLOSE VARIANT
   * =====================================================
   */
  evening_variant: {
    headline: "Did you live your Sankalp today?",
    pill_options: [
      {
        id: "steady",
        label: "Fully ●",
      },
      {
        id: "reactive",
        label: "Partially ◐",
      },
      {
        id: "drifting",
        label: "Not today ○",
      },
    ],

    auto_save_on_select: true,
    close_on_selection: true,
    allow_optional_note: false,
  },

  /**
   * =====================================================
   * BEHAVIORAL LOGIC CONTRACT
   * =====================================================
   */
  logic: {
    duration_targets: {
      full_flow_max_seconds: 90,
      evening_flow_max_seconds: 15,
    },

    persistence: {
      save_to: "cycle_day_log.trigger_flow",
      autosave: true,
      silent: true,
    },

    identity_state_updates: {
      immediate_update: true,
      source: "backend_evaluation",
    },

    dashboard_sync: {
      update_identity_indicator: true,
      allow_live_toast: true,
    },

    interruption_handling: {
      log_partial_if_exit: true,
      resume_last_step_if_reopen: true,
    },

    evening_auto_trigger: {
      conditions: ["activeCycle === true", "!closedToday"],
    },

    multi_device_sync: {
      if_flow_completed_elsewhere: "show_reinforcement_state",
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
  sections: {
    /**
     * -------------------------------------------------
     * WEEKLY INSIGHT SNAPSHOT
     * -------------------------------------------------
     */
    weekly_snapshot: {
      headline_template: "You remained steady {steady_percent}% of the time.",
      subtext_template: "Reactivity peaked on {peak_period}.",
    },

    /**
     * -------------------------------------------------
     * STABILITY GRAPH
     * -------------------------------------------------
     */
    stability_graph: {
      type: "line_graph",
      colors: {
        drifting: "#B45309",
        reactive: "#C2410C",
        steady: "#065F46",
      },
      tooltip_enabled: true,
      animated: false,
    },

    /**
     * -------------------------------------------------
     * TRAIT RADAR
     * -------------------------------------------------
     */
    trait_radar: {
      axes: [
        "Stability",
        "Integrity",
        "Follow-through",
        "Regulation",
        "Awareness",
      ],
      show_numbers: false,
      thin_line_style: true,
    },

    /**
     * -------------------------------------------------
     * BEHAVIORAL INSIGHT NARRATIVE
     * -------------------------------------------------
     */
    behavioral_narrative: {
      max_lines: 5,
      tone: "analytical",
      source: "ai_generated",
    },

    /**
     * -------------------------------------------------
     * EVENING ACCOUNTABILITY
     * -------------------------------------------------
     */
    evening_accountability: {
      question: "Did you live your Sankalp?",
      options: ["yes", "partially", "no"],
      optional_note: true,
    },

    /**
     * -------------------------------------------------
     * STABILITY NOTE (ADAPTIVE)
     * -------------------------------------------------
     */
    stability_note: {
      trigger_condition: "high_trigger_frequency",
      message: "Consider reducing anchor intensity.",
      link_action: "ROUTE_CYCLE_TRANSITIONS",
    },

    /**
     * -------------------------------------------------
     * CYCLE COMPLETION PANEL
     * -------------------------------------------------
     */
    cycle_completion: {
      headline: "Cycle Complete.",
      gold_border_accent: true,
      actions: [
        {
          label: "Review Progress",
          action: "SCROLL_TO_TOP",
        },
        {
          label: "Continue / Deepen",
          action: "ROUTE_DEEPEN_FLOW",
        },
      ],
    },

    /**
     * -------------------------------------------------
     * CYCLE HISTORY ARCHIVE
     * -------------------------------------------------
     */
    history_archive: {
      expandable: true,
      card_style: "minimal_history",
    },

    /**
     * -------------------------------------------------
     * WEEKLY VOICE REFLECTION
     * -------------------------------------------------
     */
    weekly_voice_reflection: {
      trigger_window: ["Sunday 20:00", "Sunday 22:00"],
      max_duration_seconds: 60,
      presentation: "bottom_sheet",

      ui: {
        microphone_button: true,
        countdown_style: "monospace",
        subtle_gold_press: true,
        allow_skip: true,
      },

      transcription: {
        auto_transcribe: true,
        append_to_behavioral_narrative: true,
      },
    },

    /**
     * -------------------------------------------------
     * LEGACY TIMELINE (UNLOCKED AFTER 3 CYCLES)
     * -------------------------------------------------
     */
    legacy_timeline: {
      unlock_condition: "totalCompletedCycles >= 3",

      timeline_style: {
        vertical_line: true,
        muted_cards: true,
      },

      card_content: [
        "discipline",
        "sankalp",
        "radar_thumbnail",
        "completion_date",
      ],

      footer_message: "You are no longer the same person who began.",
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
      micro_label: "PATTERN DETECTED",
      headline: "Resistance is increasing.",
      subtext: "You skipped 3 consecutive anchors.",
      options: [
        {
          label: "Simplify Today",
          action: "STABILITY_PIVOT",
        },
        {
          label: "Maintain Structure",
          action: "MAINTAIN",
        },
      ],
    },

    ego_check: {
      headline: "Structure feels effortless.",
      subtext: "Ensure you’re not over-extending.",
      options: [
        {
          label: "Maintain Current Level",
          action: "MAINTAIN",
        },
        {
          label: "Deepen Layer",
          action: "ROUTE_DEEPEN_SELECT",
        },
      ],
    },

    plateau: {
      headline: "Progress has stabilized.",
      subtext: "You may be ready to deepen.",
      options: [
        {
          label: "Deepen Practice",
          action: "ROUTE_DEEPEN_SELECT",
        },
        {
          label: "Continue Current Cycle",
          action: "MAINTAIN",
        },
      ],
    },

    stability_pivot: {
      headline: "Simplify to stabilize.",
      subtext: "Reduce reps temporarily to preserve rhythm.",
      options: [
        {
          label: "Reduce Structure",
          action: "APPLY_REDUCTION",
        },
        {
          label: "Maintain",
          action: "MAINTAIN",
        },
      ],
    },

    inactivity: {
      headline: "Structure paused.",
      subtext: "You have been inactive for 4 days.",
      options: [
        {
          label: "Resume",
          action: "RESUME_CYCLE",
        },
        {
          label: "Restart",
          action: "RESTART_NEW_CYCLE",
        },
        {
          label: "Recalibrate",
          action: "ROUTE_ROUTINE_BUILDER",
        },
      ],
    },

    pause: {
      headline: "Pause Cycle?",
      subtext: "Structure will suspend without reset.",
      options: [
        {
          label: "Pause",
          action: "PAUSE_CYCLE",
        },
        {
          label: "Cancel",
          action: "CLOSE_TRANSITION",
        },
      ],
    },

    exit: {
      headline: "Exit Cycle?",
      subtext: "This will close your active structure.",
      options: [
        {
          label: "Exit",
          action: "EXIT_CYCLE",
        },
        {
          label: "Continue",
          action: "CLOSE_TRANSITION",
        },
      ],
    },

    continue_deepen: {
      headline: "7 Days Complete.",
      subtext: "Extend or deepen?",
      options: [
        {
          label: "Continue to Day 14",
          action: "EXTEND_CYCLE",
        },
        {
          label: "Deepen Layer",
          action: "ROUTE_DEEPEN_SELECT",
        },
      ],
    },

    deepen_select: {
      headline: "Select deeper layer.",
      selection_mode: "single",
      options: [
        {
          label: "Increase mantra reps",
          action: "INCREASE_MANTRA",
        },
        {
          label: "Increase anchor duration",
          action: "INCREASE_ANCHOR",
        },
        {
          label: "Add refinement layer",
          action: "ADD_REFINEMENT",
        },
      ],
    },

    switch_focus: {
      headline: "Switching focus resets momentum.",
      subtext: "Proceed intentionally.",
      options: [
        {
          label: "Confirm Switch",
          action: "SWITCH_FOCUS",
        },
        {
          label: "Cancel",
          action: "CLOSE_TRANSITION",
        },
      ],
    },

    integrity_guardrail: {
      headline: "Integration is incomplete.",
      subtext: "Consider reflection before restarting.",
      options: [
        {
          label: "Continue Anyway",
          action: "FORCE_NEW_CYCLE",
        },
        {
          label: "Review Insights",
          action: "ROUTE_INSIGHTS",
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
