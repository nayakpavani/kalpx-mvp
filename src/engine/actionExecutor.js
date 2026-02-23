import {
  generateCompanionResponse,
  generateHelpMeChooseResponse,
  generatePathEvolutionScreen,
  generateInfoScreenData
} from "./dynamicContentEngine";

/**
 * Centralized action executor for KalpX Rendering Engine.
 * Handles all logic for interaction without embedding it in components.
 */
export function executeAction(action, context) {
  const { type, target, payload } = action;
  const { loadScreen, goBack, setScreenValue, screenState } = context;

  console.log(`Executing action: ${type}`, action);

  switch (type) {
    case "navigate":
      if (target) {
        loadScreen(target);
      }
      break;

    case "back":
      goBack();
      break;

    case "view_info": {
      const { type } = payload;
      const masterData = screenState[`master_${type}`];
      if (!masterData) break;

      const infoData = generateInfoScreenData(type, masterData);
      setScreenValue(infoData, "info");
      
      // Navigate to a dedicated info reveal state within cycle_transitions
      loadScreen({
        container_id: "cycle_transitions",
        state_id: "info_reveal",
      });
      break;
    }


    case "generate_help_me_choose": {
      const inputData = {
        friction: screenState["help_me_choose_1"],
        intention: screenState["help_me_choose_2"],
        isReanalysis: !!screenState["scan_focus"],
      };
      
      const data = generateHelpMeChooseResponse(inputData);
      
      setScreenValue(data.intro, "help_me_choose_intro");
      setScreenValue(data.analysisText, "help_me_choose_analysis");
      setScreenValue(data.buttonLabel, "help_me_choose_button_label");
      
      const nextAction = data.isReanalysis
        ? { type: "evolve_path", payload: { newFocus: data.suggestedFocus } }
        : { type: "fast_track_baseline", payload: { focus: data.suggestedFocus } };
      
      setScreenValue(nextAction, "help_me_choose_button_action");
      
      loadScreen({
        container_id: "cycle_transitions",
        state_id: "help_me_choose_reveal",
      });
      break;
    }

    case "evolve_path": {
      const { newFocus } = payload;
      const oldFocus = screenState["scan_focus"] || "peacecalm";
      
      const data = generatePathEvolutionScreen(oldFocus, newFocus);
      
      setScreenValue(data.evolutionText, "path_evolution_text");
      setScreenValue(newFocus, "scan_focus");
      setScreenValue(newFocus, "suggested_focus");
      
      loadScreen({
        container_id: "cycle_transitions",
        state_id: "path_evolution_reveal",
      });
      break;
    }

    case "fast_track_baseline": {
      const { focus } = payload;
      // Persist chosen focus
      setScreenValue(focus, "scan_focus");
      setScreenValue(focus, "suggested_focus");

      // Navigate to static baseline
      loadScreen({
        container_id: "stable_scan",
        state_id: "prana_baseline",
      });
      break;
    }

    case "fast_track_companion": {
      const { focus } = payload;
      const friction = screenState["help_me_choose_1"];
      const intention = screenState["help_me_choose_2"];

      // 1. Prepare data with smart defaults for the fast-track path
      const inputData = {
        focus: focus,
        feelings: [friction || "restless"],
        depth: "standard", // default to standard for fast-track
        intention: intention || "Seek growth and clarity.",
      };

      // 2. Persist chosen focus
      setScreenValue(focus, "scan_focus");
      setScreenValue(focus, "suggested_focus");

      // 3. Generate companion data and populate store
      const data = generateCompanionResponse(inputData);
      
      setScreenValue(data.intro, "analysis_intro");
      setScreenValue(data.metricsSummary, "analysis_metrics");
      setScreenValue(data.insightText, "analysis_insight");
      
      setScreenValue(data.ritual.title, "card_ritual_description");
      setScreenValue(data.ritual.meta, "card_ritual_meta");
      
      setScreenValue(data.sankalpa.line, "card_sankalpa_description");
      setScreenValue(data.mantra.line, "card_mantra_description");

      // 4. Navigate to static reveal screen
      loadScreen({
        container_id: "cycle_transitions",
        state_id: "companion_analysis",
      });
      break;
    }

    case "generate_companion": {
      // 1. Scrape data from the central state (not static mocks)
      const inputData = {
        focus: screenState["scan_focus"] || screenState["suggested_focus"],
        sub_focus: screenState["prana_baseline_selection"],
        baseline_metrics: screenState, // Send full state to extract sliders
        depth: screenState["routine_depth"] || screenState["routine_setup"] || "standard",
        intention: screenState["composer_intent"],
        day_number: screenState["day_number"] || 1,
        re_analysis_friction: screenState["re_analysis_friction"],
      };

      // Ensure we have some focus even if IDs weren't perfect (fallback to mock default)
      if (!inputData.focus) {
        inputData.focus = "peacecalm";
      }

      // 2. Generate companion data and populate store
      const data = generateCompanionResponse(inputData);
      
      // Reveal Screen Data
      setScreenValue(data.intro, "analysis_intro");
      setScreenValue(data.metricsSummary, "analysis_metrics");
      setScreenValue(data.insightText, "analysis_insight");
      
      setScreenValue(data.ritual.title, "card_ritual_description");
      setScreenValue(data.ritual.meta, "card_ritual_meta");
      
      setScreenValue(data.sankalpa.line, "card_sankalpa_description");
      setScreenValue(data.mantra.line, "card_mantra_description");
      
      // Foundational Journey Data (for Dashboard & Runners)
      setScreenValue(data.mantra.line, "mantra_text");
      setScreenValue(data.mantra.iast, "mantra_iast");
      setScreenValue(data.mantra.title || data.mantra.iast, "mantra_title");
      
      setScreenValue(data.sankalpa.line, "sankalp_text");
      setScreenValue(data.sankalpa.line, "sankalp_title");
      
      setScreenValue(data.ritual.title, "practice_title");
      setScreenValue(data.ritual.meta, "practice_meta");
      
      setScreenValue(inputData.day_number, "day_number");
      setScreenValue(inputData.focus, "active_focus");
      setScreenValue(data.focusName, "focus_name");
      setScreenValue(27, "reps_total");

      // Save master data for info screens
      setScreenValue(data.masterData.selectedMantra, "master_mantra");
      setScreenValue(data.masterData.selectedSankalp, "master_sankalp");
      setScreenValue(data.masterData.selectedPractice, "master_practice");

      // 3. Load the static reveal screen
      loadScreen({
        container_id: "cycle_transitions",
        state_id: "companion_analysis",
      });
      break;
    }

    case "submit":
      // Handle practice completion or other data saving
      if (payload?.practiceId && payload?.completed) {
        setScreenValue(true, payload.practiceId);
      } else if (payload?.refinement_layer === "rep_deepen" || screenState["refinement_layer"] === "rep_deepen") {
        setScreenValue(54, "reps_total");
        setScreenValue("54 Reps", "practice_chant_meta");
      } else if (payload?.refinement_layer === "observation" || screenState["refinement_layer"] === "observation") {
        setScreenValue("Observation Mode", "refinement_layer_meta");
      } else if (payload?.refinement_layer === "dharma_action" || screenState["refinement_layer"] === "dharma_action") {
        setScreenValue("Active Dharma", "refinement_layer_meta");
      } else if (payload?.step === "re_analysis_proceed") {
        const direction = screenState["re_analysis_direction"];
        if (direction === "stay") {
          executeAction({ type: "generate_companion" }, context);
        } else {
          loadScreen({ container_id: "cycle_transitions", state_id: "re_analysis_focus_select" });
        }
      } else if (payload?.focus) {
        // Save focus from Help Me Choose flow
        setScreenValue(payload.focus, "suggested_focus");
        setScreenValue(payload.focus, "scan_focus"); // match manual ID
      } else {
        console.log(`Submitted: ${JSON.stringify(payload || "no data")}`);
      }

      if (target) loadScreen(target);
      break;

    case "seal_day": {
      const currentDay = screenState["day_number"] || 1;

      // 1. Advance the day
      const nextDay = currentDay + 1;
      setScreenValue(nextDay, "day_number");

      // 2. Clear practice completion for the new day
      setScreenValue(false, "practice_chant");
      setScreenValue(false, "practice_embody");
      setScreenValue(false, "practice_act");

      // 3. Check for Cycle Completion (Day 7 or 14)
      if (currentDay === 7 || currentDay === 14) {
        loadScreen({
          container_id: "cycle_transitions",
          state_id: "daily_insight",
        });
      } else {
        // Re-generate companion dashboard for the NEXT day
        executeAction({ type: "generate_companion" }, context);
      }
      break;
    }

    case "record_pause": {
      const { success } = payload;
      const count = screenState["pause_count"] || 0;
      const victories = screenState["pause_victories"] || 0;
      
      setScreenValue(count + 1, "pause_count");
      if (success) {
        setScreenValue(victories + 1, "pause_victories");
      }
      
      if (target) loadScreen(target);
      break;
    }

    case "external_link":
      if (payload?.url) {
        window.open(payload.url, "_blank");
      }
      break;

    default:
      console.warn(`Unknown action type: ${type}`);
  }
}
