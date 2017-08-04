<template>
  <div class="now-x-box">
    <p>快速选择：</p>
    <Form class="str-form" inline>
      <Form-item>
        <Select v-model="formData.compete" multiple style="width:180px" size="large" placeholder="吨位(可多选)">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item>
        <Select v-model="formData.check" multiple style="width:180px" size="large" placeholder="子类(可多选)">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item>
        <Select v-model="formData.big_type" multiple style="width:180px" size="large" placeholder="车系车型(可多选)">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item>
        <Select v-model="formData.chiled_type" multiple style="width:180px" size="large" placeholder="地区(可多选)">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Form-item>
    </Form>
    <p>对比时间和其它选项：</p>
    <Form class="str-form" inline>
      <Form-item>
        <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 180px"></Date-picker>
      </Form-item>
      <Form-item>
        <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 180px"></Date-picker>
      </Form-item>

      <Form-item>
        <Select v-model="formData.compete" multiple style="width:180px" size="large" placeholder="全部端口">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item>
        <Select v-model="formData.check" multiple style="width:180px" size="large" placeholder="全部产品线">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Form-item>
    </Form>
    <div class="p">
      <span>图表纬度：</span>
      <Radio-group v-model="animal">
        <Radio label="吨位"></Radio>
        <Radio label="子类"></Radio>
        <Radio label="车系"></Radio>
        <Radio label="车型"></Radio>
        <Radio label="端口"></Radio>
        <Radio label="产品线"></Radio>
      </Radio-group>
      <span>(此选项只针对于趋势分析，结构分析有效)</span>
    </div>
    <Button type="info" size="large" style="width:180px" class="bugBtn" long>确定</Button>
    <div class="know-box">
      <Tabs value="name1">
        <Tab-pane label="趋势分析" name="name1">
          <div id="Lins"></div>
          <div class="cont-box">
            <p>
              <Select v-model="formData.compete"
              style="width:100px;float:left; text-align:left; margin:8px 0 0 8px;">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              数据汇总
            </p>

            <Table border :columns="columns1" :data="data1"></Table>
          </div>
        </Tab-pane>
        <Tab-pane label="结构分析" name="name2">

        </Tab-pane>
        <Tab-pane label="区域分析" name="name3">

        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import walden from '@/common/walden.json'
  echarts.registerTheme('love', walden)
  export default {
    data () {
      return {
        animal: '产品线',
        cityList: [],
        formData: {
          compete_name: '',
          compete: '',
          check: '',
          big_type: '',
          chiled_type: ''
        },
        columns1: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data1: [
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居'
          }
        ]
      }
    },
    created () {},
    mounted () {
      this.inits()
    },
    methods: {
      inits () {
        var myChart = echarts.init(document.getElementById('Lins'), 'love')
        // 绘制图表
        myChart.setOption({
          title: { text: '流量趋势' },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .now-x-box{ background: #FFF; min-height: 740px; padding:12px 20px 20px;
    border: 1px solid #DFE3EB;
  }
  .now-x-box > p{font-size: 14px;line-height: 26px;padding-bottom: 10px;}
  .now-x-box .p{font-size: 14px;padding-bottom: 20px;}
  .know-box,.cont-box{ margin-top: 20px;}
  #Lins{width: 100%; height: 350px; padding: 16px 16px 0; border: 1px solid #DFE3EB; border-top: 0;}
  .cont-box > p{text-align: center; font-size: 15px; height: 50px; line-height: 50px;border: 1px solid #DFE3EB; border-bottom: 0;}
</style>
