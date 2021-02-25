<template>
  <div class="login">
    <top-bar>
        <span slot="topText" class="top-text">{{title}}</span>
    </top-bar>
    <van-form @submit="onSubmit" validate-trigger="onSubmit" :show-error="false" :submit-on-enter="false" label-width="6.4em">
      <van-field
        v-model="form.bookName"
        required
        rows="2"
        autosize
        label="书名"
        type="textarea"
        maxlength="100"
        placeholder="请输入书名"
        show-word-limit
        :rules="[{ required: true, message: '请输入书名' }]" />
      <van-field
        v-model="form.author"
        required
        name="作者"
        label="作者"
        placeholder="请输入作者"
        :rules="[{ required: true, message: '请填写作者' }]"
      />
      <van-field
        v-model="form.press"
        required
        name="出版社"
        label="出版社"
        placeholder="请输入出版社"
        :rules="[{ required: true, message: '请填写出版社' }]"
      />
      <van-field
        v-model="form.isbn"
        required
        name="ISBN"
        label="ISBN"
        placeholder="请输入ISBN"
        :rules="[{ required: true, message: '请填写ISBN' }]"
      />
      <van-field
        v-model="form.nation"
        required
        name="国家"
        label="国家"
        placeholder="请输入国家"
        :rules="[{ required: true, message: '请填写国家' }]"
      />
      <van-field
        v-model="bookCategoryName"
        required
        :readonly="true"
        label="图书分类"
        placeholder="请选择图书分类"
        is-link
        @focus="showBookCategory=true"
        :rules="[{ required: true, message: '请选择图书分类' }]">
      </van-field>
      <van-field
        name="rate"
        required
        label="评分"
        :rules="[{ required: true, message: '请填写评分' }]"
        >
        <template #input>
          <van-rate v-model="form.score" :count="5"/>
        </template>
      </van-field>
      <van-field
        v-model="form.languageName"
        required
        :readonly="true"
        label="语言"
        placeholder="请选择语言"
        is-link
        @focus="showLanguage=true"
        :rules="[{ required: true, message: '请选择语言' }]">
      </van-field>
      <van-field
        v-model="form.publishedYear"
        required
        name="出版年份"
        label="出版年份"
        type="digit"
        placeholder="请输入出版年份">
        <template #button>
          年
        </template>
      </van-field>
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.storeDate"
        label="借入/购买日期"
        placeholder="该书的借入或者购买日期"
        @click="showStoreDate = true"
        :rules="[{ required: true, message: '请填写借入/购买日期' }]"
      />
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.proposedDate"
        label="期望完成日期"
        placeholder="该书希望在哪天读完"
        @click="showProposedDate = true"
        :rules="[{ required: true, message: '请填写期望完成日期' }]"
      />
      <van-field
        readonly
        clickable
        name="calendar"
        :value="form.beginDate"
        label="开始日期"
        placeholder="开始阅读该书的日期"
        @click="showBeginDate = true"
        :rules="[{ required: false, message: '请填写开始日期' }]"
      />
      <van-field
        readonly
        clickable
        name="calendar"
        :value="form.finishedDate"
        label="完成日期"
        placeholder="该书在哪天读完"
        @click="showFinishedDate = true"
        :rules="[{ required: false, message: '请填写完成日期' }]"
      />
      <van-field
        v-model="form.bookTypeName"
        required
        :readonly="true"
        label="书籍类型"
        placeholder="请选择书籍类型"
        is-link
        @focus="showBookType=true"
        :rules="[{ required: true, message: '请选择书籍类型' }]">
      </van-field>
      <van-field
        v-model="form.statusName"
        required
        :readonly="true"
        label="阅读状态"
        placeholder="请选择阅读状态"
        is-link
        @focus="showStatus=true"
        :rules="[{ required: true, message: '请选择阅读状态' }]">
      </van-field>
      <van-field
        v-model="form.remark"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="100"
        placeholder="请输入备注"
        show-word-limit
      />
      <div style="margin: 16px;">
        <van-button round block type="info" class="app-color" native-type="submit">
            保存
        </van-button>
      </div>
    </van-form>
    <van-action-sheet v-model="showBookCategory" :actions="bookCategoryOptions" @select="onSelectBookCategory" />
    <van-action-sheet v-model="showLanguage" :actions="languageOptions" @select="onSelectLanguage" />
    <van-action-sheet v-model="showBookType" :actions="bookTypeOptions" @select="onSelectBookType" />
    <van-action-sheet v-model="showStatus" :actions="statusOptions" @select="onSelectStatus" />

    <!--借入时间选择器-->
    <van-popup v-model="showStoreDate" position="bottom">
      <van-datetime-picker
        v-model="vanStoreDate"
        type="date"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showStoreDate = false"
        @confirm="onConfirmStoreDate"
      />
    </van-popup>
    <!--期望完成时间选择器-->
    <van-popup v-model="showProposedDate" position="bottom">
      <van-datetime-picker
        v-model="vanProposedDate"
        type="date"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showProposedDate = false"
        @confirm="onConfirmProposedDate"
      />
    </van-popup>
    <!--开始时间选择器-->
    <van-popup v-model="showBeginDate" position="bottom">
      <van-datetime-picker
        v-model="vanBeginDate"
        type="date"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showBeginDate = false"
        @confirm="onConfirmBeginDate"
      />
    </van-popup>
    <!--期望完成时间选择器-->
    <van-popup v-model="showFinishedDate" position="bottom">
      <van-datetime-picker
        v-model="vanFinishedDate"
        type="date"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showFinishedDate = false"
        @confirm="onConfirmFinishedDate"
      />
    </van-popup>
  </div>
</template>

<script>
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,ActionSheet,Icon,Rate} from 'vant';
  import { createReadingRecord,updateReadingRecord,getReadingRecord} from '@/api/read/readingRecord';
  import { getBookCategoryTree} from '@/api/read/bookCategory';

  import { getFormatDate,dateDiff } from '@/utils/datetime';
  import {getUserResidentCity } from "@/api/auth/user";

  import TopBar from "components/TopBar";

  export default {
    name: "ReadingRecordForm",
    components: {
      TopBar,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup,
      [Form.name]: Form,
      [Field.name]:Field,
      [Switch.name]: Switch,
      [Notify.Component.name]: Notify.Component,
      [ActionSheet.name]:ActionSheet,
      [Icon.name]: Icon,
      [Rate.name]: Rate,

    },
    data() {
      return {
        title:'新增',
        form:{},
        //van格式的时间
        vanStoreDate:undefined,
        //时间窗口
        showStoreDate:false,
        //van格式的时间
        vanProposedDate:undefined,
        //时间窗口
        showProposedDate:false,
        //van格式的时间
        vanBeginDate:undefined,
        //时间窗口
        showBeginDate:false,
        //van格式的时间
        vanFinishedDate:undefined,
        //时间窗口
        showFinishedDate:false,
        //图书分类
        showBookCategory:false,
        bookCategoryOptions:[],
        bookCategoryName:undefined,
        //语言
        showLanguage:false,
        languageOptions:[],
        //书籍类型
        showBookType:false,
        bookTypeOptions:[],
        //状态
        showStatus:false,
        statusOptions:[]
      };
    },
    created() {
      this.initSelectOptions();
      const id = this.$route.params.id;
      if(id==null){
        this.reset();
      }else{
        this.title="修改";
        this.loadReadingRecord(id);
      }
    },
    methods: {
      //初始化列表
      initSelectOptions(){
        getBookCategoryTree(false).then(response => {
          this.bookCategoryOptions = response;
        });
        this.getEnumTree('BookLanguage','FIELD',false).then(response => {
          this.languageOptions = response;
        });
        this.getEnumTree('BookType','FIELD',false).then(response => {
          this.bookTypeOptions = response;
        });
        this.getEnumTree('ReadingStatus','FIELD',false).then(response => {
          this.statusOptions = response;
        });
      },
      /**图书类型选择确定*/
      onSelectBookCategory(item){
        this.form.bookCategoryId = item.id;
        this.bookCategoryName = item.text;
        this.showBookCategory = false;
      },
      /**语言选择确定*/
      onSelectLanguage(item){
        this.form.language = item.id;
        this.form.languageName = item.text;
        this.showLanguage = false;
      },
      /**书籍类型选择确定*/
      onSelectBookType(item){
        this.form.bookType = item.id;
        this.form.bookTypeName = item.text;
        this.showBookeType = false;
      },
      /**状态选择确定*/
      onSelectStatus(item){
        this.form.status = item.id;
        this.form.statusName = item.text;
        this.showStatus = false;
      },
      /**借入时间选择确定*/
      onConfirmStoreDate(){
        this.form.storeDate = getFormatDate(this.vanStoreDate,this.dateFormat);
        this.showStoreDate = false;
      },
      /**期望完成时间选择确定*/
      onConfirmProposedDate(){
        this.form.proposedDate = getFormatDate(this.vanProposedDate,this.dateFormat);
        this.showProposedDate = false;
      },
      /**开始时间选择确定*/
      onConfirmBeginDate(){
        this.form.beginDate = getFormatDate(this.vanBeginDate,this.dateFormat);
        this.showBeginDate = false;
      },
      /**完成时间选择确定*/
      onConfirmFinishedDate(){
        this.form.finishedDate = getFormatDate(this.vanFinishedDate,this.dateFormat);
        this.showFinishedDate = false;
      },
      /** 重置 */
      reset(){
        this.vanStoreDate = new Date();
        this.vanProposedDate = new Date();
        this.vanBeginDate = new Date();
        this.vanFinishedDate = new Date();
        this.form={
          nation:'中国',
          language:'CHINESE',
          languageName:'中文',
          score:3,
          status:'UNREAD',
          statusName:'未读',
          bookType:'PAPER',
          bookTypeName:'纸质书',
          storeDate:undefined,
          proposedDate:undefined,
          beginDate:undefined,
          finishedDate:undefined
        };
      },
      /**获取表单信息*/
      loadReadingRecord(id) {
        // 请求接口数据
        getReadingRecord(id).then(response => {
          this.form=response;
          this.form.bookCategoryId = response.bookCategory.id;
          this.bookCategoryName = response.bookCategory.name;
          this.vanStoreDate = new Date(this.form.storeDate);
          this.vanProposedDate = new Date(this.form.proposedDate);
          this.vanBeginDate = this.form.beginDate==null ? new Date() : new Date(this.form.beginDate);
          this.vanFinishedDate = this.form.beginDate==null ? new Date() : new Date(this.form.finishedDate);
        });
      },
      onSubmit() {
        this.form.bookCategory=null;
        Toast.loading({
          forbidClick: true
        })
        if (this.form.id != undefined) {
          updateReadingRecord(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            //通过传递一个r参数，告诉列表页面这是编辑过的需要刷新
            this.$router.push({ name: 'ReadingRecord', params: { r: true }})
          });
        } else {
          createReadingRecord(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            this.$router.push({ name: 'ReadingRecord', params: { r: true }})
          });
        }
      },
    }
  }
</script>
