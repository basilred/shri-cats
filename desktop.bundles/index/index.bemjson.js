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
            js: true,
            content: [
                {
                    elem: 'image',
                    tag: 'img'
                },
                {
                    block: 'slider',
                    content: [
                        {
                            block: 'scroller',
                            content: [
                                {
                                    block: 'thumb',
                                    tag: 'a',
                                    js: true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        { elem: 'js', url: '_index.js' }
    ]
})
