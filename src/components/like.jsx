import React, { Component } from 'react';

export default class like extends Component {
  render() {
    return <i onClick={this.props.onLike} style={ {cursor:'pointer'}} className={this.heartClass()} aria-hidden="true"></i>;
  }

    heartClass() {
        let classes = "fa fa-heart";
        if (!this.props.liked)
            classes += "-o";
        return classes;
    }
}

