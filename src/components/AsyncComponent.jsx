import React, { Component } from "react";
import Skeleton from './skeleton';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      //模拟loading效果
      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 2000);
      });

      this.setState({
        component: component
      });
    }

    componentWillUnmount() {
      this.setState = (state, callback) => {
        return;
      }
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <Skeleton />;
    }
  }

  return AsyncComponent;
}
