// @flow

export type Vec3 = {
  x: number,
  y: number,
  z: number,
  w?: number
};

export type Vec4 = {
  x: number,
  y: number,
  z: number,
  w: number
};

export type PositionComponent = Vec4;
export type PhysicsComponent = {
  acc: Vec4,
  friction: number,
  spd: Vec4
};

export type Component = PositionComponent | PhysicsComponent;

export type Entity = {
  id: string,
  cs: { [key: string]: Component }
};

// Convert this to an object for easier lookup by AI systems?
// eg. enemies face hero
export type GameState = {
  es: Array<Entity>
};

export type State = { game: GameState };

export type Action =
  | { type: "ADD_ENTITY", e: Entity }
  | { type: "PROCESS_POSITIONS", dt: number };
