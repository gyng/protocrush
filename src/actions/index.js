// @flow
/* eslint-disable import/prefer-default-export */

import * as types from "constants/actionTypes";
import type { Entity } from "types";

export const addEntity = (e: Entity) => ({
  type: types.ADD_ENTITY,
  e
});

export const processPhysics = (dt: number) => ({
  type: types.PROCESS_PHYSICS,
  dt
});

// export const incrementAsync = (value: number = 1, delay: number = 1000) => (
//   dispatch: Dispatch
// ) => setTimeout(() => dispatch(increment(value)), delay);
