<template>
  <div class="login">
    <top-bar>
        <span slot="topText" class="top-text">{{title}}</span>
    </top-bar>
    <van-field
      v-model="fullGoodsTypeName"
      required
      label="商品类型"
      placeholder="请选择商品类型"
      :readonly="true"
      is-link
      @focus="showGoodsType=true"
      :rules="[{ required: true, message: '请选择商品类型' }]"
    />
    <van-field
      v-model="buyTypeName"
      required
      label="购买来源"
      placeholder="请选择购买来源"
      :readonly="true"
      is-link
      @focus="showBuyType=true"
      :rules="[{ required: true, message: '请选择购买来源' }]"
    />
    <van-field
      v-model="form.goodsName"
      required
      rows="1"
      autosize
      label="商品名称"
      type="textarea"
      maxlength="100"
      placeholder="请输入商品名称"
      show-word-limit
    />
    <van-field
      v-model="form.skuInfo"
      name="SKU信息"
      label="SKU信息"
      placeholder="请输入SKU信息"
      :rules="[{ required: false, message: '请填写SKU信息' }]"
    />
    <van-field
      v-model="form.price"
      required
      type="number"
      label="商品价格" >
      <template #button>
        元
      </template>
    </van-field>
    <van-field
      required
      readonly
      clickable
      name="calendar"
      :value="form.buyDate"
      label="购买时间"
      placeholder="请选择购买时间"
      @click="showBuyDate = true"
      :rules="[{ required: true, message: '请填写购买时间' }]"
    />
    <van-field
      v-model="paymentName"
      required
      label="支付方式"
      placeholder="请选择支付方式"
      :readonly="true"
      is-link
      @focus="showPayment=true"
      :rules="[{ required: true, message: '请选择支付方式' }]"
    />
    <van-field
      v-model="form.shopName"
      required
      name="店铺名称"
      label="店铺名称"
      placeholder="请输入店铺名称"
      :rules="[{ required: true, message: '请填写店铺名称' }]"
    />
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">更多选项</van-divider>
    <van-field
      v-model="form.amount"
      required
      type="digit"
      label="商品数量" >
    </van-field>
    <van-field
      v-model="form.shipment"
      required
      type="number"
      label="商品运费" >
      <template #button>
        元
      </template>
    </van-field>
    <van-field
      v-model="form.brand"
      name="品牌名称"
      label="品牌名称"
      placeholder="请输入品牌名称"
      :rules="[{ required: false, message: '请填写品牌名称' }]"
    />
    <van-field label="商品标签" right-icon="cart-o" readonly @click="showHisTagsEdit()"/>
    <div>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        placeholder="添加标签,按回车键确认"
        @tags-changed="newTags => tags = newTags"
      />
    </div>
    <van-field
      v-model="consumeTypeName"
      required
      label="消费类型"
      placeholder="请选择消费类型"
      :readonly="true"
      is-link
      @focus="showConsumeType=true"
      :rules="[{ required: true, message: '请选择消费类型' }]"
    />
    <van-field name="switch" required label="是否二手">
      <template #input>
        <van-switch v-model="form.secondhand" size="20" />
      </template>
    </van-field>
    <van-field
      readonly
      clickable
      name="calendar"
      :value="form.consumeDate"
      label="消费时间"
      placeholder="请选择消费时间"
      @click="showConsumeDate = true"
      :rules="[{ required: false, message: '请填写消费时间' }]"
    />
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">出售/作废信息</van-divider>
    <van-field
      v-model="form.soldPrice"
      type="number"
      label="售出价格" >
      <template #button>
        元
      </template>
    </van-field>
    <van-field
      readonly
      clickable
      name="calendar"
      :value="form.deleteDate"
      label="售出日期"
      placeholder="该商品被卖出或者作废的日期"
      @click="showDeleteDate = true"
      :rules="[{ required: false, message: '请填写售出日期' }]"
    />
    <van-field
      v-model="form.remark"
      rows="2"
      autosize
      label="备注信息"
      type="textarea"
      maxlength="100"
      placeholder="请输入备注"
      show-word-limit
    />
    <div>
      <van-button round block type="info" class="btn-block" @click="saveFormData">
          保存
      </van-button>
    </div>
    <van-action-sheet v-model="showBuyType" :actions="buyTypeOptions" @select="onSelectBuyType" />
    <van-action-sheet v-model="showPayment" :actions="paymentOptions" @select="onSelectPayment" />
    <van-action-sheet v-model="showConsumeType" :actions="consumeTypeOptions" @select="onSelectConsumeType" />

    <!--购买时间选择器-->
    <van-popup v-model="showBuyDate" position="bottom">
      <van-datetime-picker
        v-model="vanBuyDate"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showBuyDate = false"
        @confirm="onConfirmBuyDate"
      />
    </van-popup>
    <!--消费时间选择器-->
    <van-popup v-model="showConsumeDate" position="bottom">
      <van-datetime-picker
        v-model="vanConsumeDate"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showConsumeDate = false"
        @confirm="onConfirmConsumeDate"
      />
    </van-popup>
    <!--售出/废除时间选择器-->
    <van-popup v-model="showDeleteDate" position="bottom">
      <van-datetime-picker
        v-model="vanDeleteDate"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showDeleteDate = false"
        @confirm="onConfirmDeleteDate"
      />
    </van-popup>
    <!--商品类型选择器-->
    <van-popup v-model="showGoodsType" position="bottom">
      <van-tree-select
        :items="goodsTypeList"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
        @click-nav="chooseGoodsType"
        @click-item="chooseSubGoodsType"
      />
    </van-popup>
    <!--标签选择器-->
    <van-popup v-model="showHisTag" position="bottom">
      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">标签编辑</van-divider>
      <vue-tags-input
        v-model="hisTag"
        :tags="hisTags"
        placeholder="添加标签,按回车键确认"
        @tags-changed="newTags => hisTags = newTags"
      />
      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">历史标签</van-divider>
      <span v-for="(item, index) in hisTagsOptions" :key="index">
        <van-tag color="#626262" plain size="large" @click="chooseTag(item.text)">
        {{item.text}}
        </van-tag>
        <van-tag color="#ffffff" plain></van-tag>
      </span>
      </br></br>
      <van-button round block type="info" class="app-color" @click="confirmChooseTag">
        确定
      </van-button>
    </van-popup>
  </div>
</template>

<script>
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,Rate,ActionSheet,Dialog,Icon,Divider,Tag,TreeSelect} from 'vant';
  import { createBuyRecord,updateBuyRecord,getBuyRecord,getBuyRecordKeywordsTree} from '@/api/consume/buyRecord';
  import { fetchList } from '@/api/consume/goodsType'
  import { getBuyTypeTree } from '@/api/consume/buyType'

  import TopBar from "components/TopBar";
  import { getNowDateTimeString,getFormatDate } from '@/utils/datetime';
  import { keywordsToTags,tagsToKeywords,addTag } from '@/utils/index';
  import VueTagsInput from '@johmun/vue-tags-input';

  export default {
    name: "BuyRecordForm",
    components: {
      TopBar,
      VueTagsInput,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup,
      [Form.name]: Form,
      [Field.name]:Field,
      [Switch.name]: Switch,
      [Notify.Component.name]: Notify.Component,
      [Rate.name]: Rate,
      [ActionSheet.name]:ActionSheet,
      [Dialog.Component.name]: Dialog.Component,
      [Icon.name]: Icon,
      [Divider.name]: Divider,
      [Tag.name]: Tag,
      [TreeSelect.name]: TreeSelect,
    },
    data() {
      return {
        title:'新增',
        form:{},
        //商品类型名称
        goodsTypeName:undefined,
        fullGoodsTypeName:undefined,
        showGoodsType:false,
        //商品树
        goodsTypeList:[],
        //表示右侧高亮选项的 id
        activeId:-1,
        //表示左侧高亮选项的索引
        activeIndex:-1,
        //购买来源
        showBuyType:false,
        buyTypeOptions:[],
        buyTypeName:undefined,
        //支付方式
        showPayment:false,
        paymentOptions:[],
        paymentName:undefined,
        //支付方式
        showConsumeType:false,
        consumeTypeOptions:[],
        consumeTypeName:undefined,
        //标签功能
        tags:[],
        tag:undefined,
        //历史标签选择
        showHisTag:false,
        hisTags:[],
        hisTag:undefined,
        hisTagsOptions:[],
        //购买时间
        vanBuyDate:undefined,
        //购买时间窗口
        showBuyDate:false,
        //消费时间
        vanConsumeDate:undefined,
        //消费时间窗口
        showConsumeDate:false,
        //出售时间
        vanDeleteDate:undefined,
        //出售时间窗口
        showDeleteDate:false
      };
    },
    created() {
      this.initSelectOptions();
      const id = this.$route.params.id;
      const tmpId = this.$route.params.tmpId;
      if(id!=null){
        this.title="修改";
        this.loadBuyRecord(id);
      }else if(tmpId!=null){
        this.title="以模板新增";
        this.loadFromTmp(tmpId);
      }else{
        this.form={
          amount:1,
          shipment:0,
          payment:'ALIPAY',
          secondhand:false,
          consumeType:'NORMAL',
          occurTime:undefined,
          location:undefined
        };
        this.paymentName = '支付宝';
        this.consumeTypeName = '普通消费';
        this.vanBuyDate = new Date();
        this.vanConsumeDate  = new Date();
      }
    },
    methods: {
      //初始化下拉列表
      initSelectOptions(){
        //加载商品类型选择器
        const para ={
          page:1
        }
        fetchList(para).then(response => {
          this.goodsTypeList = response.rows;
        });
        getBuyTypeTree(null,null).then(response => {
          this.buyTypeOptions = response;
        });
        this.getEnumTree('Payment','FIELD',false).then(response => {
          this.paymentOptions = response;
        });
        this.getEnumTree('GoodsConsumeType','FIELD',false).then(response => {
          this.consumeTypeOptions = response;
        });
      },
      /**选择商品类型*/
      chooseGoodsType(index){
        let goodsType = this.goodsTypeList[index];
        if(this.form.goodsTypeId == goodsType.id){
          //重复点击
          return;
        }
        this.form.goodsTypeId = goodsType.id;
        this.form.subGoodsTypeId = null;
        this.goodsTypeName = goodsType.text;
        this.fullGoodsTypeName = this.goodsTypeName;
      },
      /**选择商品子类型*/
      chooseSubGoodsType(data){
        if(this.form.subGoodsTypeId == data.id){
          //重复点击
          return;
        }
        this.form.subGoodsTypeId = data.id;
        this.fullGoodsTypeName = this.goodsTypeName +'('+data.text+')';
      },
      /**购买类型选择确定*/
      onSelectBuyType(item){
        this.buyTypeName = item.name;
        this.form.buyTypeId = item.id;
        this.showBuyType = false;
      },
      /**支付方式选择确定*/
      onSelectPayment(item){
        this.paymentName = item.name;
        this.form.payment = item.id;
        this.showPayment = false;
      },
      /**消费类型选择确定*/
      onSelectConsumeType(item){
        this.consumeTypeName = item.name;
        this.form.consumeType = item.id;
        this.showConsumeType = false;
      },
      /**购买时间选择确定*/
      onConfirmBuyDate(){
        this.form.buyDate = getFormatDate(this.vanBuyDate,this.dateTimeFormat);
        this.showBuyDate = false;
      },
      /**消费时间选择确定*/
      onConfirmConsumeDate(){
        this.form.consumeDate = getFormatDate(this.vanConsumeDate,this.dateTimeFormat);
        this.showConsumeDate = false;
      },
      /**出售时间选择确定*/
      onConfirmDeleteDate(){
        this.form.deleteDate = getFormatDate(this.vanDeleteDate,this.dateTimeFormat);
        this.showDeleteDate = false;
      },
      /**历史标签选择*/
      showHisTagsEdit(name){
        this.hisTags = JSON.parse(JSON.stringify(this.tags));
        getBuyRecordKeywordsTree(null,null).then(response => {
          this.hisTagsOptions = response;
        });
        this.showHisTag = true;
      },
      /** 历史标签选择 */
      chooseTag(tag){
        for (var value of this.hisTags) {
          if(tag==value.text){
            Notify({ type: 'warning', message: '['+tag+']已经存在' });
            return;
          }
        }
        addTag(tag,this.hisTags);
      },
      /** 历史标签选择确定 */
      confirmChooseTag(){
        this.tags = this.hisTags;
        this.showHisTag = false;
      },
      /** 重置 */
      reset(){
        this.form={
          score:3,
          price:0,
          occurTime:undefined,
          location:undefined
        };
        this.vanOccurTime = new Date();
      },
      /**信息转换为表单信息*/
      changeBuyRecordToForm(formData){
        this.vanBuyDate = new Date(formData.buyDate);
        this.vanConsumeDate = new Date(formData.consumeDate);
        this.vanDeleteDate = new Date(formData.deleteDate);
        this.form.goodsTypeId = formData.goodsType.id;
        this.fullGoodsTypeName = formData.goodsType.name;
        if(formData.subGoodsType!==undefined){
          this.form.subGoodsTypeId = formData.subGoodsType.id;
          this.fullGoodsTypeName += '('+formData.subGoodsType.name+')';
        }
        this.form.buyTypeId = formData.buyType.id;
        this.buyTypeName = formData.buyType.name;
        this.consumeTypeName = formData.consumeTypeName;
        this.paymentName = formData.paymentName;
        this.tags = keywordsToTags(formData.keywords);
      },
      /**获取最新的位置*/
      loadLastLocation() {
        // 请求接口数据
        getDietLastLocation().then(response => {
          this.form.location=response;
        });
      },
      /**获取表单信息*/
      loadBuyRecord(id) {
        // 请求接口数据
        getBuyRecord(id).then(response => {
          this.form=response;
          this.changeBuyRecordToForm(this.form);
        });
      },
      /**以模板获取表单信息*/
      loadFromTmp(id) {
        // 请求接口数据
        getBuyRecord(id).then(response => {
          this.form=response;
          this.form.id=undefined;
          this.form.buyDate = getNowDateTimeString();
          this.form.consumeDate=undefined;
          this.vanBuyDate = new Date(this.form.buyDate);
          this.changeBuyRecordToForm(this.form);
        });
      },
      /**提交表单，这里不能用form的onsubmit功能，因为和tag编辑有冲突*/
      saveFormData() {
        //转换
        this.form.keywords = tagsToKeywords(this.tags);
        //删除比必要的信息
        this.form.goodsType=null;
        this.form.subGoodsType=null;
        this.form.buyType=null;
        Toast.loading({
          forbidClick: true
        })
        if (this.form.id != undefined) {
          updateBuyRecord(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            //通过传递一个r参数，告诉列表页面这是编辑过的需要刷新
            this.$router.push({ name: 'BuyRecord', params: { r: true }})
          });
        } else {
          createBuyRecord(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            this.$router.push({ name: 'BuyRecord', params: { r: true }})
          });
        }
      },
    }
  }
</script>
