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
                    elem: 'left',
                    content: '<'
                },
                {
                    elem: 'image',
                    tag: 'img'
                },
                {
                    elem: 'right',
                    content: '>'
                },
                {
                    block: 'slider',
                    content: [
                        {
                            block: 'scroller',
                            content: [
                                {
                                    elem: 'thumbnail',
                                    tag: 'img'
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
