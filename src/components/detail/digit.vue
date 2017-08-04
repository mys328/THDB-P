<template>
  <div class="dig-x-box">
    <Form class="str-form" inline>
      <Form-item>
        <Date-picker :value="comDate" @on-change="setDate" size="large" format="yyyy-MM" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 300px"></Date-picker>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="getList(1)">确定</Button>
      </Form-item>
    </Form>
    <ul class="top-info">
      <li>
        <div class="items">
          <p>{{DATA.newTotal.yyyymm}}销量</p>
          <div>{{DATA.newTotal.num}}</div>
        </div>
      </li>
      <li>
        <div class="items">
          <p>环比变化</p>
          <div class="red" v-if="parseInt(DATA.newTotal.mom) > 0">
            <Icon type="arrow-up-c"></Icon>{{DATA.newTotal.mom}}</div>
          <div class="gre" v-if="parseInt(DATA.newTotal.mom) <= 0">
            <Icon type="arrow-down-c"></Icon>{{DATA.newTotal.mom}}</div>
        </div>
      </li>
      <li>
        <div class="items">
          <p>{{DATA.newTotal.cumuyear}}累计销量</p>
          <div>{{DATA.newTotal.cumu}}</div>
        </div>
      </li>
      <li style="padding:0;">
        <div class="items">
          <p>累计同比增速</p>
          <div class="red" v-if="parseInt(DATA.newTotal.an) > 0">
            <Icon type="arrow-up-c"></Icon>{{DATA.newTotal.an}}</div>
          <div class="gre" v-if="parseInt(DATA.newTotal.an) <= 0">
            <Icon type="arrow-down-c"></Icon>{{DATA.newTotal.an}}</div>
        </div>
      </li>
    </ul>
    <ul class="box-so">
      <li>
        <div id="Water"></div>
      </li>
      <li style="padding:0">
        <div id="Mount"></div>
      </li>
    </ul>
    <ul class="box-so" style="margin-top:20px;">
      <li>
        <div id="Circle"></div>
      </li>
      <li style="padding:0">
        <div id="Bar"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import XHR from '@/api'
  import echarts from 'echarts'
  import walden from '@/common/walden.json'
  echarts.registerTheme('love', walden)
  export default {
    data () {
      return {
        comDate: [],
        DATA: {
          newTotal: {}
        }
      }
    },
    mounted () {
      this.getList(0)
    },
    methods: {
      setDate (val) {
        this.comDate = val
      },
      getList (num) {
        let json = {}
        if (num === 1) {
          json.start_time = this.comDate[0]
          json.end_time = this.comDate[1]
        }
        console.log(this.comDate)
        XHR.marKet(json).then((res) => {
          if (res.data.status === 0) {
            this.comDate = []
            this.DATA = res.data.data
            this.comDate.push(res.data.data.start_time)
            this.comDate.push(res.data.data.end_time)
            this.initCircle()
            this.initMount()
            this.initBar()
            this.initWater()
          }
        })
      },
      initWater () {
        let myWater = echarts.init(document.getElementById('Water'), 'love')
        myWater.setOption({
          title: {
            text: this.DATA.zhongTrend.title,
            left: 'center',
            top: 16
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          // legend: {
          //   data: this.DATA.zhongTrend.legend
          // },
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
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.DATA.zhongTrend.xAxis
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: this.DATA.zhongTrend.seriesName,
              type: 'line',
              smooth: true,
              stack: '总量',
              symbol: 'none',
              areaStyle: {normal: {}},
              data: this.DATA.zhongTrend.seriesData
            }
          ],
          lineStyle: {
            normal: {curveness: 0.8}
          },
          backgroundColor: 'rgb(255, 255, 255)'
        })
      },
      initMount () {
        let myMount = echarts.init(document.getElementById('Mount'), 'love')
        myMount.setOption({
          title: {
            text: this.DATA.zhongHisto.title
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              }
            }
          },
          legend: {
            data: this.DATA.zhongHisto.legend
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: this.DATA.zhongHisto.xAxis
          }],
          yAxis: [{
            type: 'value',
            scale: false,
            name: '销量',
            max: this.DATA.zhongHisto.max,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            scale: false,
            name: '百分比',
            max: 100,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }],
          series: [{
            name: this.DATA.zhongHisto.seriesName,
            type: 'bar',
            data: this.DATA.zhongHisto.seriesData
          },
          {
            name: this.DATA.zhongHisto.seriesName1,
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: this.DATA.zhongHisto.seriesData1
          }],
          backgroundColor: 'rgb(255, 255, 255)'
        })
      },
      initCircle () {
        let myCircle = echarts.init(document.getElementById('Circle'), 'love')
        myCircle.setOption({
          title: {
            text: this.DATA.zhongStruc.title,
            left: 'center',
            top: 16
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 16,
            y: 20,
            data: this.DATA.zhongStruc.legend
          },
          series: [
            {
              name: this.DATA.zhongStruc.seriesName,
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.DATA.zhongStruc.seriesData
            }
          ],
          backgroundColor: 'rgb(255, 255, 255)'
        }
        )
      },
      initBar () {
        let myBar = echarts.init(document.getElementById('Bar'), 'love')
        myBar.setOption({
          title: {
            text: this.DATA.top10.title,
            left: 'center',
            top: 16
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          // legend: {
          //   data: ['2011年', '2012年']
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.DATA.top10.xAxis
          },
          series: [
            {
              name: this.DATA.top10.seriesName,
              type: 'bar',
              data: this.DATA.top10.seriesData
            }
          ],
          backgroundColor: 'rgb(255, 255, 255)'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .dig-x-box{
    min-height: 690px; padding:0 5px;
  }
  .top-info{width: 100%; height: 132px; margin: 0 0 20px 0;
    li {width: 25%; height: 132px; padding-right: 20px; float: left; display: block; box-sizing: border-box; text-align: center;font-weight: 600;}
    .items{width: 100%; height: 100%; border: 1px solid #DFE3EB; border-radius: 2px; background-color: #fff; padding: 0 20px;
      p{font-size: 14px; color: #333; height: 50px; line-height: 50px; border-bottom: 1px solid #dfe3eb;}
      div{font-size: 30px; color: #333; height: 80px; line-height: 80px; }
      i{margin-right: 10px;}
      .red{ color: #FF335D;}
      .gre{ color: #2FBB8C;}
    }
  }
  .box-so{width: 100%; height: 400px;
    li{width: 50%; height: 100%; padding-right: 20px; float: left;display: block; box-sizing: border-box;}
    div{width: 100%; height: 100%; border: 1px solid #DFE3EB; border-radius: 2px; background-color: #fff;}
  }
</style>
