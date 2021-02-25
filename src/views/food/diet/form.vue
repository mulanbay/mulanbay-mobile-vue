<template>
  <div class="login">
    <top-bar>
        <span slot="topText" class="top-text">{{title}}</span>
    </top-bar>
    <van-field
      v-model="form.dietTypeName"
      required
      label="餐次"
      placeholder="请选择餐次"
      :readonly="true"
      is-link
      @focus="showDietType=true"
      :rules="[{ required: true, message: '请选择餐次' }]"
    />
    <van-field
      v-model="form.dietSourceName"
      required
      label="来源"
      placeholder="请选择来源"
      :readonly="true"
      is-link
      @focus="showDietSource=true"
      :rules="[{ required: true, message: '请选择来源' }]"
    />
    <van-field
      v-model="form.foodTypeName"
      required
      label="食物类型"
      placeholder="请选择食物类型"
      :readonly="true"
      is-link
      @focus="showFoodType=true"
      :rules="[{ required: true, message: '请选择食物类型' }]"
    />
    <van-field label="食物明细" required right-icon="cart-o" readonly @click="showHisTagsEdit('foods')"/>
    <div>
      <vue-tags-input
        v-model="fdTag"
        :tags="foodsTags"
        placeholder="添加食物,按回车键确认"
        @tags-changed="newTags => foodsTags = newTags"
      />
    </div>
    <van-field
      required
      readonly
      clickable
      name="calendar"
      :value="form.occurTime"
      label="发生时间"
      placeholder="请选择发生时间"
      @click="showOccurTime = true"
      :rules="[{ required: true, message: '请填写发生时间' }]"
    />
    <van-field
      v-model="form.price"
      required
      type="number"
      label="价格/成本" >
      <template #button>
        元
      </template>
    </van-field>
    <van-field
      name="rate"
      required
      label="评分"
      right-icon="question-o"
      :rules="[{ required: true, message: '请填写评分' }]"
      >
      <template #input>
        <van-rate v-model="form.score" :count="5"/>
      </template>
      <template #right-icon>
        <van-icon name="question-o" @click="showScoreHelp"/>
      </template>
    </van-field>
    <van-field
      v-model="form.location"
      required
      name="地点"
      label="地点"
      placeholder="请输入地点"
      :rules="[{ required: false, message: '请填写地点' }]"
    />
    <van-field label="食物标签" right-icon="cart-o" readonly @click="showHisTagsEdit('tags')"/>
    <div>
      <vue-tags-input
        v-model="tgTag"
        :tags="tagsTags"
        placeholder="添加标签,按回车键确认"
        @tags-changed="newTags => tagsTags = newTags"
      />
    </div>
    <van-field label="店铺/品牌" right-icon="cart-o" readonly @click="showHisTagsEdit('shop')"/>
    <div>
      <vue-tags-input
        v-model="spTag"
        :tags="shopTags"
        placeholder="添加店铺/品牌,按回车键确认"
        @tags-changed="newTags => shopTags = newTags"
      />
    </div>
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
    <van-action-sheet v-model="showDietType" :actions="dietTypeOptions" @select="onSelectDietType" />
    <van-action-sheet v-model="showDietSource" :actions="dietSourceOptions" @select="onSelectDietSource" />
    <van-action-sheet v-model="showFoodType" :actions="foodTypeOptions" @select="onSelectFoodType" />

    <!--发生时间选择器-->
    <van-popup v-model="showOccurTime" position="bottom">
      <van-datetime-picker
        v-model="vanOccurTime"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showOccurTime = false"
        @confirm="onConfirmOccurTime"
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
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,Rate,ActionSheet,Dialog,Icon,Divider,Tag} from 'vant';
  import { createDiet,updateDiet,getDiet,getDietLastLocation,getFoodsTree,getShopTree,getTagsTree } from '@/api/food/diet';
  import TopBar from "components/TopBar";
  import { getFormatDate } from '@/utils/datetime';
  import { keywordsToTags,tagsToKeywords,addTag } from '@/utils/index';
  import VueTagsInput from '@johmun/vue-tags-input';

  export default {
    name: "DietForm",
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
      [Tag.name]: Tag
    },
    data() {
      return {
        title:'新增',
        form:{},
        //标签功能
        foodsTags:[],
        tagsTags:[],
        shopTags:[],
        fdTag:undefined,
        tgTag:undefined,
        spTag:undefined,
        //历史标签选择
        showHisTag:false,
        hisTags:[],
        hisTag:undefined,
        //针对哪个域
        currentField:'foods',
        hisTagsOptions:[],
        //餐次
        showDietType:false,
        dietTypeOptions:[],
        //来源
        showDietSource:false,
        dietSourceOptions:[],
        //食物类型
        showFoodType:false,
        foodTypeOptions:[],
        //van格式的时间
        vanOccurTime:undefined,
        //时间窗口
        showOccurTime:false
      };
    },
    created() {
      this.initSelectOptions();
      const id = this.$route.params.id;
      const tmpId = this.$route.params.tmpId;
      if(id!=null){
        this.title="修改";
        this.loadDiet(id);
      }else if(tmpId!=null){
        this.title="以模板新增";
        this.reset();
        this.loadFromTmp(tmpId);
      }else{
        this.reset();
        this.loadLastLocation();
      }
    },
    methods: {
      //初始化列表
      initSelectOptions(){
        //餐次
        this.getEnumTree('DietType','FIELD',false).then(response => {
          this.dietTypeOptions = response;
        });
        //来源
        this.getEnumTree('DietSource','FIELD',false).then(response => {
          this.dietSourceOptions = response;
        });
        //食物类型
        this.getEnumTree('FoodType','FIELD',false).then(response => {
          this.foodTypeOptions = response;
        });
      },
      /**评分提示*/
      showScoreHelp(){
        let msg="评分范围0-5，代表食物的质量，方便后期的饮食跟踪分析，比如哪些食物会引起个人的不适<br>";
        msg+="*5为最高等级，说明该食物对自己非常的有用<br>";
        msg+="*4为表示该食物比较不错，有些惊喜<br>";
        msg+="*3为默认值，表示该食物一般般<br>";
        msg+="*2表示该食物稍微引起自己不适<br>";
        msg+="*1表示该食物严重引起个人不适<br>";
        msg+="*0表示该食物不能食用<br>";
        Dialog.alert({
          messageAlign:'left',
          title: '提示',
          message: msg,
        });
      },
      /**发生时间选择确定*/
      onConfirmOccurTime(){
        this.form.occurTime = getFormatDate(this.vanOccurTime,this.dateTimeFormat);
        this.showOccurTime = false;
      },
      /**餐次选择确定*/
      onSelectDietType(item){
        this.form.dietTypeName = item.name;
        this.form.dietType = item.id;
        this.showDietType = false;
      },
      /**来源选择确定*/
      onSelectDietSource(item){
        this.form.dietSourceName = item.name;
        this.form.dietSource = item.id;
        this.showDietSource = false;
      },
      /**食物类型选择确定*/
      onSelectFoodType(item){
        this.form.foodTypeName = item.name;
        this.form.foodType = item.id;
        this.showFoodType = false;
      },
      /**历史标签选择*/
      showHisTagsEdit(name){
        this.currentField = name;
        if(name=='foods'){
          this.hisTags = JSON.parse(JSON.stringify(this.foodsTags));
          //加载历史标签列表选择器
          getFoodsTree(false).then(response => {
            this.hisTagsOptions = response;
          });
        }else if(name=='tags'){
          this.hisTags = JSON.parse(JSON.stringify(this.tagsTags));
          //加载历史标签列表选择器
          getTagsTree(false).then(response => {
            this.hisTagsOptions = response;
          });
        }if(name=='shop'){
          this.hisTags = JSON.parse(JSON.stringify(this.shopTags));
          //加载历史标签列表选择器
          getShopTree(false).then(response => {
            this.hisTagsOptions = response;
          });
        }
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
        let name = this.currentField;
        if(name=='foods'){
          this.foodsTags = this.hisTags;
        }else if(name=='tags'){
          this.tagsTags = this.hisTags;
        }if(name=='shop'){
          this.shopTags = this.hisTags;
        }
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
        this.onConfirmOccurTime();
      },
      /**diet信息转换为表单信息*/
      changeDietToForm(formData){
        this.vanOccurTime = formData.occurTime==null ? new Date():new Date(formData.occurTime);
        this.foodsTags = keywordsToTags(formData.foods);
        this.tagsTags = keywordsToTags(formData.tags);
        this.shopTags = keywordsToTags(formData.shop);
      },
      /**获取最新的位置*/
      loadLastLocation() {
        // 请求接口数据
        getDietLastLocation().then(response => {
          this.form.location=response;
        });
      },
      /**获取表单信息*/
      loadDiet(id) {
        // 请求接口数据
        getDiet(id).then(response => {
          this.form=response;
          this.changeDietToForm(this.form);
        });
      },
      /**以模板获取表单信息*/
      loadFromTmp(id) {
        // 请求接口数据
        getDiet(id).then(response => {
          this.form=response;
          this.form.id=undefined;
          this.form.occurTime=undefined;
          this.changeDietToForm(this.form);
        });
      },
      /**提交表单，这里不能用form的onsubmit功能,页面也不能加form节点，因为和tag编辑有冲突*/
      saveFormData() {
        //转换
        this.form.foods = tagsToKeywords(this.foodsTags);
        this.form.tags = tagsToKeywords(this.tagsTags);
        this.form.shop = tagsToKeywords(this.shopTags);
        Toast.loading({
          forbidClick: true
        })
        if (this.form.id != undefined) {
          updateDiet(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            //通过传递一个r参数，告诉列表页面这是编辑过的需要刷新
            this.$router.push({ name: 'Diet', params: { r: true }})
          });
        } else {
          createDiet(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            this.$router.push({ name: 'Diet', params: { r: true }})
          });
        }
      },
    }
  }
</script>
