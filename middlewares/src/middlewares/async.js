export default function({ dispatch }) {
  return next => action => {
    // If action does not have payload
    // or, the payload does not have a .then property
    // we dont care about it, send it on
    if (!action.payload || !action.payload.then) {
      return next(action);
    } // This case hadle no just another potential action that we don't want to treat here, but also the same(new) action in the new 'state' [and that's why we don't check for the action.type]

    // Make sure the action's promise resolves
    action.payload
      .then(function(response) {
        // create a new action with the old type, but
        // replace the promise with the reponse data
        const newAction = { ...action, payload: response };
        dispatch(newAction); /* dispatch the new action to the top of the middleware stack (so the action will be evalueted again and do some other operation if/when needed [not this one the case now but you never know]) and finally goes to reducers*/
      });
  }
}
