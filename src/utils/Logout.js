import '../index.css'
import URL from "../utils/Url.js"
import {tokenValid, getJwtToken}  from "../utils/Auth"

export default async function Logout() {
    let url = URL + "/logout";

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getJwtToken()
            }
        });

        if (response.ok) {
            if (tokenValid()) {
                localStorage.clear()
                sessionStorage.clear()
            }
        } else {
            console.error('Logout failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during logout operation:', error);
    }
}
