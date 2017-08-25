// @flow

import { ADD_ENTITY, PROCESS_PHYSICS } from "constants/actionTypes";
import type { Action, GameState } from "types";
import { scalar4, add4 } from "utils";

const initialState: GameState = {
  options: {
    tickRate: 1
  },
  es: []
};

export default (state: GameState = initialState, action: Action) => {
  switch (action.type) {
    case ADD_ENTITY:
      return {
        ...state,
        es: [...state.es, action.e]
      };
    case PROCESS_PHYSICS:
      return {
        ...state,
        es: state.es.map(e => {
          if (!e.cs.phy) {
            return e;
          }

          return {
            ...e,
            cs: {
              ...e.cs,
              pos: add4(e.cs.pos, e.cs.phy.spd),
              phy: {
                ...e.cs.phy,
                acc: scalar4(e.cs.phy.acc, 1 / e.cs.phy.friction),
                spd: scalar4(e.cs.phy.spd, e.cs.phy.acc)
              }
            }
          };
        })
      };
    default:
      return state;
  }
};
