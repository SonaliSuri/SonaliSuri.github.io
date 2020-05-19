/*------------------------------------------------------------------------------------------------------------------------------------------------
pan+drag: SUPPORTED : Hold the curser on a circle to pan-dragBoth x-axis and y-axis are scaled automatically
zoom: SUPPORTED : Move away or in by keeping the cursor on a circle
Tooltip: SUPPORTED:  Appears next to the circle and will be displayed on mousemove event
------------------------------------------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------
Define Dimensions , Margin and svg.
------------------------------------------------------------------------------------------------------------------------------------------------*/
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
width = 0.8*width;
height = 0.8*height;
//var margin = {top: 50, right: 80, bottom: 50, left: 80},
//width = 960 - margin.left - margin.right,
//height = 500 - margin.top - margin.bottom;
var margin = {top: (0.1*width), right: (0.1*width), bottom: (0.1*width), left: (0.1*width)};


/*------------------------------------------------------------------------------------------------------------------------------------------------
1. Define Colors : Since category20 is no longer supported by D3 V5, d3.interpolateWarm has been used here. The domain ranges from [0,90] and range [0,15]
for 15 countries. It sets colors to these 15 colors:
rgb(110, 64, 170)
rgb(223, 64, 161)
rgb(255, 112, 78)
rgb(210, 201, 52)
rgb(164, 255, 154)
rgb(247, 255, 254)
rgb(255, 255, 167)
rgb(234, 255, 0)
rgb(0, 255, 145)
rgb(0, 255, 255)
rgb(168, 255, 255)
rgb(255, 0, 255)
rgb(255, 0, 132)
rgb(255, 100, 0)
rgb(0, 255, 0)
------------------------------------------------------------------------------------------------------------------------------------------------*/

const sequenceLength=15;   
//var colors = d3.scaleOrdinal().range(d3.schemePaired).domain([1,20]);
const colorScale = d3.scaleSequential(d3.interpolateWarm)
const tScale = d3.scaleLinear().domain([0, 70]).range([0,20])
const sequence = d3.range(15)
const myDomain = [...sequence].map(d => tScale(d))
const colors = d3.scaleOrdinal(myDomain.map(d => colorScale(d)));

console.log(colors)


/*------------------------------------------------------------------------------------------------------------------------------------------------
Create a clipping region
------------------------------------------------------------------------------------------------------------------------------------------------*/

svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);
  


    

/*------------------------------------------------------------------------------------------------------------------------------------------------
Declaration and Definition of function type which helps to have values in the below format:
country: "United States"
epc: 316
gdp: 14.95
name: "United States"
population: 312
total: 98

The original format is:
country: "United States"
epc: "316"
gdp: "14.95"
name: "United States"
population: "312"
total: "98"
------------------------------------------------------------------------------------------------------------------------------------------------*/

function type(d, _, columns) {
    
    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
    return d;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------
1. Load the data from scatterdata.csv and map the data in the format:
country: "United States"
epc: 316
gdp: 14.95
name: "United States"
population: 312
total: 98
............. 15 rows corresponding to each country
------------------------------------------------------------------------------------------------------------------------------------------------*/

d3.csv("scatterdata.csv",type).then(function (data) {
    
    var scatterdataset= 
data.map(function (d) {
                    return { name:d.country, country: d.country, gdp: d.gdp, population: d.population, epc: d.ecc, total:d.ec};
                });
  //return scatterdataset;
    data=scatterdataset;
    
/*------------------------------------------------------------------------------------------------------------------------------------------------
Create scale objects and Ranges of X-Y Axis Scale
------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------
1. Redefining domains: setting the xscale.domain([0,scatterdataset.length+1 ]): Here scatterdataset.length=15 (as there are 15 rows for 15 countries), and scatterdataset.length+1=16. This makes the domain allocation dynamic and will be assigned based on the data loaded rather than hardcoding it.
yScale.domain is set to([0,d3.max(scatterdataset, function (d) {return d.epc+Math.sqrt((d.total*1000000000000))/200000 })]). Adding radius to make sure the extra area doesnt hide.
------------------------------------------------------------------------------------------------------------------------------------------------*/

var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);
    
    
xScale.domain([d3.min([0,d3.min(data, function(d) { return d.gdp;})]), d3.max(data, function(d) { return d.gdp;})+1.05])
    
yScale.domain([d3.min([0,d3.min(data, function(d) { return d.epc;})]),d3.max(scatterdataset, function (d) {return d.epc+Math.sqrt((d.total*1000000000000))/200000 })])
    
    
 
/*------------------------------------------------------------------------------------------------------------------------------------------------
Create axis region
------------------------------------------------------------------------------------------------------------------------------------------------*/

var xAxis = d3.axisBottom(xScale)
  .ticks(9, "s")
var yAxis = d3.axisLeft(yScale)
  .ticks(10, "s");

/*------------------------------------------------------------------------------------------------------------------------------------------------
Draw axis
------------------------------------------------------------------------------------------------------------------------------------------------*/

var gX = svg.append('g')
 .attr('transform', 'translate(' + margin.left + ',' + (margin.top + height) + ')')
  .call(xAxis);
var gY = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')
  .call(yAxis);
    

/*------------------------------------------------------------------------------------------------------------------------------------------------
3. Applies the zoom behavior to the specified selection, registering the necessary event listeners to support panning and zooming.
Extent sets the viewport extent to the specified array of points [[x0, y0]->[0,0], [x1, y1]->[width,height]], where [x0, y0] is the top-left corner of the viewport and [x1, y1] is the bottom-right corner of the viewport, and returns this zoom behavior.
ScaleExtent is specified in [k0, k1] format where k0 is the minimum allowed scale factor and k1 is the maximum allowed scale factor, and returns this zoom behavior. In this case, k0->0.5 and k1-> 20. On zoom it calls the function zoomed.
------------------------------------------------------------------------------------------------------------------------------------------------*/
     
var zoom = d3.zoom()
    .scaleExtent([.5, 20])
    .extent([[0, 0], [width, height]])

    .on("zoom", zoomed);
    

    
function zoomed() {

/*------------------------------------------------------------------------------------------------------------------------------------------------
3. Creates new scale ojects based on event
------------------------------------------------------------------------------------------------------------------------------------------------*/
         
    
    var new_xScale = d3.event.transform.rescaleX(xScale);
    var new_yScale = d3.event.transform.rescaleY(yScale);
/*------------------------------------------------------------------------------------------------------------------------------------------------
Update axes
------------------------------------------------------------------------------------------------------------------------------------------------*/
        
    gX.call(xAxis.scale(new_xScale));
    gY.call(yAxis.scale(new_yScale));
/*------------------------------------------------------------------------------------------------------------------------------------------------
Plot the data again based on new axis and scaling with tooltip
------------------------------------------------------------------------------------------------------------------------------------------------*/


    console.log(data);
/*------------------------------------------------------------------------------------------------------------------------------------------------
Check if circles exist or not and plot the data based on the data loaded. The radius is set to Math.sqrt((d.total*1000000000000))/200000; This multiplication is for conversion from million.
------------------------------------------------------------------------------------------------------------------------------------------------*/

points_g.selectAll("circle")
   // points.data(data)
     .attr('cx', function(d) {return new_xScale(d.gdp)})
     .attr('cy', function(d) {return new_yScale(d.epc)})
/*------------------------------------------------------------------------------------------------------------------------------------------------
Onmouseover event: the tooltip will be displayed on mouseover. Zoom and pan will take place when the cursor is on any circle.
------------------------------------------------------------------------------------------------------------------------------------------------*/
    
/*------------------------------------------------------------------------------------------------------------------------------------------------
end of zoomed function
------------------------------------------------------------------------------------------------------------------------------------------------*/
}
  

/*------------------------------------------------------------------------------------------------------------------------------------------------
append a rect to svg where all circles will be defined
------------------------------------------------------------------------------------------------------------------------------------------------*/   
svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
 //.call(zoom);
    
    
/*------------------------------------------------------------------------------------------------------------------------------------------------
Define points_g which will keep track of existing circles
------------------------------------------------------------------------------------------------------------------------------------------------*/  
var points_g = svg.append("g")
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr("clip-path", "url(#clip)")
  .classed("points_g", true);

/*------------------------------------------------------------------------------------------------------------------------------------------------
2. div is used for tooltip
------------------------------------------------------------------------------------------------------------------------------------------------*/  
var tooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")
    .style("pointer-events", "none")
    .style("opacity", 0);

    console.log(data);
/*------------------------------------------------------------------------------------------------------------------------------------------------
1. Check if circles exist or not and plot the data based on the data loaded. The radius is set to Math.sqrt((d.total*1000000000000))/200000; This multiplication is for conversion from million.
------------------------------------------------------------------------------------------------------------------------------------------------*/
   
var points = points_g.selectAll("circle").data(data);
points = points.enter().append("circle")
        .attr("r", function(d) {return Math.sqrt((d.total*1000000000000))/200000;})
        .attr("class", "dot")
    
        .attr("cx", function(d) {return xScale(d.gdp);})
        .attr("cy", function(d) {return yScale(d.epc);})
        .style("fill", function (d) { console.log(colors(d.country)); return colors(d.country); })
        //.call(zoom)
    
        
        .on("mouseover", function(d) {	
/*------------------------------------------------------------------------------------------------------------------------------------------------
2. Create tooltip with opacity 0.9. Setting the html content for the tooltip within tooltip.html(). mouseover event
------------------------------------------------------------------------------------------------------------------------------------------------*/
  
				tooltip.transition()		
					.duration(1)	//.style("pointer-events", "none")	
					.style("opacity", .9);		
				tooltip .html(
                    '<table width="100%" height="100%"><tr><th colspan="3" style="text-align:center">' + 
                          d.name +
                         '</th></tr><tr><td width="45%" style="text-align:left">' +                          
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + d.population+' Million'+ '</td></tr><tr><td style="text-align:left" >'+
                         'GDP</td><td width="5%">:</td><td style="text-align:right">'  + '$'+d.gdp+' Trillion'+ '</td></tr><tr><td style="text-align:left">'+
                         'EPC </td><td width="5%">:</td><td style="text-align:right">'  + d.epc+ ' Million BTUs'+ '</td></tr><tr><td style="text-align:left">'+ 
                        'Total </td><td width="5%">:</td><td style="text-align:right">'  + d.total +' Trillion BTUs'+ '</td></tr></table>' 

            
                          )          
					.style("left", (d3.event.pageX + 10) + "px")
					.style("top", (d3.event.pageY - 28) + "px");	
		   })
   .on("mouseup", function(d) {	
/*------------------------------------------------------------------------------------------------------------------------------------------------
2. mouseup event
------------------------------------------------------------------------------------------------------------------------------------------------*/
  
				tooltip.transition()		
					.duration(1)	//.style("pointer-events", "none")	
					.style("opacity", .9);		
				tooltip .html(
                    '<table width="100%" height="100%"><tr><th colspan="3" style="text-align:center">' + 
                          d.name +
                         '</th></tr><tr><td width="45%" style="text-align:left">' +                          
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + d.population+' Million'+ '</td></tr><tr><td style="text-align:left" >'+
                         'GDP</td><td width="5%">:</td><td style="text-align:right">'  + '$'+d.gdp+' Trillion'+ '</td></tr><tr><td style="text-align:left">'+
                         'EPC </td><td width="5%">:</td><td style="text-align:right">'  + d.epc+ ' Million BTUs'+ '</td></tr><tr><td style="text-align:left">'+ 
                        'Total </td><td width="5%">:</td><td style="text-align:right">'  + d.total +' Trillion BTUs'+ '</td></tr></table>' 

            
                          )         
					.style("left", (d3.event.pageX + 10) + "px")
					.style("top", (d3.event.pageY - 28) + "px");	
		   })
    .on("mousemove", function(d) {	
/*------------------------------------------------------------------------------------------------------------------------------------------------
2. mousemove event
------------------------------------------------------------------------------------------------------------------------------------------------*/
  
				tooltip.transition()		
					.duration(1)	//.style("pointer-events", "none")	
					.style("opacity", .9);		
				tooltip .html(
                    '<table width="100%" height="100%"><tr><th colspan="3" style="text-align:center">' + 
                          d.name +
                         '</th></tr><tr><td width="45%" style="text-align:left">' +                          
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + d.population+' Million'+ '</td></tr><tr><td style="text-align:left" >'+
                         'GDP</td><td width="5%">:</td><td style="text-align:right">'  + '$'+d.gdp+' Trillion'+ '</td></tr><tr><td style="text-align:left">'+
                         'EPC </td><td width="5%">:</td><td style="text-align:right">'  + d.epc+ ' Million BTUs'+ '</td></tr><tr><td style="text-align:left">'+ 
                        'Total </td><td width="5%">:</td><td style="text-align:right">'  + d.total +' Trillion BTUs'+ '</td></tr></table>' 

            
                          )         
					.style("left", (d3.event.pageX + 10) + "px")
					.style("top", (d3.event.pageY - 28) + "px");	
		   })
    
    .on("mousedown", function(d) {	
/*------------------------------------------------------------------------------------------------------------------------------------------------
2. mousedown event
------------------------------------------------------------------------------------------------------------------------------------------------*/
  
				tooltip.transition()		
					.duration(1)	//.style("pointer-events", "none")	
					.style("opacity", .9);		
				tooltip .html(
                    '<table width="100%" height="100%"><tr><th colspan="3" style="text-align:center">' + 
                          d.name +
                         '</th></tr><tr><td width="45%" style="text-align:left">' +                          
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + d.population+' Million'+ '</td></tr><tr><td style="text-align:left" >'+
                         'GDP</td><td width="5%">:</td><td style="text-align:right">'  + '$'+d.gdp+' Trillion'+ '</td></tr><tr><td style="text-align:left">'+
                         'EPC </td><td width="5%">:</td><td style="text-align:right">'  + d.epc+ ' Million BTUs'+ '</td></tr><tr><td style="text-align:left">'+ 
                        'Total </td><td width="5%">:</td><td style="text-align:right">'  + d.total +' Trillion BTUs'+ '</td></tr></table>' 

            
                          )         
					.style("left", (d3.event.pageX + 10) + "px")
					.style("top", (d3.event.pageY - 28) + "px");	
		   })
/*------------------------------------------------------------------------------------------------------------------------------------------------
2. mouseout event: the tooltip will disappear. The zoom function is callable only when mouse is over the circle.
------------------------------------------------------------------------------------------------------------------------------------------------*/
    			.on("mouseout", function(d) {		
				tooltip.transition()		
					.duration(1)		
					.style("opacity", 0)
                    .style("left", (d3.event.pageX + 10) + "px")
					.style("top", (d3.event.pageY - 28) + "px");
			})
   //;
    
points_g.call(zoom);
/*------------------------------------------------------------------------------------------------------------------------------------------------
For setting the text for circle as country name. Currently commented.
------------------------------------------------------------------------------------------------------------------------------------------------*/
   

 svg.selectAll(".text")
        .data(scatterdataset)
        .enter().append("text")
        .attr("class","text")
        .style("text-anchor", "start")
        .attr("x", function(d) {return xScale(d.gdp);})
        .attr("y", function(d) {return yScale(d.epc);})
        .style("fill", "black")
     // .text(function (d) {return d.country; });
    



    

/*------------------------------------------------------------------------------------------------------------------------------------------------
4. Draw legend circles within a rectangle. Rect+ 3 circles+text
------------------------------------------------------------------------------------------------------------------------------------------------*/
       

/*------------------------------------------------------------------------------------------------------------------------------------------------
Append a rectangle to SVG and position the legend box
------------------------------------------------------------------------------------------------------------------------------------------------*/
        
    svg.append("rect")
        .attr("x", width-210)
        .attr("y", height-130)
        .attr("width", 250)
        .attr("height", 200)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");
    
/*------------------------------------------------------------------------------------------------------------------------------------------------
Add three circles and position them accordingly
------------------------------------------------------------------------------------------------------------------------------------------------*/

    svg.append("circle")
        .attr("r", Math.sqrt((1*1000000000000))/200000)
        .attr("cx", width-20)
        .attr("cy", height-119)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", Math.sqrt((10*1000000000000))/200000)
        .attr("cx", width-20)
        .attr("cy", height-90)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", Math.sqrt((100*1000000000000))/200000)
        .attr("cx", width-20)
        .attr("cy", height-15)
        .style("fill", "white");
    
/*------------------------------------------------------------------------------------------------------------------------------------------------
Append text to denote the value of each circle size
------------------------------------------------------------------------------------------------------------------------------------------------*/


    svg.append("text")
        .attr("class", "label")
        .attr("x", width -90)
        .attr("y", height-112)
        .style("text-anchor", "end")
        .text(" 1 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -84)
        .attr("y", height-84)
        .style("text-anchor", "end")
        .text(" 10 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -75)
        .attr("y", height)
        .style("text-anchor", "end")
        .text(" 100 Trillion BTUs");
    
     
/*------------------------------------------------------------------------------------------------------------------------------------------------
Append text to display the legend title
------------------------------------------------------------------------------------------------------------------------------------------------*/


    svg.append("text")
        .attr("class", "label")
        .attr("x", width -95)
        .attr("y", height+50)
        .style("text-anchor", "middle")
        .style("fill", "Green") 
        .attr("font-size", "15px")
        .text("Total Energy Consumption"); 
    
/*------------------------------------------------------------------------------------------------------------------------------------------------
X-axis label
------------------------------------------------------------------------------------------------------------------------------------------------*/

    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
        .attr("class", "label")
        .attr("y", 105)
        .attr("x", width/2+60)
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
     .attr("fill", "#000")
        .text("GDP (in Trillion US Dollars) in 2010");
    
    
/*------------------------------------------------------------------------------------------------------------------------------------------------
Y-axis label
------------------------------------------------------------------------------------------------------------------------------------------------*/
    
     svg.append("g")
        .append("text")
        //.attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("x", -130)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("font-size", "12px")
     .attr("fill", "#000")
        .text("Energy Consumption per Capita (in Million BTUs per person)");
    
    
 });