 
🧭 REVISED FULL STATE ARCHITECTURE (GENERIC FOR ALL PATHS)
 
This includes core screens + overlays + AI states.
 
Total: 68 States
 
🟢 I. INITIATION LAYER (8 STATES)
1. Entry Portal (Enter the Cycle)
2. Mode Toggle (14-Day / 7-Day)
3. Discipline Menu (Core Strength Selection)
4. Domain Mapping (Life Area Selection)
5. Sankalp Composer (User-written intention)
6. Cycle Lock Friction State (Hold to Lock animation)
7. Cycle Lock Confirmation (Golden transition)
8. No-Cycle Active State (Void / Begin screen)
 
🟡 II. BASE ARCHITECTURE LAYER (9 STATES)
9. Mantra Frequency Picker
10. Anchor Duration Slider
11. Refinement Layer Menu (Observation / Embodiment / Stability)
12. AI Suggestion Modal (Optional recommendations)
13. Over-Stacking Warning
14. Routine Review Summary
15. Routine Locked State (Read-only)
16. Adjust With Intention Portal
17. Confirmation of Adjusted Structure
 
🔵 III. DAILY EXECUTION CORE (14 STATES)
18. Command Dashboard (Day X of 14)
19. Identity State Indicator (Steady / Reactive / Drifting)
20. Live Adaptation Notification
21. Mantra Practice Screen
22. Mantra Rep Counter Feedback
23. Mantra Completion State
24. Sankalp Embodiment Screen
25. Sankalp Activation Confirmation
26. Anchor Timer Screen
27. Anchor Completion State
28. Daily Embodiment Challenge Card (Generic Dharma Action)
29. Embodiment Outcome Toggle (Completed / Avoided / Not Tested)
30. Day Completion Seal (Integrated State)
31. Partial Completion Alert
 
🟠 IV. AWARENESS & TRIGGER SYSTEM (11 STATES)
32. Mid-Day Awareness Prompt
33. Awareness Response Matrix
34. Persistent “I Feel Triggered” Entry
35. 3-Breath Reset Animation
36. Quick Mantra Loop Screen (9 reps auto prompt)
37. Trigger Reflection Prompt
38. Dharmic Response Selection
39. Post-Trigger Reinforcement Message
40. Trigger Pattern Insight Graph
41. Emotional Drift Soft Warning
42. Nervous System Stabilization Prompt
 
🔴 V. ADAPTIVE INTELLIGENCE LAYER (12 STATES)
43. Resistance Pattern Detected
44. Resistance Reflection Screen
45. Ego Inflation Check (Perfection Alert)
46. Refinement Suggestion Modal
47. Plateau Detection Notice
48. Stability Pivot Mode (Reduce intensity safely)
49. Escalation Suggestion (Ready for deeper layer)
50. Inactivity Recovery Prompt
51. Resume / Restart / Recalibrate Modal
52. Intentional Pause Cycle Screen
53. Gentle Exit Flow
54. Re-Entry Warm Start State
 
🟣 VI. DEEPEN / EXTEND / SHIFT MODULE (8 STATES)
55. Cycle Complete – 7 Day
56. Continue Confirmation Screen
57. Deepen Selection Screen
58. Deepen Confirmation Transition
59. Extension Activation (Day 8 / Day 15)
60. Switch Focus Warning Modal
61. New Focus Confirmation
62. Cross-Cycle Integrity Message
 
🟤 VII. REFLECTION & HARVEST (6 STATES)
63. Evening Accountability Screen
64. Identity Reflection Portal
65. Cycle Completion (Day 14 Graduation)
66. Trait Strength Radar Graph
67. Behavioral Insight Narrative
68. Cycle History Archive
 
⚙️ SYSTEM & UTILITY (Separate but Required)
 
(Not counted in 68 because they are universal)
 
• Notification Settings
• Data & Privacy
• Theme Settings
• Help / Guidance
• Companion Tone Adjustment (optional future feature)
 
🔥 IMPORTANT STRUCTURAL SHIFT
 
Instead of:
 
Career → Leadership Dharma
 
We now have:
 
Any Path → Embodiment Layer
 
Examples dynamically change:
 
If Wealth:
Embodiment = Conscious spending / honest financial action
 
If Relationships:
Embodiment = Pause before reaction / honest communication
 
If Health:
Embodiment = Honor rest / avoid self-neglect
 
If Calm:
Embodiment = Silence in conflict / breath awareness
 
Same screen.
Different content.
 
Architecture remains stable.
 
🧠 What This Solves
 
• No path-specific screens
• All flows reusable
• AI layer cleanly separable
• Backend state machine becomes manageable
• Frontend components reusable
• No UI explosion
 
🪷 Final Observation
 
You are no longer building:
 
“A spiritual app.”
 
You are building:
 
A state machine for disciplined identity transformation.
 
That requires:
 
• Clear states
• Clean transitions
• Minimal novelty
• Adaptive tone
• Stable architecture
 
And now it is structurally sound.
 

 
Below is a clean, production-grade container architecture where the UI is schema-driven (backend sends “what to show,” frontend renders it using reusable containers).
 
1) The Dynamic Containers (12 total)
 
Container 1 — 
Portal
 
Use for: entry + no-cycle states
Covers states: 1, 8
Variants:
• welcome_portal (Begin CTA)
• void_state (no cycle active)
 
Container 2 — 
Choice Stack
 
Use for: any “pick one” step with cards
Covers states: 2, 3, 4 (+ can be reused for “deepen selection” later)
Variants:
• mode_toggle
• discipline_select
• domain_select
• focus_select (if you ever separate domain vs focus)
 
Container 3 — 
Composer
 
Use for: single input + sacred framing
Covers states: 5
Variants:
• sankalp_composer (text + examples + guardrails)
 
Container 4 — 
Lock Ritual Overlay
 
Use for: “hold to lock” + confirmation
Covers states: 6, 7
Variants:
• hold_to_lock
• lock_confirm_transition
 
(These should be overlays on top of any container, but they’re important enough to treat as a “containerized overlay.”)
 
Container 5 — 
Routine Builder
 
Use for: configuring core practice and base structure
Covers states: 9, 10, 14
Variants:
• mantra_reps_picker
• anchor_duration_picker
• routine_review
 
Container 6 — 
Routine Locked (Read-only)
 
Use for: show current routine + “Adjust with Intention” entry
Covers states: 15, 16
Variants:
• locked_summary
• adjust_portal_entry
 
Container 7 — 
Companion Dashboard
 
This is the home OS. Always accessible via tab.
Covers states: 18, 19, 20 plus persistent entry points to trigger/check-in.
Variants:
• day_active (Day X)
• identity_header_mode (steady/reactive/drifting)
• adaptation_toast (non-blocking changes)
 
This dashboard should support all-day availability for mantra/sankalp/anchor (not “morning only”).
 
Container 8 — 
Practice Runner
 
Use for any “do the practice now” interactive flow
Covers states: 21–27
Variants:
• mantra_runner (tap-to-count / audio / reps)
• sankalp_embody (embody + reminder)
• anchor_timer (timer + pause/resume)
• completion_states (done microcopy)
 
Container 9 — 
Embodiment Challenge Runner
 
Generic “Dharma in Action” for ALL paths (not career-only).
Covers states: 28, 29
Variants:
• challenge_view
• challenge_outcome (completed/avoided/not tested)
 
Container 10 — 
Awareness & Trigger
 
One container, two entry modes:
• proactive check-in
• emergency “triggered” intervention
Covers states: 32–39 (and can include 34–38 sequence inside as steps)
Variants:
• midday_checkin (matrix + optional note)
• trigger_sos (breath reset → quick mantra loop → reflection → return)
 
Container 11 — 
Insights & Progress
 
All progress views live here.
Covers states: 40, 41, 42, 63–68
Variants:
• weekly_insights
• trigger_pattern_graph
• trait_radar
• behavioral_summary
• history_archive
• analytics_dashboard
 
Container 12 — 
Cycle Transitions
 
All “continue/deepen/switch/pause/exit/recover” decisions belong here.
Covers states: 43–62 (all interventions + recovery + deepen/extend/switch)
Variants:
• ai_intervention_card (resistance/plateau/ego/drift)
• stability_pivot (simplify)
• resume_restart_recalibrate
• pause_cycle
• gentle_exit
• continue_vs_deepen
• deepen_layer_select
• extend_activation
• switch_focus_guardrail
• new_focus_confirm
 
This container is the “companion becomes alive” layer.
 
2) Overlays (don’t count as screens, but are critical)
 
These should be reusable overlays invoked from any container:
• ModalConfirm: confirm / warn / irreversible decisions
(covers: 12, 13, 17, 54, 60–62)
• Toast: live adaptation messages
(covers: 20)
• BottomSheetPicker: reps/frequency/duration selection
(covers: 9, 10, adjustments)
• RitualTransition: gold glow transitions (lock/deepen/extend)
(covers: 7, 58, 59)
• NudgeCard: compassionate nudges (no punishment)
(covers: drift/recovery)
 
3) Mapping the 68 states into these containers (clean merge)
• Portal → 1, 8
• Choice Stack → 2, 3, 4
• Composer → 5
• Lock Ritual Overlay → 6, 7
• Routine Builder → 9, 10, 14
• Routine Locked → 15, 16, 17
• Companion Dashboard → 18, 19, 20
• Practice Runner → 21–27
• Embodiment Challenge Runner → 28–29
• Awareness & Trigger → 32–39
• Insights & Progress → 40–42, 63–68
• Cycle Transitions → 43–62
• Evening Accountability can be either:
o a variant inside Awareness & Trigger (recommended), or
o a step inside Cycle Transitions if it’s more “closure-like.”
 
4) How this stays “true AI-first” without dynamic screens chaos
 
You’re not dynamically generating UI layouts randomly. You’re dynamically filling stable containers.
 
Backend sends a Screen Manifest like:
• container_id: "practice_runner"
• variant: "mantra_runner"
• blocks: [header, guidance, counter, audio, cta]
• tone: {calm, strict, grounding}
• copy: strings + microcopy
• rules: what buttons enable/disable + what happens next
 
Frontend renders using the same components every time.
 
So:
• State dynamic
• Tone dynamic
• Prompts dynamic
• Adjustments dynamic
• Architecture stable
 
Exactly what you asked.
 
5) The minimum number of “actual screens” your designer/dev needs
 
If you build these 12 containers + overlays well, your entire OS works with:
• 12 container templates
• ~30 variants (mostly simple)
• 5 overlays
 

 

 
 
 
 
🟢 CONTAINER 1 — 
PORTAL
 
Purpose: Entry + No-Cycle Active State
Covers States:
1. Entry Portal (Enter the Cycle)
2. No-Cycle Active State (Void / Begin Screen)
 
This is not “a welcome screen.”
This is the threshold of identity transition.
 
It must feel:
• Calm
• Grounded
• Non-gamified
• Minimal
• Sacred but modern
 
🌿 VISUAL DESCRIPTION (DESIGNER READY)
 
Overall Mood
 
Minimal. Spacious. Soft gradients. Subtle motion.
 
Think:
• Soft charcoal → deep indigo gradient background
• Very light ambient glow (barely visible)
• No clutter
• No icons grid
• No dashboard feel
 
This is a threshold state.
 
LAYOUT STRUCTURE
 
1️⃣ Background Layer
• Full screen gradient:
o Top: #111827 (deep slate)
o Bottom: #0B1220 (almost black navy)
• Very subtle radial glow in center (opacity 8–10%)
• No patterns.
• No decorative elements.
 
Optional:
A faint breathing light animation (4s inhale / 4s exhale loop)
 
2️⃣ Center Content Stack (Vertically centered)
 
A. Header Label (Small)
Uppercase micro text:
 
“IDENTITY PRACTICE”
 
Font:
• Inter / SF Pro
• 12–14px
• Letter spacing +1.5
• Opacity 60%
 
This should feel like a category, not a headline.
 
B. Primary Headline
Variant A (Welcome Portal):
“Enter the Cycle.”
 
Variant B (Void State):
“You have no active cycle.”
 
Typography:
• Large serif (Cormorant Garamond or similar)
• 34–40px
• Medium weight
• Tight line height
• Soft white (#F3F4F6)
 
No emojis.
No exclamation marks.
 
C. Subtext (2 lines max)
Variant A:
“Choose a discipline.
Commit to a structured shift.”
 
Variant B:
“Without structure,
identity drifts.”
 
Typography:
• Sans serif
• 16px
• Opacity 70%
• Line height 1.5
 
No long paragraphs.
No explanations.
 
3️⃣ Primary CTA
 
Large centered button.
 
Label:
“Begin”
or
“Start a 7 or 14 Day Cycle”
 
Button Style:
• Rounded (14px radius)
• Dark base (#1F2937)
• Soft outer glow (very subtle)
• On press → micro scale animation (0.97)
 
Text:
• White
• 16–18px
• Medium weight
 
No gradients on button.
No gold yet.
Gold only appears at lock ritual.
 
4️⃣ Secondary Micro Link (Optional)
 
Small, subtle:
 
“Learn how this works”
 
This opens a bottom sheet with:
• 3 steps
• No video
• No tutorial onboarding sequence
 
Keep it minimal.
 
🧠 STATE VARIANTS
 
Variant 1 — welcome_portal
 
Used when:
• User opens app first time
• User manually exits previous cycle
• User chooses to reset
 
Tone: invitation
 
Variant 2 — void_state
 
Used when:
• User completed cycle
• User exited intentionally
• User paused long enough
 
Tone: neutral reflection
 
Slightly different copy.
Same layout.
 
🎬 MICRO-ANIMATION NOTES
 
Must be subtle.
 
Allowed:
• Fade in content (300ms)
• Button micro-press scale
• Background breathing glow (very faint)
 
Not allowed:
• Slide-ins
• Bounce animations
• Confetti
• Gamified effects
 
📱 RESPONSIVE RULES
 
Mobile First.
 
Vertical safe zones:
• Top 20%
• Center 40%
• Bottom 20%
 
Content stack must remain centered even on tall devices.
 
Tablet:
• Increase whitespace
• Do not widen text beyond 520px max
 
🧩 FRONTEND DEVELOPER NOTES
 
This container should be:
 
Component Name:
PortalContainer
 
It must accept schema-driven props:
{
 variant: "welcome_portal" | "void_state",
 headline: string,
 subtext: string,
 primary_cta: {
   label: string,
   action: string
 },
 secondary_cta?: {
   label: string,
   action: string
 },
 tone?: "calm" | "grounded" | "neutral"
}
 
🛠 Behavior Rules
1. CTA triggers transition to:
→ Choice Stack container (mode_toggle)
2. If user returns to this screen mid-cycle:
DO NOT show it.
This container only renders when:
cycle_state === null
3. Should not mount heavy analytics.
Log:
o portal_viewed
o portal_cta_pressed
4. Must support:
o Dark theme only (for now)
o Later: theme override possible via system settings
 
🔐 Logic Conditions
 
Show this container when:
if (!activeCycle) {
 render(PortalContainer)
}
If user has paused cycle:
Do NOT show Portal.
Show Cycle Transition container instead.
 
🧘‍♂️ UX PHILOSOPHY NOTES FOR DEV TEAM
 
This screen must:
 
• Not feel like onboarding
• Not feel like productivity software
• Not feel like meditation app
• Not feel like habit tracker
 
It must feel like:
 
“I am stepping into structure.”
 
This is the threshold.
The calm before commitment.
 
🚫 What To Avoid
• Illustrations
• Stock photos
• Mandalas
• Religious imagery
• Gamification streak visuals
• Progress bars
• Carousels
 
This is silence.
Not spectacle.
 
🔥 Why This Matters
 
If this screen feels:
• Cluttered → system feels complicated.
• Exciting → system feels gimmicky.
• Empty → system feels lifeless.
 
It must feel:
Stable.
Intentional.
Grounded.
 
Because from here,
the state machine begins.
 
 

 

🟡 CONTAINER 2 — 
CHOICE STACK
 
Purpose: Structured decision layer
Covers States:
2. Mode Toggle (7-Day / 14-Day)
3. Discipline Selection
4. Domain Mapping
(+ reusable later for Deepen / Focus selection)
 
This is where the user chooses direction.
 
It must feel:
• Clear
• Focused
• Non-overwhelming
• Structured
• Intentional
 
Not playful.
Not gamified.
Not overwhelming with too many cards.
 
🌿 VISUAL DESCRIPTION (DESIGNER READY)
 
Overall Mood
 
Clean decision surface.
 
Dark background (same as Portal for consistency):
• #0B1220 → #111827 gradient
• Slight depth increase compared to Portal (very subtle card elevation)
 
📐 LAYOUT STRUCTURE
 
1️⃣ Header Section (Top 20%)
 
Micro Label
 
Uppercase, subtle:
“DEFINE YOUR STRUCTURE”
 
12–14px
Letter spacing +1.5
Opacity 60%
 
Primary Headline
 
Dynamic depending on variant:
 
Mode:
“Choose your cycle length.”
 
Discipline:
“Select your core discipline.”
 
Domain:
“Choose your life domain.”
 
Typography:
• Serif (Cormorant / similar)
• 30–36px
• Medium weight
• Soft white (#F3F4F6)
 
Subtext (Max 2 lines)
 
Mode:
“Short focus or sustained shift.”
 
Discipline:
“Strength grows through repetition.”
 
Domain:
“Where does this discipline apply?”
 
Sans serif
16px
Opacity 70%
 
2️⃣ Choice Cards Stack (Center 50%)
 
Cards must be:
• Vertically stacked (mobile)
• 16px spacing
• Full width minus 24px horizontal padding
• Max width 520px
 
🧩 CARD DESIGN
 
Base Card
• Background: #1F2937
• Border: 1px subtle (#374151)
• Radius: 16px
• Padding: 20px
• No icons by default
• No illustrations
 
On hover / press:
• Border highlight (#4B5563)
• Slight elevation (shadow opacity 10%)
 
Card Content Layout
 
Left aligned text.
 
Title:
18–20px
Medium weight
White
 
Description:
14–15px
Opacity 70%
Max 2 lines
 
Optional small micro tag (top-right corner):
“Recommended”
“Advanced”
“Foundational”
 
Micro tag:
11px uppercase
Opacity 60%
 
🎛 VARIANT CONFIGURATIONS
 
Variant A — mode_toggle
 
Cards:
 
7-Day Cycle
“Focused correction. Rapid reset.”
 
14-Day Cycle
“Deeper conditioning. Structural shift.”
 
Only two cards.
Nothing else.
 
No scrolling.
 
Variant B — discipline_select
 
Example disciplines:
 
Calm Stability
“Train non-reactivity.”
 
Integrity
“Align action with truth.”
 
Strength
“Build inner firmness.”
 
Clarity
“Reduce mental noise.”
 
Max visible at once: 4–6.
If more → vertical scroll.
 
Important:
Do NOT visually differentiate them by color.
Neutral presentation.
User choice defines intensity later.
 
Variant C — domain_select
 
Examples:
 
Wealth
“Financial awareness & discipline.”
 
Relationships
“Conscious communication.”
 
Health
“Energy & physical integrity.”
 
Work
“Professional steadiness.”
 
Again:
Neutral cards.
No icons.
 
🎬 MICRO-INTERACTIONS
 
When card selected:
1. Border glows softly
2. Background slightly brightens (#273244)
3. Small check appears (top-right corner)
4. 150ms delay
5. Auto-advance OR show “Continue” button
 
Recommended:
Auto-advance for mode.
Manual confirm for discipline & domain.
 
📱 RESPONSIVE RULES
 
Mobile:
Stacked vertically.
 
Tablet:
Still stacked.
Do NOT grid.
This is not ecommerce.
 
Max width 520px centered.
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
ChoiceStackContainer
 
Schema-driven props:
{
 variant: "mode_toggle" | "discipline_select" | "domain_select" | "focus_select",
 headline: string,
 subtext: string,
 options: [
   {
     id: string,
     title: string,
     description: string,
     tag?: string,
     recommended?: boolean
   }
 ],
 selection_mode: "single" | "single_auto_advance",
 next_action: string
}
 
🛠 Behavior Rules
1. Single selection only.
2. Store selection in temporary cycle draft.
3. Do NOT create cycle yet.
4. If user exits mid-selection → preserve draft.
5. Must support:
o 4–10 options without layout breaking.
 
🔐 Logic Conditions
 
Auto-advance only when:
selection_mode === "single_auto_advance"
Else:
Show bottom CTA:
 
“Continue”
 
Button disabled until selection made.
 
🧭 TRANSITIONS
 
From:
Portal → ChoiceStack (mode_toggle)
 
mode_toggle → discipline_select
 
discipline_select → domain_select
 
domain_select → Composer
 
Smooth fade transitions (250ms).
No slide animations.
 
🚫 DO NOT ADD
• Icons for each discipline
• Progress bars
• Stepper indicators
• Breadcrumb navigation
• Back arrows in header (use subtle top-left back)
 
This should feel like:
Focused narrowing.
 
Not onboarding wizard.
 
🧘‍♂️ UX PHILOSOPHY
 
This container is where identity direction is chosen.
 
It must feel:
Serious.
Calm.
Structured.
 
Not:
Exciting.
Decorative.
Over-designed.
 
The user is not browsing.
They are selecting commitment.
 
🔥 Why This Matters
 
If this screen feels:
Over-designed → system feels gimmicky.
Too colorful → system feels shallow.
Too complex → drop-off increases.
 
It must feel:
Clean.
Stable.
Intentional.
 
Because this is the first narrowing of identity.
 
🟢 CONTAINER 3 — 
COMPOSER
 
Purpose:
Where the user writes their Sankalp (intention).
 
Covers State:
5. Sankalp Composer
 
This is the first moment of self-authorship.
 
It must feel:
• Personal
• Quiet
• Focused
• Sacred but not religious
• Structured but not restrictive
 
No gamification.
No decorative spirituality.
No productivity vibes.
 
This is identity language being written.
 
🌿 VISUAL DESCRIPTION (DESIGNER READY)
 
Overall Mood
 
Still dark.
More intimate than Choice Stack.
 
Background:
• Same base gradient (#0B1220 → #111827)
• Center slightly dimmed to draw focus to input field
• Very subtle vignette (opacity 6–8%)
 
This should feel like:
A writing chamber.
 
📐 LAYOUT STRUCTURE
 
1️⃣ Header Section (Top 15–20%)
 
Micro Label
 
Uppercase, subtle:
 
“DEFINE YOUR INTENTION”
 
12–14px
Letter spacing +1.5
Opacity 60%
 
Primary Headline
 
“Write your Sankalp.”
 
Typography:
• Serif (Cormorant or similar)
• 32–36px
• Medium weight
• Soft white (#F3F4F6)
 
Subtext (1–2 lines max)
 
“Short. Clear. Behavioral.”
 
Sans serif
16px
Opacity 70%
 
No long explanations.
 
2️⃣ Composer Input Field (Center Focus)
 
This is the heart of the screen.
 
Input Container
• Background: #1F2937
• Border: 1px subtle (#374151)
• Radius: 18px
• Padding: 24px
• Min height: 120px
• Max height before scroll: 180px
 
Feels like a card.
But quiet.
 
Placeholder Text
 
Examples rotate every 5 seconds (fade transition):
 
“I respond without raising my voice.”
“I complete what I begin.”
“I pause before reacting.”
“I act with financial awareness.”
 
Important:
These are behavioral, not emotional.
 
Text Styling
 
User text:
• 18px
• Line height 1.6
• White (#F9FAFB)
 
Limit:
120 characters recommended.
Hard cap: 180 characters.
 
Character Counter (Subtle)
 
Bottom right corner inside field:
 
“74 / 120”
 
Opacity 50%
Small font 12px.
 
No red warnings.
Only gentle guidance.
 
3️⃣ Guardrail Microcopy (Below Field)
 
Small helper text:
 
“A Sankalp is behavioral.
Not aspirational.”
 
Tap “?” opens bottom sheet:
• 3 bullet examples
• 2 anti-examples
 
4️⃣ Optional AI Assist Link
 
Subtle text below field:
 
“Need suggestions?”
 
Opens modal (Container 12 later)
AI Suggestion Modal:
• Suggest 3 behavioral Sankalps
• User can tap to autofill
• Editable after fill
 
Do NOT auto-generate without request.
 
User must initiate.
 
5️⃣ Primary CTA
 
Centered below input:
 
“Continue”
 
Disabled until:
• Minimum 12 characters entered
• At least one verb detected (optional backend logic)
 
Button style:
Same as Choice Stack.
No gold.
 
🎬 MICRO-INTERACTIONS
• Placeholder fades smoothly
• Border slightly brightens on focus
• No typing sound
• No animation per character
• Soft fade when AI suggestion inserted
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
ComposerContainer
 
Schema-driven props:
{
 headline: string,
 subtext: string,
 placeholder_examples: string[],
 max_length: number,
 min_length: number,
 ai_assist_enabled: boolean,
 validation_rules?: {
   require_verb?: boolean,
   disallow_generic?: boolean
 },
 next_action: string
}
 
🛠 Behavior Rules
1. Save draft in temporary cycle object.
2. Persist draft even if user navigates back.
3. Validation:
o Cannot proceed if blank.
o Gentle nudge if too vague:
Example detection words:
“be better”
“improve”
“grow”
4. AI suggestions must not overwrite without confirmation.
5. No autosave toast.
Silent draft persistence.
 
🔐 Logic Conditions
 
Enable CTA when:
input.length >= min_length
Optional deeper validation:
Use simple verb detection:
If no verb → show helper nudge (not blocking).
 
📱 RESPONSIVE RULES
 
Mobile:
Input centered.
Keyboard should not cover CTA.
CTA sticks just above keyboard.
 
Tablet:
Max width 520px.
Keep centered.
 
🚫 DO NOT ADD
• Inspirational quotes
• Sanskrit text
• Mantra references
• Decorative borders
• Emoji inside placeholder
• Background imagery
 
This is clean authorship.
 
🧘‍♂️ UX PSYCHOLOGY
 
This screen determines:
Whether user feels ownership
or
Whether system feels prescriptive.
 
Ownership = retention.
 
Too much AI = dependency.
Too little structure = confusion.
 
Balance:
Structured silence.
 
🔥 Why This Matters
 
If this feels:
Complicated → user freezes.
Too spiritual → user disengages.
Too motivational → user doesn’t take it seriously.
 
It must feel:
Precise.
Grounded.
Behavioral.
 
Because once written,
the Sankalp becomes the spine of the entire state machine.
 
🟡 CONTAINER 4 — 
LOCK RITUAL OVERLAY
 
Purpose:
Seal commitment.
 
Covers States:
6. Cycle Lock Friction State (Hold to Lock)
7. Cycle Lock Confirmation (Golden Transition)
 
This is the psychological shift from:
 
“I’m setting this up”
→
“I am committing.”
 
This must feel ceremonial — not gamified.
 
No confetti.
No streak visuals.
No celebration tone.
 
This is gravity, not hype.
 
🧭 ARCHITECTURAL NOTE
 
This is not a full screen.
 
It is an overlay layer that appears above:
• Composer
• Routine Builder
• Routine Review
 
It blocks background interaction.
Background slightly blurs (6–8px blur).
 
🌿 VISUAL DESCRIPTION (DESIGNER READY)
 
1️⃣ Overlay Background
• Dark translucent layer (#000000 at 60%)
• Soft blur effect
• Prevent scrolling underneath
 
No gradient here.
Keep focus centered.
 
📐 LAYOUT STRUCTURE
 
Center Ritual Card
 
Max width: 420px
Centered vertically and horizontally.
 
Card styling:
• Background: #111827
• Border: 1px subtle (#374151)
• Radius: 20px
• Padding: 32px
• Soft outer shadow
 
This card must feel stable.
Not floating too dramatically.
 
🔒 STATE 1 — HOLD TO LOCK
 
Micro Label (Top)
 
Uppercase small text:
“FINALIZE STRUCTURE”
 
12px
Letter spacing +1.5
Opacity 60%
 
Headline
 
“Hold to lock your cycle.”
 
Serif
28–32px
White
 
Subtext
 
“Commit to this structure for 7 days.”
 
(or dynamically 14)
 
Sans serif
16px
Opacity 70%
 
Hold Button (Core Element)
 
Large pill-shaped button.
 
Height: 56px
Radius: 28px
Background: #1F2937
Border: 1px #4B5563
 
Label:
“Hold”
 
Centered.
 
Interaction Behavior
 
User must press and hold for:
1.8 seconds (7-day)
2.4 seconds (14-day)
 
Visual feedback:
• Circular progress ring animates around button
• Subtle gold glow increases as hold progresses
• Soft haptic pulse at 50%
• Stronger haptic at completion
 
If user releases early:
Progress resets.
No error message.
 
Microcopy Under Button
 
“Structure builds identity.”
 
Very subtle.
Opacity 50%.
 
🌟 STATE 2 — LOCK CONFIRMATION TRANSITION
 
Triggered after hold completes.
 
Card content dissolves.
 
Background shifts slightly warmer.
 
Gold glow radiates outward from button.
 
Duration:
800ms–1s max.
 
Confirmation Screen (Same Card Layout)
 
Headline:
 
“Cycle Locked.”
 
Serif
White
 
Subtext:
 
“Begin tomorrow with clarity.”
(or “Day 1 begins now.” depending on logic)
 
Visual Accent
 
Subtle gold edge highlight around card:
#C9A227 at 30% opacity
 
Do NOT make gold dominant.
It’s an accent, not theme color.
 
CTA
 
“Enter Day 1”
 
Button style:
Same base button.
No heavy gold fill.
 
🎬 MICRO-ANIMATION DETAILS
 
Allowed:
• Progress ring fill
• Gold glow increase
• Fade transition
• Slight ambient tone shift
 
Not allowed:
• Fireworks
• Sounds
• Celebration icons
• Achievement badges
 
This is sacred seriousness.
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
LockRitualOverlay
 
Schema-driven props:
{
 cycle_length: 7 | 14,
 headline_hold: string,
 subtext_hold: string,
 headline_confirm: string,
 subtext_confirm: string,
 hold_duration_ms: number,
 next_action: string
}
 
🛠 BEHAVIOR RULES
1. Disable background interactions.
2. Must support interruption safely.
3. If app minimized mid-hold → cancel.
4. On completion:
o Persist cycle to backend.
o Generate cycle ID.
o Initialize Day 1 state.
5. Log event:
o cycle_locked
o cycle_length
 
🔐 LOGIC CONDITIONS
 
Overlay triggers when:
cycleDraft.isComplete === true
Cannot skip this overlay.
No “skip lock” button.
 
📱 RESPONSIVE RULES
 
Mobile:
Centered card.
Button large and thumb-friendly.
 
Tablet:
Same centered layout.
Do not widen excessively.
 
🚫 DO NOT ADD
• Countdown numbers visible
• Numeric timer display
• Sound effects
• “Congratulations!”
• Checkmark confetti
 
This is not a reward.
This is a contract.
 
🧘‍♂️ UX PSYCHOLOGY
 
The hold mechanic creates:
 
Micro-friction → Commitment
Effort → Ownership
Pause → Intentionality
 
Without this:
The cycle feels disposable.
 
With this:
The cycle feels real.
 
🔥 WHY THIS MATTERS
 
This overlay is the identity switch.
 
Before:
User exploring.
 
After:
User practicing.
 
The emotional tone of the entire system shifts here.
 
🔵 CONTAINER 5 — 
ROUTINE BUILDER
 
Purpose:
Define the structural spine of the cycle.
 
Covers States:
9. Mantra Frequency Picker
10. Anchor Duration Slider
14. Routine Review Summary
 
This is where structure becomes measurable.
 
It must feel:
• Precise
• Calm
• Configurable
• Not overwhelming
 
No sliders flying around.
No habit-tracker vibe.
No gamified intensity.
 
This is disciplined configuration.
 
🌿 VISUAL MOOD
 
Same base gradient as previous containers:
#0B1220 → #111827
 
But now:
More structural.
More grid-aligned.
Less emotional.
 
This is engineering layer energy.
 
📐 LAYOUT STRUCTURE
 
1️⃣ Header Section (Top 15%)
 
Micro Label:
“BUILD YOUR ROUTINE”
 
Uppercase
12–14px
Opacity 60%
 
Headline:
 
“Define your daily structure.”
 
Serif
30–34px
White
 
Subtext:
 
“Small repetitions. Compounded identity.”
 
Sans serif
16px
Opacity 70%
 
2️⃣ STRUCTURE BLOCKS (Center Stack)
 
This container uses Modular Blocks.
 
Each block = one practice dimension.
 
Stacked vertically.
16–20px spacing.
 
Max width: 520px centered.
 
🧩 BLOCK 1 — MANTRA FREQUENCY
 
Card style:
• Background: #1F2937
• Border: 1px #374151
• Radius: 16px
• Padding: 20px
 
Title:
“Mantra Repetitions”
 
18px
Medium weight
 
Subtext:
“Daily repetition count.”
 
14px
Opacity 70%
 
Picker UI
 
Use:
BottomSheetPicker (overlay component)
 
Tap opens:
Options:
 
• 9
• 18
• 27
• 54
 
Default suggestion:
9 (for 7-day)
18 (for 14-day)
 
Selected value appears inline:
“18 repetitions”
 
No slider.
No drag.
Discrete options only.
 
Reason:
Structure > randomness.
 
🧩 BLOCK 2 — ANCHOR DURATION
 
Title:
“Anchor Duration”
 
Subtext:
“Daily stabilization time.”
 
Picker style:
Discrete duration options:
 
• 3 min
• 5 min
• 8 min
• 12 min
 
Default:
5 min
 
Again:
BottomSheetPicker.
 
No continuous slider.
 
🧩 BLOCK 3 — ROUTINE REVIEW SUMMARY
 
This appears once selections made.
 
Card style slightly brighter (#273244)
 
Title:
“Routine Summary”
 
Content:
 
Mantra:
18 repetitions
 
Anchor:
5 minutes
 
Sankalp:
“I respond without raising my voice.”
 
Editable link:
“Adjust”
 
This returns to blocks above.
 
CTA SECTION
 
Primary Button:
 
“Lock Structure”
 
Disabled until:
• Mantra selected
• Anchor selected
• Sankalp exists
 
Button style:
Same dark button.
No gold yet.
 
Gold only appears in Lock Ritual.
 
🎬 MICRO-INTERACTIONS
 
Allowed:
• Smooth numeric transitions when picker selected
• Subtle highlight of modified block
• Fade-in of review block
 
Not allowed:
• Sliders bouncing
• Drag animations
• Haptic per increment
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
RoutineBuilderContainer
 
Schema props:
{
 mantra_options: number[],
 anchor_options: number[],
 default_mantra: number,
 default_anchor: number,
 sankalp_text: string,
 show_review: boolean,
 next_action: string
}
 
🛠 BEHAVIOR RULES
1. Persist selections in cycleDraft.
2. Default values preselected but editable.
3. Show review summary only when both selected.
4. If user navigates back → preserve selections.
5. Do not autosave to backend yet.
6. Save only after lock ritual completes.
 
🔐 VALIDATION
 
Enable CTA only if:
mantra && anchor && sankalp
 
📱 RESPONSIVE RULES
 
Mobile:
Stack blocks vertically.
 
Tablet:
Still stacked.
Do not grid.
Keep vertical seriousness.
 
🚫 DO NOT ADD
• “Difficulty level”
• “Intensity meter”
• Fire icons
• Performance badges
• Streak indicators
• Time-of-day scheduling here
 
Scheduling belongs elsewhere.
This is structural configuration only.
 
🧘‍♂️ UX PSYCHOLOGY
 
This container shifts the tone from:
 
“I want to change”
to
“This is how I will change.”
 
Quantification creates:
• Tangibility
• Accountability
• Predictability
 
Without overwhelm.
 
🔥 WHY THIS MATTERS
 
If this feels:
Too complex → abandonment.
Too simple → trivial.
Too decorative → unserious.
 
It must feel:
Deliberate.
Measurable.
Grounded.
 
Because once this is locked,
identity becomes scheduled.
 
 
🔵 CONTAINER 6 — 
ROUTINE LOCKED (READ-ONLY STRUCTURE)
 
Purpose:
Display the active cycle structure in a stable, non-editable format.
 
Covers States:
15. Routine Locked State (Read-only)
16. Adjust With Intention Portal
17. Confirmation of Adjusted Structure
 
This container communicates:
 
“You are inside structure.”
 
It must feel:
• Stable
• Grounded
• Non-editable by default
• Slightly more formal than Routine Builder
 
No playful edit icons.
No quick-tweak sliders.
Adjustments require intention.
 
🌿 VISUAL MOOD
 
Same dark gradient base:
#0B1220 → #111827
 
But now:
Less configurator.
More operating system.
 
The structure feels set.
 
📐 LAYOUT STRUCTURE
 
1️⃣ Header Section (Top 15%)
 
Micro Label:
“ACTIVE STRUCTURE”
 
Uppercase
12–14px
Opacity 60%
 
Headline:
 
“Your cycle is locked.”
 
Serif
30–34px
White
 
Subtext:
 
“Consistency creates identity.”
 
Sans serif
16px
Opacity 70%
 
2️⃣ STRUCTURE SUMMARY BLOCK (Center)
 
This is the main content.
 
Single stacked card.
No multiple pickers.
 
Card style:
• Background: #1F2937
• Border: 1px #374151
• Radius: 18px
• Padding: 24px
 
Content Inside Card
 
Section A — Sankalp
 
Label:
“Sankalp”
 
Small uppercase
Opacity 50%
 
Value:
“I respond without raising my voice.”
 
18px
White
Wrap allowed
 
Divider:
Subtle 1px line (#374151)
 
Section B — Mantra
 
Label:
“Mantra Repetitions”
 
Value:
18 repetitions
 
Divider
 
Section C — Anchor
 
Label:
“Anchor Duration”
 
Value:
5 minutes daily
 
No icons.
No edit pencils.
No sliders.
 
3️⃣ Adjust With Intention Entry
 
Below card:
 
Subtle button (not primary):
 
“Adjust with intention”
 
Style:
Text button
Opacity 70%
Underline on hover
No bright color
 
Pressing this opens:
 
→ Confirmation Modal (ModalConfirm overlay)
 
🛑 ADJUST CONFIRMATION MODAL
 
Headline:
 
“Adjusting will reset structural consistency.”
 
Subtext:
 
“This action should be intentional.”
 
Buttons:
• Continue to Adjust
• Cancel
 
If Continue:
Route back to Routine Builder container
Pre-filled with current values.
 
After adjustment:
Return here.
Show subtle toast:
 
“Structure updated intentionally.”
 
No praise.
No excitement.
 
🎬 MICRO-INTERACTIONS
 
Allowed:
• Soft fade-in on mount
• Slight highlight pulse when returning after adjustment
• Subtle divider animations
 
Not allowed:
• Slide-in panels
• Expand/collapse effects
• Gamified reinforcement
 
This is steady energy.
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
RoutineLockedContainer
 
Schema props:
{
 sankalp: string,
 mantra_reps: number,
 anchor_duration: number,
 allow_adjust: boolean,
 adjust_action: string
}
 
🛠 BEHAVIOR RULES
1. This container is accessible anytime during active cycle.
2. Must not allow inline editing.
3. Adjust requires:
o Confirmation modal
o Reset structural streak counters if applicable
4. Adjustment should log:
o structure_adjusted
o previous_values
o new_values
5. Maintain cycle ID — do not create new cycle.
 
🔐 LOGIC CONDITIONS
 
Show this container when:
activeCycle && userNavigatesToStructure
Hide adjust option if:
cycle_status === "completing_today"
(Prevent last-minute manipulation.)
 
📱 RESPONSIVE RULES
 
Mobile:
Centered single card.
 
Tablet:
Max width 520px.
Centered.
No side panels.
 
🚫 DO NOT ADD
• “Edit” icon in corner
• Editable text fields inline
• Quick increment arrows
• Difficulty labels
• Progress comparison visuals
 
Structure must feel stable.
Not flexible.
 
🧘‍♂️ UX PSYCHOLOGY
 
This container reinforces:
 
Stability > novelty.
 
If users can tweak constantly,
identity never stabilizes.
 
The friction to adjust preserves seriousness.
 
🔥 WHY THIS MATTERS
 
Without this container:
 
The system feels loose.
Changeable.
Optional.
 
With it:
 
The system feels intentional.
Committed.
Structured.
 
It reminds the user:
 
“You chose this.”
 
🟢 CONTAINER 7 — 
COMPANION DASHBOARD
 
Purpose:
This is the live operating system of the cycle.
 
Covers States:
18. Command Dashboard (Day X of 14)
19. Identity State Indicator (Steady / Reactive / Drifting)
20. Live Adaptation Notification
 
This container must feel like:
 
A calm command center.
Not a productivity dashboard.
Not a streak tracker.
Not a meditation app home.
 
It is where the user lives during the cycle.
 
🌿 VISUAL MOOD
 
Same dark gradient base:
#0B1220 → #111827
 
But slightly brighter in center (subtle radial depth).
 
This is active territory.
Not setup mode.
Not ceremonial.
 
Tone: grounded, alert, steady.
 
📐 LAYOUT STRUCTURE
 
Mobile-first.
Single-column vertical stack.
Max width: 520px centered.
 
1️⃣ IDENTITY HEADER (Top 20%)
 
This replaces “Day 3/14” as primary identity signal.
 
Micro Label
 
Uppercase:
“DAY 4 OF 14”
 
12px
Opacity 60%
Letter spacing +1.5
 
Primary Headline
 
Dynamic state-based:
 
Steady:
“You are steady.”
 
Reactive:
“You are slightly reactive.”
 
Drifting:
“Your structure is weakening.”
 
Serif
28–32px
White
 
This must not feel judgmental.
 
Subtext
 
Steady:
“Maintain rhythm.”
 
Reactive:
“Pause before acceleration.”
 
Drifting:
“Re-enter with simplicity.”
 
16px
Opacity 70%
 
🟡 Identity State Indicator (Visual)
 
A horizontal minimal bar beneath headline.
 
Not a progress bar.
Not a streak meter.
 
It represents:
Stability continuum.
 
Left: Drifting
Middle: Reactive
Right: Steady
 
Indicator dot subtly glows at position.
 
Colors:
• Drifting: muted amber (#B45309)
• Reactive: soft orange (#C2410C)
• Steady: calm green (#065F46)
 
But very muted.
Not bright traffic lights.
 
2️⃣ PRACTICE ACCESS CARDS (Core Actions)
 
Three stacked cards.
 
Each card = entry to Practice Runner.
 
Spacing: 16px
 
Card style:
• Background: #1F2937
• Border: #374151
• Radius: 16px
• Padding: 20px
 
Card 1 — Mantra
 
Title:
“Mantra Practice”
 
Subtext:
“18 repetitions remaining.”
 
If completed:
“Completed today.”
 
Right side:
Small subtle status dot.
 
Tap → PracticeRunner (mantra_runner)
 
Card 2 — Sankalp Embodiment
 
Title:
“Sankalp Embodiment”
 
Subtext:
“Live your intention.”
 
If completed:
“Activated today.”
 
Tap → PracticeRunner (sankalp_embody)
 
Card 3 — Anchor
 
Title:
“Anchor Stability”
 
Subtext:
“5 minutes.”
 
If completed:
“Completed.”
 
Tap → PracticeRunner (anchor_timer)
 
Cards should dynamically reorder if incomplete first (optional future enhancement).
 
3️⃣ EMBODIMENT CHALLENGE ENTRY
 
Separate slightly elevated card:
 
Background slightly brighter (#273244)
 
Title:
“Dharma in Action”
 
Subtext:
Today’s behavioral challenge.
 
Example:
“Pause before responding in conflict.”
 
Tap → Embodiment Challenge Runner.
 
4️⃣ LIVE ADAPTATION TOAST
 
Non-blocking toast at top or bottom.
 
Example:
 
“Resistance detected. Simplify today.”
 
Fade in 300ms.
Auto dismiss 4s.
 
No modal interruption.
 
5️⃣ TRIGGER ENTRY (Persistent Button)
 
Small fixed button bottom-right:
 
“I feel triggered”
 
Minimal pill.
Opacity 80%.
No bright red.
 
Tap → Awareness & Trigger container (trigger_sos mode)
 
This must always be accessible.
 
🎬 MICRO-INTERACTIONS
 
Allowed:
• Card subtle elevation on tap
• Identity dot pulse when state changes
• Soft fade transitions
• Gentle haptic on practice completion
 
Not allowed:
• Completion confetti
• Big checkmarks
• Progress streak fireworks
• Animated charts
 
This is calm control.
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
CompanionDashboardContainer
 
Schema props:
{
 day_number: number,
 total_days: number,
 identity_state: "steady" | "reactive" | "drifting",
 mantra: {
   reps_total: number,
   reps_completed: number
 },
 sankalp_completed_today: boolean,
 anchor: {
   duration: number,
   completed_today: boolean
 },
 challenge: {
   text: string,
   completed?: boolean
 },
 live_adaptation?: {
   message: string,
   tone: "gentle" | "firm"
 }
}
 
🛠 BEHAVIOR RULES
1. Must update live after practice completion.
2. Identity state recalculates via backend signals.
3. Dashboard must not refresh full screen — use reactive updates.
4. Log:
o dashboard_viewed
o practice_entry_clicked
o trigger_entry_clicked
 
🔐 LOGIC CONDITIONS
 
Show only if:
activeCycle === true
If cycle paused:
Route to Cycle Transitions container.
 
If cycle complete:
Route to Reflection container.
 
📱 RESPONSIVE RULES
 
Mobile:
Single column.
 
Tablet:
Still single column.
Do not grid.
This is not analytics.
 
🚫 DO NOT ADD
• Streak numbers
• Achievement medals
• XP meters
• Motivational quotes
• Decorative graphics
• Background imagery
 
This is operational focus.
 
🧘‍♂️ UX PSYCHOLOGY
 
This dashboard communicates:
 
You are inside a system.
 
It should feel:
Stable.
Intentional.
Alive but calm.
 
If too animated → feels gamified.
If too static → feels dead.
If too busy → feels stressful.
 
Balance:
Structured minimalism.
 
🔥 WHY THIS MATTERS
 
This container determines retention.
 
Users will spend 80% of time here.
 
If this feels:
Calm and stable → daily return increases.
Chaotic → abandonment increases.
Overly rewarding → dependency behavior increases.
 
This is disciplined identity, not dopamine loops.
 
 
🔵 CONTAINER 8 — 
PRACTICE RUNNER
 
Purpose:
Execute the practice in a focused, interruption-free environment.
 
Covers States:
21. Mantra Practice Screen
22. Mantra Rep Counter Feedback
23. Mantra Completion State
24. Sankalp Embodiment Screen
25. Sankalp Activation Confirmation
26. Anchor Timer Screen
27. Anchor Completion State
 
This is where identity is trained.
 
It must feel:
• Immersive
• Focused
• Quiet
• Serious
 
No navigation clutter.
No dashboard elements visible.
No streak reinforcement.
 
This is execution mode.
 
🌿 VISUAL MOOD
 
Darker than dashboard.
 
Background:
Solid deep navy (#0B1220)
Minimal gradient.
 
Reduce visual noise.
 
This is “practice chamber” mode.
 
📐 GENERAL STRUCTURE
 
All variants use same base layout:
 
Top 10% → Exit control
Center 70% → Core practice interface
Bottom 20% → Action state / CTA
 
No tabs.
No header bar.
No navigation drawer.
 
Only:
Back (top-left subtle).
 
🧘 VARIANT 1 — MANTRA RUNNER
 
Header (Very Minimal)
 
Top-left:
“Exit”
 
Small.
Opacity 60%.
 
No headline at top.
The mantra itself is the headline.
 
Center Focus Area
 
Display mantra text:
 
Example:
“Om Shanti Shanti Shanti”
 
Typography:
• Serif
• 28–32px
• Center aligned
• Line height 1.5
• Soft white
 
Below mantra:
 
Rep Counter:
“7 / 18”
 
Large.
22px.
Medium weight.
 
Interaction Method
 
Two supported modes:
 
Mode A — Tap-to-Count
 
Large circular touch zone (invisible).
 
Each tap:
+1 rep
Subtle haptic pulse.
 
Mode B — Auto Rhythm (Optional future)
 
Soft timed cadence.
 
For now:
Tap-based is primary.
 
Visual Feedback Per Rep
• Counter increments
• Soft micro scale animation (1.02 → 1.0)
• Subtle glow pulse
 
No sound.
 
Completion State (When reps reached)
 
Screen gently brightens.
 
Headline:
 
“Mantra complete.”
 
Subtext:
“Stability reinforced.”
 
CTA:
“Return to Day”
 
No gold.
No confetti.
 
🧠 VARIANT 2 — SANKALP EMBODY
 
This is not repetition.
This is activation.
 
Center Focus
 
Display Sankalp text:
 
“I respond without raising my voice.”
 
Large serif.
Centered.
 
Instruction Below
 
“Read slowly.
Internalize.
Commit.”
 
Action Button
 
“Activate”
 
Press triggers:
 
Subtle confirmation state.
 
Activation Confirmation
 
Headline:
 
“Embodiment set.”
 
Subtext:
“Live this today.”
 
CTA:
“Return to Day”
 
No repetition counter.
No timer.
This is cognitive commitment.
 
⏳ VARIANT 3 — ANCHOR TIMER
 
Center Display
 
Large timer display:
 
“04:12”
 
Monospace font recommended.
Large.
Centered.
 
Below:
“Remain still.”
 
Controls
 
Start / Pause / Resume.
 
Minimal icon buttons.
Small.
 
No circular countdown animation.
No breathing visuals.
Just time.
 
Completion State
 
Headline:
 
“Anchor complete.”
 
Subtext:
“Nervous system stabilized.”
 
CTA:
“Return to Day”
 
🎬 MICRO-INTERACTIONS (ALL VARIANTS)
 
Allowed:
• Soft fade in/out
• Subtle glow on completion
• Light haptic on rep increment
• Gentle tone shift after completion
 
Not allowed:
• Vibrant colors
• Sound effects
• Gamified animation
• Fireworks
• Badge visuals
 
This is training.
Not reward loops.
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
PracticeRunnerContainer
 
Schema props:
{
 variant: "mantra_runner" | "sankalp_embody" | "anchor_timer",
 mantra_text?: string,
 reps_total?: number,
 reps_completed?: number,
 sankalp_text?: string,
 anchor_duration?: number,
 state: "active" | "completed"
}
 
🛠 BEHAVIOR RULES
1. Disable bottom navigation while active.
2. Persist state if app backgrounded.
3. For mantra:
o Prevent accidental double-tap overflow.
4. For anchor:
o Timer must survive backgrounding.
5. Log:
o practice_started
o practice_completed
o practice_abandoned
 
🔐 LOGIC CONDITIONS
 
On completion:
Update Dashboard live.
 
Do NOT auto-navigate immediately.
Require user to tap return.
 
📱 RESPONSIVE RULES
 
Mobile:
Full screen immersive.
 
Tablet:
Centered content.
Still immersive.
No sidebars.
 
🚫 DO NOT ADD
• Streak counters
• XP gains
• Encouragement like “Great job!”
• Motivational quotes
• Decorative background imagery
 
Execution mode must feel focused.
 
🧘‍♂️ UX PSYCHOLOGY
 
This container builds:
 
Repetition → Neural pattern
Silence → Nervous regulation
Commitment → Behavioral reinforcement
 
If overly stimulating:
Training weakens.
 
If overly decorative:
Focus weakens.
 
If overly empty:
User disengages.
 
Balance:
Minimal immersive structure.
 
🔥 WHY THIS MATTERS
 
This is the engine of the entire system.
 
If this feels:
Serious → user internalizes.
Playful → user gamifies.
Busy → user distracts.
 
It must feel like:
Entering a chamber.
Training identity.
Returning changed.
 
 
🟠 CONTAINER 9 — 
EMBODIMENT CHALLENGE RUNNER
 
Purpose:
Translate discipline into real-world behavioral action.
 
Covers States:
28. Daily Embodiment Challenge Card
29. Embodiment Outcome Toggle (Completed / Avoided / Not Tested)
 
This is where the system leaves the screen and enters life.
 
It must feel:
• Clear
• Behavioral
• Real-world grounded
• Non-judgmental
• Non-motivational
 
This is not inspiration.
This is application.
 
🌿 VISUAL MOOD
 
Same base dark background:
#0B1220
 
But slightly warmer center tone compared to Practice Runner.
 
Why?
 
Practice Runner = inward focus
Embodiment Runner = outward action
 
Subtle warmth:
#111827 center radial fade
 
No imagery.
No icons.
No illustrations.
 
📐 LAYOUT STRUCTURE
 
1️⃣ Header Section (Top 15%)
 
Micro Label:
“DHARMA IN ACTION”
 
Uppercase
12–14px
Opacity 60%
 
Headline:
 
“Today’s Embodiment”
 
Serif
28–32px
White
 
Subtext (Optional, 1 line):
 
“Behavior over intention.”
 
16px
Opacity 70%
 
2️⃣ CHALLENGE CARD (Center Focus)
 
Single large card.
Max width: 520px.
Centered.
 
Card styling:
• Background: #1F2937
• Border: #374151
• Radius: 20px
• Padding: 28px
 
Challenge Text
 
Large serif text.
Centered.
 
Example variations:
 
If Calm:
“Pause 3 seconds before responding in tension.”
 
If Wealth:
“Review one expense before spending.”
 
If Relationships:
“Speak one honest sentence you would normally avoid.”
 
If Health:
“Stop work when tired instead of pushing.”
 
Typography:
22–26px
White
Line height 1.6
 
This must feel weighty.
Not instructional.
Not bossy.
 
3️⃣ ACTION REFLECTION SECTION
 
Below challenge:
 
Small subtext:
 
“Did this occur today?”
 
Sans serif
Opacity 60%
 
Outcome Toggle Buttons
 
Three horizontally stacked buttons (vertical on mobile if tight):
1. Completed
2. Avoided
3. Not Tested
 
Button style:
• Background: #111827
• Border: #374151
• Radius: 14px
• Padding: 14px 18px
 
On select:
• Border brightens (#4B5563)
• Subtle glow
• State saved
 
No red/green harsh signals.
Use muted tone changes.
 
4️⃣ CONDITIONAL MICRO-REFLECTION
 
If “Avoided” selected:
 
Small text box appears:
 
“What interrupted you?”
 
Single-line optional input.
 
Not required.
No long journaling.
 
If “Completed” selected:
 
Small confirmation text:
 
“Behavior reinforced.”
 
Opacity 70%.
 
No celebration.
 
5️⃣ CTA SECTION
 
After selection:
 
Primary Button:
 
“Return to Day”
 
Must require outcome selection before enabling.
 
🎬 MICRO-INTERACTIONS
 
Allowed:
• Toggle soft highlight
• Fade-in reflection input
• Subtle haptic on selection
 
Not allowed:
• Emoji reactions
• Thumbs up icons
• Reward badges
• Dramatic success states
 
This is self-honesty, not achievement.
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
EmbodimentChallengeRunnerContainer
 
Schema props:
{
 challenge_text: string,
 outcome_selected?: "completed" | "avoided" | "not_tested",
 allow_reflection_input: boolean,
 reflection_placeholder?: string,
 next_action: string
}
 
🛠 BEHAVIOR RULES
1. Must store outcome in cycle day log.
2. Reflection input optional.
3. Must log:
o embodiment_completed
o embodiment_avoided
o embodiment_not_tested
4. Cannot skip without selection.
5. If no interaction by evening → dashboard shows reminder nudge.
 
🔐 LOGIC CONDITIONS
 
Show challenge once per day.
 
If completed:
Dashboard shows “Completed.”
 
If avoided:
Dashboard reflects slight state impact (reactive drift probability increase).
 
📱 RESPONSIVE RULES
 
Mobile:
Stack toggle vertically if width tight.
 
Tablet:
Keep centered.
Do not grid.
 
🚫 DO NOT ADD
• Performance scoring
• Red X icons
• Green check explosions
• Shame messaging
• Motivational quotes
 
This must remain neutral.
 
🧘‍♂️ UX PSYCHOLOGY
 
This container builds:
 
Accountability without guilt.
 
If user feels judged:
Drop-off increases.
 
If user feels praised:
Behavior becomes reward-driven.
 
If neutral:
Self-honesty increases.
 
That is the goal.
 
🔥 WHY THIS MATTERS
 
Without this container:
 
The cycle stays internal.
No behavioral proof.
 
With it:
 
Identity crosses into action.
 
This is where transformation becomes real.
 
🟣 CONTAINER 10 — AWARENESS & TRIGGER (UPDATED)
 
Purpose:
 
Real-time stabilization layer.
 
This container handles:
 
• Proactive awareness check-ins
• Emergency “I feel triggered” entry
• Breath reset
• Quick mantra loop
• Reflection
• Dharmic response selection
• Post-trigger reinforcement
• Evening Quick Close (15-second one-tap)
 
Covers States:
 
32–39, 63, 69. Evening Quick Close
 
This is the nervous system regulator of the OS.
 
It must feel:
• Calm
• Contained
• Safe
• Non-judgmental
• Fast
 
This is not journaling.
This is not therapy.
This is structured reset.
 
🌿 VISUAL MOOD
 
Deep navy base (#0B1220)
Center radial soft desaturation (5–8%)
 
Containment space.
Quieter than dashboard.
 
🧭 ENTRY MODES (3)
 
Mode A — Midday Check-In (Proactive)
 
User taps: “Check in”
Tone: reflective
 
Mode B — Trigger SOS (Reactive)
 
User taps persistent button: “I feel triggered”
Tone: stabilizing
 
Mode C — Evening Quick Close (Auto-triggered 21:00–23:00)
 
Non-blocking BottomSheet from Dashboard
Tone: gentle closure
 
All three use the same container.
Different entry flows.
 
📐 LAYOUT STRUCTURE
 
Single-column stack.
Full screen (except Evening variant).
Top-left: “Exit” (subtle)
 
🟡 FLOW STRUCTURE
 
Step-based internally.
Soft fades only.
 
🔹 STEP 1 — STATE ACKNOWLEDGMENT
 
“What are you experiencing?”
 
Options:
• Irritation
• Anxiety
• Urgency
• Fatigue
• Avoidance
• Other
 
Single select → auto advance.
 
🔹 STEP 2 — 3-BREATH RESET (SOS mode)
 
“Inhale.”
“Exhale.”
3 cycles.
 
Minimalist text transitions.
Optional subtle haptic.
 
🔹 STEP 3 — QUICK MANTRA LOOP
 
Auto-set to 9 reps.
Tap-to-count.
Advance on completion.
 
🔹 STEP 4 — TRIGGER REFLECTION
 
“What triggered this?”
Optional single-line input.
 
🔹 STEP 5 — DHARMIC RESPONSE SELECTION
 
“How will you respond?”
 
Dynamic discipline-based options.
Single select.
 
🔹 STEP 6 — REINFORCEMENT MESSAGE
 
“Return steady.”
“You interrupted reaction.”
 
CTA: Return to Day
 
🟡 EVENING QUICK CLOSE VARIANT
 
Shown as BottomSheet (non-blocking).
 
Headline (serif 28px):
“Did you live your Sankalp today?”
 
Sankalp preview (subtle italic below).
 
Three large neutral pills:
 
• Fully ● (steady)
• Partially ◐ (reactive)
• Not today ○ (drifting)
 
One-tap selection → auto-save + update identity_state.
 
Takes <15 seconds.
Optional 1-line note disabled by default.
 
No reinforcement screen.
Closes automatically.
 
🧠 FRONTEND DEVELOPER NOTES
 
Component:
AwarenessTriggerContainer
 
Schema props:
{
 mode: "midday_checkin" | "trigger_sos" | "evening_quick_close",
 emotion_options: string[],
 mantra_text?: string,
 dharmic_response_options: string[],
 allow_reflection: boolean,
 sankalp_preview?: string,
 next_action: string
}
 
🛠 BEHAVIOR RULES
1. Must interrupt dashboard flow (except evening).
2. Target duration < 90 seconds (except evening).
3. If user exits mid-flow → log partial.
4. Log:
o trigger_initiated
o trigger_completed
o emotion_selected
o dharmic_response_selected
5. Update identity_state immediately.
6. Evening variant auto-triggers 21:00–23:00 if activeCycle && !closedToday.
7. Log: …, evening_quick_close_selected
 
🔐 LOGIC CONDITIONS
 
Accessible anytime during active cycle.
 
Dashboard button “I feel triggered” must persist.
 
 
🟤 CONTAINER 11 — INSIGHTS & PROGRESS (UPDATED)
 
Purpose:
 
Reveal pattern.
Reinforce awareness.
Close loops without gamification.
Include weekly voice reflection and legacy timeline (unlocked after 3 cycles).
 
Covers States:
 
40–42, 63–68, 70. Weekly Voice Reflection Prompt, 71. Legacy Timeline View
 
This is reflection.
 
Not analytics.
 
🌿 VISUAL MOOD
 
Dark gradient (#0B1220 → #111827)
Spacious grid alignment
Calm intelligence
 
📐 STRUCTURE
 
Single-column stack.
Max width: 620px centered.
 
🔹 SECTION 1 — WEEKLY INSIGHT SNAPSHOT
 
Headline:
“You remained steady 62% of the time.”
 
Subtext:
“Reactivity peaked on Tuesday afternoons.”
 
Neutral tone.
 
🔹 SECTION 2 — STABILITY GRAPH
 
Minimal line graph.
 
Muted colors:
Drift (amber)
Reactive (orange)
Steady (green)
 
Tooltip on tap.
 
No animations.
 
🔹 SECTION 3 — TRAIT RADAR
 
5 axes:
Stability
Integrity
Follow-through
Regulation
Awareness
 
Thin lines.
No numbers.
 
🔹 SECTION 4 — BEHAVIORAL INSIGHT NARRATIVE
 
AI-generated summary (4–5 lines).
 
Analytical tone.
 
🔹 SECTION 5 — EVENING ACCOUNTABILITY
 
“Did you live your Sankalp?”
 
Yes
Partially
No
 
Optional note.
 
🔹 SECTION 6 — STABILITY NOTE
 
If triggers high:
 
“Consider reducing anchor intensity.”
 
Links to Cycle Transitions.
 
🔹 SECTION 7 — CYCLE COMPLETION
 
“Cycle Complete.”
 
Subtle gold accent border.
 
CTA:
Review Progress
Continue / Deepen
 
🔹 SECTION 8 — CYCLE HISTORY ARCHIVE
 
List of past cycles.
 
Expandable.
 
🔹 SECTION 9 — WEEKLY VOICE REFLECTION
 
Appears:
Every Sunday 20:00–22:00
OR end of 7-day cycle
 
Optional BottomSheet or top of Insights.
 
Headline:
“One minute on this week”
 
Prompt:
“What felt different in your body when you lived your Sankalp?”
 
Large centered microphone button.
Subtle gold accent on press.
 
60-second countdown (monospace).
No pressure UI.
 
Auto-transcribe.
AI adds one sentence to Behavioral Insight Narrative.
 
“Skip” always visible.
 
🔹 SECTION 10 — LEGACY TIMELINE (Unlocked After 3 Cycles)
 
Vertical timeline.
Subtle connecting line.
 
Each cycle card:
 
• Discipline + Sankalp (serif)
• Tiny blurred radar thumbnail
• Completion date
 
Tap → Before/After radar comparison.
 
Final line at bottom:
 
“You are no longer the same person who began.”
 
Accessible:
• From history
• After Cycle Completion CTA
 
🧠 FRONTEND DEVELOPER NOTES
 
Component:
InsightsProgressContainer
 
Schema props:
{
 weekly_summary?: { ... },
 trigger_patterns?: Array<...>,
 radar_traits?: { ... },
 behavioral_narrative?: string,
 evening_reflection?: { ... },
 cycle_status?: "active" | "complete",
 history?: Array<...>,
 weekly_voice_prompt?: {
   headline: string,
   prompt: string,
   max_duration_seconds: 60
 },
 legacy_timeline?: {
   cycles: Array<{
     number: number,
     discipline: string,
     sankalp: string,
     days: number,
     radar: object,
     completion_date: string
   }>,
   evolution_note: string
 }
}
 
🛠 BEHAVIOR RULES
1. Pull aggregated analytics from backend.
2. Do not compute heavy metrics client-side.
3. Radar normalized to baseline.
4. Evening reflection updates identity_state.
5. Weekly voice note transcription feeds Behavioral Insight Narrative.
6. Legacy timeline unlocks automatically after cycle #3.
7. Log: …, voice_reflection_saved
 
🔐 LOGIC CONDITIONS
 
If cycle active → show weekly summary.
 
If cycle complete → show radar + deepen CTA.
 
If totalCompletedCycles >= 3 → show Legacy View CTA on completion and in history.
 
 
🔴 CONTAINER 12 — 
CYCLE TRANSITIONS
 
(Adaptive Intelligence + Deepen / Extend / Switch / Pause / Recover Engine)
 
Purpose:
Handle every structural shift without breaking stability.
 
Covers States:
43–62
• Resistance detected
• Ego inflation check
• Plateau detection
• Stability pivot
• Escalation suggestion
• Inactivity recovery
• Resume / Restart / Recalibrate
• Intentional pause
• Gentle exit
• Continue vs Deepen
• Deepen selection
• Extension activation
• Switch focus guardrail
• Cross-cycle integrity message
 
This is where the companion becomes intelligent.
 
It must feel:
• Calm
• Structured
• Analytical
• Non-judgmental
• Protective of integrity
 
No emotional drama.
No pushy nudges.
No growth hype.
 
This is structural governance.
 
🌿 VISUAL MOOD
 
Same base gradient:
#0B1220 → #111827
 
But slightly more neutral than dashboard.
 
No warmth.
No glow.
No ritual gold.
 
This is governance layer.
 
📐 CORE LAYOUT
 
Single centered decision card.
Max width: 520px.
 
This container never shows more than one major decision at once.
 
Everything is card-based.
 
🧩 STRUCTURE
 
Each transition type uses the same visual system:
1. Micro Label
2. Analytical Headline
3. Neutral Explanation
4. Decision Buttons
 
No icons.
No illustrations.
No animations beyond fade.
 
🔹 TRANSITION TYPE 1 — RESISTANCE DETECTED
 
Micro Label:
“PATTERN DETECTED”
 
Headline:
“Resistance is increasing.”
 
Subtext:
“You skipped 3 consecutive anchors.”
 
Buttons:
• Simplify Today
• Maintain Structure
 
No judgment.
No warning color.
 
🔹 TRANSITION TYPE 2 — EGO INFLATION CHECK
 
Headline:
“Structure feels effortless.”
 
Subtext:
“Ensure you’re not over-extending.”
 
Buttons:
• Maintain Current Level
• Deepen Layer
 
This prevents premature escalation.
 
🔹 TRANSITION TYPE 3 — PLATEAU DETECTION
 
Headline:
“Progress has stabilized.”
 
Subtext:
“You may be ready to deepen.”
 
Buttons:
• Deepen Practice
• Continue Current Cycle
 
🔹 TRANSITION TYPE 4 — STABILITY PIVOT (Reduce Intensity)
 
Headline:
“Simplify to stabilize.”
 
Subtext:
“Reduce reps temporarily to preserve rhythm.”
 
Buttons:
• Reduce Structure
• Maintain
 
🔹 TRANSITION TYPE 5 — INACTIVITY RECOVERY
 
Headline:
“Structure paused.”
 
Subtext:
“You have been inactive for 4 days.”
 
Buttons:
• Resume
• Restart
• Recalibrate
 
Each routes differently:
 
Resume → Continue same day count
Restart → Reset day counter
Recalibrate → Adjust structure
 
🔹 TRANSITION TYPE 6 — INTENTIONAL PAUSE
 
User-initiated.
 
Headline:
“Pause Cycle?”
 
Subtext:
“Structure will suspend without reset.”
 
Buttons:
• Pause
• Cancel
 
After pause:
Show soft message:
 
“Cycle paused intentionally.”
 
🔹 TRANSITION TYPE 7 — GENTLE EXIT
 
Headline:
“Exit Cycle?”
 
Subtext:
“This will close your active structure.”
 
Buttons:
• Exit
• Continue
 
No guilt messaging.
 
🔹 TRANSITION TYPE 8 — CONTINUE VS DEEPEN (Post 7 Days)
 
Headline:
“7 Days Complete.”
 
Subtext:
“Extend or deepen?”
 
Buttons:
• Continue to Day 14
• Deepen Layer
 
🔹 TRANSITION TYPE 9 — DEEPEN SELECTION
 
Same ChoiceStack visual logic.
But inside this container.
 
Headline:
“Select deeper layer.”
 
Options:
• Increase mantra reps
• Increase anchor duration
• Add refinement layer
 
Single select.
Then confirmation.
 
🔹 TRANSITION TYPE 10 — SWITCH FOCUS GUARDRAIL
 
Headline:
“Switching focus resets momentum.”
 
Subtext:
“Proceed intentionally.”
 
Buttons:
• Confirm Switch
• Cancel
 
🔹 TRANSITION TYPE 11 — CROSS-CYCLE INTEGRITY MESSAGE
 
Shown when starting new cycle too quickly.
 
Headline:
“Integration is incomplete.”
 
Subtext:
“Consider reflection before restarting.”
 
Buttons:
• Continue Anyway
• Review Insights
 
🎬 MICRO-INTERACTIONS
 
Allowed:
• Fade in/out
• Subtle border highlight on hover
• Light haptic on confirm
 
Not allowed:
• Slide transitions
• Dramatic animations
• Warning flashes
• Achievement tones
 
This must feel stable.
 
🧠 FRONTEND DEVELOPER NOTES
 
Component Name:
CycleTransitionsContainer
 
Schema props:
{
 transition_type:
   | "resistance"
   | "ego_check"
   | "plateau"
   | "stability_pivot"
   | "inactivity"
   | "pause"
   | "exit"
   | "continue_deepen"
   | "deepen_select"
   | "switch_focus"
   | "integrity_guardrail",
 headline: string,
 subtext: string,
 options: Array<{
   label: string,
   action: string,
   tone?: "neutral" | "primary" | "caution"
 }>
}
 
🛠 BEHAVIOR RULES
1. Only one transition at a time.
2. Must block dashboard until resolved.
3. Must log:
o transition_shown
o transition_action_selected
4. Must update backend before returning.
5. Deepen/extend changes structural parameters.
6. Restart creates new cycle ID.
7. Resume retains cycle ID.
 
🔐 LOGIC CONDITIONS
 
Transition triggers when backend detects:
 
• Inactivity threshold
• Completion threshold
• Pattern anomaly
• Resistance signals
• Manual user action
 
Frontend does not calculate.
Only renders.
 
📱 RESPONSIVE RULES
 
Mobile:
Centered card.
Single-column options.
 
Tablet:
Still centered.
No side panel.
 
🚫 DO NOT ADD
• Motivational phrases
• Shame language
• Warning icons
• Red danger colors
• “You failed”
• “Great job leveling up!”
 
This is governance.
Not emotion.
 
🧘‍♂️ UX PSYCHOLOGY
 
This container preserves:
 
Structural integrity.
 
If users can:
Switch freely → no transformation.
Escalate freely → burnout.
Pause without intention → drift.
 
This layer ensures:
Discipline remains coherent.
 
🔥 WHY THIS MATTERS
 
This container is the difference between:
 
A feature set
and
An operating system.
 
It governs state transitions.
 
Without it:
The system fragments.
 
With it:
The system becomes stable.
 
 
 