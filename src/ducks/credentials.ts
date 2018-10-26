
import { getRoot } from './rootselector'
import { createSelector } from 'reselect'

export interface ICredential {
    id: string,
    tag: string,
    value: string,
    changed: boolean
}

// Actions
export function setCredential(id, tag, value, changed) {
    return {
        type: 'credential/set',
        payload: {id: id, tag: tag, value: value, changed: changed}
    }
}

export function addCredential() {
  return {
    type: 'credential/create',
    payload: undefined
  }
}

export function removeCredential(id) {
    return {
    type: 'credential/destroy',
    payload: id
  }
}

export function setLastId(lastId) {
    return {
        type: 'lastid/set',
        payload: lastId
    }
}

// the variable name must match the name of the reducer!!!
// returns the dict that contains the data of this reducer
export const getCredentialsRoot = createSelector(
  getRoot,
  ({ credentialsReducer }) => credentialsReducer
)


export const getCredentials = createSelector(
    getCredentialsRoot,
    ({ credentials }) => credentials
)

export const getLastId = createSelector(
    getCredentialsRoot,
    ({ lastId }) => lastId
)


// Reducer
const defaultState = {
    lastId: 0,
    credentials: []
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

export default function credentialsReducer(state = defaultState, { type, payload }) {
    
    switch (type) {
        case 'credential/destroy':
            return {...state, 
                credentials:state.credentials.filter(c => c.id !== payload)
            };
                    
        case 'credential/create':
            let { lastId } = state;
            lastId = lastId+1;
            
            return {...state, lastId, credentials:[
                ...state.credentials, 
                {id: 'id_'+pad(lastId, 6), tag: undefined, value: undefined, changed: true}
            ].sort((a,b) => a.id > b.id ? 1 : -1)};
            
        case 'credential/set':
            return {...state, 
                credentials:[
                    ...state.credentials.filter(c => c.id !== payload.id), 
                    payload
                ].sort((a,b) => a.id > b.id ? 1 : -1)
            };
            
        case 'lastid/set':
            return {...state, lastId: payload}
            
        default:
          return state
      }
}
