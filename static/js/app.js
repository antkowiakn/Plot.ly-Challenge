//getting the data to display on inspect
function graphs(ids) {
    //Read and import the data
        d3.json("samples.json").then (importdata =>{
            console.log(importdata)
        //find ids
            var ids = importdata.samples[0].otu_ids;
        //slice to get the top ten and then reverse to get the order correct from highest to lowest
            var values =  importdata.samples[0].sample_values.slice(0,10).reverse();
        //creating the labels and the top 10
            var otu_label = ids.slice(0,10);

        // top 10 OTU_ids for the plot OTU and reversing it for highest to lowest. 
            var OTU_top = (ids.slice(0, 10)).reverse();
        // OTU_ids to the graph to make it the captial like the example
            var OTU_id = OTU_top.map(d => "OTU " + d);
        
        //trace to create the start of the graph giving x/y values and descriptors
            var trace1 = {
                x: values,
                y: OTU_id,
                text: otu_label,
                marker: {
                color: 'rgb(8,48,107)'},
                type:"bar",
                orientation: "h",
            };
        // create the data variable
            var data = [trace1];
    
        // create the layout for the graph
            var layout = {
                title: "Top 10 Opertation Taxomonic Units",
                margin: {
                    l: 80,
                    r: 80,
                    t: 80,
                    b: 20
                }
            };
    
    // create the bar plot
        Plotly.newPlot("bar", data, layout);


        // make the bubble chart call ids from above for x values
            var trace2 = {
                x: ids,
                y: importdata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: importdata.samples[0].sample_values,
                    color: ids,
                },
                text:  importdata.samples[0].otu_labels
    
            };
    
        //layout for the bubble plot
            var layout2 = {
                xaxis:{title: "Operational Taxonomic Units ID"},
                height: 700,
                width: 1250
            };
    
        // creating data variable 
            var data2 = [trace2];
    
    // create bubble grpah
        Plotly.newPlot("bubble", data2, layout2); 
        
        });
    }  
// function for the the demographic data
function demoinfo(id) {
//Read and import the data
    d3.json("samples.json").then((data)=> {
    // get the metadata for the demographic info on the left side of the page
            var metadata = data.metadata;
            console.log(metadata)
    
    // filter the metadata info by individuals demo information
           var keyvalue = metadata.filter(meta => meta.id.toString() === id)[0];
    // select to create the info
           var info = d3.select("#sample-metadata");
            
    // grab demo data data for the id and append the info to the panel
            Object.entries(keyvalue).forEach((key) => {   
                info.append("p").text(key[0] + ": " + key[1]);    
            });
        });
    }
// function to change the table when selecting a new id number
function optionChanged(id) {
        demoinfo(id);
    }
    
// function for the initial data
function init() {
    // select dropdown list 
        var dropdownlist = d3.select("#selDataset");
    
    // read and import data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
        // append each of the ids to be selected for the demographic table
            data.names.forEach(function(name) {
                dropdownlist.append("option").text(name);
            });
    
            // call the functions to display the data and the plots to the page
            graphs(data.names[0]);
            demoinfo(data.names[0]);
        });
    }
    init();
    