class Ajax{

    constructor(){
        this.xhr = this.createXHR();
    }

    createXHR(){
        let xhr = null;

        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }
        else{ 
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        if("withCredentials" in xhr)
            xhr.withCredentials = true;
        else if(typeof XDomainRequest != "undefined") 
			xhr = new XDomainRequest();
		return xhr;//return our xml http request object
    }
    
    request(method, url, data, cb){

        this.xhr.open(method, url , true);
        this.xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');

        this.xhr.onreadystatechange = () =>{
            if(this.xhr.readyState === 4 && this.xhr.status === 200)
                cb(this.xhr.responseText);
        };

        if(method === 'GET')
            this.xhr.send();    
        else
            this.xhr.send(data);       
    }

    get(url, cb){
        return this.request('GET',url, null, cb);
    }

    post(url, data, cb){
        return this.request('POST', url, data, cb);
    }
}