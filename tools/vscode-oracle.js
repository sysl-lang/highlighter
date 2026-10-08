// VS Code's own tokenizer over the corpus, rendered the way sh.sysl.highlighter renders tokens with
// `Classes("hl-")` — the `.vscode.html` files `equivalence_tests.sysl` compares against.
//
// The two packages are VS Code's own, installed anywhere outside this tree:
//
//   npm install --ignore-scripts vscode-textmate@9 vscode-oniguruma@2
//   node tools/vscode-oracle.js <that node_modules> test-grammars equivalence equivalence
//
// Each corpus file is `<language>.<n>.txt`, highlighted with `test-grammars/<language>.tmLanguage.json`
// and every other grammar there available to its includes, which is how HTML's `<style>` and
// `<script>` reach the CSS and JavaScript grammars.
const path = require('path');
const fs = require('fs');
const [nm, grammars, corpus, outDir] = process.argv.slice(2);
const vsctm = require(path.join(nm, 'vscode-textmate'));
const oniguruma = require(path.join(nm, 'vscode-oniguruma'));

const wasm = fs.readFileSync(path.join(nm, 'vscode-oniguruma/release/onig.wasm')).buffer;

function category(scope) {
  const i = scope.indexOf('.');
  const head = i >= 0 ? scope.slice(0, i) : scope;
  if (head === 'keyword' || head === 'storage') return 'keyword';
  if (head === 'string') return 'string';
  if (head === 'comment') return 'comment';
  if (head === 'constant') return scope.includes('numeric') ? 'number' : 'variable';
  if (head === 'entity') return scope.includes('name.type') ? 'type' : 'function';
  if (head === 'variable') return 'variable';
  if (head === 'support') {
    if (scope.includes('type')) return 'type';
    if (scope.includes('function')) return 'function';
  }
  if (head === 'punctuation') return 'punctuation';
  return '';
}

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

(async () => {
  await oniguruma.loadWASM(wasm);
  const lib = Promise.resolve({
    createOnigScanner: ps => new oniguruma.OnigScanner(ps),
    createOnigString: s => new oniguruma.OnigString(s),
  });
  const byScope = {};
  for (const f of fs.readdirSync(grammars)) {
    const g = JSON.parse(fs.readFileSync(path.join(grammars, f), 'utf8'));
    byScope[g.scopeName] = { file: f, raw: g };
  }
  const registry = new vsctm.Registry({
    onigLib: lib,
    loadGrammar: async scope => byScope[scope] ? vsctm.parseRawGrammar(JSON.stringify(byScope[scope].raw), byScope[scope].file) : null,
  });
  for (const f of fs.readdirSync(corpus).filter(f => f.endsWith('.txt')).sort()) {
    const lang = f.slice(0, f.indexOf('.'));
    const raw = JSON.parse(fs.readFileSync(path.join(grammars, lang + '.tmLanguage.json'), 'utf8'));
    const grammar = await registry.loadGrammar(raw.scopeName);
    const code = fs.readFileSync(path.join(corpus, f), 'utf8');
    let state = vsctm.INITIAL;
    const out = [];
    for (const line of code.split('\n')) {
      const r = grammar.tokenizeLine(line, state);
      state = r.ruleStack;
      const merged = [];
      for (const t of r.tokens) {
        const text = line.slice(t.startIndex, t.endIndex);
        const last = merged[merged.length - 1];
        if (last && last.scopes.join(' ') === t.scopes.join(' ')) last.text += text;
        else merged.push({ text, scopes: t.scopes });
      }
      out.push(merged.map(t => {
        if (!t.text) return '';
        const c = category(t.scopes[t.scopes.length - 1] || '');
        return c ? `<span class="hl-${c}">${esc(t.text)}</span>` : esc(t.text);
      }).join(''));
    }
    fs.writeFileSync(path.join(outDir, f.replace(/\.txt$/, '.vscode.html')), out.join('\n'));
    console.log(f, 'ok');
  }
})();
