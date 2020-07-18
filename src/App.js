import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = useState({
    sender: '',
    recipient: '',
    description: '',
    senderAddress: '',
    signature: '',
    status: 'NEW',
  });

  const descriptionChanged = evt => {
    setState({
      ...state,
      description: evt.target.value,
    });
  };

  const senderChanged = evt => {
    setState({
      ...state,
      sender: evt.target.value,
    });
  };
  const recipientChanged = evt => {
    setState({
      ...state,
      recipient: evt.target.value,
    });
  };

  const senderAddressChanged = evt => {
    setState({
      ...state,
      senderAddress: evt.target.value,
    });
  };

  const statusChanged = evt => {
    setState({
      ...state,
      status: evt.target.value,
    });
  };

  const isShowReady = () => state.status !== 'NEW';

  const signatureChanged = evt => {
    setState({
      ...state,
      signature: evt.target.value,
    });
  };

  const onNext = () => {
    if (state.status === 'NEW') {
      setState({
        ...state,

        status: 'READY',
      });
    } else if (state.status === 'READY') {
      setState({
        ...state,
        status: 'ENROUTE',
      });
    } else if (state.status === 'ENROUTE') {
      setState({
        ...state,
        status: 'COMPLETED',
      });
    }
  };

  const isShowEnroute = () =>
    state.status !== 'NEW' && state.status !== 'READY';

  const isShowNotHome = () => isShowEnroute() && state.status !== 'COMPLETED';

  const onNotHome = () => {
    if (state.status === 'ENROUTE') {
      setState({
        ...state,
        description: '',
        signature: '',
        status: 'READY',
      });
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
          onChange={evt => senderChanged(evt)}
        />
      </div>
      <div>
        Recipient:
        <input
          disabled={isCompleted()}
          type="text"
          value={state.recipient}
          onChange={evt => recipientChanged(evt)}
        />
      </div>
      {isShowReady() && (
        <div>
          Sender Address:
          <input
            disabled={isCompleted()}
            type="text"
            value={state.senderAddress}
            onChange={evt => senderAddressChanged(evt)}
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
              onChange={evt => descriptionChanged(evt)}
            />
          </div>
          <div>
            Signature:
            <input
              disabled={isCompleted()}
              type="text"
              value={state.signature}
              onChange={evt => signatureChanged(evt)}
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
