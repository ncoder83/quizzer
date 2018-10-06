 class Storage {

    constructor(type){
        this.type = type.toLowerCase();
    }

    get(key){
        return this.getStorage().getItem(key);
    }
    set(key, value){
        this.getStorage().setItem(key, value);
    }
    remove(key){
        this.getStorage().removeItem(key);
    }
    clear(){
        this.getStorage().clear();
    }

    isStorageSupported(){
        return this.isLocalStorageSupported() || this.isSessionStorageSupported();
    }

    isLocalStorageSupported(){
        try {
            sessionStorage.setItem('pa', 'pa');
            sessionStorage.removeItem('pa');
            return true;
        } catch (e) {
            return false;
        }
    }

    isSessionStorageSupported(){
        try{
            localStorage.setItem('pa', 'pa');
            localStorage.removeItem('pa');
            return true;
        }catch(e){
            return false;
        }
    }

    getStorage(){
        let store = null;
        if(this.isStorageSupported()){
            if(this.type === 'undefined')
                store = sessionStorage;
            else if(this.type === 'l')
                store = localStorage;
            else
                store = sessionStorage;
        }
        else{
            store = cookieStorage;
        }
        return store;
    }  
 }

   // fallback if localStorage/sessionStorage is not supported
   cookieStorage = {
    getItem: function getItem(name) {
            //name,value,cookies <- get all the cookies
            var n, v, cookies = document.cookie.split(";");
            //loop through all the cookies
            for (var i = 0; i < cookies.length; i++) {
                //get the name before the equal sign
                n = (cookies[i].substr(0, cookies[i].indexOf("="))).trim();
                //get the value after the equal sign
                v = cookies[i].substr(cookies[i].indexOf("=") + 1);
                //if we have a match return the cookie value
                if (name === n) {
                    return unescape(v);
                }
            }
    },
    setItem: function setItem(name, value, options) {           
            options = options || {}; //set default option if not provided
            if (!value) {
                value = "";
                options.expires = -365;
            }
            else {
                value = escape(value);
            }            
            if (options.expires) {
                var d = new Date();
                d.setDate(d.getDate() + options.expires);
                value += "; expires=" + d.toUTCString();
            }
            if (options.domain) {
                value += "; domain=" + options.domain;
            }
            if (options.path) {
                value += "; path=" + options.path;
            }
            //and the actual cookie is set
            document.cookie = name + "=" + value;
    },
    removeItem: function removeItem(name) {
            this.set(name);//no value is passed so expire immediately
    },
    clear: function clear() {
            // name, cookies <- get all the cookies
            var n, cookies = document.cookie.split(";");
            //loop through all the cookies and expire every name found
            for (var i = 0; i < cookies.length; i++) {
                n = (cookies[i].substr(0, cookies[i].indexOf("="))).trim();
                this.set(n);
            }
    }
};




