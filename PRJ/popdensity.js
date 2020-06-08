/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define width and height
------------------------------------------------------------------------------------------------------------------------------------------------------*/
 var w = 850,
          h = 850;


 var projection = d3.geoMercator()
          .center([77.1025,28.7041]) // Approximately the coordinates of Delhi (slightly North)
          .scale(70500)
          .translate([w / 2.5, 270]);

      var path = d3.geoPath()
          .projection(projection);



/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define path generator
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var path = d3.geoPath()
             .projection(projection);



/*------------------------------------------------------------------------------------------------------------------------------------------------------
Create SVG element
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var svg = d3.select("#body1")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


var w=540;
var h=850;
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define tooltip
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var tooltip = d3.select("#body1").append("div")
.attr("class", "tooltip")
.style("opacity", 0)
.classed("hidden", true);

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define colors
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var color = d3.scaleQuantize()
.range(['rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(37,95,180)'
       ,'rgb(37,52,170)','rgb(37,52,148)','rgb(37,52,108)']);

                
var color2 = d3.scaleQuantize()
.range(['#5e4fa2',
'#3288bd',
'#66c2a5',
'#abdda4',
'#e6f598',
'#ffffbf',
'#fee08b',
'#fdae61',
'#f46d43',
'#d53e4f',
'#9e0142']); 









/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load populationdensity.csv
------------------------------------------------------------------------------------------------------------------------------------------------------*/

d3.selectAll(".dataset")
            .on("change", update);

var stateData1=[]
var stateData2=[]
d3.csv("bangalore.csv").then(function(populationcsv) {


/*------------------------------------------------------------------------------------------------------------------------------------------------------
Store data in stateData
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        
        for(var i = 0; i < populationcsv.length; i++){
            stateData1.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                             literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                            
                           to_plot:populationcsv[i].TOT_P});
        }
    
});
d3.csv("Delh_new.csv").then(function(populationcsv) {

        for(var i = 0; i < populationcsv.length; i++){
            stateData2.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].TOT_P});
        }
   
});


popDelhi(stateData2,stateData1,"population","total");

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load populationdensity.csv
------------------------------------------------------------------------------------------------------------------------------------------------------*/





function update(val=this.value)
{
   
    
     var svg5 = d3.selectAll("svg");
      svg5.remove("*");
 
     var w = 850,
          h = 850;
 svg = d3.select("#body1")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
      var w = 540,
          h = 850;
   



 var projection = d3.geoMercator()
          .center([77.1025,28.7041]) // Approximately the coordinates of Delhi (slightly North)
          .scale(70500)
          .translate([w / 2.3, 270]);

   



/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define path generator
------------------------------------------------------------------------------------------------------------------------------------------------------*/
var path = d3.geoPath()
             .projection(projection);
    console.log("MNW"+val);
    
    var stateData1 = [];
    var stateData2 = [];
    var stateData3 = [];
    var stateData4 = [];
     var stateData5 = [];
    var stateData6 = [];
    var stateData7 = [];
    var stateData8 = [];
    d3.csv("Delh_new.csv").then(function(populationcsv) {
    
     var tot_pop_delhi=16368899;
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Store data in stateData
------------------------------------------------------------------------------------------------------------------------------------------------------*/
     
        for(var i = 0; i < populationcsv.length; i++){
            stateData1.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].TOT_P});
        }
    
        for(var i = 0; i < populationcsv.length; i++){
            stateData2.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].P_LIT});
        }
        for(var i = 0; i < populationcsv.length; i++){
            stateData5.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].P_LIT*100/populationcsv[i].TOT_P});
        }
    
        for(var i = 0; i < populationcsv.length; i++){
            stateData6.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P});
        }
         
        
    });
  


var projection2 = d3.geoMercator()
          .center([77.5946, 12.9716]) // Approximately the coordinates of Bangalore (slightly North)
          .scale(95000)
          .translate([w / 2.3, 370]);

      var path2 = d3.geoPath()
          .projection(projection2);



d3.csv("bangalore.csv").then(function(populationcsv) {

       var tot_pop_bang=8749944;
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Store data in stateData
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        
    
    
    
  
        for(var i = 0; i < populationcsv.length; i++){
            stateData3.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].TOT_P});
        }

        for(var i = 0; i < populationcsv.length; i++){
            stateData4.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].P_LIT});
        }
    for(var i = 0; i < populationcsv.length; i++){
            stateData7.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].P_LIT*100/populationcsv[i].TOT_P});
        }

        for(var i = 0; i < populationcsv.length; i++){
            stateData8.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                             literacyrate:populationcsv[i].P_LIT*100/populationcsv[i].TOT_P,
                             unemployed:populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P,
                           to_plot: populationcsv[i].NON_WORK_P*100/populationcsv[i].TOT_P});
        }
         
       
    
    
});
     if (val=="population")
            {
                popDelhi(stateData1,stateData3,val);
                
            }
        else if (val=="literacy")
            {
                popDelhi(stateData2,stateData4,val);
                
            }
    else if (val=="literacyrate")
            {
                popDelhi(stateData5,stateData7,val);
                
            }
        else if (val=="unemployment")
            {
                popDelhi(stateData6,stateData8,val);
                
            }
    
    
    
   

}


function popDelhi(stateData,state2Data,types)


{
    
   
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Appending a rectangle for each color
------------------------------------------------------------------------------------------------------------------------------------------------------*/
    if (types=="population")
        {
             var legend = d3.select('svg')
                       .append('g')
                       .selectAll('g')
                       .data(color.range())
                       .enter()
                       .append('g')
                       .attr('class', 'legend')
                       .text("hi there")
                       .attr('transform', function(d, i){
                           var height = 30;
                           var x = 710;
                           var y = i * height;
                           return 'translate(' + x + ',' + (y + 40) + ')';
                       });
    legend.append('rect')
                    .attr('width', 20)
                    .attr('height', 20)
                    .style('fill', function(d){ return d; })
                    .style('stroke', color);
            legend.append('text')
                    .attr('x', 25)
                    .attr('y', 16)
                    .text(function(d, i){
                    var ranges = ["1-5,000", "5,001-10,500", "10,501-25,000", "25,001-50,050", "50,051-75,000", "75,001-80,000", "80,001-84,999", "85,000-89,999", "90,000-99,999", "100,000-145,000",">145,001"];
                        return ranges[i];
                    });
     
        }
    else if (types=="literacy")
        {
             var legend = d3.select('svg')
                       .append('g')
                       .selectAll('g')
                       .data(color.range())
                       .enter()
                       .append('g')
                       .attr('class', 'legend')
                       .text("hi there")
                       .attr('transform', function(d, i){
                           var height = 30;
                           var x = 710;
                           var y = i * height;
                           return 'translate(' + x + ',' + (y + 40) + ')';
                       });
    legend.append('rect')
                    .attr('width', 20)
                    .attr('height', 20)
                    .style('fill', function(d){ return d; })
                    .style('stroke', color);
            legend.append('text')
                    .attr('x', 25)
                    .attr('y', 16)
                    .text(function(d, i){
                    var ranges = ["1-5,000", "5,001-10,500", "10,501-25,000", "25,001-50,050", "50,051-75,000", "75,001-80,000", "80,001-84,999", "85,000-89,999", "90,000-99,999", "100,000-145,000",">145,001"];
                        return ranges[i];
                    });
              
        }
    else if (types=="literacyrate")
        {
             var legend = d3.select('svg')
                       .append('g')
                       .selectAll('g')
                       .data(color.range())
                       .enter()
                       .append('g')
                       .attr('class', 'legend')
                       .text("hi there")
                       .attr('transform', function(d, i){
                           var height = 30;
                           var x = 710;
                           var y = i * height;
                           return 'translate(' + x + ',' + (y + 40) + ')';
                       });
    legend.append('rect')
                    .attr('width', 20)
                    .attr('height', 20)
                    .style('fill', function(d){ return d; })
                    .style('stroke', color);
            legend.append('text')
                    .attr('x', 25)
                    .attr('y', 16)
                    .text(function(d, i){
                    var ranges = ["0%-1%","1%-49%","50%-64%","65%-69%","70%-72%","73%-75%","76%-81%","82%-84%","85%-86%","87%-90%", ">=91%"];
                        return ranges[i];
                    });
     
        }
    else if (types=="unemployment")
        {
             var legend = d3.select('svg')
                       .append('g')
                       .selectAll('g')
                       .data(color2.range())
                       .enter()
                       .append('g')
                       .attr('class', 'legend')
                       .text("hi there")
                       .attr('transform', function(d, i){
                           var height = 30;
                           var x = 710;
                           var y = i * height;
                           return 'translate(' + x + ',' + (y + 40) + ')';
                       });
    legend.append('rect')
                    .attr('width', 20)
                    .attr('height', 20)
                    .style('fill', function(d){ return d; })
                    .style('stroke', color2);
            legend.append('text')
                    .attr('x', 25)
                    .attr('y', 16)
                    .text(function(d, i){
                    var ranges = ["0%-9%","10%-40%","41%-44%","45%-47%","48%-54%","55%-57%","58%-59%","60%-64%", "65%-69%", "70%-80%" , ">=81%"];
                        return ranges[i];
                    });
              
        }
    
    console.log(types);
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load json data
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            d3.json("delhi.geojson").then(function(json) {
            
        stateData.forEach(function(region, i){
            var dataRegionName = region.region;
            var dataDensity = parseFloat(region.density);
            var dataLiteracy = parseFloat(region.literacy);
            var dataLiteracyRate = parseFloat(region.literacyrate)
            var dataUnemployment = parseFloat(region.unemployed)
            var toplot=region.to_plot;
           
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Find correct feature in json (statename) and assign correct density value from csv based on state name
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            for (var j = 0; j < json.features.length; j++){
                var jsonRegionName = json.features[j].properties.Ward_No;
                //console.log(jsonRegionName);
                //console.log(dataRegionName);
                if(dataRegionName == jsonRegionName){
                   // console.log("Yes");
                    //console.log(json.features[j].properties.name);
                    json.features[j].properties.density = dataDensity;
                    json.features[j].properties.literacy = dataLiteracy;
                    json.features[j].properties.literacyrate = dataLiteracyRate;
                    json.features[j].properties.unemployment = dataUnemployment;
                    json.features[j].properties.toplot = toplot;
                   // console.log(json.features[j].properties.density);
                    break;
                }
                
            }
        })  
           // console.log(stateData);
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
                       // console.log(d.properties);
                       // tooltip .html(d.properties.Ward_Name + "<br>" + "Total Population: " + +d.properties.density)    
                    tooltip .html(
                     '<table width="100%" height="100%"><tr><th colspan="3" style="text-align:center">' + 
                          d.properties.Ward_Name +
                         '</th></tr><tr><td width="45%" style="text-align:left">' +                          
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + (d3.format(",.0f")(d.properties.density))+''+ '</td></tr>'+
                '<tr><td style="text-align:left" >'+
                         'Literacy</td><td width="5%">:</td><td style="text-align:right">'  + (d3.format(",.0f")(d.properties.literacy))+ '</td></tr>'+
                        '<tr><td style="text-align:left" >'+
                        'Literacy %</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.literacyrate.toFixed(1)+'%'+ '</td></tr>'+
                         '<tr><td style="text-align:left" >'+
                        'Non working %</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.unemployment.toFixed(1)+'%'+ '</td></tr>'+
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
                if (types=="population")
                    {
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Fill colors based on density. ower the density lighter the color.
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                       var density = d.properties.toplot;
                        if(!density){
                            return '#ccc';
                        }
                        if(density < 5001){
                            return 'rgb(255,255,217)';
                        }
                        else if (density < 10501){
                            return 'rgb(237,248,177)';
                        }
                        else if (density < 25001){
                            return 'rgb(199,233,180)';
                        }
                        else if (density < 50051){
                            return 'rgb(127,205,187)';
                        }
                        else if (density < 75001){
                            return 'rgb(65,182,196)';
                        }
                        else if (density < 80001){
                            return 'rgb(29,145,192)';
                        }
                        else if (density < 85000){
                            return 'rgb(34,94,168)';
                        }
                        else if (density < 90000){
                            return 'rgb(37,95,180)';
                        }
                        else if (density < 100000){
                            return 'rgb(37,52,170)';
                        }
                        else if (density < 145001){
                            return 'rgb(37,52,148)';
                        }
                        else{
                            return "rgb(37,52,108)";
                        }
                        
                        
                    }
                else if (types=="literacy")
                    {
                           var density = d.properties.toplot;
                        if(!density){
                            return '#ccc';
                        }
                        if(density < 5001){
                            return 'rgb(255,255,217)';
                        }
                        else if (density < 10501){
                            return 'rgb(237,248,177)';
                        }
                        else if (density < 25001){
                            return 'rgb(199,233,180)';
                        }
                        else if (density < 50051){
                            return 'rgb(127,205,187)';
                        }
                        else if (density < 75001){
                            return 'rgb(65,182,196)';
                        }
                        else if (density < 80001){
                            return 'rgb(29,145,192)';
                        }
                        else if (density < 85000){
                            return 'rgb(34,94,168)';
                        }
                        else if (density < 90000){
                            return 'rgb(37,95,180)';
                        }
                        else if (density < 100000){
                            return 'rgb(37,52,170)';
                        }
                        else if (density < 145001){
                            return 'rgb(37,52,148)';
                        }
                        else{
                            return "rgb(37,52,108)";
                        }
                        
                    }
                else if (types=="literacyrate")
                    {
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Fill colors based on density. ower the density lighter the color.
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                       var density = d.properties.toplot;
                        if(!density){
                            return '#ccc';
                        }
                        if(density < 1){
                            return 'rgb(255,255,217)';
                        }
                        else if (density < 50){
                            return 'rgb(237,248,177)';
                        }
                        else if (density < 65){
                            return 'rgb(199,233,180)';
                        }
                        else if (density < 70){
                            return 'rgb(127,205,187)';
                        }
                        else if (density < 73){
                            return 'rgb(65,182,196)';
                        }
                        else if (density < 76){
                            return 'rgb(29,145,192)';
                        }
                        else if (density <82){
                            return 'rgb(34,94,168)';
                        }
                        else if (density < 85){
                            return 'rgb(37,95,180)';
                        }
                        else if (density < 87){
                            return 'rgb(37,52,170)';
                        }
                        else if (density < 91){
                            return 'rgb(37,52,148)';
                        }
                        else{
                            return "rgb(37,52,108)";
                        }
                        
                        
                    }
                else if (types=="unemployment")
                    {
                        

var densitycolor = d.properties.toplot;
                         if(!densitycolor){
                            return '#ccc';
                        }
                        if(densitycolor < 10){
                            return '#5e4fa2';
                        }
                        else if (densitycolor < 41){
                            return '#3288bd';
                        }
                        else if (densitycolor < 45){
                            return  '#66c2a5';
                        }
                        else if (densitycolor < 48){
                            return  '#abdda4';
                        }
                        else if (densitycolor < 55){
                            return '#e6f598';
                        }
                        else if (densitycolor < 58){
                            return '#ffffbf';
                        }
                        else if (densitycolor < 60){
                            return '#fee08b' ;
                        }
                        else if (densitycolor < 65){
                            return '#fdae61';
                        }
                        else if (densitycolor < 70){
                            return '#f46d43';
                        }
                        else if (densitycolor < 81){
                            return  '#d53e4f';
                        }
                        else{
                            return  '#9e0142';
                        }
                    }
                    }); 
            
  

		
                    });
      
  
var zoom = d3.zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', function() {
          svg.selectAll('path')
           .attr('transform', d3.event.transform);
});

svg.call(zoom);

 var w = 550,
          h = 850;


var svg3 = d3.select("#body1")
            .append("svg")
            .attr("width", w)
            .attr("height", h);





/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load populationdensity.csv
------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load json data
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            d3.json("bangalore.geojson").then(function(json) {
            
        state2Data.forEach(function(region, i){
            var dataRegionName = region.region;
            var dataDensity = parseFloat(region.density);
            var dataLiteracy = parseFloat(region.literacy);
            var dataLiteracyRate = parseFloat(region.literacyrate);
            var dataUnemployment = parseFloat(region.unemployed);
            var toplot=region.to_plot;
           
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Find correct feature in json (statename) and assign correct density value from csv based on state name
------------------------------------------------------------------------------------------------------------------------------------------------------*/
            for (var j = 0; j < json.features.length; j++){
                var jsonRegionName = json.features[j].properties.WARD_NO;
                //console.log(jsonRegionName);
                //console.log(dataRegionName);
                if(dataRegionName == jsonRegionName){
                   // console.log("Yes");
                    //console.log(json.features[j].properties.name);
                    json.features[j].properties.density = dataDensity;
                    json.features[j].properties.literacy = dataLiteracy;
                    json.features[j].properties.literacyrate = dataLiteracyRate;
                    json.features[j].properties.unemployment = dataUnemployment;
                    json.features[j].properties.toplot = toplot;
                   // console.log(json.features[j].properties.density);
                    break;
                }
                
            }
        })  
           // console.log(stateData);
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Bind data and create one path per GeoJSON feature
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        
       /* console.log(stateData);
            console.log(json);*/
            var projection2 = d3.geoMercator()
          .center([77.5946, 12.9716]) // Approximately the coordinates of Bangalore (slightly North)
          .scale(95000)
          .translate([w / 2.3, 370]);
                
                
   
    

      var path2 = d3.geoPath()
          .projection(projection2);
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
                       // console.log(d.properties);
                       // tooltip .html(d.properties.Ward_Name + "<br>" + "Total Population: " + +d.properties.density)    
                    tooltip .html(
                     '<table width="100%" height="100%"><tr><th colspan="3" style="text-align:center">' + 
                          d.properties.WARD_NAME +
                         '</th></tr><tr><td width="45%" style="text-align:left">' +                          
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + (d3.format(",.0f")(d.properties.density))+''+ '</td></tr>'+
                '<tr><td style="text-align:left" >'+
                         'Literacy</td><td width="5%">:</td><td style="text-align:right">'  + (d3.format(",.0f")(d.properties.literacy))+ '</td></tr>'+
                        '<tr><td style="text-align:left" >'+
                         'Literacy %</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.literacyrate.toFixed(1)+'%'+ '</td></tr>'+
                       
                         '<tr><td style="text-align:left" >'+
                        'Non working %</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.unemployment.toFixed(1)+'%'+ '</td></tr>'+
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
                      if (types=="population")
                    {
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Fill colors based on density. ower the density lighter the color.
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                       var density = d.properties.toplot;
                        if(!density){
                            return '#ccc';
                        }
                        if(density < 5001){
                            return 'rgb(255,255,217)';
                        }
                        else if (density < 10501){
                            return 'rgb(237,248,177)';
                        }
                        else if (density < 25001){
                            return 'rgb(199,233,180)';
                        }
                        else if (density < 50051){
                            return 'rgb(127,205,187)';
                        }
                        else if (density < 75001){
                            return 'rgb(65,182,196)';
                        }
                        else if (density < 80001){
                            return 'rgb(29,145,192)';
                        }
                        else if (density < 85000){
                            return 'rgb(34,94,168)';
                        }
                        else if (density < 90000){
                            return 'rgb(37,95,180)';
                        }
                        else if (density < 100000){
                            return 'rgb(37,52,170)';
                        }
                        else if (density < 145001){
                            return 'rgb(37,52,148)';
                        }
                        else{
                            return "rgb(37,52,108)";
                        }
                        
                        
                    }
                else if (types=="literacy")
                    {
                           var density = d.properties.toplot;
                        if(!density){
                            return '#ccc';
                        }
                        if(density < 5001){
                            return 'rgb(255,255,217)';
                        }
                        else if (density < 10501){
                            return 'rgb(237,248,177)';
                        }
                        else if (density < 25001){
                            return 'rgb(199,233,180)';
                        }
                        else if (density < 50051){
                            return 'rgb(127,205,187)';
                        }
                        else if (density < 75001){
                            return 'rgb(65,182,196)';
                        }
                        else if (density < 80001){
                            return 'rgb(29,145,192)';
                        }
                        else if (density < 85000){
                            return 'rgb(34,94,168)';
                        }
                        else if (density < 90000){
                            return 'rgb(37,95,180)';
                        }
                        else if (density < 100000){
                            return 'rgb(37,52,170)';
                        }
                        else if (density < 145001){
                            return 'rgb(37,52,148)';
                        }
                        else{
                            return "rgb(37,52,108)";
                        }
                        
                    }
                else if (types=="literacyrate")
                    {
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Fill colors based on density. ower the density lighter the color.
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                       var density = d.properties.toplot;
                        if(!density){
                            return '#ccc';
                        }
                        if(density < 1){
                            return 'rgb(255,255,217)';
                        }
                        else if (density < 50){
                            return 'rgb(237,248,177)';
                        }
                        else if (density < 65){
                            return 'rgb(199,233,180)';
                        }
                        else if (density < 70){
                            return 'rgb(127,205,187)';
                        }
                        else if (density < 73){
                            return 'rgb(65,182,196)';
                        }
                        else if (density < 76){
                            return 'rgb(29,145,192)';
                        }
                        else if (density <82){
                            return 'rgb(34,94,168)';
                        }
                        else if (density < 85){
                            return 'rgb(37,95,180)';
                        }
                        else if (density < 87){
                            return 'rgb(37,52,170)';
                        }
                        else if (density < 91){
                            return 'rgb(37,52,148)';
                        }
                        else{
                            return "rgb(37,52,108)";
                        }
                        
                    }
                else if (types=="unemployment")
                    {
                                var densitycolor = d.properties.toplot;
                         if(!densitycolor){
                            return '#ccc';
                        }
                        if(densitycolor < 10){
                            return '#5e4fa2';
                        }
                        else if (densitycolor < 41){
                            return '#3288bd';
                        }
                        else if (densitycolor < 45){
                            return  '#66c2a5';
                        }
                        else if (densitycolor < 48){
                            return  '#abdda4';
                        }
                        else if (densitycolor < 55){
                            return '#e6f598';
                        }
                        else if (densitycolor < 58){
                            return '#ffffbf';
                        }
                        else if (densitycolor < 60){
                            return '#fee08b' ;
                        }
                        else if (densitycolor < 65){
                            return '#fdae61';
                        }
                        else if (densitycolor < 70){
                            return '#f46d43';
                        }
                        else if (densitycolor < 81){
                            return  '#d53e4f';
                        }
                        else{
                            return  '#9e0142';
                        }
                        
 }
                
                

		
                    });
                
                 
            
                var zoom3 = d3.zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', function() {
          svg3.selectAll('path')
           .attr('transform', d3.event.transform);
});
                svg3.call(zoom3);
      
  

})
}






   