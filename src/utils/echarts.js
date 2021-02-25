/**
 * Created by fenghong on 2017/2/7.
 */
const colorList = ['#284554', '#61a0a8', '#d48265', '#91c7ae', '#749f83',
  '#ca8622', '#bda29a', '#6e7074', '#546570', '#c23531', '#8B0A50',
  '#080808', '#800000', '#006400', '#191970'
];

//普通页面下的图形配置
export const chartProps = {
  className: {
    type: String,
    default: 'chart'
  },
  id: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: (document.body.clientHeight - 200).toString() + 'px'
  }
}

//弹框页面下的图形配置
export const chartDialogProps = {
  className: {
    type: String,
    default: 'chart'
  },
  id: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: (document.body.clientHeight - 400).toString() + 'px'
  }
}

/**
 * 生成图形
 * @param {Object} option
 * @param {Object} myChart
 */
export function createChart(option, myChart) {
  myChart.clear();
  myChart.setOption(option, true);
  //自适应
  window.onresize = myChart.resize();
  //this.chart.resize();
}

/**
 * 柱状图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createBarChart(data, myChart) {
  const unit = data.unit==null ? '':data.unit;
  //是否显示折线上的图标
  let showItemStyle = data.showItemStyle==null ? false : data.showItemStyle;
  //显示最大最小值
  let showMarkPoint = data.showMarkPoint==null ? false : data.showMarkPoint;
  //显示平均值
  let showMarkLine = data.showMarkLine==null ? false : data.showMarkLine;
  //显示右上角的菜单
  let showToolbox = data.showToolbox==null ? false : data.showToolbox;
  let markPoint={};
  if(showMarkPoint==true){
    markPoint={
      data: [
        {type: 'max', name: '最大值'},
        {type: 'min', name: '最小值'}
      ]
    };
  }
  let markLine={};
  if(showMarkLine==true){
    markLine={
      data: [
        {type: 'average', name: '平均值'},
        [{
            symbol: 'none',
            x: '90%',
            yAxis: 'max'
        }, {
            symbol: 'circle',
            label: {
                normal: {
                    position: 'start',
                    formatter: '最大值'
                }
            },
            type: 'max',
            name: '最高点'
        }]
      ]
    };
  }
  let series =new Array();
  for(let i=0;i<data.ydata.length;i++){
    let serie = {
      name:data.ydata[i].name,
      type:'bar',
      stack: data.ydata[i].stack,
      data:data.ydata[i].data,
      itemStyle: {
        show: showItemStyle,
        borderColor: '#fff',
        borderWidth: 1
      },
      markPoint : markPoint,
      markLine : markLine
    };
    series.push(serie);
  }
  let xAxisType='category';
  let xAxis ;
  let yAxis ;
  if(data.xAxisType){
    xAxisType = data.xAxisType;
  }
  if(xAxisType=='category'){
    xAxis = [
        {
            type : 'category',
            data : data.xdata
        }
    ];
    yAxis =[
        {
            type : 'value'
        }
    ];
  }else{
    yAxis = [
        {
            type : 'category',
            data : data.xdata
        }
    ];
    xAxis=[
        {
            type : 'value'
        }
    ];
  }
  let option = {
    title : {
        text: data.title,
        subtext: data.subTitle,
        x: 'center'
    },
    tooltip : {
        trigger: 'axis'
    },
    label:{
        normal:{
            show: true,
            position: 'top'}
    },
    legend: {
        data:data.legendData,
        orient: 'horizontal',
        x: 'center',
        y: 'bottom'
    },
    toolbox: {
        show : false,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    //color: colorList,
    calculable : true,
    xAxis : xAxis,
    yAxis : yAxis,
    series : series
  };
  createChart(option, myChart);
}

/**折线图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createLineChart(data, myChart) {
  const unit = data.unit==null ? '':data.unit;
  //是否显示折线上的图标
  let showItemStyle = data.showItemStyle==null ? false : data.showItemStyle;
  //显示最大最小值
  let showMarkPoint = data.showMarkPoint==null ? false : data.showMarkPoint;
  //显示平均值
  let showMarkLine = data.showMarkLine==null ? false : data.showMarkLine;
  //显示右上角的菜单
  let showToolbox = data.showToolbox==null ? false : data.showToolbox;
  let markPoint={};
  if(showMarkPoint==true){
    markPoint={
      data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
      ]
    };
  }
  let markLine={};
  if(showMarkLine==true){
    markLine={
      data: [
        {type: 'average', name: '平均值'},
        [{
            symbol: 'none',
            x: '90%',
            yAxis: 'max'
        }, {
            symbol: 'circle',
            label: {
                normal: {
                    position: 'start',
                    formatter: '最大值'
                }
            },
            type: 'max',
            name: '最高点'
        }]
      ]
    };
  }
  let series =new Array();
  for(let i=0;i<data.ydata.length;i++){
    let serie = {
      name:data.ydata[i].name,
      type:'line',
      dataView : {show: true, readOnly: false},
      itemStyle: {
        show: showItemStyle,
        borderColor: '#fff',
        borderWidth: 1
      },
      data:data.ydata[i].data,
      markPoint: markPoint,
      markLine: markLine
    };
    series.push(serie);
  }
  let option = {
    title: {
      text: data.title,
      subtext: data.subTitle,
      x:'center',
      y:'top',
      textAlign:'left'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross'
      }
    },
    legend: {
      data:data.legendData,
      orient: 'horizontal',
      x: 'center',
      y: 'bottom'
    },
    toolbox: {
      show: showToolbox,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        restore: {},
        saveAsImage: {}
      }
    },
    //color: colorList,
    xAxis:  {
      type: 'category',
      boundaryGap: false,
      data: data.xdata
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'+unit
      }
    },
    series: series
  };
  createChart(option, myChart);
}

/**
 * 混合柱状图、折线图
 * 最后一个是折线图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createMixLineBarChart(data, myChart){
  if(data.ydata==null||data.ydata.length<2){
    createChart({}, myChart);
    return;
  }
  //是否显示折线上的图标
  let showItemStyle = data.showItemStyle==null ? true : data.showItemStyle;
  //显示最大最小值
  let showMarkPoint = data.showMarkPoint==null ? true : data.showMarkPoint;
  //显示平均值
  let showMarkLine = data.showMarkLine==null ? false : data.showMarkLine;
  //显示右上角的菜单
  let showToolbox = data.showToolbox==null ? false : data.showToolbox;
  let showLegend = data.showLegend==null ? false : data.showLegend;
  let markPoint={};
  if(showMarkPoint==true){
    markPoint={
      data: [
        {type: 'max', name: '最大值'},
        {type: 'min', name: '最小值'}
      ]
    };
  }
  let markLine={};
  if(showMarkLine==true){
    markLine={
      data: [
        {type: 'average', name: '平均值'}
      ]
    };
  };
  const itemStyle = {
    borderColor: '#fff',
    borderWidth: 1
  };
  let ya0Name='';
  let ya0Unit='';
  let ya1Name='';
  let ya1Unit='';
  if(data.yaxis.length>0){
    ya0Name = data.yaxis[0].name;
    ya0Unit = data.yaxis[0].unit;
    ya1Name = data.yaxis[1].name;
    ya1Unit = data.yaxis[1].unit;
  }
  let series =new Array();
  let n = data.ydata.length;
  for(let i=0;i<n;i++){
    let cd = data.ydata[i];
    let yAxisIndex = 0;
    let type = 'bar';
    if(i==n-1){
      yAxisIndex = 1;
      type = 'line';
    }
    let serie = {
      name: cd.name,
      type: type,
      yAxisIndex: yAxisIndex,
      itemStyle:itemStyle,
      markPoint: markPoint,
      markLine: markLine,
      data: cd.data
    };
    series.push(serie);
  }
  let option = {
    title: {
      text: data.title,
      subtext: data.subTitle,
      x:'center',
      y:'top',
      textAlign:'left'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    label: {
      normal: {
        show: true,
        position: 'top'
      }
    },
    //color: colorList,
    toolbox: {
      feature: {
        show:showToolbox,
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['line', 'bar']
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    legend: {
      data: data.legendData,
      orient: 'horizontal',
      x: 'center',
      y: 'bottom',
      bottom :'20'
    },
    grid: {//四周的宽度
      left: '2%',
      right: '3%',
      bottom: '30',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: data.xdata,
      axisPointer: {
        type: 'shadow'
      }
    }],
    yAxis: [{
        type: 'value',
        name: ya0Name,
        axisLabel: {
          formatter: '{value} '+ya0Unit
        }
      },
      {
        type: 'value',
        name: ya1Name,
        axisLabel: {
          formatter: '{value} '+ya1Unit
        }
      }
    ],
    series: series
  };
  createChart(option, myChart);
}

/**
 * 饼图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createPieChart(data, myChart) {
  const unit = data.unit==null ? '' :data.unit;
  //显示项目
  let showLegend = data.showLegend==null ? false : data.showLegend;
  let series =new Array();
  for(let i=0;i<data.detailData.length;i++){
    let serie = {
      name: data.detailData[i].name,
      type: 'pie',
      radius : '65%',
      center: ['50%', '50%'],
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        alignTo: 'edge',
        formatter: '{name|{b}}\n{time|{c} '+unit+' ({d}%)}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
        rich: {
            time: {
                fontSize: 10,
                color: '#999'
            }
        }
      },
      labelLine: {
        length: 15,
        length2: 0,
        maxSurfaceAngle: 80
      },
      labelLayout: function (params) {
        var isLeft = params.labelRect.x < myChart.getWidth() / 2;
        var points = params.labelLinePoints;
        // Update the end point.
        points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;

        return {
            labelLinePoints: points
        };
      },
      data:data.detailData[i].data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    };
    series.push(serie);
  }
  let option = {
    title : {
      text: data.title,
      subtext: data.subTitle,
      left:'center'
    },
    //color: colorList,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} '+unit+'({d}%)'
    },
    legend: {
      show:showLegend,
      bottom: 10,
      left: 'center',
      data: data.legendData
    },
    series : series
  };
  createChart(option, myChart);
}

/**
 * 双饼图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createDoublePieChart(data, myChart) {
  let option = {
    title: {
      text: data.title,
      subtext: data.subTitle,
      x: 'center'
    },
    //color: colorList,
    toolbox: {
      show: false,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          type: ['line', 'bar']
        },
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: data.xdata
    },
    series: [{
        name: data.detailData[0].name,
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],

        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data.detailData[0].data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          normal: {
            label: {
              show: true,
              formatter: '{b} : {c} ({d}%)'
            },
            labelLine: {
              show: true
            }
          }
        }
      },
      {
        name: data.detailData[1].name,
        type: 'pie',
        radius: ['40%', '55%'],
        data: data.detailData[1].data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          normal: {
            label: {
              show: true,
              formatter: '{b} : {c} ({d}%)'
            },
            labelLine: {
              show: true
            }
          }
        }
      }
    ]
  };
  createChart(option, myChart);
}

/**
 * 日历图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createCalanderChart(data, myChart) {

  let graphData = data.graphData;
  let links = {};
  if (graphData) {
    links = graphData.map(function(item, idx) {
      return {
        source: idx,
        target: idx + 1
      };
    });
    links.pop();
  }

  let minValue = data.minValue;
  let maxValue = data.maxValue;
  //最大值最小值分成3分
  let peace = (maxValue - minValue) / 5;


  // 获取每个格子的点的大小，数值为2,4,6,8,10
  function getSymbolSize(value) {
    if (1 == 1) {
      //算法不好，强行写死
      return 10;
    }
    if (peace == 0) {
      //最小和最大值相等
      return 10;
    }
    let v = ((value[1] - minValue) / peace) * 2;
    if (v == 0) {
      return 2;
    }
    return v;
  }

  let seriesData = new Array();
  let serie = {
    type: 'graph',
    edgeSymbol: ['none', 'arrow'],
    coordinateSystem: 'calendar',
    links: links,
    symbolSize: 15,
    calendarIndex: 0,
    itemStyle: {
      normal: {
        color: 'green',
        shadowBlue: 9,
        shadowOffsetX: 1.5,
        shadowOffsetY: 3,
        shadowColor: '#555'
      }
    },
    lineStyle: {
      normal: {
        color: '#D10E00',
        width: 1,
        opacity: 1
      }
    },
    data: data.graphData,
    z: 20
  };
  seriesData.push(serie);
  serie = {
    type: 'graph',
    edgeSymbol: ['none', 'arrow'],
    coordinateSystem: 'calendar',
    links: links,
    symbolSize: 15,
    calendarIndex: 1,
    itemStyle: {
      normal: {
        color: 'green',
        shadowBlue: 9,
        shadowOffsetX: 1.5,
        shadowOffsetY: 3,
        shadowColor: '#555'
      }
    },
    lineStyle: {
      normal: {
        color: '#D10E00',
        width: 1,
        opacity: 1
      }
    },
    data: data.graphData,
    z: 20
  };
  seriesData.push(serie);
  serie = {
    name: data.legendData[0],
    type: 'scatter',
    coordinateSystem: 'calendar',
    data: data.series,
    symbolSize: function(val) {
      //return val[1] / data.compareSizeValue;
      return getSymbolSize(val);
    },
    itemStyle: {
      normal: {
        color: 'red'
      }
    }
  };
  seriesData.push(serie);
  serie = {
    name: data.legendData[0],
    type: 'scatter',
    coordinateSystem: 'calendar',
    calendarIndex: 1,
    data: data.series,
    symbolSize: function(val) {
      //return val[1] / data.compareSizeValue;
      return getSymbolSize(val);
    },
    itemStyle: {
      normal: {
        color: 'red'
      }
    }
  };
  seriesData.push(serie);
  if (data.top && data.top > 0) {
    serie = {
      name: data.legendData[1],
      type: 'effectScatter',
      coordinateSystem: 'calendar',
      calendarIndex: 1,
      data: data.series.sort(function(a, b) {
        return b[1] - a[1];
      }).slice(0, data.top),
      symbolSize: function(val) {
        //return val[1] / data.compareSizeValue;
        return getSymbolSize(val);
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    };
    seriesData.push(serie);
    serie = {
      name: data.legendData[1],
      type: 'effectScatter',
      coordinateSystem: 'calendar',
      data: data.series.sort(function(a, b) {
        return b[1] - a[1];
      }).slice(0, data.top),
      symbolSize: function(val) {
        //return val[1] / data.compareSizeValue;
        return getSymbolSize(val);
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    };
    seriesData.push(serie);
  }


  let option = {
    backgroundColor: '#404a59',

    title: {
      top: 10,
      text: data.title,
      subtext: data.subTitle,
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a}<br/>{b}({c}" + data.unit + ")"
    },
    legend: {
      top: '30',
      left: '100',
      data: data.legendData,
      textStyle: {
        color: '#fff'
      }
    },
    calendar: [{
      top: 80,
      left: 'center',
      range: data.rangeFirst,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#000',
          width: 4,
          type: 'solid'
        }
      },
      yearLabel: {
        formatter: '{start}  上半年',
        textStyle: {
          color: '#fff'
        }
      },
      itemStyle: {
        normal: {
          color: '#323c48',
          borderWidth: 1,
          borderColor: '#111'
        }
      }
    }, {
      top: 260,
      left: 'center',
      range: data.rangeSecond,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#000',
          width: 4,
          type: 'solid'
        }
      },
      yearLabel: {
        formatter: '{start}  下半年',
        textStyle: {
          color: '#fff'
        }
      },
      itemStyle: {
        normal: {
          color: '#323c48',
          borderWidth: 1,
          borderColor: '#111'
        }
      }
    }],
    series: seriesData
  };
  createChart(option, myChart);
}

/**
 * 日历饼图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createCalanderPieChart(data, myChart,echarts) {
  let cellSize = [65, 65];
  let pieRadius = 25;
  let app = {};
  let seriesData = data.seriesData;
  let scatterData = data.scatterData;

  function getPieSeries(scatterData, chart) {
    return echarts.util.map(scatterData, function(item, index) {
      let center = chart.convertToPixel('calendar', item);
      return {
        id: index + 'pie',
        type: 'pie',
        center: center,
        label: {
          normal: {
            formatter: '{c}',
            position: 'inside'
          }
        },
        radius: pieRadius,
        data: seriesData[item[0]]
      };
    });
  }

  function getPieSeriesUpdate(scatterData, chart) {
    return echarts.util.map(scatterData, function(item, index) {
      let center = chart.convertToPixel('calendar', item);
      return {
        id: index + 'pie',
        center: center
      };
    });
  }

  let option = {
    //backgroundColor: '#404a59',

    title: {
      show: true,
      top: 0,
      text: data.title,
      subtext: data.subTitle,
      left: 'left'
    },
    tooltip: {},
    legend: {
      data: data.legendData,
      bottom: 10
    },
    calendar: {
      top: 40,
      left: 'center',
      orient: 'vertical',
      cellSize: cellSize,
      yearLabel: {
        show: false,
        textStyle: {
          fontSize: 30
        }
      },
      dayLabel: {
        margin: 20,
        firstDay: 1,
        nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      },
      monthLabel: {
        show: false
      },
      range: data.range
    },
    series: [{
      id: 'label',
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: 1,
      label: {
        normal: {
          show: true,
          formatter: function(params) {
            return echarts.format.formatTime('dd', params.value[0]);
          },
          offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
          textStyle: {
            color: '#000',
            fontSize: 12
          }
        }
      },
      data: data.scatterData
    }]
  };

  if (!app.inNode) {
    let pieInitialized;
    setTimeout(function() {
      pieInitialized = true;
      myChart.setOption({
        series: getPieSeries(scatterData, myChart)
      });
    }, 10);

    app.onresize = function() {
      if (pieInitialized) {
        myChart.setOption({
          series: getPieSeriesUpdate(scatterData, myChart)
        });
      }
    };
  }
  createChart(option, myChart);
}

/**
 * 日历热点图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createCalanderHeatMapChart(data, myChart,echarts) {
  let calendars = new Array();
  for (let i = 0; i < data.years.length; i++) {
    let c = {
      top: 80 + i * 180,
      range: data.years[i],
      cellSize: ['auto', 20],
      right: 5
    };
    calendars.push(c);
  }
  let seriesData = new Array();
  for (let i = 0; i < data.series.length; i++) {
    let serie = {
      type: 'heatmap',
      calendarIndex: i,
      coordinateSystem: 'calendar',
      data: data.series[i]
    };
    seriesData.push(serie);
  }

  let option = {
    title: {
      top: 0,
      left: 'center',
      text: data.title
    },
    tooltip: {
      position: 'top',
      formatter: function(p) {
        let format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
        return format + ': ' + p.data[1] + data.unit;
      }
    },
    visualMap: {
      min: data.minValue,
      max: data.maxValue,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      top: 30
    },
    calendar: calendars,
    series: seriesData
  };

  createChart(option, myChart);
}

/**
 * 日历热点图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createScatterChart(data, myChart) {
  let seriesData = new Array();
  // 获取每个格子的点的大小，数值为2,4,6,8,10
  function getSymbolSize(value) {
    if (value == 1) {
      return 10;
    } else if (value < 5) {
      return 20;
    } else if (value < 10) {
      return 30;
    } else {
      return 4;
    }
  };
  for (let i = 0; i < data.seriesDatas.length; i++) {
    let serie = {
      name: data.seriesDatas[i].name,
      type: 'scatter',
      data: data.seriesDatas[i].data,
      symbolSize: function(data) {
        return getSymbolSize(data[2]);
      },
      markArea: {
        silent: true,
        itemStyle: {
          normal: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed'
          }
        },
        data: [
          [{
            name: data.seriesDatas[i].name + '分布区间',
            xAxis: 'min',
            yAxis: 'min'
          }, {
            xAxis: 'max',
            yAxis: 'max'
          }]
        ]
      },
      markPoint: {
        data: [{
            type: 'max',
            name: '最大值'
          },
          {
            type: 'min',
            name: '最小值'
          }
        ]
      },
      markLine: {
        lineStyle: {
          normal: {
            type: 'solid'
          }
        },
        data: [{
            type: 'average',
            name: '平均值'
          },
          {
            xAxis: data.seriesDatas[i].xAxisAverage
          }
        ]
      }
    };
    seriesData.push(serie);
  }

  let option = {
    title: {
      text: data.title,
      subtext: data.subTitle
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      // trigger: 'axis',
      showDelay: 0,
      formatter: function(params) {
        if (params.value.length > 1) {
          return '[' + params.seriesName + ']<br/>' +
            params.value[0] + data.xUnit + ' :' +
            params.value[1] + data.yUnit + ',值：' + params.value[2] + data.vUnit;
        } else {
          return params.seriesName + ' :<br/>' +
            params.name + ' : ' +
            params.value + data.yUnit;
        }
      },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
    toolbox: {
      feature: {
        dataZoom: {},
        brush: {
          type: ['rect', 'polygon', 'clear']
        }
      }
    },
    brush: {},
    legend: {
      data: data.legendData,
      left: 'center'
    },
    xAxis: [{
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: (val) => {
          return formatDateGroupLabel(val,data.dateGroup,data.xUnit);
        }
      },
      splitLine: {
        show: false
      }
    }],
    yAxis: [{
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: '{value} ' + data.yUnit
      },
      splitLine: {
        show: false
      }
    }],
    series: seriesData
  };

  createChart(option, myChart);
}

/**
 * 日历比较
 * @param {Object} data
 * @param {Object} myChart
 */
export function createCompareCalanderChart(data, myChart) {

  let graphData = data.graphData;
  let links = {};
  if (graphData) {
    links = graphData.map(function(item, idx) {
      return {
        source: idx,
        target: idx + 1
      };
    });
    links.pop();
  }

  let minValue = data.minValue;
  let maxValue = data.maxValue;
  //最大值最小值分成3分
  let peace = (maxValue - minValue) / 5;

  // 获取每个格子的点的大小，数值为2,4,6,8,10
  function getSymbolSize(value) {
    if (1 == 1) {
      //算法不好，强行写死
      return 10;
    }
    if (peace == 0) {
      //最小和最大值相等
      return 10;
    }
    let v = ((value[1] - minValue) / peace) * 2;
    if (v == 0) {
      return 2;
    }
    return v;
  }

  let seriesData = new Array();
  let serie = {
    type: 'graph',
    edgeSymbol: ['none', 'arrow'],
    coordinateSystem: 'calendar',
    links: links,
    symbolSize: 15,
    calendarIndex: 0,
    itemStyle: {
      normal: {
        color: 'green',
        shadowBlue: 9,
        shadowOffsetX: 1.5,
        shadowOffsetY: 3,
        shadowColor: '#555'
      }
    },
    lineStyle: {
      normal: {
        color: '#D10E00',
        width: 1,
        opacity: 1
      }
    },
    data: data.graphData,
    z: 20
  };
  seriesData.push(serie);
  serie = {
    type: 'graph',
    edgeSymbol: ['none', 'arrow'],
    coordinateSystem: 'calendar',
    links: links,
    symbolSize: 15,
    calendarIndex: 1,
    itemStyle: {
      normal: {
        color: 'green',
        shadowBlue: 9,
        shadowOffsetX: 1.5,
        shadowOffsetY: 3,
        shadowColor: '#555'
      }
    },
    lineStyle: {
      normal: {
        color: '#D10E00',
        width: 1,
        opacity: 1
      }
    },
    data: data.graphData,
    z: 20
  };
  seriesData.push(serie);
  serie = {
    name: data.legendData[0],
    type: 'scatter',
    coordinateSystem: 'calendar',
    data: data.series,
    symbolSize: function(val) {
      //return val[1] / data.compareSizeValue;
      return getSymbolSize(val);
    },
    itemStyle: {
      normal: {
        color: 'red'
      }
    }
  };
  seriesData.push(serie);
  serie = {
    name: data.legendData[0],
    type: 'scatter',
    coordinateSystem: 'calendar',
    calendarIndex: 1,
    data: data.series,
    symbolSize: function(val) {
      //return val[1] / data.compareSizeValue;
      return getSymbolSize(val);
    },
    itemStyle: {
      normal: {
        color: 'red'
      }
    }
  };
  seriesData.push(serie);
  if (data.series2 && data.series2.length > 0) {
    serie = {
      name: data.legendData[1],
      type: 'effectScatter',
      coordinateSystem: 'calendar',
      calendarIndex: 1,
      data: data.series2,
      symbolSize: function(val) {
        //return val[1] / data.compareSizeValue;
        return getSymbolSize(val);
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    };
    seriesData.push(serie);
    serie = {
      name: data.legendData[1],
      type: 'effectScatter',
      coordinateSystem: 'calendar',
      data: data.series2,
      symbolSize: function(val) {
        //return val[1] / data.compareSizeValue;
        return getSymbolSize(val);
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    };
    seriesData.push(serie);
  }


  let option = {
    backgroundColor: '#404a59',

    title: {
      top: 10,
      text: data.title,
      subtext: data.subTitle,
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a}<br/>{b}({c}" + data.unit + ")"
    },
    legend: {
      top: '30',
      left: '100',
      data: data.legendData,
      textStyle: {
        color: '#fff'
      }
    },
    calendar: [{
      top: 80,
      left: 'center',
      range: data.rangeFirst,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#000',
          width: 4,
          type: 'solid'
        }
      },
      yearLabel: {
        formatter: '{start}  上半年',
        textStyle: {
          color: '#fff'
        }
      },
      itemStyle: {
        normal: {
          color: '#323c48',
          borderWidth: 1,
          borderColor: '#111'
        }
      }
    }, {
      top: 260,
      left: 'center',
      range: data.rangeSecond,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#000',
          width: 4,
          type: 'solid'
        }
      },
      yearLabel: {
        formatter: '{start}  下半年',
        textStyle: {
          color: '#fff'
        }
      },
      itemStyle: {
        normal: {
          color: '#323c48',
          borderWidth: 1,
          borderColor: '#111'
        }
      }
    }],
    series: seriesData
  };
  createChart(option, myChart);
}

/**
 * 雷达图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createRadarChart(data, myChart) {
  let option = {
    title: {
      text: data.title,
      subtext: data.subTitle,
      left: 'left'
    },
    legend: {
      data: data.legendData
    },
    tooltip: {},
    radar: {
      startAngle: 90,
      splitNumber: 4,
      shape: 'circle',
      name: {
        formatter: '【{value}】',
        textStyle: {
            color: '#72ACD1'
        }
      },
      splitArea: {
        areaStyle: {
            color: ['rgba(114, 172, 209, 0.2)',
                'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 10
        }
      },
      axisLine: {
        lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      splitLine: {
        lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      indicator: data.indicatorData
    },
    series: (function() {
      let series = [];
      for (let i = 0; i < data.series.length; i++) {
        series.push({
          name: data.series[i].name,
          type: 'radar',
          data: [{
            value: data.series[i].data,
            name: data.series[i].name
          }]
        });
      }
      return series;
    })()
  };
  //alert(JSON.stringify(option));
  createChart(option, myChart);
}

/**
 * 树形图
 * @param {Object} data
 * @param {Object} myChart
 */
export function createTreeMapChart(data, myChart,echarts) {
  //let myChart = echarts.init(document.getElementById(containId));
  myChart.showLoading();
  myChart.hideLoading();

  function colorMappingChange(value) {
    let levelOption = getLevelOption(value);
    chart.setOption({
      series: [{
        levels: levelOption
      }]
    });
  }

  var formatUtil = echarts.format;

  function getLevelOption() {
    return [{
        itemStyle: {
          normal: {
            borderWidth: 0,
            gapWidth: 5
          }
        }
      },
      {
        itemStyle: {
          normal: {
            gapWidth: 1
          }
        }
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          normal: {
            gapWidth: 1,
            borderColorSaturation: 0.6
          }
        }
      }
    ];
  }

  let option = {

    title: {
      text: data.name,
      left: 'center'
    },
    //color: colorList,
    tooltip: {
      formatter: function(info) {
        let value = info.value;
        let treePathInfo = info.treePathInfo;
        let treePath = [];

        for (let i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }

        return [
          '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
          data.name + ': ' + formatUtil.addCommas(value) + ' ' + data.unit,
        ].join('');
      }
    },

    series: [{
      name: data.name,
      type: 'treemap',
      visibleMin: 300,
      label: {
        show: true,
        formatter: '{b}'
      },
      itemStyle: {
        normal: {
          borderColor: '#fff'
        }
      },
      levels: getLevelOption(),
      data: data.data
    }]
  };
  createChart(option, myChart);
}

/**
 * Polar
 * @param {Object} data
 * @param {Object} myChart
 */
export function createPolarBarChart(data, myChart) {
  let seriesData = new Array();
  for (let i = 0; i < data.ydata.length; i++) {
    let serie = {
      type: 'bar',
      data: data.ydata[i].data,
      coordinateSystem: 'polar',
      name: data.ydata[i].name,
      stack: data.ydata[i].stack
    };
    seriesData.push(serie);
  }
  let option = {
    angleAxis: {
      type: 'category',
      data: data.xdata,
      z: 10
    },
    title: {
      text: data.title,
      x: 'center'
    },
    //color: colorList,
    radiusAxis: {},
    tooltip: {
      position: 'top',
      formatter: function(p) {
        return p.name + ' [' + p.seriesName + ']';
        //return JSON.stringify(p);
      }
    },
    polar: {},
    series: seriesData,
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      data: data.legendData
    }
  };
  createChart(option, myChart);
}

/**
 * 树形结构
 * @param {Object} data
 * @param {Object} myChart
 */
export function createTreeChart(data, myChart,echarts) {
  //myChart.showLoading();
  myChart.hideLoading();

  echarts.util.each(data.children, function(datum, index) {
    index % 2 === 0 && (datum.collapsed = true);
  });

  let option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [{
      type: 'tree',

      data: [data],

      top: '1%',
      left: '7%',
      bottom: '1%',
      right: '20%',

      symbolSize: 7,

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9
        }
      },

      leaves: {
        label: {
          normal: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        }
      },
      initialTreeDepth: 3,
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
    }]
  };
  createChart(option, myChart);
}

/**
 * 仪表盘
 * @param {Object} data
 * @param {Object} myChart
 */
export function createGaugeChart(data, myChart) {
  let alertOption = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    title: {
      text: data.title,
      subtext: data.subTitle,
      x: 'center'
    },
    series: [{
      center: ["50%", "60%"], // 仪表位置
      name: '业务指标',
      type: 'gauge',
      detail: {
        formatter: '{value}%'
      },
      data: [{
        value: data.value,
        name: data.name
      }]
    }]
  };
  createChart(alertOption, myChart);
}

export function createShadowChart(data,myChart){
  let series =new Array();
  for(let i=0;i<data.series.length;i++){
    let serie = {
          name:data.series[i].name,
          type:'line',
          stack: data.series[i].stack,
          areaStyle: {normal: {}},
          data: data.series[i].data
      };
      series.push(serie);
  }
  let option = {
      title: {
          text: data.title
      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data:data.legendData
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : data.yaxisData
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series: series
  };
  createChart(option, myChart);
}

export function createSunburstChart(chartData,myChart) {
  let colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555', '#9B2655'];
  let bgColor = '#2E2733';
  let itemStyle = new Array();
  const n = colors.length;
  for(let i=0;i<n;i++){
    itemStyle.push({color:colors[i]});
  }
  let data = chartData.dataList;
  for (let j = 0; j < data.length; ++j) {
    data[j].itemStyle = {
      color: colors[j+1]
    };
    let level1 = data[j].children;
    for (let i = 0; i < level1.length; ++i) {
      let block = level1[i].children;
      let bookScore = [];
      let bookScoreId;
      for (let star = 0; star < block.length; ++star) {
        let starScore = block[star].name;
        if(starScore>5){
          starScore =5;
        }
        let style = itemStyle[starScore];
        bookScoreId = starScore;
        block[star].label = {
          color: style.color,
          downplay: {
            opacity: 0.5
          }
        };
        if (block[star].children) {
          style = {
            opacity: 1,
            color: style.color
          };
          block[star].children.forEach(function(book) {
            book.value = 1;
            book.itemStyle = style;
            book.label = {
              color: style.color
            };
            let value = bookScoreId;
            if (bookScore[bookScoreId]) {
              bookScore[bookScoreId].value += value;
            } else {
              bookScore[bookScoreId] = {
                color: colors[bookScoreId],
                value: value
              };
            }
          });
        }
        block[star].name = starScore+'☆';
      }
      level1[i].itemStyle = {
        color: data[j].itemStyle.color
      };
    }
  }
  let option = {
    backgroundColor: bgColor,
    color: colors,
    series: [{
      type: 'sunburst',
      center: ['50%', '48%'],
      data: data,
      sort: function(a, b) {
        if (a.depth === 1) {
          return b.getValue() - a.getValue();
        } else {
          return a.dataIndex - b.dataIndex;
        }
      },
      label: {
        rotate: 'radial',
        color: bgColor
      },
      itemStyle: {
        borderColor: bgColor,
        borderWidth: 2
      },
      levels: [{}, {
        r0: 0,
        r: 40,
        label: {
          rotate: 0
        }
      }, {
        r0: 40,
        r: 105
      }, {
        r0: 115,
        r: 140,
        itemStyle: {
          shadowBlur: 2,
          shadowColor: colors[2],
          color: 'transparent'
        },
        label: {
          rotate: 'tangential',
          fontSize: 10,
          color: colors[0]
        }
      }, {
        r0: 140,
        r: 145,
        itemStyle: {
          shadowBlur: 80,
          shadowColor: colors[0]
        },
        label: {
          position: 'outside',
          textShadowBlur: 5,
          textShadowColor: '#333',
        },
        downplay: {
          label: {
            opacity: 0.5
          }
        }
      }]
    }]
  };
  createChart(option, myChart);
}

/**
 * 格式化以时间分组的标签
 * @param {Object} val
 * @param {Object} dateGroup
 * @param {Object} unit
 */
export function formatDateGroupLabel(val,dateGroup,unit){
  if('MINUTE'==dateGroup){
    return val+'分';
  }else if('HOUR'==dateGroup){
    return val+'点';
  }else if('HOURMINUTE'==dateGroup){
    return val;
  }else if('DAY'==dateGroup){
    return val;
  }else if('WEEK'==dateGroup){
    return '第'+val+'周';
  }else if('MONTH'==dateGroup){
    return val+'月';
  }else if('YEAR'==dateGroup){
    return val+'年';
  }else if('DAYOFMONTH'==dateGroup){
    return val+'号';
  }else if('DAYOFWEEK'==dateGroup){
    if(val==1){
      return '周一';
    }else if(val==2){
      return '周二';
    }else if(val==3){
      return '周三';
    }else if(val==4){
      return '周四';
    }else if(val==5){
      return '周五';
    }else if(val==6){
      return '周六';
    }else if(val==7){
      return '周日';
    }else{
      return '周'+val;
    }
  }else if('YEARMONTH'==dateGroup){
    return val;
  }else if('DAYCALENDAR'==dateGroup){
    return val;
  }else if('TIMELINE'==dateGroup){
    return val;
  }else{
     return val+unit;
  }
}
