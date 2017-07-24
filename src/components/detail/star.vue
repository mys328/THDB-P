<template>
  <div class="ico-x-box">
    <div class="">
      <Table border :columns="TIT" :data="DATA"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        TIT: [
          {
            title: '编号',
            key: 'num'
          },
          {
            title: '创建时间',
            key: 'cretime'
          },
          {
            title: '报告名称',
            key: 'name'
          },
          {
            title: '竞争指标',
            key: 'compname'
          },
          {
            title: '选择粒度',
            key: 'ctype'
          },
          {
            title: '大类，子类',
            key: 'type'
          },
          {
            title: '地区选择',
            key: 'adr'
          },
          {
            title: '所选时间',
            key: 'time'
          },
          {
            title: '状态',
            key: 'sta'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '编辑')
              ])
            }
          }
        ],
        DATA: [
          {
            num: '22',
            cretime: '2012-23-34',
            name: '北京市朝阳区芍药居',
            compname: '市朝药居',
            ctype: '药居',
            type: 'dfg',
            adr: '北京市',
            time: '34-56-78',
            sta: 'over'
          }
        ]
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：`
        })
      },
      remove (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .ico-x-box{ width: 100%; height: 170px; background-color: #fff;}
  .ico-tp-box{ width: 1300px; margin:0 auto; height: 170px; padding: 40px 0;text-align: center;
    div{ border-left: 1px solid #DFE3EB;}
    i{font-size: 42px; }
    p{margin-top: 10px;}
    div:first-child{border:0;}
  }
</style>
