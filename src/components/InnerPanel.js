import React from 'react';
import '../styles/InnerPanel.css';

export default class InnerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    return(
      <div className={`inner-panel ${this.state.isActive ? 'show' : 'hide'}`}>
        <div className='toggle-button-space'>
        </div>
        <div className='inner-panel-content'>
          <div
            className='toggle-button'
            onClick={this.toggleActive}>
            {this.props.buttonTitle}
          </div>
          <div className='inner-panel-extra'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
