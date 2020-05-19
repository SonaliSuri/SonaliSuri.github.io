/*----------------------------------------------------------------------------------------------------------------------------------------------

The svg element is defined in our HTML page. We need to acces it using d3.select("svg")
The margin values are set as follows: top -> 20 px, right -> 80 px, bottom -> 30 px, left -> 50px
width = svg.attr("width") - margin.left - margin.right => here svg.attr("width") refers to the width of the svg element set in the HTML page (1160)
height=svg.attr("height") - margin.top - margin.bottom => here svg.attr("height") refers to the height of the svg element set in the HTML page (500)
g elemenet is appended to svg which used to group SVG shapes together and translated as needed.
-----------------------------------------------------------------------------------------------------------------------------------------------*/

var svg = d3.select("svg"),
    margin = { top: 20, right: 80, bottom: 40, left: 50 },
    width = 960 - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/*----------------------------------------------------------------------------------------------------------------------------------------------

d3.TimeParse() is used to indicate what the date should look like. d3.timeparse("%Y") means that we would like to have just the year as the output string.
d3.scaleLinear() is used map the values of a specific domain to a range mentioned. d3.scaleTime() is similar to d3.scaleLinear but deals with timeseries data except that the domain here is the form of dates.
d3.scaleOrdinal tries to map the values provided in the form of array to the discrete values which is also provided in the form of array.In this case,
the input array would be name of the countries and that would be mapped to d3.schemeCategory10 which is an array of ten categorical colors represented as RGB hexadecimal strings. Hence, we would get a color for each of the country. In case the number of the countries would have been greater than 10, the colors will start repeating.
-----------------------------------------------------------------------------------------------------------------------------------------------*/


var parseTime = d3.timeParse("%Y");

var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);


/*----------------------------------------------------------------------------------------------------------------------------------------------
D3 provides a number of curve types to interpolate or approximate a set of points. For this assignment I have used the type curveBasis for interpolation.
The details for x and y coordinates are provided by the date (year) as x and usage as y coordinate.
-----------------------------------------------------------------------------------------------------------------------------------------------*/

var line = d3.line()
    .curve(d3.curveLinear)
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.price); });

/*----------------------------------------------------------------------------------------------------------------------------------------------
The below functions help to create gridlines for both x and y axes at ticks of 5.
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 

function gridXaxis(){
    return d3.axisBottom(x)
        .ticks(10)
}

function gridYAxis() {
    console.log(d3.axisLeft(y));
    return d3.axisLeft(y)
        .ticks(5)
}

/*----------------------------------------------------------------------------------------------------------------------------------------------
The variable filterdata is used to store the values which needs to be displayed. By default data for all countries will be displayed.
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 



var filterData = { "Brazil": true, "China": true, "India": true, "Russia": true, "South Africa": true, "United States": true,"PK":true,"SK":true };


/*----------------------------------------------------------------------------------------------------------------------------------------------
The drawchart function is called through the redraw function defined later. This is called on the onlclick events of the legends.
BAsed on the the legends selected, the filtereddata is updata and accordingly the data is displayed.
Load the BRICSdata.csv. We pass the data of the file to the function type to convert :
{
Brazil: "42.52264625"
China: "35.6471922"
India: "16.54654149"
Russia: "167.5039675"
South Africa: "96.15287984"
United States: "319.47567"
date: "2000"
}

to 
{
Brazil: 42.52264625
China: 35.6471922
India: 16.54654149
Russia: 167.5039675
South Africa: 96.15287984
United States: 319.47567
date: Sat Jan 01 2000 00:00:00 GMT-0800 (Pacific Standard Time) {}
}

Then we store the values as:
{
id: "Brazil",
values: 
    {
    date: Sat Jan 01 2000 00:00:00 GMT-0800 (Pacific Standard Time),
    usage: 42.52264625
    }
}, and so on for other countries.



-----------------------------------------------------------------------------------------------------------------------------------------------*/ 

function drawChart(filterData) {
    d3.csv("BRICSdata.csv", type).then(function (data) {

        var countries = data.columns.slice(1).map(function (id) {
            return {
                id: id,
                values: data.map(function (d) {
                    return { date: d.date, price: d[id] };
                })
            };
        });
        
 /*----------------------------------------------------------------------------------------------------------------------------------------------
newcountries have the original data from the file whereas countries have the filtered data which are selected by the user. This is done to have
the names of all the countries even when the filter is changed.
-----------------------------------------------------------------------------------------------------------------------------------------------*/
       
        newcountries = countries;
        countries = countries.filter(function (d) { return filterData[d.id] == true });
/*----------------------------------------------------------------------------------------------------------------------------------------------
d3.extent helps us to get the values of the range for years i.e the min and the max value:
In this case for years the values are as follows:
on x axis: [Sat Jan 01 2000 00:00:00 GMT-0800 (Pacific Standard Time), Wed Jan 01 2014 00:00:00 GMT-0800 (Pacific Standard Time)] where min is year 2000 and max is year 2014  by default and updates based on the filtered data.
Similarly for y axis we get the min and max values for the usage as use it as the domain based on the filtered data.
 z.domain(countries.map(function(c) { return c.id; })); is used to assign the colors with each of the country by passing each of the country name to z. 
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 
    



        x.domain(d3.extent(data, function (d) { return d.date; }));

        y.domain([
            d3.min(countries.filter(function (d) { return filterData[d.id] == true; }), function (c) { return d3.min(c.values, function (d) { return d.price; }); }),
            d3.max(countries.filter(function (d) { return filterData[d.id] == true; }), function (c) { return d3.max(c.values, function (d) { return d.price; }); })
        ]);


        z.domain(newcountries.map(function (c) { return c.id; }));

/*----------------------------------------------------------------------------------------------------------------------------------------------
The below code is used to create a legend for all the BRICS countries and use them as a filter. For each country a rectangle is filled with the corresponding color and the text / name of the country is displayed next to it.
-----------------------------------------------------------------------------------------------------------------------------------------------*/
         





/*----------------------------------------------------------------------------------------------------------------------------------------------
Below commands are used to create the x and y axis and have the text "Million BTUs Per Person " for y axis by rotating at -90 degrees.
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 


        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")

            .attr("x", 875)
            .attr("dx", "0.71em")
            .attr("fill", "#000")
            .text("States");

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(5)
            )



            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("x", -175)
            .attr("dy", "-4.5em")
            .attr("fill", "#000")
            .text("Client and nodes");


/*----------------------------------------------------------------------------------------------------------------------------------------------
The below commands are used to create gridlines for x and y axis by calling functions we defined before. tickSize(-height) indicates the height of the gridlines drawn over x axis. tickSize(-width) indicates the width of the lines of the gridlines over y axis
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 
  

        g.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(gridXaxis()
                .tickSize(-height)
                .tickFormat("")
            )

        // add the Y gridlines
        g.append("g")
            .attr("class", "grid")
            .call(gridYAxis()
                .tickSize(-width)
                .tickFormat("")
            );
/*----------------------------------------------------------------------------------------------------------------------------------------------
The code treis to find tags with class country and if it doesnt find, it appends a g with class country. Using the countries data mentioned before,
the values for countries are provided to the line() =>
var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.usage); }); 
    which is defined above.
This approximates the values and prolts the curve using curveBasis and the color is the one which we had set above in function z. So we pass the values for country name and color the line accordingly based on the value returned by the function.
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 
 

        var country = g.selectAll(".country")
            .data(countries.filter(function (d) { return filterData[d.id] == true; }))
            .enter().append("g")
            .attr("class", "country");

        country.append("path")
            .attr("class", "line")

            .attr("d", function (d) { return line(d.values); })
            .style("stroke", function (d) { return z(d.id); });
        svg.selectAll(".country")
            .data(countries.filter(function (d) { return filterData[d.id] == true; }))
            .exit()
            .remove();

        var totalLength = width + width;

/*----------------------------------------------------------------------------------------------------------------------------------------------
The code below creates the animation effect using the d3.easeLinear effect and duration of 2000
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 
      
        country
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(3000)
            .ease(d3.easeLinear)

            .attr("stroke-dashoffset", 0);


/*----------------------------------------------------------------------------------------------------------------------------------------------
The code below appends the text / countryname with each line at the end.
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 

        country.append("text")
            .datum(function (d) { return { id: d.id, value: d.values[d.values.length - 1] }; })
            .attr("transform", function (d) { return "translate(" + x(d.value.date) + "," + y(d.value.price) + ")"; })
            .attr("x", 3)
            .attr("dy", "0.35em")
            .style("font", "10px sans-serif")
           // .text(function (d) { return d.id; })
/*----------------------------------------------------------------------------------------------------------------------------------------------
The code below helps to provide a title to the visualization
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 

        g.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2) + 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style('fill', "#1A719C")

           // .text("Energy Consumption Per Capita");
        
         g.append("text")
            .attr("x", (width / 6))
            .attr("y", 0 - (margin.top / 2) + 480)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style('fill', "#1A719C")
            .text("<Prepare,<Pre-Prepare>>");
        
        g.append("text")
            .attr("x", (width / 2)-50)
            .attr("y", 0 - (margin.top / 2) + 480)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style('fill', "#1A719C")
            .text("<Commit,<Prepare>>");
        
                
        g.append("text")
            .attr("x", (width / 2)+180)
            .attr("y", 0 - (margin.top / 2) + 480)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style('fill', "#1A719C")
            .text("<CommitACK,<Prepare>>");
        
         g.append("text")
            .attr("x", (width / 2)+360)
            .attr("y", 0 - (margin.top / 2) + 480)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style('fill', "#1A719C")
            .text("Reply");
/*----------------------------------------------------------------------------------------------------------------------------------------------
The code below helps to provide the mouse-over-effects which is as per 2nd requirement of the bonus question.
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 
      
/*----------------------------------------------------------------------------------------------------------------------------------------------
The code below append a rectangle to catch mouse movements on canvas. When the mouseout event takes place it hides line, circles and text.
 In the case of on-mouse-in the rectangle or onmouseover event show line, circles and text.

-----------------------------------------------------------------------------------------------------------------------------------------------*/ 
  

    })
}

function type(d, _, columns) {
  // d.date = parseTime(d.date);
    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
    return d;
}
console.log(filterData);
drawChart(filterData);
/*----------------------------------------------------------------------------------------------------------------------------------------------
The redraw function inverts the selection of the passed country name. If the legend when clicked is checked it will be unchecked and vice-versa
and accordingly the filterdata is updated as filterData[id] = !filterData[id];
As the filterdata is now updated ,  chart needs to be redrawn hence we call the function drawchart with the updated filterdata.
-----------------------------------------------------------------------------------------------------------------------------------------------*/ 
            
   
function reDraw(id) {

    filterData[id] = !filterData[id];
    console.log("redraw :");
    console.log(filterData);
    drawChart(filterData);
}


