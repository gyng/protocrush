// @flow
/* eslint-disable react/prefer-stateless-function, react/forbid-prop-types */

import React from "react";
import PropTypes from "prop-types";
import type { Entity } from "types";
import { Vec4 } from "utils";

import * as actions from "actions";

// import hello from "./hello.jpg";
// import s from "./styles.scss";

export default class App extends React.Component {
  static defaultProps: {};
  shouldUpdate: boolean;
  lastTick: ?number;
  viewport: { width: number, height: number };
  canvas: HTMLCanvasElement;

  constructor(props: any) {
    super(props);
    this.lastTick = null;
    this.shouldUpdate = true;
    this.viewport = {
      width: 1600,
      height: 900
    };
  }

  componentDidMount() {
    window.requestAnimationFrame(this.renderViewport.bind(this));
    window.setInterval(this.tick.bind(this), this.props.game.options.tickRate);
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.viewport.width, this.viewport.height);

    // test
    const entity: Entity = {
      cs: {
        pos: Vec4(10, 10, 10, 10),
        phy: {
          acc: Vec4(1, 1, 1, 1),
          friction: 1.00001,
          spd: Vec4(1, 0, 0, 0)
        }
      }
    };
    this.props.dispatch(actions.addEntity(entity));
  }

  tick() {
    const now = new Date();
    const dt = typeof this.lastTick === "number" ? now - this.lastTick : 0;
    this.lastTick = now;

    const frameRatio = dt / this.props.game.options.tickRate;

    // this.props.tick(dt);
    this.props.tick(frameRatio);
  }

  shouldComponentUpdate() {
    // Don't update whenever we get a new game state
    return this.shouldUpdate;
  }

  renderViewport() {
    // console.log(this.canvas,  this.props.game);
    const context: CanvasRenderingContext2D = this.canvas.getContext("2d");
    // console.log(this.props.game)

    context.clearRect(0, 0, this.viewport.width, this.viewport.height);

    // console.log(this.props.game.es)

    this.props.game.es.forEach(e => {
      context.fillStyle = "yellow";
      context.fillRect(e.cs.pos.x, e.cs.pos.y, 16, 16);
    });

    window.requestAnimationFrame(this.renderViewport.bind(this));
  }

  render() {
    this.shouldUpdate = false;

    return (
      <div>
        <canvas
          style={{ border: "solid 1px red" }}
          id="canvas"
          width={this.viewport.width}
          height={this.viewport.height}
          ref={canvas => {
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
          }}
        />
      </div>
    );
  }
}

App.propTypes = {
  game: PropTypes.object,
  tick: PropTypes.func,
  dispatch: PropTypes.func
};

App.defaultProps = {
  game: { es: [] },
  tick: () => {},
  dispatch: () => {}
};
