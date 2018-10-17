class DB
{ 
    
    //in the contructor we initialize all the firebase
    //configuration. 
    constructor(){
        var config = {
            apiKey: "AIzaSyBxHVmhy0PD-ey1MYlABx_Phfn5-BZh01U",
            authDomain: "quizzer-df3b3.firebaseapp.com",
            databaseURL: "https://quizzer-df3b3.firebaseio.com",
            projectId: "quizzer-df3b3",
            storageBucket: "quizzer-df3b3.appspot.com",
            messagingSenderId: "351585110377"
        };
        firebase.initializeApp(config);
        this.db = firebase.database();
        this.auth = firebase.auth();
    }

    // create a brand new node
    createNode(nodeName){
        return this.db.ref().child(nodeName);
    }

    // return the node found
    readNode(nodeName){
        return this.db.ref(nodeName);
    }

    // read the value from firebase
    readOn(nodename, cbSuccess, cbFailure){
        this.db.ref(nodename).on('value', cbSuccess, cbFailure);
    }

    // check if the auth state has changed
    authOn(cb){
        this.auth.onAuthStateChanged(cb);
    }

    //return a promise to the caller if email login enabled
    authWith(email, pass){
        return this.auth.signInWithEmailAndPassword(email, pass);
    }
}