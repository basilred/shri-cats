[{
    mustDeps : { block : 'i-bem', elems : 'dom' },
    shouldDeps : [
    	{ block : 'gallery', elems: ['image']},
    	{block: 'thumb', elems: ['item']}
    ]
},
{
    tech : 'js',
    mustDeps : [
        { tech : 'bemhtml', block : 'i-bem' },
        { tech : 'bemhtml', block : 'gallery', elems: 'image' }
    ]
}]