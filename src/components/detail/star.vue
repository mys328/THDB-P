<template>
  <div>
    <v-starf></v-starf>
    <div class="str-x-box">
       <div class="hot-title" style="height:38px; line-height:38px;">报告管理</div>
      <Table border :columns="TIT" :data="DATA"></Table>
      <div style="text-align:right; padding-top:20px;">
        <Page :total="total" :page-size="psize" :current="page" @on-change="gotoPage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    data () {
      return {
        page: 1,
        psize: 5,
        total: 0,
        TIT: [
          {
            title: '编号',
            width: 66,
            key: 'id'
          },
          {
            title: '创建时间',
            key: 'create_time'
          },
          {
            title: '报告名称',
            key: 'compete_name'
          },
          {
            title: '竞争指标',
            key: 'compete_name'
          },
          {
            title: '选择粒度',
            key: 'check_type'
          },
          {
            title: '大类，子类',
            key: 'bigtype_name,childtype_name',
            render: (h, params) => {
              return h('p', [
                h('span', {
                  style: {marginRight: '10px'}
                }, this.DATA[params.index].bigtype_name),
                h('span', {}, this.DATA[params.index].childtype_name)
              ])
            }
          },
          {
            title: '地区选择',
            key: 'area_name'
          },
          {
            title: '所选时间',
            key: 'start_time'
          },
          {
            title: '状态',
            key: 'status'
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
                  style: {color: '#0c7dff'},
                  on: {
                    click: () => {
                      this.goBig(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {color: '#f44336'},
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        DATA: []
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        XHR.CompList({p: this.page})
        .then((res) => {
          if (res.data.status === 0) {
            this.DATA = res.data.data.data
            this.total = res.data.data.num
            this.psize = res.data.data.size
          }
        })
      },
      goBig (index) {
        window.open(`konw.html?id=${this.DATA[index].id}`)
      },
      gotoPage (num) {
        this.page = num
        this.getList()
      },
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
  .str-x-box{
    background: #FFF; min-height: 690px; padding:12px 20px 0;
    border: 1px solid #DFE3EB;
    
  }
  
</style>
