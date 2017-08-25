// @flow

import { connect } from "react-redux";
import { processPhysics } from "actions";
import App from "components/App";
import type { State } from "types";

const mapStateToProps = (state: State) => ({ game: state.game });

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  tick: dt => {
    dispatch(processPhysics(dt));
  },
  dispatch
});

const ContainedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ContainedApp;
