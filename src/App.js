import React, {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const initState = {
    sender: '',
    recipient: '',
    description: '',
    senderAddress: '',
    signature: '',
    status: 'NEW',
  };
  /*
  const initer = args => {
    return {
      ...args,
      status: 'NEW',
    };
  };
*/
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SENDER_CHANGED':
        return {...state, sender: action.valueChanged};
      case 'RECIPIENT_CHANGED':
        return {...state, recipient: action.valueChanged};
      case 'DESCRIPTION_CHANGED':
        return {...state, description: action.valueChanged};
      case 'SENDER_ADDRESS_CHANGED':
        return {...state, senderAddress: action.valueChanged};
      case 'SIGNATURE_CHANGED':
        return {...state, signature: action.valueChanged};
      case 'STATUS_CHANGED':
        return {...state, status: action.newStatus};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  const descriptionChanged = value => {
    dispatch({type: 'DESCRIPTION_CHANGED', valueChanged: value});
  };

  const senderChanged = value => {
    dispatch({type: 'SENDER_CHANGED', valueChanged: value});
  };

  const recipientChanged = value => {
    dispatch({type: 'RECIPIENT_CHANGED', valueChanged: value});
  };

  const senderAddressChanged = value => {
    dispatch({type: 'SENDER_ADDRESS_CHANGED', valueChanged: value});
  };

  const isShowReady = () => state.status !== 'NEW';

  const signatureChanged = value => {
    dispatch({type: 'SIGNATURE_CHANGED', valueChanged: value});
  };

  const onNext = () => {
    if (state.status === 'NEW') {
      dispatch({type: 'STATUS_CHANGED', newStatus: 'READY'});
    } else if (state.status === 'READY') {
      dispatch({type: 'STATUS_CHANGED', newStatus: 'ENROUTE'});
    } else if (state.status === 'ENROUTE') {
      dispatch({type: 'STATUS_CHANGED', newStatus: 'COMPLETED'});
    }
  };

  const isShowEnroute = () =>
    state.status !== 'NEW' && state.status !== 'READY';

  const isShowNotHome = () => isShowEnroute() && state.status !== 'COMPLETED';

  const onNotHome = () => {
    if (state.status === 'ENROUTE') {
      descriptionChanged('');
      signatureChanged('');
      dispatch({type: 'STATUS_CHANGED', newStatus: 'READY'});
    }
  };

  const isCompleted = () => state.status === 'COMPLETED';

  return (
    <div>
      <div>
        Sender:
        <input
          disabled={isCompleted()}
          type="text"
          value={state.sender}
          onChange={evt => senderChanged(evt.target.value)}
        />
      </div>
      <div>
        Recipient:
        <input
          disabled={isCompleted()}
          type="text"
          value={state.recipient}
          onChange={evt => recipientChanged(evt.target.value)}
        />
      </div>
      {isShowReady() && (
        <div>
          Sender Address:
          <input
            disabled={isCompleted()}
            type="text"
            value={state.senderAddress}
            onChange={evt => senderAddressChanged(evt.target.value)}
          />
        </div>
      )}

      {isShowEnroute() && (
        <div>
          <div>
            Description:
            <input
              disabled={isCompleted()}
              type="text"
              value={state.description}
              onChange={evt => descriptionChanged(evt.target.value)}
            />
          </div>
          <div>
            Signature:
            <input
              disabled={isCompleted()}
              type="text"
              value={state.signature}
              onChange={evt => signatureChanged(evt.target.value)}
            />
          </div>
        </div>
      )}
      <div>Status: {state.status}</div>
      <div>
        <button disabled={isCompleted()} onClick={onNext}>
          Next
        </button>
        {isShowNotHome() && <button onClick={onNotHome}>Not Home</button>}
      </div>
    </div>
  );
}

export default App;
