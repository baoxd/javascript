import React from "react";
import { connect } from "react-redux";

const Count = props => (
  <div>
    <h1>The count is: {props.count}</h1>
    <button onClick={props.addByOne}>Add 1</button>
    <button onClick={props.addByOneAsync}>Add 1 Async</button>
  </div>
);

const mapState = state => ({
  count: state.count,
});

const mapDispatch = ({ count }) => ({
  addByOne: () => count.addBy(1),
  addByOneAsync: () => count.addByAsync(1)
});

export default connect(mapState, mapDispatch)(Count);
