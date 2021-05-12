import React, { Component } from "react";
import "./Counter.css";

const ErrorComponent = () => <div>{this.ignore}</div>;

class Counter extends Component {
  constructor(props) {
    console.log("Constructor");
    super(props);
    this.state = {
      counter: 0,
      seed: 0,
    };

    this.increment = () => this.setState({ counter: this.state.counter + 1 });
    this.decrement = () => this.setState({ counter: this.state.counter - 1 });
  }

  static getDerivedStateFromProps(props, state) {
    // invoked right before calling render method, both on the initial mount and on subsequent updates
    // should return an object to update the state or null to update nothing
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
        initializing: true,
      };
    }
    return null;
  }

  componentDidMount() {
    // this is called when the component is first mounted onto the DOM.
    // doesn't get called when the component is updated or re-rendered
    console.log("component did mount");
    setTimeout(() => {
      this.setState({
        initializing: false,
      });
    }, 500);
    console.log("------------------------");
  }

  shouldComponentUpdate(nextProps, nextState) {
    // purpose of this is to let React know if a render needs to be triggered or not
    if (
      nextProps.ignoreProp &&
      this.props.ignoreProp !== nextProps.ignoreProp
    ) {
      console.log("should component update -- DO NOT RENDER");
      console.log("----------------------------");
      return false;
    }
    console.log("should component update -- RENDER");
    console.log("----------------------------");
    return true; // default
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // invoked before the most recently rendered output is committed i.e., updated to the DOM
    // it enabled to capture some information from the DOM before it is changed
    // this is passed as snapshot parameter to componentDidUpdate()
    console.log("get snapshot before update");
    console.log("----------------------------");
    return null;
  }

  render() {
    console.log("Render");

    if (this.state.initializing) {
      return <div>Initializing...</div>;
    }

    if (this.props.showErrorComponent && this.state.error) {
      return (
        <div>We have encountered an error! {this.state.error.message}</div>
      );
    }
    return (
      <div>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>

        <h1>Counter: {this.state.counter}</h1>
        {this.props.showErrorComponent ? <ErrorComponent /> : null}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // called when any updating happens
    // setState can be used, but must be used within a condition to avoid infinite loop
    console.log("component did update");
    console.log("-----------------------");
  }

  componentWillUnmount() {
    // called when the component is going to get unmounted and destroyed
    // cannot update state in this method
    console.log("component will unmount");
    console.log("------------------------");
  }

  componentDidCatch(error, info) {
    // invoked when an error has occurred in a descendant component
    // info contains the information about the component which threw the error
    console.log("component did catch");
    console.log("-----------------------");
    this.setState({ error, info });
  }
}

export default Counter;
