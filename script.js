document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  const uploadBtn = document.getElementById('upload-btn');
  const mdUpload = document.getElementById('md-upload');
  const fileName = document.getElementById('file-name');

  // 设置文件上传按钮点击事件
  uploadBtn.addEventListener('click', () => {
    mdUpload.click(); // 触发隐藏的文件输入框
  });

  // 文件选择变化事件
  mdUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.md')) {
      fileName.textContent = file.name;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        input.value = event.target.result;
        renderMarkdown(); // 渲染上传的Markdown内容
      };
      reader.readAsText(file);
    } else {
      fileName.textContent = '请选择markdown源文件';
    }
  });
  
  // 初始化markdown-it
  const md = window.markdownit();
  
  function renderMarkdown() {
    const markdownText = input.value;
    const html = md.render(markdownText);
    
    // 渲染LaTeX公式
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // 处理行内公式：$...$
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
    
    // 处理块级公式：$$...$$
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
    
    // 渲染Mermaid图表
    const mermaidCharts = tempDiv.querySelectorAll('pre code.language-mermaid, pre.language-mermaid');
    mermaidCharts.forEach(el => {
      const chartDiv = document.createElement('div');
      chartDiv.className = 'mermaid';
      chartDiv.textContent = el.textContent;
      el.parentNode.replaceWith(chartDiv);
    });
    
    output.innerHTML = tempDiv.innerHTML;
    
    // 渲染Mermaid图表
    if (window.mermaid) {
      window.mermaid.initialize({ 
        startOnLoad: true,
        securityLevel: 'loose'
      });
      window.mermaid.run({
        querySelector: '.mermaid',
      });
    }
  }
  
  input.addEventListener('input', renderMarkdown);
  
  // 初始渲染
  renderMarkdown();
});
