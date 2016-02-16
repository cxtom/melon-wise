/**
 * @file validity
 * @author leon(ludafa@outlook.com)
 */

function ValidityState({isValid, message}) {
    this.isValid = isValid;
    this.message = message || '';
}

class Validity {

    constructor() {
        this.states = [];
    }

    addState(state) {
        this.states.push(new ValidityState(state));
    }

    isValid() {
        for (let i = 0, states = this.states, len = states.length; i < len; ++i) {
            if (!states[i].isValid) {
                return false;
            }
        }
        return true;
    }

    getMessage() {
        for (let states = this.states, i = 0, len = states.length; i < len; ++i) {
            if (!states[i].isValid) {
                return states[i].message;
            }
        }
        return '';
    }
}

module.exports = Validity;
