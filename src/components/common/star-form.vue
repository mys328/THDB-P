<template>
  <Form ref="formInline" class="str-form" inline>
    <Form-item>
      <Input placeholder="请输入报告名称或编号" style="width:280px;" v-model="formData.compete_name" size="large">
        <div slot="append">
          <Icon type="ios-search-strong" size="20"></Icon>
        </div>
      </Input>
    </Form-item>
    <Form-item>
      <Select v-model="formData.compete" clearable style="width:160px" size="large" placeholder="选择竞争指标">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Form-item>
    <Form-item>
      <Select v-model="formData.check" clearable style="width:160px" size="large" placeholder="选择粒度">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Form-item>
    <Form-item>
      <Select v-model="formData.big_type" clearable style="width:160px" size="large" placeholder="大类">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Form-item>
    <Form-item>
      <Select v-model="formData.chiled_type" clearable style="width:160px" size="large" placeholder="子类">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Form-item>
    <Form-item>
      <Button type="primary">确定</Button>
    </Form-item>
  </Form>
</template>

<script>
  export default {
    data () {
      return {
        cityList: [],
        formData: {
          compete_name: '',
          compete: '',
          check: '',
          big_type: '',
          chiled_type: ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
