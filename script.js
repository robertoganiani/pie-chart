const data = [
  { name: 'HQ', value: 10 },
  { name: 'North', value: 40 },
  { name: 'South', value: 50 },
  { name: 'Center', value: 70 },
]

const margin = { top: 20, right: 20, bottom: 20, left: 20 },
  width = 700 - margin.right - margin.left,
  height = 720,
  radius = width / 2

const divTooltip = d3.select('body')
  .append('div')
  .attr('class', 'tool-tip')

const colorScale = d3.scaleOrdinal(d3.schemeDark2)

const arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 120)

const textArc = d3.arc()
  .outerRadius(radius - 50)
  .innerRadius(radius - 50)

const pie = d3.pie()
  .sort(null)
  .value(d => d.value)

const svg = d3.select('.wrapper')
  .append('svg')
  .attr('transform', `translate(${margin.left}, 0)`)
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2 - 30})`)

const g = svg.selectAll('.arc')
  .data(pie(data))
  .enter().append('g')
  .attr('class', 'arc')

g.append('path')
  .attr('d', arc)
  .style('fill', d => colorScale(d.data.name))
  .style('stroke', 'white')
  .transition()
  .ease(d3.easeLinear)
  .duration(1000)
  .attrTween('d', chartTween)

g.append('text')
  .transition()
  .ease(d3.easeLinear)
  .duration(1000)
  .attr('transform', d => `translate(${textArc.centroid(d)})`)
  .attr('dx', '-1em')
  .attr('dy', '.50em')
  .text(d => d.data.name)
  .attr('font-size', '20px')
  .attr('fill', 'white')

g.append('text')
  .html('Cross-Function')
  .attr('text-anchor', 'middle')
  .attr('class', 'center-text')
  .attr('transform', d => 'translate(0, -20)')

g.append('text')
  .html('Co-Thinking')
  .attr('text-anchor', 'middle')
  .attr('class', 'center-text')
  .attr('transform', d => 'translate(0, 50)')

svg.append('g')
  .attr('class', 'legendLinear')
  .attr('transform', 'translate(70, 330)')

const colorLegend = d3.legendColor()
  .orient('horizontal')
  .shapeWidth(60)
  .scale(colorScale)

svg.select('.legendLinear')
  .call(colorLegend)

// helper functions
function chartTween(b) {
  b.innerRadius = 0
  const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b)
  return function (t) { return arc(i(t)) }
}
