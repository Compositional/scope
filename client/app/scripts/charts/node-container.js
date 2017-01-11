import React from 'react';
import { omit } from 'lodash';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import { round } from '../utils/math-utils';
import Node from './node';

class NodeContainer extends React.Component {
  render() {
    const { dx, dy, focused, layoutPrecision, zoomScale } = this.props;
    const animConfig = [80, 20]; // stiffness, damping
    const other = omit(this.props, 'dx', 'dy');
    const size = (Math.random() * 2) + 0.3;

    return (
      <Motion
        style={{
          x: spring(dx, animConfig),
          y: spring(dy, animConfig),
          f: spring(size, animConfig)
        }}>
        {(interpolated) => {
          const transform = `translate(${round(interpolated.x, layoutPrecision)},`
            + `${round(interpolated.y, layoutPrecision)})`;
          return <Node {...other} transform={transform} scaleFactor={interpolated.f} />;
        }}
      </Motion>
    );
  }
}

export default connect()(NodeContainer);
