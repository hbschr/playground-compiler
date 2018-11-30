## javascript

stack:
-   web packer `parcel`, includes babel
-   test runner/framework/assertions/foo: `jest`

quick start:
```sh
npm install
npm test
npm test -- --coverage
npm test -- --watch
```

implements input stream, token stream (lexer), parser (recursive descent)
and interpreter for arithmetic expressions following tutorial
[how to implement a programming language in javascript]
(http://lisperator.net/pltut/).

steps:
-   [x] input stream, token stream
-   [ ] parser, interpreter
    -   [x] literals
    -   [ ] left-to-right vs right-to-left
    -   [ ] operator precedence
    -   [ ] paren precedence
    -   [ ] unary operator


## haskell

following [tutorial](https://alephnullplex.github.io/cradle/)

```ghci
:l Main
expression "2+4"
```
