/*------------------------------------------------------------------------------------------------------------------------------------------------------
Define width and height
------------------------------------------------------------------------------------------------------------------------------------------------------*/
 var w = 850,
          h = 950;


 var projection = d3.geoMercator()
          .center([77.1025,28.7041]) // Approximately the coordinates of Delhi (slightly North)
          .scale(90500)
          .translate([w / 1.9, 310]);

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
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


var w=850;
var h=900;
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
.range(['rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(37,95,180)'
       ,'rgb(37,52,170)','rgb(37,52,148)','rgb(37,52,108)']);

                
var color2 = d3.scaleQuantize()
.range(['rgb(255,255,217)','rgb(237,248,177)','#F0BA70','rgb(233,199,180)','#F68756','#EA5A3E','#DA2B27','#C12600','#9B0000','#6D0000','#580000']); 
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load populationdensity.csv
------------------------------------------------------------------------------------------------------------------------------------------------------*/

d3.selectAll(".dataset")
            .on("change", update);
d3.selectAll(".dataset2")
            .on("change", update2);
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
                           to_plot:populationcsv[i].TOT_P});
        }
    
});
d3.csv("Delh_new.csv").then(function(populationcsv) {

        for(var i = 0; i < populationcsv.length; i++){
            stateData2.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].TOT_P});
        }
   
});


popDelhi(stateData2,stateData1,"population","total");

/*------------------------------------------------------------------------------------------------------------------------------------------------------
Load populationdensity.csv
------------------------------------------------------------------------------------------------------------------------------------------------------*/





function update(val=this.value)
{
   
    var types = d3.select('input[name="dataset2"]:checked').node().value
    
     var svg5 = d3.selectAll("svg");
      svg5.remove("*");
 
     var w = 850,
          h = 900;
 svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
      var w = 700,
          h = 900;
   



 var projection = d3.geoMercator()
          .center([77.1025,28.7041]) // Approximately the coordinates of Delhi (slightly North)
          .scale(90500)
          .translate([w / 1.9, 310]);

   



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
                           to_plot: populationcsv[i].TOT_P});
        }
    
        for(var i = 0; i < populationcsv.length; i++){
            stateData2.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].P_LIT});
        }
        for(var i = 0; i < populationcsv.length; i++){
            stateData5.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].TOT_P*100/tot_pop_delhi});
        }
    
        for(var i = 0; i < populationcsv.length; i++){
            stateData6.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].P_LIT*100/populationcsv[i].TOT_P});
        }
         
        
    });
  


var projection2 = d3.geoMercator()
          .center([77.5946, 12.9716]) // Approximately the coordinates of Bangalore (slightly North)
          .scale(105000)
          .translate([w / 2, 410]);

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
                           to_plot: populationcsv[i].TOT_P});
        }

        for(var i = 0; i < populationcsv.length; i++){
            stateData4.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].P_LIT});
        }
    for(var i = 0; i < populationcsv.length; i++){
            stateData7.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].TOT_P*100/tot_pop_bang});
        }

        for(var i = 0; i < populationcsv.length; i++){
            stateData8.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].P_LIT*100/populationcsv[i].TOT_P});
        }
         
       
    
    
});
     if (val=="population" && types=="total")
            {
                popDelhi(stateData1,stateData3,val,types);
                
            }
        else if (val=="literacy" && types=="total")
            {
                popDelhi(stateData2,stateData4,val,types);
                
            }
    else if (val=="population" && types=="perc")
            {
                popDelhi(stateData5,stateData7,val,types);
                
            }
        else if (val=="literacy" && types=="perc")
            {
                popDelhi(stateData6,stateData8,val,types);
                
            }
    
    
    
   

}

function update2(val=this.value)
{
    
    types = d3.select('input[name="dataset"]:checked').node().value
   
     var svg5 = d3.selectAll("svg");
      svg5.remove("*");
 
     var w = 850,
          h = 900;
 svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
      var w = 700,
          h = 900;
   



 var projection = d3.geoMercator()
          .center([77.1025,28.7041]) // Approximately the coordinates of Delhi (slightly North)
          .scale(90500)
          .translate([w / 1.9, 310]);

   



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
    
    
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Store data in stateData
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var tot_pop_delhi=16368899;
        for(var i = 0; i < populationcsv.length; i++){
            stateData1.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].TOT_P*100/tot_pop_delhi});
        }
    
        for(var i = 0; i < populationcsv.length; i++){
            stateData2.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].P_LIT*100/populationcsv[i].TOT_P});
        }
        for(var i = 0; i < populationcsv.length; i++){
            stateData5.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].TOT_P});
        }
    
        for(var i = 0; i < populationcsv.length; i++){
            stateData6.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].P_LIT});
        }
         
        
    });
  


var projection2 = d3.geoMercator()
          .center([77.5946, 12.9716]) // Approximately the coordinates of Bangalore (slightly North)
          .scale(105000)
          .translate([w / 2, 410]);

      var path2 = d3.geoPath()
          .projection(projection2);



d3.csv("bangalore.csv").then(function(populationcsv) {

    
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Store data in stateData
------------------------------------------------------------------------------------------------------------------------------------------------------*/
        
    
    var tot_pop_bang=8749944;
    
  
        for(var i = 0; i < populationcsv.length; i++){
            stateData3.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].TOT_P*100/tot_pop_bang});
        }

        for(var i = 0; i < populationcsv.length; i++){
            stateData4.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].P_LIT*100/populationcsv[i].TOT_P});
        }
    for(var i = 0; i < populationcsv.length; i++){
            stateData7.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].TOT_P});
        }

        for(var i = 0; i < populationcsv.length; i++){
            stateData8.push({region:populationcsv[i].Ward,
                             density:populationcsv[i].TOT_P,
                                literacy:populationcsv[i].P_LIT,
                           to_plot: populationcsv[i].P_LIT});
        }
         
       
    
    
});
     if (val=="total" && types=="population")
            {
                popDelhi(stateData5,stateData7,types,val);
                
            }
        else if (val=="total" &&  types=="literacy")
            {
                popDelhi(stateData6,stateData8,types,val);
                
            }
    else if (val=="perc" &&  types=="population")
            {
                popDelhi(stateData1,stateData3,types,val);
                
            }
        else
            {
                popDelhi(stateData2,stateData4,types,val);
                
            }
    
    
   

}

function popDelhi(stateData,state2Data,types,tmp)


{
    
   
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Appending a rectangle for each color
------------------------------------------------------------------------------------------------------------------------------------------------------*/
    if (types=="population" && tmp=="total")
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
                           var x = 20;
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
                    var ranges = ["1-5000", "5001-10500", "10501-25000", "25001-50050", "50051-75000", "75001-80000", "80001-84999", "85000-89999", "90000-99999", "100000-145000",">145001"];
                        return ranges[i];
                    });
     
        }
    else if (types=="literacy" && tmp=="total")
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
                           var x = 20;
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
                    var ranges = ["1-5000", "5001-10500", "10501-25000", "25001-50050", "50051-75000", "75001-80000", "80001-84999", "85000-89999", "90000-99999", "100000-145000",">145001"];
                        return ranges[i];
                    });
              
        }
    else if (types=="population" && tmp=="perc")
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
                           var x = 20;
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
                    var ranges = ["0%-0.09%","0.1%-0.19%","0.2%-0.29%","0.3%-0.39%","0.4%-0.49%","0.5%-0.59%","0.6%-0.79%","0.8%-0.99%","1%-4.99%","5%-9.99%", ">=10%"];
                        return ranges[i];
                    });
     
        }
    else if (types=="literacy" && tmp=="perc")
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
                           var x = 20;
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
                    var ranges = ["0%-0.99%","1%-2.99%","3%-4.99%","5%-9.99%","10%-24.99%","25%-50%","51%-50%","51%-70%", "71%-75.99%", "76%-80%" , "81%-90.99%", ">=91%"];
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
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.density+''+ '</td></tr>'+
                '<tr><td style="text-align:left" >'+
                         'Literacy</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.literacy+ '</td></tr>'+
                        '<tr><td style="text-align:left" >'+
                        'Literacy %</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.literacy*100/d.properties.density+ '</td></tr>'+
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
                if (types=="population" && tmp=="total")
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
                else if (types=="literacy" && tmp=="total")
                    {
                          var densitycolor = d.properties.toplot;
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
                    }
                else if (types=="population" && tmp=="perc")
                    {
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Fill colors based on density. ower the density lighter the color.
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                       var density = d.properties.toplot;
                        if(!density){
                            return '#ccc';
                        }
                        if(density < 0.1){
                            return 'rgb(255,255,217)';
                        }
                        else if (density < 0.2){
                            return 'rgb(237,248,177)';
                        }
                        else if (density < 0.3){
                            return 'rgb(199,233,180)';
                        }
                        else if (density < 0.4){
                            return 'rgb(127,205,187)';
                        }
                        else if (density < 0.5){
                            return 'rgb(65,182,196)';
                        }
                        else if (density < 0.6){
                            return 'rgb(29,145,192)';
                        }
                        else if (density <0.8){
                            return 'rgb(34,94,168)';
                        }
                        else if (density < 1){
                            return 'rgb(37,95,180)';
                        }
                        else if (density < 5){
                            return 'rgb(37,52,170)';
                        }
                        else if (density < 10){
                            return 'rgb(37,52,148)';
                        }
                        else{
                            return "rgb(37,52,108)";
                        }
                        
                        
                    }
                else if (types=="literacy" && tmp=="perc")
                    {
                          var densitycolor = d.properties.toplot;
                         if(!densitycolor){
                            return '#ccc';
                        }
                        if(densitycolor < 1){
                            return 'rgb(255,255,217)';
                        }
                        else if (densitycolor < 3){
                            return 'rgb(237,248,177)';
                        }
                        else if (densitycolor < 5){
                            return '#F0BA70';
                        }
                        else if (densitycolor < 10){
                            return 'rgb(233,199,180)';
                        }
                        else if (densitycolor < 25){
                            return '#F68756';
                        }
                        else if (densitycolor < 51){
                            return '#EA5A3E';
                        }
                        else if (densitycolor < 71){
                            return '#DA2B27';
                        }
                        else if (densitycolor < 76){
                            return '#C12600';
                        }
                        else if (densitycolor < 81){
                            return '#9B0000';
                        }
                        else if (densitycolor < 91){
                            return '#6D0000';
                        }
                        else{
                            return "#580000";
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

 var w = 700,
          h = 900;


var svg3 = d3.select("body")
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
          .scale(105000)
          .translate([w / 2, 410]);
                
                
   
    

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
                         'Population</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.density+''+ '</td></tr>'+
                '<tr><td style="text-align:left" >'+
                         'Literacy</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.literacy+ '</td></tr>'+
                        '<tr><td style="text-align:left" >'+
                         'Literacy %</td><td width="5%">:</td><td style="text-align:right">'  + d.properties.literacy*100/d.properties.density+ '</td></tr>'+
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
                      if (types=="population" && tmp=="total")
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
                else if (types=="literacy" && tmp=="total")
                    {
                          var densitycolor = d.properties.toplot;
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
                    }
                else if (types=="population" && tmp=="perc")
                    {
/*------------------------------------------------------------------------------------------------------------------------------------------------------
Fill colors based on density. ower the density lighter the color.
------------------------------------------------------------------------------------------------------------------------------------------------------*/
                        var density = d.properties.toplot;
                        if(!density){
                            return '#ccc';
                        }
                        if(density < 0.1){
                            return 'rgb(255,255,217)';
                        }
                        else if (density < 0.2){
                            return 'rgb(237,248,177)';
                        }
                        else if (density < 0.3){
                            return 'rgb(199,233,180)';
                        }
                        else if (density < 0.4){
                            return 'rgb(127,205,187)';
                        }
                        else if (density < 0.5){
                            return 'rgb(65,182,196)';
                        }
                        else if (density < 0.6){
                            return 'rgb(29,145,192)';
                        }
                        else if (density <0.8){
                            return 'rgb(34,94,168)';
                        }
                        else if (density < 1){
                            return 'rgb(37,95,180)';
                        }
                        else if (density < 5){
                            return 'rgb(37,52,170)';
                        }
                        else if (density < 10){
                            return 'rgb(37,52,148)';
                        }
                        else{
                            return "rgb(37,52,108)";
                        } 
                        
                    }
                else if (types=="literacy" && tmp=="perc")
                    {
                          var densitycolor = d.properties.toplot;
                         if(!densitycolor){
                            return '#ccc';
                        }
                        if(densitycolor < 1){
                            return 'rgb(255,255,217)';
                        }
                        else if (densitycolor < 3){
                            return 'rgb(237,248,177)';
                        }
                        else if (densitycolor < 5){
                            return '#F0BA70';
                        }
                        else if (densitycolor < 10){
                            return 'rgb(233,199,180)';
                        }
                        else if (densitycolor < 25){
                            return '#F68756';
                        }
                        else if (densitycolor < 51){
                            return '#EA5A3E';
                        }
                        else if (densitycolor < 71){
                            return '#DA2B27';
                        }
                        else if (densitycolor < 76){
                            return '#C12600';
                        }
                        else if (densitycolor < 81){
                            return '#9B0000';
                        }
                        else if (densitycolor < 91){
                            return '#6D0000';
                        }
                        else{
                            return "#580000";
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






   