<template>
  <Form class="str-form" inline>
    <Form-item>
      <Input placeholder="请输入报告名称或编号" style="width:280px;" v-model="formData.compete_name" size="large">
        <div slot="append">
          <Icon type="ios-search-strong" size="20" @click.native="goSo"></Icon>
        </div>
      </Input>
    </Form-item>
    <Form-item>
      <Select v-model="formData.compete" clearable style="width:160px" size="large" placeholder="选择竞争指标">
          <Option v-for="item in comPete" :value="item.compete_id" :key="item.compete_id">{{ item.compete_name }}</Option>
      </Select>
    </Form-item>
    <Form-item>
      <Select v-model="formData.check" clearable style="width:160px" size="large" placeholder="选择粒度">
          <Option v-for="item in comCheck" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </Form-item>
    <Form-item>
      <Select v-model="formData.big_type" clearable style="width:160px" size="large" placeholder="大类">
          <Option v-for="item in bigTP" :value="item.bigtype_id" :key="item.bigtype_id">{{ item.bigtype_name }}</Option>
      </Select>
    </Form-item>
    <Form-item>
      <Select v-model="formData.chiled_type" clearable style="width:160px" size="large" placeholder="子类">
          <Option v-for="item in chiTP" :value="item.childtype_id" :key="item.childtype_id">{{ item.childtype_name }}</Option>
      </Select>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="goSo">确定</Button>
    </Form-item>
  </Form>
</template>

<script>
  import XHR from '@/api'
  export default {
    data () {
      return {
        comPete: [],
        comCheck: [],
        bigTP: [],
        chiTP: [],
        formData: {
          compete_name: '',
          compete: '',
          check: '',
          big_type: '',
          chiled_type: ''
        }
      }
    },
    created () {
      let DB = JSON.parse(localStorage.getItem('BIG_TYPE'))
      let TB = JSON.parse(localStorage.getItem('CHI_TYPE'))
      if (DB.length > 0) {
        this.bigTP = DB
      }
      if (TB.length > 0) {
        this.chiTP = TB
      }
      XHR.ComPete().then((res) => {
        if (res.data.status === 0) {
          this.comPete = res.data.data
        }
      })
      XHR.ComCheck().then((res) => {
        if (res.data.status === 0) {
          this.comCheck = res.data.data
        }
      })
    },
    methods: {
      goSo () {
        let json = this.formData
        json.p = 1
        // console.log(json)
        this.$emit('goSear', json)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
