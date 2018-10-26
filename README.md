# The JupyterLab Credential Store

This JupyterLab extension securely keeps your credentials and provides convenient access.

![](assets/teaser.png)

The **JupyterLab Credential Store** keeps your credentials secure using an AES-encryption. Add, edit, and delete credentials as key-value pairs in this JupyterLab frontend extension. Access the credentials with their keys: 

<table class="image">
<tr><td><img src="assets/sidebar.png" width="400"></td></tr>
<tr><td class="caption" >The Credential Store</td></tr>
</table>

```python
import kernel_connector as kc
kc.get_credential("my_secret")
```

## Prerequisites

* JupyterLab
* PyCrypto (`pip install pycrypto`)

## Installation

Install the **JupyterLab Credential Store**:

```bash
jupyter labextension install @lean-data-science/jupyterlab_credentialstore
```

If you prefer a containerized configuration, the **JupyterLab Credential Store** seamlessly integrates with the [JupyterLab-Configurator](https://lean-data-science.com/#/configure-jupyterlab) (presented [here](https://towardsdatascience.com/how-to-setup-your-jupyterlab-project-environment-74909dade29b)) that lets you easily create your **JupyterLab configuration**. 