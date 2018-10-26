declare var require: any
var CryptoJS = require("crypto-js");

import * as React from 'react';
import * as Redux from 'redux'
import { connect } from 'react-redux'

import '../style/index.css';

import { 
    setTokenA,
    setTokenB,
    getTokenA,
    getTokenB,
    getActiveToken,
    setActiveToken
} from './ducks/token'

interface StateProps {
    tokenA: string,
    tokenB: string,
    activeToken: string
}
     
interface DispatchProps { 
    setTokenA: (token: string) => void,
    setTokenB: (token: string) => void,
    setActiveToken: (token: string) => void
}

interface ArgProps {
    onTokenSet: (token: string) => void
    argToken: string
}
 
type Props = StateProps & DispatchProps & ArgProps


const PasswordSelector: React.SFC<Props> = (props) => {
    
    //console.log("PasswordSelector");
    //console.log(props.argToken);
    
    return props.argToken === undefined ? <div className="jp-Frame">
        <h2>Set a password</h2>
        <table className="jp-PasswordTable"><tbody>
            <tr>
                <td className="jp-LimitedColumn">Enter password:</td>
                <td >
                    <input className="jp-Input"
                        type="password"
                        onChange={(event) => {
                            props.setTokenA(CryptoJS.SHA256(
                                event.target.value
                            ));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>Repeat password:</td>
                <td>
                    <input className="jp-Input"
                        type="password"
                        onChange={(event) => {
                            props.setTokenB(CryptoJS.SHA256(event.target.value));
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button onClick={() => {
                        if (props.tokenA.toString() === props.tokenB.toString()) {
                            props.setActiveToken(props.tokenA.toString());
                            props.onTokenSet(props.tokenA.toString());
                        }
                    }}>Save password</button>
                </td>
            </tr>
        </tbody></table>
        
    </div> : <div className="jp-Frame">
        <h2>Login</h2>
        <table className="jp-PasswordTable"><tbody>
            <tr>
                <td colSpan={2}>Enter your password:</td>
            </tr>
            <tr>
                <td  className="jp-LimitedColumn">
                    <input className="jp-Input"
                        type="password"
                        onChange={(event) => {
                            props.setTokenA(CryptoJS.SHA256(
                                event.target.value
                            ));
                        }}
                    />
                </td>
                <td className="jp-Cell">
                    <button className="jp-Button" onClick={() => {
                        props.setActiveToken(props.tokenA.toString());
                        props.onTokenSet(props.tokenA.toString());

                    }}>Login</button>
                </td>
            </tr>
            { 
                (props.activeToken !== undefined && 
                     props.activeToken.toString().length > 0) ?
                    <tr>
                        <td colSpan= {2}>Password wrong</td>
                    </tr> : <tr></tr>
            }
        </tbody></table>
        
        
    </div>
      
}

function mapStateToProps(state: any, props: Props): StateProps {
    return {
        tokenA: getTokenA(state),
        tokenB: getTokenB(state),
        activeToken: getActiveToken(state)
    }
}
 
function mapDispatchToProps(dispatch: Redux.Dispatch<any>, props: Props): DispatchProps {
    return {
        setTokenA: (token: string) => {
            dispatch(setTokenA(token))
        },
        setTokenB: (token: string) => {
            dispatch(setTokenB(token))
        },
        setActiveToken: (token: string) => {
            dispatch(setActiveToken(token))
        },
    }
   
}
  
export default connect<StateProps, DispatchProps, ArgProps>
  (mapStateToProps, mapDispatchToProps)(PasswordSelector)