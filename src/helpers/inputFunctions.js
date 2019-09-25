// stolen from https://raw.githubusercontent.com/josuerojasrojas/TTP-FS/master/src/Helpers/InputFunctions.js

// functions for inputs that are here to remove repetetiveness
// basically functions that are reused


// return object of valueChaneschanges if there are any errors in inputs
// else just return false for no errors
// takes in:
// checkInput: object of { nameofInput: function to validate }
// state: object of current state of the inputs: ex {email: { val: 'sdh', hasError: false}, password: { val: '', hasError: true }}
// note: state does not have to have errors correct cause this will check them all.
export function checkAllInputs(checkInput, state, ){
  let valuesChange = {};
		let errorCount = 0;
		let valuesSubmit = {};
		for (let key in checkInput) {
			let inputState = {...state[key]};
			inputState.hasError = !checkInput[key](inputState.val);
			if(inputState.hasError){
				errorCount++;
				valuesChange[key] = inputState;
			}
			// some inputs are integers so we convert them here (errorcount and setState in the next lines should fix any values that are not valid)
			valuesSubmit[key] = inputState.typeof === 'Integer' ? parseInt(inputState.val, 10) : inputState.val;
		}
		if (errorCount > 0) {
      return valuesChange
		}
    return false;
}

// function that handles changes for any input type text or similar
// returns object of change
// parameters:
// e: e from onchange function
// inputKey: key to find value in state of input values
// state: state of keys, formatted like ex {email: { val: 'sdh', hasError: false}, password: { val: '', hasError: true }}
// checkInput: object of { nameofInput: function to validate }
export function handleOnChange(e, inputKey, state, checkInput){
  let inputState = { ...state[inputKey] };
  inputState.val = e.target.value;
  inputState.hasError = !checkInput[inputKey](e.target.value);
  return inputState;
}

// does handleOnChange()
// and sets clears tooltips
// it is also repeated code in SignupForm and SigninForm
export function onInputChangeTooltip(e, inputKey, thisScope){
  let inputState = handleOnChange(e, inputKey, thisScope.state, thisScope.checkInput);
  let newStateUpdate = { [inputKey]: inputState };
  // in case there is a tooltip
  if(thisScope.state.previousTooltip) {
    newStateUpdate[thisScope.state.previousTooltip] = { ...thisScope.state[thisScope.state.previousTooltip] };
    newStateUpdate[thisScope.state.previousTooltip].tooltip = '';
    newStateUpdate.previousTooltip = '';
  }
  thisScope.setState(newStateUpdate);
}
