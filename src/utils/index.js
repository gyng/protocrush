// @flow

import * as types from "types";

export const Vec4 = (
  x: number,
  y: number,
  z: number,
  w: number
): types.Vec4 => ({
  x,
  y,
  z,
  w
});

export const add4 = (a: types.Vec4, b: types.Vec4): Vec4 => ({
  x: a.x + b.x,
  y: a.y + b.y,
  z: a.z + b.z,
  w: a.w + b.w
});

export const scalar4 = (
  vec4: types.Vec4,
  scale: number | types.Vec4
): types.Vec4 => {
  if (typeof scale === "number") {
    return {
      x: vec4.x * scale,
      y: vec4.y * scale,
      z: vec4.z * scale,
      w: vec4.w * scale
    };
  }

  return {
    x: vec4.x * scale.x,
    y: vec4.y * scale.y,
    z: vec4.z * scale.z,
    w: vec4.w * scale.w
  };
};

export const scalar3 = (
  vec3: types.Vec3,
  scale: number | types.Vec3
): types.Vec4 => {
  if (typeof scale === "number") {
    return {
      ...vec3,
      x: vec3.x * scale,
      y: vec3.y * scale,
      z: vec3.z * scale
    };
  }

  return {
    ...vec3,
    x: vec3.x * scale.x,
    y: vec3.y * scale.y,
    z: vec3.z * scale.z
  };
};

export default {
  Vec4,
  scalar4,
  scalar3
};
