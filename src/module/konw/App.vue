<template>
  <div class="layout" id="app">
    <div style="background:#333;">
      <div class="t-box">
        <p>{{tit}}</p>
      </div>

      <div class="br-box">
        <span class="lock">关闭</span>
        <span class="download"><i class="fso icon-downlo"></i>下载</span>
      </div>
      <div style="clear:both;"></div>
    </div>
    <Button v-show="!isShow" type="dashed" size="small" icon="chevron-down" class="lf-fbtn" @click="isShow = true"></Button>
    <Button v-show="isShow" type="dashed" size="small" icon="chevron-up" class="lf-fbtn" @click="isShow = false"></Button>
    <div v-show="isShow" class="mask-box">
      <p>竞争指标：{{DATA.info.compete_name}}</p>
      <p>区&emsp;&emsp;域：{{DATA.info.area_name}}</p>
      <p>大类子类：{{DATA.info.bigtype_name}} {{DATA.info.childtype_name}}</p>
      <p>粒&emsp;&emsp;度：{{DATA.info.check_type}}</p>
      <p>统计周期：{{DATA.start_time * 1000 | dataTimeFgo}}-{{DATA.end_time * 1000 | dataTimeFgo}}</p>
      <div class="time-tous">
        <Button type="text" icon="chevron-left" style="color:#fff"
        @click="goLR(0)"></Button>
        <em>{{PAG[page]}}</em>
        <Button type="text" icon="chevron-right" style="color:#fff"
        @click="goLR(1)"></Button>
      </div>
      <Table :columns="tebleT" :row-class-name="rowClassName" :data="TAB[page]" class="TAB"></Table>
    </div>
    <Input v-model="txt" class="txt-input" size="large" placeholder="输入节点名称突出显示"></Input>
    <div id="konwX"></div>
  </div>
</template>

<script>
  import XHR from '@/api'
  import echarts from 'echarts'
  // import walden from '@/common/walden.json'
  // echarts.registerTheme('love', walden)
  var myChart
  export default {
    name: 'app',
    data () {
      return {
        isShow: false,
        txt: '',
        DATA: {
          info: {}
        },
        tit: '',
        tebleT: [
          {
            title: '排名',
            width: 50,
            align: 'center',
            key: 'order_id'
          },
          {
            title: '名称',
            align: 'center',
            ellipsis: true,
            key: 'name'
          },
          {
            title: '竞争指数',
            align: 'center',
            key: 'compete'
          },
          {
            title: '指数变化',
            align: 'center',
            key: 'index_changes',
            render: (h, params) => {
              let name = 'index_change'
              return this.setIco(h, params, name)
            }
          },
          {
            title: '排名变化',
            align: 'center',
            key: 'order_changes',
            render: (h, params) => {
              let name = 'order_change'
              return this.setIco(h, params, name)
            }
          }
        ],
        TAB: [],
        page: 0,
        PAG: []
      }
    },
    watch: {
      txt: 'showNode'
    },
    created () {
    },
    mounted () {
      this.inits()
    },
    methods: {
      GetQueryString (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r !== null) {
          return unescape(r[2])
        } else {
          return null
        }
      },
      rowClassName (row, index) {
        if (this.TAB[this.page][index]['check'] === 1) {
          return 'red-tab'
        }
        return ''
      },
      goLR (num) {
        let pag = this.page
        if (num === 1) {
          pag++
          if (pag < this.PAG.length) {
            this.page = pag
          } else {
            return ''
          }
        } else {
          pag--
          if (pag >= 0) {
            this.page = pag
          } else {
            return ''
          }
        }
      },
      getMsg (myChart) {
        let json = {id: this.GetQueryString('id')}
        XHR.CompImg(json)
        .then((res) => {
          if (res.data.status === 0) {
            myChart.hideLoading()
            this.DATA = res.data.data
          }
        })
      },
      inits () {
        myChart = echarts.init(document.getElementById('konwX'))
        myChart.showLoading()
        let json = {id: this.GetQueryString('id')}
        XHR.CompImg(json)
        .then((res) => {
          if (res.data.status === 0) {
            myChart.hideLoading()
            this.DATA = res.data.data
            this.tit = res.data.data.info.name
            myChart.setOption({
              title: {text: ''},
              animationDurationUpdate: 1500,
              animationEasingUpdate: 'quinticInOut',
              series: [
                {
                  type: 'graph',
                  name: 'name',
                  layout: 'force',
                  force: {
                    repulsion: 1000,
                    layoutAnimation: false
                  },
                  nodeScaleRatio: 0,
                  // progressiveThreshold: 700,
                  data: this.DATA.info.data.nodes.map(function (node) {
                    return {
                      // x: node.x,
                      // y: node.y,
                      id: node.label,
                      name: node.label,
                      vaid: node.id !== '' ? node.id : '',
                      symbolSize: node.size,
                      itemStyle: {
                        normal: {
                          // color: '#' + Math.floor(Math.random() * 0xffffff).toString(16),
                          // borderColor: node.col[2],
                          borderColor: '#757676',
                          borderWidth: 3,
                          color: '#FF5F00'
                        }
                      }
                    }
                  }),
                  edges: this.DATA.info.data.edges.map(function (edge) {
                    return {
                      source: edge.source,
                      target: edge.target,
                      lineStyle: {
                        normal: {
                          // color: '#fff',
                          width: edge.width
                          // type: 'solid',
                          // opacity: 0.7
                        }
                      }
                    }
                  }),
                  label: {
                    // emphasis: {
                    //   position: 'right',
                    //   show: true
                    // },
                    normal: {
                      show: true
                    }
                  },
                  roam: true,
                  focusNodeAdjacency: true,
                  lineStyle: {
                    normal: {
                      // color: '#fff',
                      color: '#F97C00',
                      width: 0.5,
                      curveness: 0,
                      opacity: 0.8
                    }
                  }
                }
              ]
            }, true)
            for (let ns in this.DATA.data) {
              // console.log(ns)
              this.PAG.push(ns)
              this.TAB.push(this.DATA.data[ns])
            }
          }
        })
      },
      setIco (h, params, name) {
        if (this.TAB[this.page][params.index][name] > 0) {
          return h('p', [
            h('Icon', {
              style: {marginRight: '5px', color: '#FF335D'},
              props: {type: 'arrow-up-c'}
            }),
            h('span', {}, this.TAB[this.page][params.index][name])
          ])
        }
        if (this.TAB[this.page][params.index][name] === '0') {
          return h('p', [
            h('Icon', {
              style: {marginRight: '5px', color: '#3A8DFF'},
              props: {type: 'minus-round'}
            }),
            h('span', {}, this.TAB[this.page][params.index][name])
          ])
        }
        if (this.TAB[this.page][params.index][name] < 0) {
          return h('p', [
            h('Icon', {
              style: {marginRight: '5px', color: '#2FBB8C'},
              props: {type: 'arrow-down-c'}
            }),
            h('span', {}, this.TAB[this.page][params.index][name])
          ])
        }
      },
      showNode (val, old) {
        let dataindex = ''
        let option = myChart.getOption()
        let data = option.series[0].data
        for (let i = 0; i < data.length; i++) {
          if (data[i].name.indexOf(val) >= 0) {
            dataindex = i
            break
          }
        }
        if (dataindex !== '') {
          myChart.dispatchAction({
            type: 'focusNodeAdjacency',
            seriesName: 'name',
            dataIndex: dataindex
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .layout{
    min-width: 1300px;
    width: 100%;
    min-height: 100%;
    background: #222;
    color: #fff;
  }
 .t-box{
  padding: 20px; float: left;
    p{font-size: 18px;  overflow: hidden;word-break:inherit; text-overflow:ellipsis; display: block; height: 30px; line-height: 30px;}
    p span{display: inline-block; background-color: #2FBB8C; border-radius: 2px; color: #fff; font-size: 12px; margin:6px 4px 5px 0; padding: 0 4px; height: 20px; line-height: 20px;position: relative;top: -4px;}
    .time{height: 30px; line-height: 30px; font-size: 12px;
      color: #999;
      span{padding:0 10px;}
    }
    .time span:first-child{ padding-left: 0; border-right:1px solid #999;}
    .time span:last-child{ border-left:1px solid #999;}
 }
 .br-box{float: right; padding:20px 20px 0;
  span{display: inline-block; text-align: center; margin-left: 10px;}
  .lock{width: 80px; height: 30px; border: 1px solid #3A8DFF; border-radius: 2px; font-size: 12px;color: #3A8DFF; line-height: 26px; 
  i{padding-right: 5px; position: relative; top: 2px;}}
  .download{width: 80px; height: 30px; background: #3A8DFF;border-radius: 2px; color: #fff; font-size: 12px; line-height: 28px;
    i{font-size: 10px; padding-right: 5px;}
  }
 }
 #konwX{width:100%; height: 800px;}

 .lf-fbtn{position: absolute; left: 20px; top: 90px; z-index: 999;color: #fff;
    background: rgba(34,34,34,0.8);width: 36px;
    border: 1px solid #555;}

.mask-box{width: 390px;min-height: 150px; height: auto; background: rgba(34,34,34,0.8);position: absolute; left: 20px; top: 114px; z-index: 999;color: #fff;border: 1px solid #555; padding: 10px 0;}
.mask-box > p{font-size: 14px; padding-left:20px;line-height: 30px;}
.TAB{}
.time-tous{text-align: center; background: #000; border-top: 1px solid #555; border-bottom: 1px solid #555; height: 40px; line-height: 40px;margin-top:10px; em{ font-style: normal; font-size: 14px; padding: 0 30px;} }
.txt-input{ position: absolute; width: 170px; top: 90px; right: 20px; z-index: 999;}
</style>
