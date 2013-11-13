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
                    tag: 'span',
                    content: '<'
                },
                {
                    elem: 'image',
                    tag: 'img'
                },
                {
                    elem: 'right',
                    tag: 'span',
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
                                    tag: 'img',
                                    content: []
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
