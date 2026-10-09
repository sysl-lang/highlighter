# highlighter

Syntax highlighting for sysl, driven by the TextMate grammars Visual Studio Code ships, on the real
Oniguruma. Code goes in; HTML comes out — classes for a stylesheet, or a theme's colours inline — or
the tokens themselves, for a renderer of your own.

```hocon
dependencies {
  highlighter { git = "github.com/sysl-lang/highlighter", version = "0.1.1" }
}
```

The module is `sh.sysl.highlighter`. It needs Oniguruma installed (`brew install oniguruma`, Debian's
`libonig-dev`), through [`sysl-lang/oniguruma`](https://github.com/sysl-lang/oniguruma), and reads
grammars with [`sysl-lang/json`](https://github.com/sysl-lang/json).

```sysl
import sh.sysl.highlighter.{from_json, Inline, one_dark}
import sysl.fs.read_bytes
import sysl.text.from_utf8

main()
    val json = from_utf8(read_bytes("rust.tmLanguage.json").expect("the grammar reads")).expect("the grammar is UTF-8")
    val rust = from_json(json).expect("the grammar loads")

    print(rust.highlight("fn main() {}"))
    // <span class="hl-keyword">fn</span> <span class="hl-function">main</span><span class="hl-punctuation">()</span>…

    val inline = from_json(json, Inline(one_dark())).expect("the grammar loads")

    print(inline.highlight("let x = 1;"))
    // <span style="color:#c678dd">let</span> <span style="color:#e06c75">x</span> …
```

It is a port of the Scala [`io.github.edadma:highlighter`](https://github.com/edadma/highlighter)
0.0.13, every test of it included — and then brought into line with VS Code's own tokenizer, which is
what every one of these grammars is written and tested against (see *How it tokenizes*).

## The API

| | |
|---|---|
| `from_json(text, mode = classes()) -> Result[Highlighter, string]` | a highlighter over a grammar's `.tmLanguage.json` text, or why it is not one |
| `grammar_from_json(text) -> Result[Grammar, string]` and `highlighter(g, mode)` | the same in two steps |
| `h.highlight(code) -> string` | HTML: each line's tokens escaped and wrapped in a `<span>` naming its category, lines joined by `\n`; no `<pre>` around it |
| `h.tokens(code) -> Buf[Buf[Token]]` | the structured form: one list per line, adjacent tokens with the same scopes merged; each line's texts concatenated are the line |
| `Token(text, scopes)` | a piece of a line and its scopes, outermost first — the grammar's scope, then one per enclosing rule and capture |
| `category(scope)`, `h.category_of(token)` | the rendering category of a scope (a token's is its innermost) |
| `h.load_warnings() -> Buf[string]` | every pattern that did not compile, with Oniguruma's reason; the rule holding it is left out and the rest of the grammar works |
| `Classes(prefix)`, `classes()`, `Inline(theme)` | how `highlight` writes a span: `class="hl-keyword"`, or `style="color:#c678dd"` |
| `one_dark()` … `catppuccin_mocha()` | thirteen themes: One Dark and Light, Monokai, Dracula, Solarized Dark and Light, GitHub Dark and Light, Nord, Gruvbox Dark and Light, Tokyo Night, Catppuccin Mocha |
| `escape_html(s)` | `&`, `<`, `>` and `"` as entities |
| `languages()`, `Languages` | highlighters by language name, for a page renderer — see *With Markdown* |

**The categories** are `keyword`, `string`, `comment`, `number`, `type`, `function`, `variable` and
`punctuation`, or none. A scope's first segment decides, and three look further:

| scope begins | category |
|---|---|
| `keyword`, `storage` | `keyword` |
| `string` | `string` |
| `comment` | `comment` |
| `constant` | `number` where the scope holds `numeric`, else `variable` |
| `entity` | `type` where it holds `name.type`, else `function` |
| `variable` | `variable` |
| `support` | `type` where it holds `type`, `function` where it holds `function`, else none |
| `punctuation` | `punctuation` |

## With Markdown

[`sh.sysl.markdown`](https://github.com/sysl-lang/markdown)'s `HtmlOptions.highlight` asks a hook
about every code block — the info string and the text — and writes what it answers in place of the
whole `<pre><code>…</code></pre>`. `Languages.hook()` is that hook. **This package does not depend on
Markdown**: a program rendering Markdown names both and composes them:

```sysl
import sh.sysl.highlighter.{from_json, languages}
import sh.sysl.markdown.{commonmark_html, parse, to_html_with}

render(page: string, scala_grammar: string) -> Result[string, string]
    val langs = languages()

    langs.add("scala", from_json(scala_grammar)?)

    var opts = commonmark_html()

    opts.highlight = Some(langs.hook())
    Ok(to_html_with(parse(page), opts))
```

A fenced block whose info string's first word is `scala` (or `language-scala`) becomes
`<pre><code class="language-scala">` around the highlighted text; any other block is left to
Markdown, which writes it exactly as it would with no hook. The suite checks this composition against
the real Markdown package, which it takes as a `dev_dependencies` entry that no consumer fetches.

## How it tokenizes

**As vscode-textmate does** — the tokenizer inside Visual Studio Code. The Scala highlighter's own
loop departs from it in ways the grammars notice, so the port follows VS Code instead, and checks
itself against VS Code's rendering (see *The corpus*):

- **a line is matched with its newline**, since grammars close rules on `\n` — YAML's comments, a
  Python string's `(\2)|(\n)`, bash's `(?=;|&|\n)` — and the newline is cut off the tokens;
- **an `end` naming its `begin`'s groups** (`\1`) is compiled per match with that text, escaped;
- **`\G` holds where the last `begin` match ended**, and at no line's start unless that `begin` ran
  to the end of its line; **`\A`** holds on the document's first line only;
- **a name may hold several scopes**, separated by spaces (`string.json support.type.property-name.json`),
  and `$1` or `${1:/downcase}` in a name is the group's text;
- **captures** apply to the `end` as well where a rule has only `captures`, layer over group 0's scope,
  and a capture with `patterns` has its text tokenized again with them;
- **`applyEndPatternLast`** makes the `end` lose a tie with an inner rule rather than win it;
- **VS Code's loop guards**: a rule matching nothing where the line stands ends the line's matching,
  and a pair that opens and closes in one place, or opens again where it already is, does not loop.

All the rules in force at a position are searched as one Oniguruma regset — leftmost match, lowest
index on a tie — so a line costs one search per token rather than one per rule.

**The dialect is vscode-oniguruma's**: `\w`, `\d`, `\s`, `\b` and the POSIX brackets are Unicode. The
Scala port's engine read `\w` as ASCII and `\b` as Unicode, a combination no setting of the C library
gives; here `\w+` takes `naïve` whole, and `\bif\b` finds no keyword inside `síif` — as in VS Code.

**Not here, and each one says why:**

- **one grammar including another** (`source.css`, `source.js`) is not followed — HTML's `<style>` and
  `<script>` bodies are plain. The Scala highlighter did not follow them either; doing it means a
  registry of grammars, which is a design of its own.
- **`while` rules** (Markdown's block quotes and lists use them) and **injections** are not read.
- **`\A` in an `end` pattern** is not rewritten after the first line; no grammar here writes one.

## The corpus, and how it is checked

`equivalence/` holds a page of each of the thirteen test languages and the Scala suite's own inputs,
24 files, with `<name>.vscode.html` beside each: what VS Code's tokenizer — vscode-textmate 9.3.2 on
vscode-oniguruma 2.0.1 — makes of it with the same grammar, rendered as `Classes("hl-")` renders.
`tools/vscode-oracle.js` writes them; how to run it is at its top.

**474 of the 476 lines agree byte for byte**, and the two that do not are HTML's embedded style and
script. The Scala highlighter agrees on 230.

**The port was first made faithful and measured against the Scala highlighter itself**: over the same
24 files it reproduced the Scala output byte for byte, all 24, once `end` back-references were left
unresolved as the Scala port left them. Every difference since is one of the changes listed above.

## The tests

202, all against something outside the code under test:

| file | | |
|---|---|---|
| `tests.sysl` | 37 | the Scala `Tests` suite, test for test |
| `grammar_tests.sysl` | 111 | the Scala `RealWorldGrammarTests`, test for test, over the vendored grammars |
| `vscode_tests.sysl` | 21 | each VS Code rule above, every exact expectation confirmed against vscode-textmate |
| `port_tests.sysl` | 27 | `\b`/`\w` (`síif`, `realíssimo`, `naïve`), back-references, character boundaries, the error paths, the renderer, `Languages` and the Markdown composition |
| `equivalence_tests.sysl` | 3 | the corpus against VS Code |
| `readme_tests.sysl` | 3 | this README's examples, as written here, and what they print |

**No Scala test's expectation changed.** All 148 pass as written; the loading tests are stronger here,
asserting that no pattern of any of the thirteen grammars is refused.

The fixes the Scala highlighter carried are here with their tests: a keyword is not found inside a
word (`\b` is Unicode); a zero-length `begin`/`end` pair at one position does not loop (bash's
`echo "$HOME"` and `for … done`); XML's grammar loads despite stray keys in a `captures` object, and
nested groups over one character (`((:))`) write it once; and the structured token API beside the HTML
renderer.

**This package has no C.** The suite runs clean under `SYSL_EXTRA_CFLAGS="-fsanitize=address -g"`,
with the sysl code instrumented (`__asan_memcpy` among the binary's imports); Oniguruma is the
machine's prebuilt library, so the run says nothing about its C.

## The test grammars

`test-grammars/` carries the thirteen grammars the Scala suite runs against, as that repository
vendored them from VS Code's built-in extensions (XML from Atom's). They are test fixtures, not part of
the API — a program brings its own grammars.

| grammar | SHA-256 |
|---|---|
| `bash.tmLanguage.json` | `838a597b9bbc29bcfc89ca0190118550ae57517ec3e4b4baa1f8500edcf601d1` |
| `css.tmLanguage.json` | `9678e7410bd051eafc1ad51d3c8562885a17e7d61602d76cc5030d06520724cd` |
| `go.tmLanguage.json` | `de8f2fa64ff273ecd3bfd815164c460e2e406759fb7c8ffabf6cb3639a0efc5f` |
| `html.tmLanguage.json` | `80dedf4fb27e88889ac8fb72763954a6d2660502c686f4415208d8c8d00352cd` |
| `javascript.tmLanguage.json` | `db6f17f15bc4f5e860a3b8fa6055a69720a53df845c8d5121cdc4f128c16291f` |
| `json.tmLanguage.json` | `d7238f1cc9033993b9816b0945cab4bb8ea108de0399663c551f28f913e94c70` |
| `python.tmLanguage.json` | `ca981430eb3df004f4955bb7cba51ad06c4d8408d168c81eec7059d7d9aec5c8` |
| `rust.tmLanguage.json` | `cf54f0f146f8216d80b4982a8ca565ba00b4a94e781e20ac7a7333114797d1a1` |
| `scala.tmLanguage.json` | `7214593745f861c47321a41eb9baf84d4ee59609ca5c0301833618b0c2976f09` |
| `tsx.tmLanguage.json` | `532fb887df3117e9f4eaf5d3ea1e850114fb6899fe3d3ddabedb153bec08b32a` |
| `typescript.tmLanguage.json` | `4e92e0d7de560217d6c8d3236d85e6e17a5d77825b15729a230c761743122661` |
| `xml.tmLanguage.json` | `bb51c7b202f20254772c88f86889e0dbcdc734e045b950fe25c0a23b591203d7` |
| `yaml.tmLanguage.json` | `f350b4e6b7f2a3f5153ebad52918a9851d9fa2bb5245cbb4a03fb85cda1b2b2e` |

## Licence

ISC, as `LICENSE` says.
