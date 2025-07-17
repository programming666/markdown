# Markdown在线解释器

这是一个支持实时预览的~~自制~~拼好码Markdown解释器（~~用的全是现成的~~），可将Markdown文本转换为HTML格式，并支持LaTeX数学公式和Mermaid流程图渲染等。

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

- 支持使用 ECharts 支持丰富的交互式图表渲染。示例：
  - 使用代码块标记为`echarts`

```echarts
{
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [{
    "data": [820, 932, 901, 934, 1290, 1330, 1320],
    "type": "line"
  }]
}
```

更多 ECharts 配置选项请参考 [ECharts 官方文档](https://echarts.apache.org/zh/option.html)。

- 支持emoji
  - 输入例如`:smile:`等
## 使用方法

1. 安装node.js[nodejs官网](https://nodejs.org/zh-cn)
2. 使用git clone此仓库到本地
3. 打开项目根目录并运行`npm install`命令
4. 运行`npm run start`或`npm run dev`
5. 在左侧文本区域输入Markdown内容
6. 右侧区域将实时显示渲染结果
7. 包含LaTeX公式的示例：
```markdown
# 质能方程

行内公式：$E = mc^2$

块级公式：
$$\sum_{i=1}^n i = \frac{n(n+1)}{2}$$
```
