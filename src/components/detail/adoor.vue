<template>
  <div class="sta-x-box">
    <Form ref="addStar" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box">
      <Form-item label="报告名称:" :label-size="14" prop="username">
        <Input type="text" size="large" v-model="DATA.comName" placeholder="请输入报告名称(20字以内)" style="width: 340px"></Input>
      </Form-item>
      <Form-item label="选择时间:" prop="service">
        <Date-picker :value="DATA.comDate" size="large" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 340px"></Date-picker>
      </Form-item>
      <Form-item label="竞争指标:" prop="service">
        <Radio-group v-model="DATA.comRad">
          <Radio label="关注指标"></Radio>
          <Radio label="购车指标"></Radio>
          <Radio label="询价线索数"></Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="大类选择:" prop="service">
        <Checkbox-group v-model="DATA.comChe">
          <Checkbox label="全部大类"></Checkbox>
          <Checkbox label="重卡"></Checkbox>
          <Checkbox label="中卡"></Checkbox>
          <Checkbox label="轻卡"></Checkbox>
          <Checkbox label="微卡"></Checkbox>
        </Checkbox-group>
      </Form-item>
      <Form-item label="子类选择:" prop="service">
        <Checkbox-group v-model="DATA.comChe">
          <Checkbox label="全部子类"></Checkbox>
          <Checkbox label="牵引车"></Checkbox>
          <Checkbox label="载货车"></Checkbox>
          <Checkbox label="自卸车"></Checkbox>
        </Checkbox-group>
      </Form-item>
      <Form-item label="地区选择:" prop="service">
        <Cascader :data="data" trigger="hover" size="large" change-on-select style="width: 340px"></Cascader>
      </Form-item>
      <h3 class="h3s">选择我关注的品牌或车型或车系<em>(报告将重点标注)</em></h3>
      <Form-item label="选择品牌:" prop="service">
        <Select v-model="modCom" size="large" multiple style="width:340px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input type="text" v-model="DATA.comName" placeholder="自定义合并品牌名称" style="width: 160px"></Input>
        <Button type="dashed" icon="plus-round">添加品牌</Button>
      </Form-item>
      <Form-item label="选择车系:" prop="service">
        <Select v-model="modCom" size="large" multiple style="width:340px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item label="选择车型:" prop="service">
        <Select v-model="modCom" size="large" multiple style="width:340px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Form-item>
      <Form-item label="" prop="service">
        <Button type="primary" size="large" style="width:340px">提交</Button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
  // import XHR from '@/api'
  export default {
    data () {
      return {
        data: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                }
              ]
            }
          ]
        }],
        cityList: [{
          value: 'beijing',
          label: '北京市'
        }],
        modCom: [],
        DATA: {
          comName: '',
          comDate: [],
          comRad: '',
          comChe: []
        },
        ruleCustom: {

        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .sta-x-box{ width: 100%; min-height: 800px; background-color: #fff; padding-top: 20px;}
  .h3s{font-size: 16px; padding:0 0 25px 28px; em{font-style: normal; color: #E41B3C;}}
</style>
