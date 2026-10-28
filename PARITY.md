# Parity with the Scala highlighter

One file, both directions. The first table maps every unit test of `/Users/ed/dev/highlighter` (`Tests.scala`, `RealWorldGrammarTests.scala`) to the sysl test that covers it; the second maps every sysl test with no Scala original to its port in the Scala repo (`Tests.scala`, which runs on JVM, JS and Native, and the JVM-only `VsCodeParityTests.scala`). A test keeps its name on the other side, so `grep -F` finds either. Audited at v0.1.2: nothing was missing on the sysl side; every row asserts the same input and the same thing, the grammar-loading rows more strictly (no load warning at all).

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
| the category is read from the whole scope stack | a string's quotes take the string's category | tests.sysl: a string's quotes take the string category |
| the category is read from the whole scope stack | a comment's marker takes the comment's category | tests.sysl: a line comment's marker takes the comment category |
| the category is read from the whole scope stack | a definition with no categorised enclosing scope is still punctuation | tests.sysl: a punctuation.definition scope with no categorised parent stays punctuation |
| the category is read from the whole scope stack | a definition nested in another definition still reaches the construct around both | tests.sysl: a definition nested in another definition still reaches the construct around both |
| the category is read from the whole scope stack | other punctuation inside a string keeps its own category | tests.sysl: a punctuation scope that is not a definition stays punctuation inside a string |
| the category is read from the whole scope stack | an uncategorised inner scope inside a string is string | tests.sysl: an uncategorised innermost scope takes the category of the scope enclosing it |
| the category is read from the whole scope stack | rendered HTML agrees with categoryOf | tests.sysl: category_of reads the whole stack and is the category the renderer uses |

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

## sysl-only tests -> the Scala repo

Tests the sysl suite added that the Scala suite had no original of, and the Scala test that now ports each. Where the port ran red against the old Scala tokenizer, the Scala tokenizer was rewritten after vscode-textmate (0.0.15) rather than the test weakened; the sysl highlighter is the reference, checked byte for byte against VS Code.

No row is `ignore`d in Scala. The Scala highlighter compiles every pattern with the `oniguruma` engine's `Syntax.Oniguruma` (0.0.8), which reads `\w`, `\d`, `\s`, `\b` and the POSIX classes as Unicode, the way vscode-oniguruma does, so the `\w` and `\b` rows and the whole-corpus row run and pass there as they do here. `VsCodeParityTests.scala` also keeps "every corpus file but html.1 renders as VS Code renders it on every line without a non-ASCII letter", which has no sysl counterpart and is subsumed by the whole-corpus row.

The six `tests.sysl` rows below about categories (from "a string's quotes" to "category_of reads the whole stack") have the Scala suite's own originals in the first table; their ports sit in `Tests.scala` beside them as the sysl suite's renderings of the same rule.

| sysl test | Scala port |
|---|---|
| vscode_tests.sysl: \A: holds at no other line's start | Tests.scala: \A: holds at no other line's start |
| vscode_tests.sysl: \A: holds at the start of the document | Tests.scala: \A: holds at the start of the document |
| vscode_tests.sysl: \A: JavaScript's shebang is one on the first line only | VsCodeParityTests.scala: \A: JavaScript's shebang is one on the first line only |
| vscode_tests.sysl: \A: the rewrite leaves an escaped backslash before an A alone | Tests.scala: \A: the rewrite leaves an escaped backslash before an A alone |
| port_tests.sysl: \b in a real grammar: Scala's 'if' inside 'síif' is not coloured | VsCodeParityTests.scala: \b in a real grammar: Scala's 'if' inside 'síif' is not coloured |
| port_tests.sysl: \b: 'if' at the end of 'síif' is not a keyword | Tests.scala: \b: 'if' at the end of 'síif' is not a keyword |
| port_tests.sysl: \b: 'real' at the start of 'realíssimo' is not a keyword | Tests.scala: \b: 'real' at the start of 'realíssimo' is not a keyword |
| port_tests.sysl: \b: a keyword standing alone beside a non-ASCII word still is one | Tests.scala: \b: a keyword standing alone beside a non-ASCII word still is one |
| vscode_tests.sysl: \G: a begin match running to the end of its line makes it hold at each later line's start | Tests.scala: \G: a begin match running to the end of its line makes it hold at each later line's start |
| vscode_tests.sysl: \G: holds nowhere at the start of a line | Tests.scala: \G: holds nowhere at the start of a line |
| vscode_tests.sysl: \G: holds where the begin match ended | Tests.scala: \G: holds where the begin match ended |
| port_tests.sysl: \w is Unicode, as in VS Code: one \w+ takes 'naïve' whole | Tests.scala: \w is Unicode, as in VS Code: one \w+ takes 'naïve' whole |
| vscode_tests.sysl: $base: in a grammar on its own it is the grammar itself | Tests.scala: $base: in a grammar on its own it is the grammar itself |
| port_tests.sysl: a begin group's text is escaped before it stands in an end | Tests.scala: a begin group's text is escaped before it stands in an end |
| port_tests.sysl: a grammar with no scopeName is refused | Tests.scala: a grammar with no scopeName is refused |
| port_tests.sysl: a group that took no part stands in an end as nothing | Tests.scala: a group that took no part stands in an end as nothing |
| port_tests.sysl: a JSON value that is not an object is refused | Tests.scala: a JSON value that is not an object is refused |
| tests.sysl: a line comment's marker takes the comment category | Tests.scala: a line comment's marker takes the comment category |
| tests.sysl: a punctuation scope that is not a definition stays punctuation inside a string | Tests.scala: a punctuation scope that is not a definition stays punctuation inside a string |
| tests.sysl: a punctuation.definition scope with no categorised parent stays punctuation | Tests.scala: a punctuation.definition scope with no categorised parent stays punctuation |
| port_tests.sysl: a rule key holding the wrong kind of value is refused, naming it | Tests.scala: a rule key holding the wrong kind of value is refused, naming it |
| port_tests.sysl: a rule that matches nothing where the line stands ends the line's matching, as in VS Code | Tests.scala: a rule that matches nothing where the line stands ends the line's matching, as in VS Code |
| tests.sysl: a string's quotes take the string category | Tests.scala: a string's quotes take the string category |
| port_tests.sysl: a zero-length match at the end of a line ends the line | Tests.scala: a zero-length match at the end of a line ends the line |
| port_tests.sysl: an end naming its begin's group closes on that group's text | Tests.scala: an end naming its begin's group closes on that group's text |
| port_tests.sysl: an end naming its begin's group does not close on other text | Tests.scala: an end naming its begin's group does not close on other text |
| port_tests.sysl: an include of a repository entry that does not exist resolves to nothing | Tests.scala: an include of a repository entry that does not exist resolves to nothing |
| tests.sysl: an uncategorised innermost scope takes the category of the scope enclosing it | Tests.scala: an uncategorised innermost scope takes the category of the scope enclosing it |
| vscode_tests.sysl: applyEndPatternLast: the end wins a tie by default | Tests.scala: applyEndPatternLast: the end wins a tie by default |
| vscode_tests.sysl: applyEndPatternLast: under it an inner rule wins the tie | Tests.scala: applyEndPatternLast: under it an inner rule wins the tie |
| vscode_tests.sysl: captures: a begin/end rule's captures apply to its end as well | Tests.scala: captures: a begin/end rule's captures apply to its end as well |
| vscode_tests.sysl: captures: a capture's patterns tokenize its text again | Tests.scala: captures: a capture's patterns tokenize its text again |
| vscode_tests.sysl: captures: Go's function name is found by a capture's own patterns | VsCodeParityTests.scala: captures: Go's function name is found by a capture's own patterns |
| vscode_tests.sysl: captures: group 0's scope stays beneath the groups inside it | Tests.scala: captures: group 0's scope stays beneath the groups inside it |
| tests.sysl: category_of reads the whole stack and is the category the renderer uses | Tests.scala: category_of reads the whole stack and is the category the renderer uses |
| port_tests.sysl: category: every row of the table | Tests.scala: category: every row of the table |
| port_tests.sysl: escape_html escapes the four and nothing else | Tests.scala: escape_html escapes the four and nothing else |
| equivalence_tests.sysl: every corpus file but html.1 renders exactly as VS Code renders it | VsCodeParityTests.scala: every corpus file but html.1 renders exactly as VS Code renders it |
| vscode_tests.sysl: guards: a pair opening again where it already is, matching nothing, does not | Tests.scala: guards: a pair opening again where it already is, matching nothing, does not |
| vscode_tests.sysl: guards: a pair that opens and closes at one place matching nothing stays open, and the line ends | Tests.scala: guards: a pair that opens and closes at one place matching nothing stays open, and the line ends |
| equivalence_tests.sysl: html.1 differs from VS Code only in the embedded style and script bodies, which are plain | VsCodeParityTests.scala: html.1 differs from VS Code only in the embedded style and script bodies, which are plain |
| port_tests.sysl: inline rendering writes the theme's colour for each category | Tests.scala: inline rendering writes the theme's colour for each category |
| vscode_tests.sysl: names: $N stands for the group's text | Tests.scala: names: $N stands for the group's text |
| vscode_tests.sysl: names: a name holding several scopes is that many scopes, the last innermost | VsCodeParityTests.scala: names: a name holding several scopes is that many scopes, the last innermost |
| vscode_tests.sysl: newline: a rule ending on \n closes at the end of its line | Tests.scala: newline: a rule ending on \n closes at the end of its line |
| vscode_tests.sysl: newline: the newline itself is in no token | VsCodeParityTests.scala: newline: the newline itself is in no token |
| vscode_tests.sysl: newline: YAML's comment does not run on into the next line | VsCodeParityTests.scala: newline: YAML's comment does not run on into the next line |
| port_tests.sysl: python: a string closes on the quote it opened with, and the code after it is code | VsCodeParityTests.scala: python: a string closes on the quote it opened with, and the code after it is code |
| port_tests.sysl: text that is not JSON is refused, with the reader's diagnostic | Tests.scala: text that is not JSON is refused, with the reader's diagnostic |
| equivalence_tests.sysl: the corpus holds 24 files, each with VS Code's rendering beside it | VsCodeParityTests.scala: the corpus holds 24 files, each with VS Code's rendering beside it |
| port_tests.sysl: tokens over non-ASCII text concatenate back to each line | VsCodeParityTests.scala: tokens over non-ASCII text concatenate back to each line |
| port_tests.sysl: two pairs open at once each close on their own text | Tests.scala: two pairs open at once each close on their own text |
| port_tests.sysl: vscode-textmate's own rule: every backslash-digit is a reference | Tests.scala: vscode-textmate's own rule: every backslash-digit is a reference |

### Not ported

Thirty-four sysl tests have no Scala counterpart, because the Scala library has nothing for them to test:

| sysl test | why |
|---|---|
| sysl_grammar_tests: `sysl grammar:` x27 | they test sysl's own grammar (`grammars/sysl.tmLanguage.json`, a byte-identical copy of sysl `faf3b48a`'s `docs/grammars/sysl.tmLanguage.json`) against sysl's lexical rules; the Scala suite carries no sysl grammar, and the subject is the grammar rather than the tokenizer |
| port_tests: `languages:` x3 | `Languages` (a registry that picks a grammar by a fenced block's first word) does not exist in the Scala library |
| port_tests: `markdown:` hook | the hook composes with `sh.sysl.markdown`, a sysl package |
| readme_tests: `README:` x3 | they run the sysl README's examples against its text |
