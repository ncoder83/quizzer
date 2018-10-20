class AudioPlayer
{
    constructor(){
        this.audio = Object.create(null);
        this.audioTasks = [];
        this.audioContext = new AudioContext();
    }

    loadAudio(url, id){
        const task = fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
            .then(buffer => {
                this.audio[id] = buffer;
            });
        this.audioTasks.push(task);
    }

    playAudio(id){
        const source = this.audioContext.createBufferSource();
        source.connect(this.audioContext.destination);
        source.buffer = this.audio[id];
        source.start(0);
    }
}