({
    block: 'page',
    title: 'shri-cats on BEM',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'css', url: '_index.ie.css', ie: 'gte IE 6' },
        { elem: 'meta', attrs: { name: 'description', content: '' }}
    ],
    content:[
        {
            block: 'gallery',
            content: [
                {
                    elem: 'image',
                    url: '/keep-calm-and-bem.png'
                }
            ]
        },
        {
            block: 'slider'
        },
        { elem: 'js', url: '_index.js' }
    ]
})
