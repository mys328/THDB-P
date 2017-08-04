<template>
  <div id="doors">
    <Form class="str-form" inline>
      <Form-item>
        <Input placeholder="请输入报告名称" style="width:280px;" v-model="formData.report_name" size="large">
          <div slot="append">
            <Icon type="ios-search-strong" size="20" @click.native="getList(1)"></Icon>
          </div>
        </Input>
      </Form-item>
      <Form-item>
        <Select v-model="formData.big_type" clearable style="width:160px" size="large" placeholder="大类">
            <Option v-for="item in bigTP" :value="item.bigtype_id" :key="item.bigtype_id">{{ item.bigtype_name }}</Option>
        </Select>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="getList(1)">确定</Button>
      </Form-item>
    </Form>
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
        bigTP: [],
        delMod: false,
        modal_loading: false,
        delTxt: '',
        delInx: 0,
        page: 1,
        psize: 5,
        total: 0,
        formData: {
          report_name: '',
          big_type: ''
        },
        TIT: [
          {
            title: '编号',
            width: 66,
            key: 'reportid'
          },
          {
            title: '创建时间',
            key: 'finish_time'
          },
          {
            title: '报告名称',
            key: 'report_name'
          },
          {
            title: '大类',
            key: 'big_type_name'
          },
          {
            title: '所选时间',
            key: 'rep_begintimes',
            render: (h, params) => {
              return h('p', [
                h('span', {
                  style: {marginRight: '10px'}
                }, this.DATA[params.index].rep_begintime),
                h('span', {}, this.DATA[params.index].rep_endtime)
              ])
            }
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
                    }
                  }
                }, '预览报告'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {color: '#0c7dff'},
                  on: {
                    click: () => {
                    }
                  }
                }, '添加描述'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {color: '#0c7dff'},
                  on: {
                    click: () => {
                    }
                  }
                }, '下载'),
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
      let DB = JSON.parse(localStorage.getItem('BIG_TYPE'))
      if (DB.length > 0) {
        this.bigTP = DB
      }
    },
    methods: {
      getList (num) {
        let json = this.formData
        json.p = this.page
        if (num === 1) {
          json.p = 1
          this.page = 1
        }
        XHR.repSeh(json)
        .then((res) => {
          if (res.data.status === 0) {
            this.DATA = res.data.data.data
            this.total = res.data.data.num
            this.psize = res.data.data.size
          } else if (res.data.msg === '未查询到数据') {
            this.page = 1
            this.DATA = []
            this.total = 0
            this.psize = 0
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
