document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  
  // 初始化markdown-it并启用插件
  const md = window.markdownit()
    .use(window.markdownitEmoji)
  
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

    // 渲染ECharts图表
    document.querySelectorAll('pre code.language-echarts').forEach(block => {
      const chartId = `echart-${Math.random().toString(36).substr(2, 9)}`;
      const chartContainer = document.createElement('div');
      chartContainer.id = chartId;
      chartContainer.style.width = '100%';
      chartContainer.style.height = '400px';
      block.parentNode.parentNode.replaceChild(chartContainer, block.parentNode);
      
      const chartOption = eval(`(${block.textContent})`);
      const myChart = echarts.init(document.getElementById(chartId));
      myChart.setOption(chartOption);
      window.addEventListener('resize', () => myChart.resize());
    })
  }
  
  input.addEventListener('input', renderMarkdown);
  
  // 初始渲染
  renderMarkdown();
});
