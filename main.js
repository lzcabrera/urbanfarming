
var width = 250,
    height = 250;
var r = Math.min(width, height) / 2;
var svg = d3.select('#chart').append('svg').attr("width", width).attr("height", height);
var pi = Math.PI;
var color = d3.scale.category20b();


var vegetable = "artichokes";

var dur = "750";

var seasons = seasonArr;
var months = monthArr;
var vegetables = vegetableArr;


vegetables.forEach(function (d) {
    window[d.label] = d.info;
});


var arc_season = d3.svg.arc()
    .innerRadius(50 * 0.3)
    .outerRadius(50)
    .startAngle(function (d) {
    return ((d.time - 1) * 90 * pi / 180);
})
    .endAngle(function (d) {
    return (d.time * 90 * pi / 180);
});
var arc_month = d3.svg.arc()
    .innerRadius(80 * 0.7)
    .outerRadius(80)
    .startAngle(function (d) {
    return ((d.time - 1) * 30 * pi / 180);
})
    .endAngle(function (d) {
    return (d.time * 30 * pi / 180);
});

var arc_vegetable = d3.svg.arc()
    .innerRadius(110 * 0.8)
    .outerRadius(110)
    .startAngle(function (d, i) {
    return ((i) * 30 * pi / 180);
})
    .endAngle(function (d, i) {
    return ((i + 1) * 30 * pi / 180);
});



var container_season = svg.append("g").attr('class', 'ring_season').attr('transform', 'translate(125,125)');
var container_month = svg.append("g").attr('class', 'ring_month').attr('transform', 'translate(125,125)');
var container_vegetable = svg.append("g").attr('class', 'ring_veggie').attr('transform', 'translate(125,125)');

var theseasons = container_season.selectAll("path").data(seasonArr);
var themonths = container_month.selectAll("path").data(monthArr);
var thevegetables = container_vegetable.selectAll("path").data(vegetableArr[0].info);


// seasons
theseasons.enter().append('path').attr('d', arc_season)
    .attr('class', 'arc')
    .style("stroke", "#eaeaea")
    .attr('class', function (d) {
        return 'arc_' + d.label.toLowerCase()
    });

theseasons.enter().append("text")
    .attr("transform", function (d, i) {
        return "translate(" + arc_season.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "0.7em")
    .style("fill", "#fff")
    .text(function (d, i) {
        return d.label;
    });


// months
themonths.enter().append('path').attr('d', arc_month)
    .attr('class', 'arc')
    .attr('class', function (d) {
        return 'arc_' + d.label.toLowerCase()
    })
    .style("fill", function (d, i) {
        return color(i);
    });

themonths.enter().append("text")
    .attr("transform", function (d, i) {
        return "translate(" + arc_month.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "0.7em")
    .style("fill", "#fff")
    .text(function (d, i) {
        return d.label;
    });


// vegetables  
thevegetables.enter().append("path").attr('d', arc_vegetable)
    .each(function (d) {
    this._current = d;
})
    .attr('class', 'arc')
    .attr('class', function (d, i) {
    var state = (d == 1) ? "active" : "passive";
        return state;
    });

thevegetables.exit().remove();

function updateChart(model) {
    data = eval(model);
    //console.log(data);

    thevegetables = thevegetables.data(data);
    thevegetables.transition().ease("elastic").duration(dur).attr('class', function (d, i) {
        var state = (d == 1) ? "active" : "passive";

        //var randomnumber=Math.floor(Math.random()*i);
        //if(state)

        return state;
    });

    console.log(vegetable+' +');
}

$(".season-section h3 a").click(function(e){
    //reset
    e.preventDefault();
    thevegetables.exit().remove();
    var list = $(this).parent().next();

    if($(this).css('backgroundImage').indexOf('collapse') > 0){

        list.hide();
        $(this).css('backgroundImage','url(expand-small-silver.png)');

    }else{

        $('.season-section ul').hide();
        $(".season-section h3 a").css('backgroundImage','url(expand-small-silver.png)');

        list.show();
        $(this).css('backgroundImage','url(collapse-small-silver.png)');
    }

    
});

$(".season-section ul a").hover(function () {
    var newvegetable = this.href.slice(this.href.indexOf('#') + 1);
    vegetable = newvegetable;
    updateChart(newvegetable);
    $('#vegetable-name').html($(this).html());
    
});



$('#vegetable-name').html(vegetable);