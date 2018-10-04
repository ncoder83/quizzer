const r = new Router(
    {
        '#default': new Layout(new Page('nav.html'), new Page('quiz-list.html')),
        listquery: new Layout(new Page('nav.html'), new Page('quiz-list.html')),
        addquiz: new Layout(new Page('nav.html'), new Page('add-quiz.html')),
        playquiz: new Layout(new Page('nav.html'), new Page('play-quiz.html'))
    },
    document.querySelector('main-ui')
);