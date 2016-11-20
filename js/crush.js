(function () {
  const canvas = document.getElementById('stage');
  const context = canvas.getContext('2d');
  // initial state
  let state = {
    entities: [
      {
        name: 'dude',
        physics: { x: 50, y: 50, dx: 0, dy: 1, w: 10, h: 10 },
        type: 'player',
        collisions: [],
        color: 'green'
      },
      {
        name: 'block1',
        physics: { x: 30, y: 500, dx: 0, dy: 0, w: 80, h: 30 },
        collisions: [],
        type: 'block',
        color: 'blue'
      }
    ]
  };

  const collision = function (entity, entityIdx, entities) {
    entity.collisions = entities.reduce((acc, e, eIdx) => {
      const p1 = entity.physics;
      const p2 = e.physics;

      if (!(entityIdx === eIdx) && !(p1.x + p1.w < p2.x || p2.x + p2.w < p1.x || p1.y + p1.h < p2.y || p2.y + p2.h < p1.y)) {
        return acc.concat(eIdx);
      } else {
        return acc;
      }
    }, []);

    return entity;
  };

  const cleanup = function (entity) {
    return !entity.dead;
  };

  const physics = function (entity) {
    if (entity.collisions.length > 0) {
      entity.collisions = [];

      if (entity.type === 'player') {
        entity.physics.dy = (entity.physics.dy + 1) / 2;
      } else if (entity.type === 'block') {
        entity.dead = true;
      }
    }

    entity.physics.dy = entity.physics.dy * 1.03;
    entity.physics.y += entity.physics.dy;
    return entity;
  };

  const step = function (state) {
    const clone = JSON.parse(JSON.stringify(state));
    clone.entities = clone.entities.map(physics);
    clone.entities = clone.entities.map((e, idx) => collision(e, idx, clone.entities));
    clone.entities = clone.entities.filter(cleanup);
    return clone;
  };

  const render = function (state, canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    state.entities.forEach(e => {
      context.fillStyle = e.color || 'red';
      context.fillRect(e.physics.x, e.physics.y, e.physics.w, e.physics.h);
    });
  };

  const gameLoop = function () {
    state = Object.assign({}, step(state));
    render(state, canvas, context);
  };

  window.setInterval(gameLoop, 1000 / 60);
}());
