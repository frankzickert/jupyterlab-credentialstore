const version = "0414";


import {
  JupyterFrontEnd, JupyterFrontEndPlugin, ILayoutRestorer,
} from '@jupyterlab/application';

import { CredentialsPanel } from './CredentialsPanel'


import '../style/index.css';


// Caption of the command of adding a dashboard
const CAPTION = 'Credential Store'


const plugin: JupyterFrontEndPlugin<void> = {
    id: 'credentialstore:plugin',
    requires: [ILayoutRestorer], 
    autoStart: true,
    activate: (app: JupyterFrontEnd,
               restorer: ILayoutRestorer) => {
        
        //console.log('JupyterLab extension CredentialStore is activated!');
        console.log("VERSION__"+version);

        const { shell } = app;

        const panel = new CredentialsPanel({
            id: 'credentialstore', 
            serviceManager: app.serviceManager
        });
        
        restorer.add(panel, 'credentialstore');
        panel.title.iconClass = 'jp-CredentialIcon jp-SideBar-tabIcon';
        panel.title.caption = CAPTION;
        shell.add(panel,'left', { rank: 1000 });
        
        
        
        return;
    }
}
    
export default plugin;
