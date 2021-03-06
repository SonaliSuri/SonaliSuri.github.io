/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Reference: https://bl.ocks.org/maybelinot/5552606564ef37b5de7e47ed2b7dc099
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Set the height and width and specify the scales for x and y. x is set to 2*PI as we will be drawing circles / arcs and y is of range [0,radius].
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
var width = 960,
    height = 700,
    radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
    .range([0, radius]);

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Set the color scheme as d3.schemecategory20() is not supported
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    const colorScale = d3.scaleSequential(d3.interpolateWarm)
    const tScale = d3.scaleLinear().domain([0, 70]).range([0,20])
    const sequence = d3.range(15)
    const myDomain = [...sequence].map(d => tScale(d))
    const color = d3.scaleOrdinal(myDomain.map(d => colorScale(d)));

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
d3.partition() subdivides a rectangular space into a layer for each layer of the hierarchy. Each layer is subdivided for each node in the layer.
The partition layout adds x0, x1, y0 and y1 properties to each node.
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
var partition = d3.partition();

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Arc generators produce path data from angle and radius values. It can then be passed an object containing startAngle, endAngle, innerRadius and outerRadius properties to produce the path data
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
   

var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Append SVG
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");



    
/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Fetch the json data from the below URL .
data d3.hierarchy object is a data structure that represents a hierarchy. It helps us to determine the root node and the corresponding child and parent relationship. It has a number of functions defined on it for retrieving things like ancestor, descendant and leaf nodes and for computing the path between nodes.
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
d3.json("https://gist.githubusercontent.com/mbostock/4348373/raw/85f18ac90409caa5529b32156aa6e71cf985263f/flare.json").then(function(data){   
    root = d3.hierarchy(data);
    
/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Function for displaying the 
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
      
    
    
    function showArrayElements(data, title) {
      d3.select('#content')
        .append('div')
        .html('<span>' + title + '</span>: ' + data.map(function(d) {return d.data.name;}).join(', '))
    }

    function showLinkArrayElements(data, title) {
      d3.select('#content')
        .append('div')
        .html('<span>' + title + '</span>: ' + data.map(function(d) {return d.source.data.name+' -> ' + d.target.data.name}).join(', '))
    }
    //console.log(data);



 
/*---------------------------------------------------------------------------------------------------------------------------------------------------------
root.sum() traverses the hierarchy and sets .value on each node to the sum of its children:
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    

    root.sum(function(d) { return d.size; });

 
/*---------------------------------------------------------------------------------------------------------------------------------------------------------
partition(root).descendants() -> 
0: zl {data: {…}, height: 2, depth: 0, parent: null, children: Array(2), …}
1: zl {data: {…}, height: 1, depth: 1, parent: zl, children: Array(3), …}
2: zl {data: {…}, height: 1, depth: 1, parent: zl, children: Array(1), …}
3: zl {data: {…}, height: 0, depth: 2, parent: zl, value: 50000}
4: zl {data: {…}, height: 0, depth: 2, parent: zl, value: 30000}
5: zl {data: {…}, height: 0, depth: 2, parent: zl, value: 40000}
6: zl {data: {…}, height: 0, depth: 2, parent: zl, value: 60000}

We partition the root to and get the x0,y0,x1,y1 coordinates. and pass it to arc function to draw the arcs as follows:
startAngle  => Math.max(0, Math.min(2 * Math.PI, x(d.x0)))
endAngle    => Math.max(0, Math.min(2 * Math.PI, x(d.x1)))
innerRadius => Math.max(0, y(d.y0))
outerRadius => Math.max(0, y(d.y1))
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    console.log(partition(root))

    console.log(root);
      svg.selectAll("path")
          .data(partition(root).descendants())
        .enter().append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
          .on("click", click)
        .append("title")
          .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
});
/*---------------------------------------------------------------------------------------------------------------------------------------------------------
Click event to handle the outburst effect
----------------------------------------------------------------------------------------------------------------------------------------------------------*/
  
function click(d) {
  svg.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
            yd = d3.interpolate(y.domain(), [d.y0, 1]),
            yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attrTween("d", function(d) { return function() { return arc(d); }; });
}
    


d3.select(self.frameElement).style("height", height + "px");

