// some code stolen from https://raw.githubusercontent.com/josuerojasrojas/TTP-FS/master/src/Helpers/InputFunctions.js

import React from 'react';
import '../styles/SlideupPanel.css';
import TextInput from './Input';
import Iframe from './Iframe';
import { hasInput, emailCheck } from '../helpers/inputCheck';
import { checkAllInputs } from '../helpers/inputFunctions';


// a panel that hides in mobile...
export default class SlideupPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationHash: "",
      isActive: false,
      name: {
        val: '',
        hasError: false
      },
      email: {
        val: '',
        hasError: false,
      },
      message: {
        val: '',
        hasError: false
      },
      form_message: '',
      isSubmitting: false,
    };
    this.changeWindow = this.changeWindow.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitEnd = this.submitEnd.bind(this);
    this.mainContent = this.mainContent.bind(this);
    this.altContent = this.altContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.checkInput = {
      name: hasInput,
			email: emailCheck,
      message: hasInput
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.changeWindow, false);
    this.changeWindow();
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.changeWindow, false);
  }

  changeWindow() {
    this.setState({ locationHash: window.location.hash });
  }

  toggleActive() {
    this.setState({ isActive: !this.state.isActive });
  }

  onInputChange(e, inputKey){
    let inputState = { ...this.state[inputKey] };
    inputState.val = e.target.value;
    inputState.hasError = !this.checkInput[inputKey](e.target.value);
    this.setState({
      [inputKey]: inputState,
      form_message: ''

    });
  }

  submitForm(event) {
    let errors = checkAllInputs(this.checkInput, this.state);
    if(errors) {
      this.setState(errors);
      return event.preventDefault();
    }
    this.setState({ isSubmitting: true });
    return true;
  }

  // aftter sending the form we reset the values and give a small message
  submitEnd() {
    this.setState({
      name: {
        val: '',
        hasError: false
      },
      email: {
        val: '',
        hasError: false,
      },
      message: {
        val: '',
        hasError: false
      },
      form_message: 'Thank you for signing up to do something! You are on the right steps to doing something about it.',
      isSubmitting: false,
    });
  }

  // i didnt want to bother creating another component so here is function
  mainContent() {
    return (
      <div className='main'>
        <h1 className='title alt-font'>{this.props.title}</h1>
        <p className='message'>{this.props.message}</p>
        <Iframe name='hidden_iframe' id="hidden_iframe" style={{ display : 'none'}} onLoad={this.submitEnd} />
        <form
          className='form'
          target="hidden_iframe"
          onSubmit={this.submitForm}
          method='post'
          action='https://docs.google.com/forms/d/e/1FAIpQLSe11JrlpmSRi90DwHD2Zfq_H8bBZsSScRhrHztqE1rX4OecyA/formResponse'>
          <TextInput
            name='entry.1255219325'
            title='Name'
            placeholder='Your Name'
            value={this.state.name.val}
            hasError={this.state.name.hasError}
            onChange={(e) => this.onInputChange(e, 'name')} />
          <TextInput
            name='entry.680077576'
            title='E-mail'
            type='email'
            value={this.state.email.val}
            placeholder='example@google.com'
            hasError={this.state.email.hasError}
            onChange={(e) => this.onInputChange(e, 'email')} />
          <TextInput
            name='entry.925890475'
            title='Message'
            placeholder='A quick message'
            value={this.state.message.val}
            hasError={this.state.message.hasError}
            onChange={(e) => this.onInputChange(e, 'message')} />
          {this.submitButton(this.state.isSubmitting)}
        </form>
        <div className='message'>
          {this.state.form_message}
        </div>
        <footer>
          <a href='./#terms'>Terms and Conditions</a>
        </footer>
      </div>
    );
  }

  altContent() {
    return (
      <div className='main'>
        <a className='button' href='./#'>Back</a>
        <p className='terms'>
          To be, or not to be, that is the question:
          Whether 'tis nobler in the mind to suffer
          The slings and arrows of outrageous fortune,
          Or to take arms against a sea of troubles
          And by opposing end them. To die—to sleep,
          No more; and by a sleep to say we end
          The heart-ache and the thousand natural shocks
          That flesh is heir to: 'tis a consummation
          Devoutly to be wish'd. To die, to sleep;
          To sleep, perchance to dream—ay, there's the rub:
          For in that sleep of death what dreams may come,
          When we have shuffled off this mortal coil,
          Must give us pause—there's the respect
          That makes calamity of so long life.
          For who would bear the whips and scorns of time,
          Th'oppressor's wrong, the proud man's contumely,
          The pangs of dispriz'd love, the law's delay,
          The insolence of office, and the spurns
          That patient merit of th'unworthy takes,
          When he himself might his quietus make
          With a bare bodkin? Who would fardels bear,
          To grunt and sweat under a weary life,
          But that the dread of something after death,
          The undiscovere'd country, from whose bourn
          No traveller returns, puzzles the will,
          And makes us rather bear those ills we have
          Than fly to others that we know not of?
          Thus conscience does make cowards of us all,
          And thus the native hue of resolution
          Is sicklied o'er with the pale cast of thought,
          And enterprises of great pitch and moment
          With this regard their currents turn awry
          And lose the name of action.
        </p>
      </div>
    )
  }

  // a function to render the submit button (again i dont want to create another component which might be a bad idea)
  submitButton(isSubmitting) {
    return (
      <div className='button-wrapper'>
        <input
          className='button'
          type="submit"
          value="Submit"
          disabled={isSubmitting}/>
        <div className={`loader ${isSubmitting ? 'show' : 'hide'}`}></div>
      </div>
    )
  }

  getContent(hash) {
    // should probably use a switch (cause of speed)...
    return hash === '#terms' ? this.altContent() : this.mainContent();
  }

  render() {
    return(
      <div className={`slideup-panel ${this.state.isActive ? 'show' : 'hidden'}`}>
        <div className='mobile-only menu-button' onClick={this.toggleActive}>
          { this.state.isActive ? 'Close' : 'Sign Up' }
        </div>
        {this.getContent(this.state.locationHash)}
      </div>
    )
  }
}
