import React, { Component } from 'react';

export class Wrapper extends Component {
	componentDidMount () {
		const { props } = this;
		props.onMount && props.onMount(props);
	}
	componentDidUpdate () {
		const { props } = this;
		props.onUpdate && props.onUpdate(props);
	}
	componentWillUnmount () {
		const { props } = this;
		props.onUnmount && props.onUnmount(props);
	}
	render () {
		const { children } = this.props;
		return <React.Fragment>{ children }</React.Fragment>;
	}
}