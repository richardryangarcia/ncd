var delicensed_police_data = [
    ['us-ga', 10474],
    ['us-fl', 8348],
    ['us-ia', 150],
    ['us-me', 157],
    ['us-mo', 860],
    ['us-tx', 2682],
    ['us-ct', 73],
    ['us-id', 402],
    ['us-az', 1112],
    ['us-or', 107],
    ['us-ut', 372],
    ['us-nc', 1074],
    ['us-oh', 391],
    ['us-ks', 295],
    ['us-wa', 192],
    ['us-il', 234],
    ['us-al', 328],
    ['us-pa', 165],
    ['us-mi', 150],
    ['us-tn', 460],
    ['us-ne', 87],
    ['us-co', 365],
    ['us-ar', 270],
    ['us-sd', 96],
    ['us-ok', 229],
    ['us-wy', 176],
    ['us-ky', 76],
    ['us-mt', 142],
    ['us-ak', 142],
    ['us-ny', 74],
    ['us-wv', 51],
    ['us-mn', 48],
    ['us-nm', 156],
    ['us-la', 87],
    ['us-in', 38],
    ['us-wi', 52],
    ['us-nd', 33],
    ['us-sc', 15],
    ['us-nh', 44],
    ['us-va', 33],
    ['us-nv', 50],
    ['us-ms', 31],
    ['us-vt', 13],
    ['us-md', 4],
    ['us-ca', null]
];

// Create the chart
Highcharts.mapChart('container', {
    chart: {
        map: 'countries/us/us-all'
    },

    title: {
        text: 'Number of Delicensed Police by State'
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-all.js">United States of America</a>'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0,
        max: 2000,
        tickInterval: 500,
        stops: [[0, '#F1EEF6'], [0.65, '#900037'], [1, '#500007']],
        labels: {
            format: '{value}'
        }
    },

    series: [{
        data: delicensed_police_data,
        name: 'Delicensed Police Officers',
        states: {
            hover: {
                color: '#fc3503'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}',
            formatter: function () {
                if (this.point.name == "us-ca") {
                    return "No data, this state does not require police to hold a license";
                }
            }
        },
        nullColor: '#4f4f4f'
    }, {
        name: 'Separators',
        type: 'mapline',
        data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
        color: 'silver',
        nullColor: 'silver',
        showInLegend: false,
        enableMouseTracking: false
    }]
});
