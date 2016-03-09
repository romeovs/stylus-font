# stylus-font

This is by far the laziest way to add a font-face to your stylus files:

```stylus
font(Derp, bold, italic, 'derp.ttf', url('darp.woff'), local('Snook'), 'smoo.eot', 'data:font/truetype;base65,dope')
```

turns into:

```stylus
@font-face {
  font-family: Derp;
  font-weight: bold;
  font-style: italic;
  src: url("smoo.eot");
  src: local('☺'), local('Snook'), url(smoo.eot) format(embedded-opentype),
       url(darp.woff) format(woff), url(data:font/truetype;base65,dope) format(truetype),
       url(derp.ttf) format(truetype);
}

@font-face {
  font-family: Derp;
  font-weight: bold;
  font-style: italic;
  src: url("smoo.eot");
  src: url(smoo.eot?iefix) format(embedded-opentype),
       url(darp.woff) format(woff), url(data:font/truetype;base65,dope) format(truetype),
       url(derp.ttf) format(truetype);
}
```

Notice how the font type is inferred for you (dark magic) and the fonts are
reordered to better match the [bulletproof
syntax](http://nicewebtype.com/notes/2009/10/30/how-to-use-css-font-face/). You
can pass in as many fonts as you like, in all kinds of formats and even using
data urls! `stylus-font` tries to guess the font format based on the uri, these
formats are currently accepted:

  - `application/vnd.ms-fontobject` (`.eot`)
  - `application/x-font-ttf` (`.ttf`)
  - `application/font-woff` (`.woff`)
  - `application/font-woff2` (`.woff2`)
  - `application/x-font-type1` (`.afm`)
  - `image/svg+xml` (`.svg`)
  - data uri's that start with `font/*` mime types

On thop of that `stylus-font` uses the first font in the font list as an IE
fallback (`"derp.ttf"` in the above example).

# usage
Install `stylus-font`:

```bash
npm install --save stylus-font
```

Import and use the module in your stylus:

```stylus
@import 'stylus-font'

font(Blorp, thin, normal, 'meh.ttf', 'argh.woff')
```

# signature

The signature is very hard to get wrong:

```
font(<name>, [<weight>], [<style>], <uri>, [<uri>, [<uri>, ...]])
```
`<style>` and `<weight>` are optional and interchangeable. A uri can be anything
of the form:
```
"foo.ttf"
"data:font/truetype;base64,xweow..."
url("foo.ttf") // quotes are nexessary!
local("Dope") // quotes are nexessary!
```

# ToDo:

- Write tests! Imma QuickCheck the heck out of this.
- Test if it is better to but data uri's at the front of the `src` stack or not.
- Allow omitting quotes in `url` and `local`
