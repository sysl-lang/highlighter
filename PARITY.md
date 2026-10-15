# Parity with the Scala highlighter

Every unit test of `/Users/ed/dev/highlighter` (`Tests.scala`, `RealWorldGrammarTests.scala`) and the sysl test that covers it. The sysl name keeps the Scala test's name, so `grep -F` finds either. Audited at v0.1.2: nothing was missing; every row asserts the same input and the same thing, the grammar-loading rows more strictly (no load warning at all).

## Tests.scala -> sh/sysl/highlighter/tests.sysl

| Scala group | Scala test | sysl test |
|---|---|---|
| Tests | keywords | tests.sysl: keywords |
| Tests | strings | tests.sysl: strings |
| Tests | comments | tests.sysl: comments |
| Tests | multiline begin/end spans lines | tests.sysl: multiline begin/end spans lines |
| Tests | class mode default prefix | tests.sysl: class mode default prefix |
| Tests | class mode custom prefix | tests.sysl: class mode custom prefix |
| Tests | inline mode OneDark | tests.sysl: inline mode OneDark |
| Tests | inline mode OneLight | tests.sysl: inline mode OneLight |
| Tests | tokens are grouped one list per source line and reproduce the line | tests.sysl: tokens are grouped one list per source line and reproduce the line |
| Tests | each token carries a category a caller can map to its own palette | tests.sysl: each token carries a category a caller can map to its own palette |
| Tests | escapes angle brackets | tests.sysl: escapes angle brackets |
| Tests | escapes ampersands | tests.sysl: escapes ampersands |
| Tests | resolves top-level includes | tests.sysl: resolves top-level includes |
| Tests | resolves nested includes (two levels deep) | tests.sysl: resolves nested includes (two levels deep) |
| Tests | resolves single-pattern repository entries | tests.sysl: resolves single-pattern repository entries |
| Tests | emits capture group scopes | tests.sysl: emits capture group scopes |
| Tests | inner patterns work inside begin/end | tests.sysl: inner patterns work inside begin/end |
| Tests | handles mutually recursive includes without stack overflow | tests.sysl: handles mutually recursive includes without stack overflow |
| Tests | re-applies grammar inside nested blocks | tests.sysl: re-applies grammar inside nested blocks |
| Tests | merges adjacent tokens with same scope | tests.sysl: merges adjacent tokens with same scope |
| Tests | ignores extra top-level fields | tests.sysl: ignores extra top-level fields |
| Tests | does not duplicate text covered by nested groups | tests.sysl: does not duplicate text covered by nested groups |
| Tests | innermost nested group wins the scope | tests.sysl: innermost nested group wins the scope |
| Tests | empty input | tests.sysl: empty input |
| Tests | input with only whitespace | tests.sysl: input with only whitespace |
| Tests | no patterns match | tests.sysl: no patterns match |
| Tests | multiple keywords on one line | tests.sysl: multiple keywords on one line |
| Tests | adjacent patterns with no gap | tests.sysl: adjacent patterns with no gap |
| Tests | begin/end with no content | tests.sysl: begin/end with no content |
| Tests | unclosed begin/end spans to end of input | tests.sysl: unclosed begin/end spans to end of input |
| Tests | special characters in unmatched text | tests.sysl: special characters in unmatched text |
| Tests | multiline with blank lines | tests.sysl: multiline with blank lines |
| Tests | zero-length match does not loop | tests.sysl: zero-length match does not loop |
| Tests | POSIX character classes in patterns | tests.sysl: POSIX character classes in patterns |
| Tests | invalid regex in pattern is silently skipped | tests.sysl: invalid regex in pattern is silently skipped |
| Tests | deeply nested $self does not stack overflow | tests.sysl: deeply nested $self does not stack overflow |
| Tests | contentName adds scope to inner content | tests.sysl: contentName adds scope to inner content |

## RealWorldGrammarTests.scala -> sh/sysl/highlighter/grammar_tests.sysl

| Scala group | Scala test | sysl test |
|---|---|---|
| grammar loading | javascript | grammar_tests.sysl: grammar loading: javascript |
| grammar loading | typescript | grammar_tests.sysl: grammar loading: typescript |
| grammar loading | tsx | grammar_tests.sysl: grammar loading: tsx |
| grammar loading | bash | grammar_tests.sysl: grammar loading: bash |
| grammar loading | python | grammar_tests.sysl: grammar loading: python |
| grammar loading | json | grammar_tests.sysl: grammar loading: json |
| grammar loading | yaml | grammar_tests.sysl: grammar loading: yaml |
| grammar loading | html | grammar_tests.sysl: grammar loading: html |
| grammar loading | css | grammar_tests.sysl: grammar loading: css |
| grammar loading | go | grammar_tests.sysl: grammar loading: go |
| grammar loading | rust | grammar_tests.sysl: grammar loading: rust |
| grammar loading | scala | grammar_tests.sysl: grammar loading: scala |
| grammar loading | xml | grammar_tests.sysl: grammar loading: xml |
| javascript | single-line comment | grammar_tests.sysl: javascript: single-line comment |
| javascript | block comment | grammar_tests.sysl: javascript: block comment |
| javascript | import keyword | grammar_tests.sysl: javascript: import keyword |
| javascript | double-quoted string | grammar_tests.sysl: javascript: double-quoted string |
| javascript | single-quoted string | grammar_tests.sysl: javascript: single-quoted string |
| javascript | template literal | grammar_tests.sysl: javascript: template literal |
| javascript | const declaration | grammar_tests.sysl: javascript: const declaration |
| javascript | let declaration | grammar_tests.sysl: javascript: let declaration |
| javascript | var declaration | grammar_tests.sysl: javascript: var declaration |
| javascript | numeric literal | grammar_tests.sysl: javascript: numeric literal |
| javascript | true / false / null literals | grammar_tests.sysl: javascript: true / false / null literals |
| javascript | function keyword | grammar_tests.sysl: javascript: function keyword |
| javascript | arrow function | grammar_tests.sysl: javascript: arrow function |
| javascript | regex literal | grammar_tests.sysl: javascript: regex literal |
| javascript | class keyword | grammar_tests.sysl: javascript: class keyword |
| typescript | comment works | grammar_tests.sysl: typescript: comment works |
| typescript | import keyword | grammar_tests.sysl: typescript: import keyword |
| typescript | interface keyword | grammar_tests.sysl: typescript: interface keyword |
| typescript | type keyword | grammar_tests.sysl: typescript: type keyword |
| typescript | type annotation `: string` | grammar_tests.sysl: typescript: type annotation `: string` |
| typescript | generic | grammar_tests.sysl: typescript: generic |
| typescript | enum keyword | grammar_tests.sysl: typescript: enum keyword |
| bash | comment | grammar_tests.sysl: bash: comment |
| bash | double-quoted string | grammar_tests.sysl: bash: double-quoted string |
| bash | single-quoted string | grammar_tests.sysl: bash: single-quoted string |
| bash | variable expansion inside string | grammar_tests.sysl: bash: variable expansion inside string |
| bash | if keyword | grammar_tests.sysl: bash: if keyword |
| bash | for keyword | grammar_tests.sysl: bash: for keyword |
| python | comment | grammar_tests.sysl: python: comment |
| python | def keyword | grammar_tests.sysl: python: def keyword |
| python | class keyword | grammar_tests.sysl: python: class keyword |
| python | string literal | grammar_tests.sysl: python: string literal |
| python | f-string | grammar_tests.sysl: python: f-string |
| python | number | grammar_tests.sysl: python: number |
| python | True/False/None | grammar_tests.sysl: python: True/False/None |
| python | import statement | grammar_tests.sysl: python: import statement |
| python | decorator | grammar_tests.sysl: python: decorator |
| json | string value | grammar_tests.sysl: json: string value |
| json | number | grammar_tests.sysl: json: number |
| json | true/false/null | grammar_tests.sysl: json: true/false/null |
| json | object key + value | grammar_tests.sysl: json: object key + value |
| yaml | comment | grammar_tests.sysl: yaml: comment |
| yaml | key | grammar_tests.sysl: yaml: key |
| yaml | string value | grammar_tests.sysl: yaml: string value |
| yaml | list item | grammar_tests.sysl: yaml: list item |
| yaml | iso date — no spurious number inside `2024-03-12` | grammar_tests.sysl: yaml: iso date — no spurious number inside `2024-03-12` |
| yaml | negative integer at start of value highlights as number | grammar_tests.sysl: yaml: negative integer at start of value highlights as number |
| html | doctype | grammar_tests.sysl: html: doctype |
| html | comment | grammar_tests.sysl: html: comment |
| html | open tag | grammar_tests.sysl: html: open tag |
| html | attribute | grammar_tests.sysl: html: attribute |
| html | self-closing tag | grammar_tests.sysl: html: self-closing tag |
| css | comment | grammar_tests.sysl: css: comment |
| css | class selector | grammar_tests.sysl: css: class selector |
| css | property | grammar_tests.sysl: css: property |
| css | color value | grammar_tests.sysl: css: color value |
| css | @media rule | grammar_tests.sysl: css: @media rule |
| go | comment | grammar_tests.sysl: go: comment |
| go | package declaration | grammar_tests.sysl: go: package declaration |
| go | func declaration | grammar_tests.sysl: go: func declaration |
| go | string literal | grammar_tests.sysl: go: string literal |
| go | type keyword | grammar_tests.sysl: go: type keyword |
| rust | comment | grammar_tests.sysl: rust: comment |
| rust | fn declaration | grammar_tests.sysl: rust: fn declaration |
| rust | let binding | grammar_tests.sysl: rust: let binding |
| rust | struct keyword | grammar_tests.sysl: rust: struct keyword |
| rust | string literal | grammar_tests.sysl: rust: string literal |
| rust | macro invocation | grammar_tests.sysl: rust: macro invocation |
| scala | single-line comment | grammar_tests.sysl: scala: single-line comment |
| scala | def keyword | grammar_tests.sysl: scala: def keyword |
| scala | val keyword | grammar_tests.sysl: scala: val keyword |
| scala | if keyword | grammar_tests.sysl: scala: if keyword |
| scala | string literal | grammar_tests.sysl: scala: string literal |
| scala | numeric literal | grammar_tests.sysl: scala: numeric literal |
| xml | grammar loads with no compile warnings despite malformed captures block | grammar_tests.sysl: xml: grammar loads with no compile warnings despite malformed captures block |
| xml | open tag name highlights | grammar_tests.sysl: xml: open tag name highlights |
| xml | attribute name highlights | grammar_tests.sysl: xml: attribute name highlights |
| xml | attribute string value highlights | grammar_tests.sysl: xml: attribute string value highlights |
| xml | comment highlights | grammar_tests.sysl: xml: comment highlights |
| xml | multi-line tag with URL attribute (the podcast-docs repro) | grammar_tests.sysl: xml: multi-line tag with URL attribute (the podcast-docs repro) |
| xml | namespaced tag does not duplicate the colon | grammar_tests.sysl: xml: namespaced tag does not duplicate the colon |
| xml | namespaced attribute does not duplicate the colon | grammar_tests.sysl: xml: namespaced attribute does not duplicate the colon |
| regex | negative lookbehind | grammar_tests.sysl: regex: negative lookbehind |
| regex | positive lookbehind | grammar_tests.sysl: regex: positive lookbehind |
| regex | negative lookahead | grammar_tests.sysl: regex: negative lookahead |
| regex | POSIX class [:alnum:] | grammar_tests.sysl: regex: POSIX class [:alnum:] |
| regex | POSIX class [:alpha:] | grammar_tests.sysl: regex: POSIX class [:alpha:] |
| regex | POSIX class inside complex set [_$[:alnum:]] | grammar_tests.sysl: regex: POSIX class inside complex set [_$[:alnum:]] |
| regex | atomic group | grammar_tests.sysl: regex: atomic group |
| regex | possessive quantifier *+ | grammar_tests.sysl: regex: possessive quantifier *+ |
| regex | end-of-line anchor mid-string | grammar_tests.sysl: regex: end-of-line anchor mid-string |
| regex | alternation | grammar_tests.sysl: regex: alternation |
| regex | captures + named scope | grammar_tests.sysl: regex: captures + named scope |
| loader | compile failures are exposed through load_warnings | grammar_tests.sysl: loader: compile failures are exposed through load_warnings |
| loader | the engine accepts (?#comment) inline-comment groups | grammar_tests.sysl: loader: the engine accepts (?#comment) inline-comment groups |
| loader | the engine handles a literal { without breaking quantifiers | grammar_tests.sysl: loader: the engine handles a literal { without breaking quantifiers |
| loader | tolerates stray non-capture keys inside a captures object | grammar_tests.sysl: loader: tolerates stray non-capture keys inside a captures object |
| loader | load_warnings is empty when every pattern compiles | grammar_tests.sysl: loader: load_warnings is empty when every pattern compiles |
