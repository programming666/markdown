# Markdown在线解释器

这是一个支持实时预览的Markdown解释器，可将Markdown文本转换为HTML格式，并支持LaTeX数学公式和Mermaid流程图渲染。

## 功能特性

- 实时预览：左侧输入Markdown，右侧即时显示渲染结果
- 支持常见Markdown语法：
  - 标题 (#, ##)
  - 列表 (有序/无序)
  - 代码块 (```)
  - 引用 (>)
  - 粗体/斜体
  - 链接/图片
- 支持LaTeX数学公式：
  - 行内公式：`$E=mc^2$`
  - 块级公式：`$$\int_{a}^{b} x^2 dx$$`
- 支持Mermaid流程图和图表：
  - 使用代码块标记为`mermaid`：
    ```mermaid
    graph TD
      A[开始] --> B(处理)
      B --> C{决策}
      C -->|是| D[结束]
      C -->|否| B
    ```

## 使用方法

1. 打开`index.html`文件
2. 在左侧文本区域输入Markdown内容
3. 右侧区域将实时显示渲染结果
4. 包含LaTeX公式的示例：
```markdown
# 质能方程

行内公式：$E = mc^2$

块级公式：
$$\sum_{i=1}^n i = \frac{n(n+1)}{2}$$
```

## 项目文件

- `index.html` - 主页面
- `script.js` - Markdown解析和渲染逻辑
- `style.css` - 页面样式
- `markdown-it.min.js` - Markdown解析库
- `katex.min.js` - LaTeX渲染引擎
- `katex.min.css` - LaTeX样式表
- `mermaid.min.js` - Mermaid图表库
