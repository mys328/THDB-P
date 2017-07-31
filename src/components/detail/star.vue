<template>
  <div>
    <v-starf @goSear="sear"></v-starf>
    <div class="str-x-box">
       <div class="hot-title" style="height:38px; line-height:38px;">报告管理</div>
      <Table border :columns="TIT" :data="DATA"></Table>
      <div style="text-align:right; padding-top:20px;">
        <Page :total="total" :page-size="psize" :current="page" @on-change="gotoPage"></Page>
      </div>
    </div>
    <Modal v-model="delMod" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p style="font-size:14px;">您将要删除编号为{{delTxt}}的报告，</p>
        <p style="font-size:14px; padding-bottom: 25px;">是否继续删除？</p>
        <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    data () {
      return {
        delMod: false,
        modal_loading: false,
        delTxt: '',
        delInx: 0,
        page: 1,
        psize: 5,
        total: 0,
        formData: {
          compete_name: '',
          compete: '',
          check: '',
          big_type: '',
          chiled_type: ''
        },
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
                      this.Remove(params.index)
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
        let json = this.formData
        json.p = this.page
        XHR.CompList(json)
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
      Remove (index) {
        this.delInx = index
        this.delTxt = this.DATA[index].id
        this.delMod = true
      },
      del () {
        this.modal_loading = true
        XHR.CompDel({id: this.delTxt})
        .then((res) => {
          if (res.data.status === 0) {
            this.delMod = false
            this.modal_loading = false
            this.DATA.splice(this.delInx, 1)
          }
        })
      },
      sear (json) {
        this.formData = json
        XHR.CompSear(json).then((res) => {
          if (res.data.status === 0) {
            this.page = 1
            this.DATA = res.data.data.data
            this.total = res.data.data.num
            this.psize = res.data.data.size
          }
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
