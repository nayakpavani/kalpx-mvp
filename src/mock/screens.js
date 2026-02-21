import { ContainerRegistry } from "./allContainers";

export const mockScreens = {
  // Global / Fallback screens if any can be defined here
};

// Inject all container states into the mock registry so they can be routed to directly
Object.keys(ContainerRegistry).forEach((registryKey) => {
  const container = ContainerRegistry[registryKey];
  const containerId = container.container_id;
  
  if (container.states) {
    Object.keys(container.states).forEach((stateKey) => {
      // Create a flat entry for each state from the containers
      // This allows navigating directly to a state key (e.g. "mode_toggle")
      // while preserving its container context.
      mockScreens[stateKey] = {
        id: stateKey,
        container_id: containerId,
        ...container.states[stateKey]
      };
    });
  }
});
