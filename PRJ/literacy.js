/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define width and height
------------------------------------------------------------------------------------------------------------------------------------------------------*/
 


var w = 800,
          h = 900;

      // PROJECTION   
      /*
      A Different projection which doesn't work very well for Mumbai
      var projection = d3.geo.conicConformal() 
          .rotate([0, 0, 0])  
          .center([72.8777, 19.089]) // Approximately the coordinates of Mumbai (slightly North)
          .scale(90000)
          .parallels([37.06666666666667, 38.43333333333333])
          .translate([width / 2, height / 2])
          .precision(.1);
      */
      // MERCATOR
    /*var projection = d3.geoMercator()
          .center([72.8777, 19.089]) // Approximately the coordinates of Mumbai (slightly North)
          .scale(90500)
          .translate([w / 2, 310]);

      var path = d3.geoPath()
          .projection(projection);/*----*/
 var projection = d3.geoMercator()
          .center([77.1025,28.7041]) // Approximately the coordinates of Delhi (slightly North)
          .scale(90500)
          .translate([w / 1.9, 310]);

      var path = d3.geoPath()
          .projection(projection);


  					//.scale(54000)
  					//.translate([(w/2)+30, (h)/2]);

/*var projection = d3.geoMercator()
          .center([80.2707, 13.0827]) // Approximately the coordinates of Chennai (slightly North)
          .scale(90500)
          .translate([w / 2, 310]);

      var path = d3.geoPath()
          .projection(projection);*/

/*var projection = d3.geoMercator()
          .center([77.5946, 12.9716]) // Approximately the coordinates of Bangalore (slightly North)
          .scale(90500)
          .translate([w / 2, 310]);

      var path = d3.geoPath()
          .projection(projection);*/

/*var projection = d3.geoMercator()
          .center([75.7873, 26.9124]) // Approximately the coordinates of Jaipur (slightly North)
          .scale(90500)
          .translate([w / 2, 310]);

      var path = d3.geoPath()
          .projection(projection);*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define path generator
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var path = d3.geoPath()
             .projection(projection);



/*------------------------------------------------------------------------------------------------------------------------------------------------------
Create SVG element
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define tooltip
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0)
.classed("hidden", true);

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define colors
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var color = d3.scaleQuantize()
.range(['rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(37,52,148)','rgb(8,29,88)']);


/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load populationdensity.csv
------------------------------------------------------------------------------------------------------------------------------------------------------*/
     d3.csv("Delh_new.csv").then(function(populationcsv) {
    
    
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Store data in stateData
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var stateData = [];
        for(var i = 0; i < populationcsv.length; i++){
            stateData.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT});
        }

        
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load json data
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            d3.json("delhi.geojson").then(function(json) {
            
        stateData.forEach(function(region, i){
            var dataRegionName = region.region;
            var dataDensity = parseFloat(region.density);
            var dataLiteracy = parseFloat(region.literacy);
           
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Find correct feature in json (statename) and assign correct density value from csv based on state name
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            for (var j = 0; j < json.features.length; j++){
                var jsonRegionName = json.features[j].properties.Ward_No;
                console.log(jsonRegionName);
                console.log(dataRegionName);
                if(dataRegionName == jsonRegionName){
                    console.log("Yes");
                    console.log(json.features[j].properties.name);
                    json.features[j].properties.density = dataDensity;
                    json.features[j].properties.literacy = dataLiteracy;
                    console.log(json.features[j].properties.density);
                    break;
                }
                
            }
        })  
            console.log(stateData);
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Bind data and create one path per GeoJSON feature
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        
       /* console.log(stateData);
            console.log(json);*/
            svg.selectAll("path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .style("stroke", "black")
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Mouseover and mouseout events for tooltips
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                    .on("mouseover", function(d){
            
                        tooltip.transition()		
                        .duration(1)	
                        .style("opacity", .9);	
                        console.log(d.properties);
                       // tooltip .html(d.properties.Ward_Name + "<br>" + "Total Population: " + +d.properties.density)    
                    tooltip .html(
                     '<table width="100%" height="100%"><tr><th colspan="3" style="text-align:center">' + 
                          d.properties.Ward_Name +
                         '</th></tr><tr><td width="45%" style="text-align:left">' +                          
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.density+''+ '</td></tr>'+
                '<tr><td style="text-align:left" >'+
                         'Literacy</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.literacy+ '</td></tr>'+
                       /* '<tr><td style="text-align:left">'+
                         'EPC </td><td width="5%">:</td><td style="text-align:right">'  + d.epc+ ' Million BTUs'+ '</td></tr><tr><td style="text-align:left">'+ 
                        'Total </td><td width="5%">:</td><td style="text-align:right">'  + d.total +' Trillion BTUs'+ '</td></tr>*/
                '</table>' )
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");	
		 
            
			       })
			       .on("mouseout", function() {
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Hide tooltip on mouseout
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                       tooltip.transition()		
                        .duration(1)		
                        .style("opacity", 0)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
			       })
                    .style("fill", function(d){
                
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Fill colors based on density. ower the density lighter the color.
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                       var densitycolor = d.properties.literacy;
                         if(!densitycolor){
                            return '#ccc';
                        }
                        if(densitycolor < 5001){
                            return 'rgb(255,255,217)';
                        }
                        else if (densitycolor < 10501){
                            return 'rgb(237,248,177)';
                        }
                        else if (densitycolor < 25001){
                            return '#F0BA70';
                        }
                        else if (densitycolor < 30051){
                            return 'rgb(233,199,180)';
                        }
                        else if (densitycolor < 55001){
                            return '#F68756';
                        }
                        else if (densitycolor < 75001){
                            return '#EA5A3E';
                        }
                        else if (densitycolor < 85000){
                            return '#DA2B27';
                        }
                        else if (densitycolor < 90000){
                            return '#C12600';
                        }
                        else if (densitycolor < 100000){
                            return '#9B0000';
                        }
                        else if (densitycolor < 145001){
                            return '#6D0000';
                        }
                        else{
                            return "#580000";
                        }
                    }); 
		
                   // console.log(json.features);
            
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Legends for colors
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            
          /*  var legend = d3.select('svg')
                       .append('g')
                       .selectAll('g')
                       .data(color.range())
                       .enter()
                       .append('g')
                       .attr('class', 'legend')
                       .text("hi there")
                       .attr('transform', function(d, i){
                           var height = 30;
                           var x = 700;
                           var y = i * height;
                           return 'translate(' + x + ',' + (y + 40) + ')';
                       });
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Appending a rectangle for each color
------------------------------------------------------------------------------------------------------------------------------------------------------*/
         /*   legend.append('rect')
                    .attr('width', 20)
                    .attr('height', 20)
                    .style('fill', function(d){ return d; })
                    .style('stroke', color);
            legend.append('text')
                    .attr('x', 25)
                    .attr('y', 16)
                    .text(function(d, i){
                    var ranges = ["1-25", "26-50", "51-100", "101-250", "251-500", "501-1000", "1001-2500", "2501-5000", "5001-10000", ">10000"];
                        return ranges[i] + "   people/square km";*/
                    });
        });
  


 /*var projection = d3.geoMercator()
          .center([72.8777, 19.089]) // Approximately the coordinates of Mumbai (slightly North)
          .scale(90500)
          .translate([w / 2, 310]);

      var path = d3.geoPath()
          .projection(projection);/*----*/

  					//.scale(54000)
  					//.translate([(w/2)+30, (h)/2]);

/*var projection = d3.geoMercator()
          .center([80.2707, 13.0827]) // Approximately the coordinates of Chennai (slightly North)
          .scale(90500)
          .translate([w / 2, 310]);

      var path = d3.geoPath()
          .projection(projection);*/

/*var projection = d3.geoMercator()
          .center([77.5946, 12.9716]) // Approximately the coordinates of Bangalore (slightly North)
          .scale(90500)
          .translate([w / 2, 310]);

      var path = d3.geoPath()
          .projection(projection);*/


 var w = 700,
          h = 900;




var projection2 = d3.geoMercator()
          .center([77.5946, 12.9716]) // Approximately the coordinates of Bangalore (slightly North)
          .scale(105000)
          .translate([w / 2, 410]);

      var path2 = d3.geoPath()
          .projection(projection2);

var svg3 = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define tooltip
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0)
.classed("hidden", true);

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define colors
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var color = d3.scaleQuantize()
.range(['rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(37,52,148)','rgb(8,29,88)']);


/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load populationdensity.csv
------------------------------------------------------------------------------------------------------------------------------------------------------*/

d3.csv("bangalore.csv").then(function(populationcsv) {
 
    
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Store data in stateData
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var stateData = [];
        for(var i = 0; i < populationcsv.length; i++){
            stateData.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                           literacy:populationcsv[i].P_LIT});
        }

        
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load json data
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            d3.json("bangalore.geojson").then(function(json) {
            
        stateData.forEach(function(region, i){
            var dataRegionName = region.region;
            var dataDensity = parseFloat(region.density);
            var dataLiteracy = parseFloat(region.literacy);
           
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Find correct feature in json (statename) and assign correct density value from csv based on state name
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            for (var j = 0; j < json.features.length; j++){
                var jsonRegionName = json.features[j].properties.WARD_NO;
                console.log(jsonRegionName);
                console.log(dataRegionName);
                if(dataRegionName == jsonRegionName){
                    console.log("Yes");
                    //console.log(json.features[j].properties.name);
                    json.features[j].properties.density = dataDensity;
                    json.features[j].properties.literacy = dataLiteracy;
                    //console.log(json.features[j].properties.density);
                    break;
                }
                
            }
        })  
            console.log(stateData);

        
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load json data
------------------------------------------------------------------------------------------------------------------------------------------------------*/
          
    
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Bind data and create one path per GeoJSON feature
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        
       /* console.log(stateData);
            console.log(json);*/
            svg3.selectAll("path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("d", path2)
                    .style("stroke", "black")
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Mouseover and mouseout events for tooltips
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                   .on("mouseover", function(d){
            
                        tooltip.transition()		
                        .duration(1)	
                        .style("opacity", .9);		
                       // tooltip .html(d.properties.WARD_NAME + "<br>" + "Total Population: " + +d.properties.density + "") 
                tooltip .html(
                     '<table width="100%" height="100%"><tr><th colspan="3" style="text-align:center">' + 
                          d.properties.WARD_NAME +
                         '</th></tr><tr><td width="45%" style="text-align:left">' +                          
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.density+''+ '</td></tr>'+
                     '<tr><td style="text-align:left" >'+
                         'Literacy</td><td width="5%">:</td><td style="text-align:right">'  +d.properties.literacy+ '</td></tr>'+
                /*'<tr><td style="text-align:left" >'+
                         'GDP</td><td width="5%">:</td><td style="text-align:right">'  + '$'+d.gdp+' Trillion'+ '</td></tr><tr><td style="text-align:left">'+
                         
                         'EPC </td><td width="5%">:</td><td style="text-align:right">'  + d.epc+ ' Million BTUs'+ '</td></tr><tr><td style="text-align:left">'+ 
                        'Total </td><td width="5%">:</td><td style="text-align:right">'  + d.total +' Trillion BTUs'+ '</td></tr>*/
                '</table>' )
                
                
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");	
		 
            
			       })
			       .on("mouseout", function() {
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Hide tooltip on mouseout
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                       tooltip.transition()		
                        .duration(1)		
                        .style("opacity", 0)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
			       })
                    .style("fill", function(d){
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Fill colors based on density. ower the density lighter the color.
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                var densitycolor = d.properties.literacy;    
              
                        if(!densitycolor){
                            return '#ccc';
                        }
                        if(densitycolor < 5001){
                            return 'rgb(255,255,217)';
                        }
                        else if (densitycolor < 10501){
                            return 'rgb(237,248,177)';
                        }
                        else if (densitycolor < 25001){
                            return '#F0BA70';
                        }
                        else if (densitycolor < 30051){
                            return 'rgb(233,199,180)';
                        }
                        else if (densitycolor < 55001){
                            return '#F68756';
                        }
                        else if (densitycolor < 75001){
                            return '#EA5A3E';
                        }
                        else if (densitycolor < 85000){
                            return '#DA2B27';
                        }
                        else if (densitycolor < 90000){
                            return '#C12600';
                        }
                        else if (densitycolor < 100000){
                            return '#9B0000';
                        }
                        else if (densitycolor < 145001){
                            return '#6D0000';
                        }
                        else{
                            return "#580000";
                        }
                    }); 
                   // console.log(json.features);
                
                
            
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Legends for colors
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            
          /*  var legend = d3.select('svg')
                       .append('g')
                       .selectAll('g')
                       .data(color.range())
                       .enter()
                       .append('g')
                       .attr('class', 'legend')
                       .text("hi there")
                       .attr('transform', function(d, i){
                           var height = 30;
                           var x = 700;
                           var y = i * height;
                           return 'translate(' + x + ',' + (y + 40) + ')';
                       });
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Appending a rectangle for each color
------------------------------------------------------------------------------------------------------------------------------------------------------*/
         /*   legend.append('rect')
                    .attr('width', 20)
                    .attr('height', 20)
                    .style('fill', function(d){ return d; })
                    .style('stroke', color);
            legend.append('text')
                    .attr('x', 25)
                    .attr('y', 16)
                    .text(function(d, i){
                    var ranges = ["1-25", "26-50", "51-100", "101-250", "251-500", "501-1000", "1001-2500", "2501-5000", "5001-10000", ">10000"];
                        return ranges[i] + "   people/square km";*/
                    });
        });


   