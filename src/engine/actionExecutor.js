import {
  generateCompanionResponse,
  generateHelpMeChooseResponse,
  generatePranaBaseline,
  generatePathEvolutionScreen,
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

    case "generate_prana_baseline": {
      // Get the current focus from state
      const focus = screenState["scan_focus"];
      const resultScreen = generatePranaBaseline(focus);
      loadScreen(resultScreen);
      break;
    }

    case "generate_help_me_choose": {
      const inputData = {
        friction: screenState["help_me_choose_1"],
        intention: screenState["help_me_choose_2"],
        isReanalysis: !!screenState["scan_focus"],
      };
      const resultScreen = generateHelpMeChooseResponse(inputData);
      loadScreen(resultScreen);
      break;
    }

    case "evolve_path": {
      const { newFocus } = payload;
      const oldFocus = screenState["scan_focus"] || "peacecalm";
      
      const resultScreen = generatePathEvolutionScreen(oldFocus, newFocus);
      
      setScreenValue(newFocus, "scan_focus");
      setScreenValue(newFocus, "suggested_focus");
      
      loadScreen(resultScreen);
      break;
    }

    case "fast_track_baseline": {
      const { focus } = payload;
      // Persist chosen focus
      setScreenValue(focus, "scan_focus");
      setScreenValue(focus, "suggested_focus");

      // Go to dynamic baseline
      const resultScreen = generatePranaBaseline(focus);
      loadScreen(resultScreen);
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

      // 3. Generate and load companion reveal
      const dynamicScreen = generateCompanionResponse(inputData);
      loadScreen(dynamicScreen);
      break;
    }

    case "generate_companion": {
      // 1. Scrape data from the central state (not static mocks)
      const inputData = {
        focus: screenState["scan_focus"] || screenState["suggested_focus"],
        sub_focus: screenState["prana_baseline_selection"],
        baseline_metrics: screenState, // Send full state to extract sliders
        depth: screenState["routine_setup"],
        intention: screenState["composer_intent"],
        day_number: screenState["day_number"] || 1,
      };

      // Ensure we have some focus even if IDs weren't perfect (fallback to mock default)
      if (!inputData.focus) {
        inputData.focus = "peacecalm";
      }

      // 2. Generate dynamic response
      const dynamicScreen = generateCompanionResponse(inputData);

      // 3. Load the dynamic screen
      loadScreen(dynamicScreen);
      break;
    }

    case "submit":
      // Handle practice completion or other data saving
      if (payload?.practiceId && payload?.completed) {
        setScreenValue(true, payload.practiceId);
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
      const nextDay = currentDay + 1;

      // 1. Advance the day
      setScreenValue(nextDay, "day_number");

      // 2. Clear practice completion for the new day
      setScreenValue(false, "practice_chant");
      setScreenValue(false, "practice_embody");
      setScreenValue(false, "practice_act");

      // 3. Re-generate companion dashboard for the NEXT day
      executeAction({ type: "generate_companion" }, context);
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
