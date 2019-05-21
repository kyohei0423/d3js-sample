import * as d3 from 'd3';
import 'babel-polyfill';

const steps = {
  steps: [
    {
      name: '無料カウンセリング',
      condition: false,
      true_steps: [
        {
          name: '参加',
          condition: false,
        },
      ],
      false_steps: [
        {
          name: '不参加',
          condition: false,
        },
      ],
    },
  ],
};

(async () => {
  const treeData = {
    name: '無料カウンセリング',
    condition: true,
    children: [
      {
        name: '参加',
        condition: true,
        children: [
          { name: 'エントリー', condition: true },
          { name: '非エントリー', condition: false },
        ],
      },
      { name: '不参加', condition: false, children: [] },
    ],
  };

  // set the dimensions and margins of the diagram
  const margin = {
    top: 50,
    right: 90,
    bottom: 50,
    left: 90,
  };
  const width = 660 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // declares a tree layout and assigns the size
  // 図全体の大きさ
  const treemap = d3.tree().size([width, height]);

  //  assigns the data to a hierarchy using parent-child relationships
  // 図の形
  let nodes = d3.hierarchy(treeData);

  // maps the node data to the tree layout
  nodes = treemap(nodes);
  debugger;

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // adds the links between the nodes
  // const link = g
  //   .selectAll('.link')
  //   .data(nodes.descendants().slice(1))
  //   .enter()
  //   .append('path')
  //   .attr('class', 'link')
  //   .attr(
  //     'd',
  //     d => `M${d.x},${d.y}C${d.x},${(d.y + d.parent.y) / 2} ${d.parent.x},${(d.y + d.parent.y) / 2} ${
  //       d.parent.x
  //     },${d.parent.y}`,
  //   );

  // adds each node as a group
  const node = g
    .selectAll('.node')
    .data(nodes.descendants())
    .enter()
    .append('g')
    .attr('class', d => `node${d.children ? ' node--internal' : ' node--leaf'}`)
    .attr('transform', d => `translate(${d.x},${d.y})`);

  // adds the circle to the node
  node.append('circle').attr('r', 10);

  // adds the text to the node
  node
    .append('text')
    .attr('dy', '.35em')
    .attr('y', d => (d.children ? -20 : 20))
    .style('text-anchor', 'middle')
    .text(d => d.data.name);
})();
