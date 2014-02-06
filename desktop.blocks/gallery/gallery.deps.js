[{
    mustDeps : { block : 'i-bem', elems : 'dom' },
    shouldDeps : [
    	{ block : 'gallery', elems: ['prev', 'image', 'next'] },
    	{ block : 'thumb', elems: ['item'] },
    	{ block : 'mousewheel'}
    ]
},
{
    tech : 'js',
    mustDeps : [
        { tech : 'bemhtml', block : 'i-bem' },
        { tech : 'bemhtml', block : 'gallery', elems: ['prev', 'image', 'next'] }
    ]
}]