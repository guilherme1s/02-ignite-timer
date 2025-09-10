import type { Cycle } from "./reducer";

export const ActionTypes = {
  ADD_NEW_CYCLE: "ADD_NEW_CYCLE",
  INTERRUPT_NEW_CYCLE: "INTERRUPT_NEW_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED: "MARK_CURRENT_CYCLE_AS_FINISHED",
} as const;

export type ActionTypes = (typeof ActionTypes)[keyof typeof ActionTypes];

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function markAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  };
}

export function interruptNewCycle() {
  return {
    type: ActionTypes.INTERRUPT_NEW_CYCLE,
  };
}
