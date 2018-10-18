class Layout{
    constructor(...pages){
        this.pages = pages;
    }

    load(){
        return Promise.all(this.pages.map(page =>page.load()));
    }

    show(el){
        for(let page of this.pages){
            const div = document.createElement('div');
            page.show(div);
            el.appendChild(div);
            this.runJS(el);
        }
    }

    runJS(el){
        // console.log(el.parentNode.parentNode);
        exec_body_scripts(el.parentNode.parentNode);
        function nodeName(elt, name){
            return elt.nodeName && 
                   elt.nodeName.toUpperCase() === name.toUpperCase();
        }

        for(let item of el.childNodes){
            if(item.className === 'exe')
                eval(item.innerHTML);
        }
    }
}