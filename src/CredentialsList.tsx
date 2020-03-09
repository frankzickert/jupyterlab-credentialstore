// https://reactjs.org/docs/react-without-es6.html
// https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935

declare var require: any
var CryptoJS = require("crypto-js");


import * as React from 'react';
import * as Redux from 'redux'
import { connect } from 'react-redux'

import '../style/index.css';

import PasswordSelector from './PasswordSelector'

import { 
    ICredential, 
    getCredentials, 
    addCredential,
    removeCredential,
    setCredential,
    getLastId,
    setLastId
} from './ducks/credentials'

import { 
    getActiveToken,
    setActiveToken
} from './ducks/token'


interface StateProps {
    credentials: Array<ICredential>,
    lastId: number,
    token?: string
}
     
interface DispatchProps { 
    addCredential: () => void,
    removeCredential: (id: string) => void,
    setCredential: (id: string, tag: string, value: string, changed: boolean) => void,
    setLastId: (lastid: number) => void,
    setActiveToken: (token: string) => void
}

interface ArgProps {
    isConnected: boolean;
    argtoken: string;
    setAddCredentialListener: (listener: () => void) => void;
    setSetCredentialsListener: (listener: (credentials: Array<ICredential>) => void) => void;
    setCredentialListGetter: (getCredentialList: () => Array<ICredential>) => void;
    setSetLastIdListener: (listener: (lastId: number) => void) => void
    setLastIdGetter: (getLastId: () => number) => void;
    setOnSavedListener: (onSaved: () => void) => void;
    onTokenSet: (token: string) => void;
    setOnStopListener: (listener: () => void) => void;
    onRemoveCredential: (tag: string) => void;
}
 
type Props = StateProps & DispatchProps & ArgProps


const CredentialsList: React.SFC<Props> = (props) => {
    
    
    //console.log(props.credentials);
    
    props.setAddCredentialListener(props.addCredential);
    props.setCredentialListGetter(() => props.credentials);
    props.setSetCredentialsListener((credentials: Array<ICredential>) => {
        //console.log(credentials);
        for (let key in Object.keys(credentials)) {
            props.setCredential(
                credentials[key].id,
                credentials[key].tag,
                credentials[key].value,
                false
            );
        }
    });
    
    props.setSetLastIdListener((lastId: number) => {
        if (lastId !== undefined)
            props.setLastId(lastId)
    });
    props.setLastIdGetter(()=> props.lastId);
    
    props.setOnSavedListener(() => {
        for (let key in Object.keys(props.credentials)) {
            let credential = props.credentials[key];
            //console.log(credential);
            props.setCredential(credential.id, credential.tag, credential.value, false)
        }
    });
    
    props.setOnStopListener(() => {
        props.setActiveToken("");
    });
    
    //console.log(props.argtoken);
    //console.log(props.token);
    
    return props.isConnected ? (props.argtoken !== undefined && props.argtoken === props.token ? <table className="jp-CredentialsTable"><tbody>
        <tr>
            <th></th>
            <th>Key</th>
            <th>Value</th>
            <th className="jp-Column"></th>
        </tr>{
            props.credentials.map(credential => <tr>
                    <td className="jp-StarColumn">{credential.changed ? "*" : ""}</td>
                    <td className="jp-Cell">
                        <input 
                            className={ "jp-Input" }
                            type="text"
                            value={credential.tag !== undefined ? credential.tag : ""}
                            onChange={(event) => props.setCredential(
                                credential.id,
                                event.target.value,
                                credential.value,
                                true
                            )}
                        /></td>
                    <td className="jp-Cell"><input className="jp-Input"
                            type="text"
                            value={credential.value !== undefined ? credential.value : ""}
                            onChange={(event) => props.setCredential(
                                credential.id,
                                credential.tag,
                                event.target.value,
                                true
                            )}
                        /></td>
                <td className="jp-Column">
                    <button className="jp-Button"
                        onClick={() => {
                            props.removeCredential(credential.id);
                            props.onRemoveCredential(credential.tag);
                        }}
                    >Delete</button></td>
                </tr>)
        } </tbody></table> : <PasswordSelector argToken={props.argtoken} onTokenSet={props.onTokenSet} />
    ) : <div className="jp-Frame">
        <h2>Credential Store</h2>
        <p>You need to log in to set and access your credentials. Please click on the key above...</p>
    </div>
     
}

function mapStateToProps(state: any, props: Props): StateProps {
    return {
        credentials: getCredentials(state),
        lastId: getLastId(state),
        token: CryptoJS.SHA256(getActiveToken(state)).toString(),
    }
}
 
function mapDispatchToProps(dispatch: Redux.Dispatch<any>, props?: Props): DispatchProps {
    return {
        addCredential: () => {
            dispatch(addCredential());
        },
        removeCredential: (id: string) => {
            dispatch(removeCredential(id));
        },
        setCredential: (id: string, tag: string, value: string, changed: boolean) => {
            dispatch(setCredential(id, tag, value, changed));
        },
        setLastId: (lastid: number) => {
            dispatch(setLastId(lastid))
        },
        setActiveToken: (token: string) => {
            dispatch(setActiveToken(token))
        },
    }
   
}
  
export default connect<StateProps, DispatchProps, ArgProps>
  (mapStateToProps, mapDispatchToProps)(CredentialsList)