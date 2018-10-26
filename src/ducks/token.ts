
import { getRoot } from './rootselector'
import { createSelector } from 'reselect'

// Actions
export function setActiveToken(token) {
    return {
        type: 'activeToken/set',
        payload: token
    }
}

export function setTokenA(token) {
    return {
        type: 'tokenA/set',
        payload: token
    }
}

export function setTokenB(token) {
    return {
        type: 'tokenB/set',
        payload: token
    }
}

// the variable name must match the name of the reducer!!!
// returns the dict that contains the data of this reducer
export const getTokenRoot = createSelector(
  getRoot,
  ({ tokenReducer }) => tokenReducer
)

export const getActiveToken = createSelector(
    getTokenRoot,
    ({ activeToken }) => {
        return activeToken.length > 0 ? activeToken : undefined;
    }
)

export const getTokenA = createSelector(
    getTokenRoot,
    ({ tokenA }) => tokenA
)

export const getTokenB = createSelector(
    getTokenRoot,
    ({ tokenB }) => tokenB
)




// Reducer
const defaultState = {
    tokenA: "",
    tokenB: "",
    activeToken: ""
}

export default function tokenReducer(state = defaultState, { type, payload }) {
    
    switch (type) {
            
        case 'tokenA/set':
            return {...state, tokenA: payload}
            
        case 'tokenB/set':
            return {...state, tokenB: payload}
            
        case 'activeToken/set':
            return {...state, activeToken: payload}
            
        default:
          return state
      }
}
