// taken from https://raw.githubusercontent.com/josuerojasrojas/TTP-FS/master/src/Components/Inputs.js

import React from 'react';
import '../styles/Input.css';
// import Tooltip from './Tooltip';

export default class TextInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isFocus: false,
    }
  }

  toggleFocus(isFocus){
    let newFocus = typeof isFocus === 'boolean' ? isFocus : !this.state.isFocus;
    this.setState({
      isFocus: newFocus
    });
  }

  render(){
    let extraClass = this.state.isFocus ? 'focus ' : '';
    extraClass += this.props.hasError ? ' error ' : '';
    extraClass += this.props.className ? this.props.className: '';
    return(
      <div className={`text-input input ${extraClass}`}>
        <label>{this.props.title}</label>
        <input
          name={this.props.name || ''}
          disabled={this.props.disabled ? 'disabled' : ''}
          type={this.props.type || 'text'}
          autoComplete={this.props.autocomplete ? 'on' : "off"}
          onFocus={()=>this.toggleFocus(true)}
          onBlur={()=>this.toggleFocus(false)}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}/>
      </div>
    )
  }
}

// to use in your component your inputs must have tooltip ex: input: {val: '', tooltip: ''}
// a state must have previousTooltip which is a string of the name of the previous input
// and finally the object mus have a global var to keep the timer for the helper
// it should be called this.clearTooltipTimer

// to update an input with a tooltip
// you need to use the tooltipHelpers for different task
// when you are goint to update the input with a tooltips
// you need to clear the the timer
// clearTimeout(this.clearTooltipTimer);
// then update set the state for new tooltips
// and then if there exist a previousTooltip use the helper clearPrevTooltip function
// to create a timer to clear the tooltip so it won't appear in every update (like when typing an input)

// ex: updating to a state that has tooltip (the flow)
 // 1. modify state to add tooltip message
// let newState = {...this.state}
// let newState.inputName.tooltip = 'a message'
// 2. clear any clearTooltipTimer that may be running
// clearTimeout(this.clearTooltipTimer);
// 3. set the new state with the tooltip message
// this.setState(newState);
// 4. and finally call the helper function to clear the tooltip later (2300 ms)
// this will stop it from showing up again
// if(newState.previousTooltip){
//   clearPrevTooltip(this);
// }

// this might have limitations: like (i haven't tested) it probably only handles only one tooltip change
// since the previousTooltip var only holds a (one) string

// a textinput but with tooltip for messages
// export class TextInputWithTooltip extends TextInput{
//   render(){
//     let extraClass = this.state.isFocus ? 'focus' : '';
//     extraClass += this.props.hasError ? ' error' : '';
//     return(
//       <div className={`text-input input ${extraClass} ${this.props.className}`}>
//         <Tooltip message={this.props.tooltipMessage}/>
//         <label>{this.props.title}</label>
//         <input
//           disabled={this.props.disabled ? 'disabled' : ''}
//           autoComplete={this.props.autocomplete ? 'on' : "off"}
//           type={this.props.type || 'text'}
//           onFocus={()=>this.toggleFocus(true)}
//           onBlur={()=>this.toggleFocus(false)}
//           placeholder={this.props.placeholder}
//           value={this.props.value}
//           onChange={this.props.onChange}/>
//       </div>
//     )
//   }
// }

// there exist a input checkbox but i rather make a custom one
// much simpler though, it's either checked or not (no value)
// export function CheckBox(props){
//   const checkedClass = props.isChecked ? 'checked' : '';
//   return(
//     <div className={`checkbox ${props.className || ''}`}>
//       <div
//         onClick={props.onClick}
//         className={`check ${checkedClass} ${props.hasError ? 'error' : ''}`}></div>
//       {props.text}
//     </div>
//   )
// }
