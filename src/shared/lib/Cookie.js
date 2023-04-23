//This class keeps a table updated in real time, bu making request to a php server 
// and changing the consent into the sent table.
class Cookie {
    get = function (key) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${key}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return "cazzo";
    }
}