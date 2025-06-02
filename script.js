document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  
  const md = window.markdownit();
  
function renderMarkdown() {
  const markdownText = input.value;
  const html = md.render(markdownText);
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  const inlineMath = tempDiv.querySelectorAll(':not(script):not(style)');
  inlineMath.forEach(el => {
    el.innerHTML = el.innerHTML.replace(/\$([^$]+)\$/g, (match, p1) => {
      try {
        return katex.renderToString(p1, { throwOnError: false });
      } catch (e) {
        return match;
      }
    });
  });
  
  const blockMath = tempDiv.querySelectorAll(':not(script):not(style)');
  blockMath.forEach(el => {
    el.innerHTML = el.innerHTML.replace(/\$\$([^$]+)\$\$/g, (match, p1) => {
      try {
        return katex.renderToString(p1, { displayMode: true, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
  });
  
  output.innerHTML = tempDiv.innerHTML;
}
  
  input.addEventListener('input', renderMarkdown);
  
  renderMarkdown();
});
