<template>
  <default-layout>
    <view class="registration-body ad">
      <view class="steps">
        <view class="step" :class="index < currentStep ? 'green-step' : ''" v-for="(item, index) in 3" :key="index">
        </view>
      </view>

      <view v-if="currentStep === 1">
        <view class="basic-info">
          <view class="welcome-box">
            <image src="https://static.hamu.site/mini/match_welcome_1.png?imageView2/1/w/546/h/142/q/100" />
          </view>

          <view class="block-title">
            <nut-animate type="shake" :show="isShake">
              <view class="block-title-item shaking-border_transparent" style="margin-top: 20rpx">
                <view class="block-title-text ml-34">
                  <text :class="!gender ? 'primary-color' : ''">选择你的性别</text>
                </view>
                <view class="block-title-content">
                  <view class="gender-box" @tap="onGenderChange('male')">
                    <view v-if="gender === 'male'" class="block-title-content-pin">
                      <image src="https://static.hamu.site/mini/perfect/pin.png?imageView2/1/w/36/h/36/q/100" />
                    </view>
                    <image src="https://static.hamu.site/mini/avatar-male.png?imageView2/1/w/176/h/176/q/100" />
                    <text class="gender-text" :class="gender === 'male' ? 'gender-text_selected' : ''">男生</text>
                  </view>
                  <view class="gender-box" @tap="onGenderChange('female')">
                    <view v-if="gender === 'female'" class="block-title-content-pin">
                      <image src="https://static.hamu.site/mini/perfect/pin.png?imageView2/1/w/36/h/36/q/100" />
                    </view>
                    <image src="https://static.hamu.site/mini/avatar-female.png?imageView2/1/w/176/h/176/q/100" />
                    <text class="gender-text" :class="gender === 'female' ? 'gender-text_selected' : ''">女生</text>
                  </view>
                </view>
              </view>
            </nut-animate>
            <view class="block-title-item">
              <view class="block-title-text">
                <text>出生年份</text>
                <text class="text-custom">{{ birthday }}年</text>
              </view>
              <view class="block-title-content">
                <view class="range-box">
                  <nut-range
                    v-model="birthday"
                    hidden-range
                    hidden-tag
                    :max="2001"
                    :min="1970"
                    inactive-color="#ebedf0"
                    active-color="var(--primary-color)"
                    @change="onBirthChange"
                  >
                    <template #button>
                      <view class="range-custom-button"></view>
                    </template>
                  </nut-range>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="currentStep === 2">
        <view class="basic-info">
          <view class="welcome-box">
            <image
              style="width: 378rpx; height: 146rpx"
              src="https://static.hamu.site/mini/match_welcome_2.png?imageView2/1/w/378/h/146/q/100"
            />
          </view>

          <view class="block-title">
            <nut-animate type="shake" :show="isShake">
              <view class="block-title-item shaking-border_transparent" style="margin-top: 20rpx">
                <view class="block-title-text ml-34">
                  <text :class="!edu ? 'primary-color' : ''">选择你的学历</text>
                </view>
                <view class="block-title-content" style="margin-top: 48rpx; margin-left: 0rpx; margin-right: 0rpx">
                  <view v-for="(item, index) in educationList" :key="item.eduName" @tap="onEduChange(item.eduName)">
                    <view class="" :class="item.selected ? 'edu-box_selected' : 'edu-box'">
                      {{ item.eduName }}
                    </view>
                  </view>
                </view>
              </view>
            </nut-animate>

            <view class="block-title-item">
              <view class="block-title-text">
                <text>我的职业</text>
              </view>
              <view class="block-title-content">
                <view class="input-custom">
                  <nut-input
                    v-model="position"
                    placeholder="输入你的职业..."
                    :border="false"
                    @input="onPositionChange"
                  />
                </view>
              </view>
            </view>

            <view class="block-title-item">
              <view class="block-title-text">
                <text>我的年收入</text>
                <text class="text-custom">{{ salaryList[salaryIndex] }}</text>
              </view>
              <view class="block-title-content">
                <view class="range-box">
                  <nut-range
                    v-model="salaryIndex"
                    hidden-range
                    hidden-tag
                    :max="14"
                    inactive-color="#ebedf0"
                    active-color="var(--primary-color)"
                    @change="onSalaryChange"
                  >
                    <template #button>
                      <view class="range-custom-button"></view>
                    </template>
                  </nut-range>
                </view>
              </view>
            </view>

            <view class="block-title-item" style="margin-bottom: 132rpx">
              <view class="block-title-text">
                <text>身高</text>
                <text class="text-custom">{{ userHeight }}CM</text>
              </view>
              <view class="block-title-content">
                <view class="range-box">
                  <nut-range
                    v-model="userHeight"
                    hidden-range
                    hidden-tag
                    :max="210"
                    :min="150"
                    inactive-color="#ebedf0"
                    active-color="var(--primary-color)"
                    @change="onHeightChange"
                  >
                    <template #button>
                      <view class="range-custom-button"></view>
                    </template>
                  </nut-range>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="currentStep === 3">
        <view class="basic-info">
          <view class="welcome-box">
            <image
              style="width: 500rpx; height: 144rpx"
              src="https://static.hamu.site/mini/match_welcome_3.png?imageView2/1/w/500/h/144/q/100"
            />
          </view>
          <view class="block-content">
            <view class="block-item-wrapper">
              <view
                class="block-item"
                v-for="(item, index) in photoList"
                :key="index"
                :style="{
                  background: `url(${item.imageUrl}?imageView2/1/w/206/h/206/q/100)`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }"
                @tap="setLocation(item)"
              >
                <view class="block-icon">
                  <image
                    class="icon-image"
                    style="width: 18rpx; height: 20rpx"
                    src="https://static.hamu.site/mini/perfect/location_white.png"
                  />
                  <text class="location-text">{{ item.location[1].name }}</text>
                </view>
              </view>
            </view>
            <text class="area-title">选择你的居住地</text>
            <view class="address-box-wrapper">
              <nut-picker
                v-model="livingPlaceCodes"
                class="area-custom"
                option-height="40"
                visible-option-num="3"
                :showToolbar="false"
                :columns="columns"
                @change="onLivingPlaceChange"
              />
            </view>
          </view>
        </view>
      </view>

      <view class="registration-bottom">
        <view class="registration-bottom-text" v-if="currentStep === 2">让对方遇见更真实的你</view>
        <view class="registration-bottom-text" v-if="currentStep === 3">为你匹配同城最合适的异性</view>
        <view class="registration-bottom-btn" @tap="next"> {{ buttonText }}（{{ currentStep }}/{{ maxStep }}） </view>
      </view>
    </view>
  </default-layout>
</template>

<script setup>
import Taro, { nextTick } from '@tarojs/taro';
import { computed, onUnmounted, ref, reactive, onMounted } from 'vue';
import { useRegFormStore } from 'src/stores/form';
import { usePermissionStore } from 'src/stores/common';
import { debounce } from '@tarojs/runtime';

const currentStep = ref(1);
const maxStep = ref(3);
const isShake = ref(false);
const formStore = useRegFormStore();
const educationList = ref([
  { eduName: '博士', selected: false },
  { eduName: '硕士', selected: false },
  { eduName: '本科', selected: false },
  { eduName: '专科', selected: false },
]);
const salaryList = reactive([
  '0万',
  '5万',
  '10万',
  '15万',
  '20万',
  '25万',
  '30万',
  '40万',
  '50万',
  '60万',
  '70万',
  '80万',
  '90万',
  '100万',
  '200万',
]);
const photoList = ref([]);
const areaList = ref({
  province_list: {
    110000: '北京市',
    120000: '天津市',
    130000: '河北省',
    140000: '山西省',
    150000: '内蒙古自治区',
    210000: '辽宁省',
    220000: '吉林省',
    230000: '黑龙江省',
    310000: '上海市',
    320000: '江苏省',
    330000: '浙江省',
    340000: '安徽省',
    350000: '福建省',
    360000: '江西省',
    370000: '山东省',
    410000: '河南省',
    420000: '湖北省',
    430000: '湖南省',
    440000: '广东省',
    450000: '广西壮族自治区',
    460000: '海南省',
    500000: '重庆市',
    510000: '四川省',
    520000: '贵州省',
    530000: '云南省',
    540000: '西藏自治区',
    610000: '陕西省',
    620000: '甘肃省',
    630000: '青海省',
    640000: '宁夏回族自治区',
    650000: '新疆维吾尔自治区',
    710000: '台湾省',
    810000: '香港特别行政区',
    820000: '澳门特别行政区',
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
    130100: '石家庄市',
    130200: '唐山市',
    130300: '秦皇岛市',
    130400: '邯郸市',
    130500: '邢台市',
    130600: '保定市',
    130700: '张家口市',
    130800: '承德市',
    130900: '沧州市',
    131000: '廊坊市',
    131100: '衡水市',
    140100: '太原市',
    140200: '大同市',
    140300: '阳泉市',
    140400: '长治市',
    140500: '晋城市',
    140600: '朔州市',
    140700: '晋中市',
    140800: '运城市',
    140900: '忻州市',
    141000: '临汾市',
    141100: '吕梁市',
    150100: '呼和浩特市',
    150200: '包头市',
    150300: '乌海市',
    150400: '赤峰市',
    150500: '通辽市',
    150600: '鄂尔多斯市',
    150700: '呼伦贝尔市',
    150800: '巴彦淖尔市',
    150900: '乌兰察布市',
    152200: '兴安盟',
    152500: '锡林郭勒盟',
    152900: '阿拉善盟',
    210100: '沈阳市',
    210200: '大连市',
    210300: '鞍山市',
    210400: '抚顺市',
    210500: '本溪市',
    210600: '丹东市',
    210700: '锦州市',
    210800: '营口市',
    210900: '阜新市',
    211000: '辽阳市',
    211100: '盘锦市',
    211200: '铁岭市',
    211300: '朝阳市',
    211400: '葫芦岛市',
    220100: '长春市',
    220200: '吉林市',
    220300: '四平市',
    220400: '辽源市',
    220500: '通化市',
    220600: '白山市',
    220700: '松原市',
    220800: '白城市',
    222400: '延边朝鲜族自治州',
    230100: '哈尔滨市',
    230200: '齐齐哈尔市',
    230300: '鸡西市',
    230400: '鹤岗市',
    230500: '双鸭山市',
    230600: '大庆市',
    230700: '伊春市',
    230800: '佳木斯市',
    230900: '七台河市',
    231000: '牡丹江市',
    231100: '黑河市',
    231200: '绥化市',
    232700: '大兴安岭地区',
    310100: '上海市',
    320100: '南京市',
    320200: '无锡市',
    320300: '徐州市',
    320400: '常州市',
    320500: '苏州市',
    320600: '南通市',
    320700: '连云港市',
    320800: '淮安市',
    320900: '盐城市',
    321000: '扬州市',
    321100: '镇江市',
    321200: '泰州市',
    321300: '宿迁市',
    330100: '杭州市',
    330200: '宁波市',
    330300: '温州市',
    330400: '嘉兴市',
    330500: '湖州市',
    330600: '绍兴市',
    330700: '金华市',
    330800: '衢州市',
    330900: '舟山市',
    331000: '台州市',
    331100: '丽水市',
    340100: '合肥市',
    340200: '芜湖市',
    340300: '蚌埠市',
    340400: '淮南市',
    340500: '马鞍山市',
    340600: '淮北市',
    340700: '铜陵市',
    340800: '安庆市',
    341000: '黄山市',
    341100: '滁州市',
    341200: '阜阳市',
    341300: '宿州市',
    341500: '六安市',
    341600: '亳州市',
    341700: '池州市',
    341800: '宣城市',
    350100: '福州市',
    350200: '厦门市',
    350300: '莆田市',
    350400: '三明市',
    350500: '泉州市',
    350600: '漳州市',
    350700: '南平市',
    350800: '龙岩市',
    350900: '宁德市',
    360100: '南昌市',
    360200: '景德镇市',
    360300: '萍乡市',
    360400: '九江市',
    360500: '新余市',
    360600: '鹰潭市',
    360700: '赣州市',
    360800: '吉安市',
    360900: '宜春市',
    361000: '抚州市',
    361100: '上饶市',
    370100: '济南市',
    370200: '青岛市',
    370300: '淄博市',
    370400: '枣庄市',
    370500: '东营市',
    370600: '烟台市',
    370700: '潍坊市',
    370800: '济宁市',
    370900: '泰安市',
    371000: '威海市',
    371100: '日照市',
    371300: '临沂市',
    371400: '德州市',
    371500: '聊城市',
    371600: '滨州市',
    371700: '菏泽市',
    410100: '郑州市',
    410200: '开封市',
    410300: '洛阳市',
    410400: '平顶山市',
    410500: '安阳市',
    410600: '鹤壁市',
    410700: '新乡市',
    410800: '焦作市',
    410900: '濮阳市',
    411000: '许昌市',
    411100: '漯河市',
    411200: '三门峡市',
    411300: '南阳市',
    411400: '商丘市',
    411500: '信阳市',
    411600: '周口市',
    411700: '驻马店市',
    419000: '省直辖县',
    420100: '武汉市',
    420200: '黄石市',
    420300: '十堰市',
    420500: '宜昌市',
    420600: '襄阳市',
    420700: '鄂州市',
    420800: '荆门市',
    420900: '孝感市',
    421000: '荆州市',
    421100: '黄冈市',
    421200: '咸宁市',
    421300: '随州市',
    422800: '恩施土家族苗族自治州',
    429000: '省直辖县',
    430100: '长沙市',
    430200: '株洲市',
    430300: '湘潭市',
    430400: '衡阳市',
    430500: '邵阳市',
    430600: '岳阳市',
    430700: '常德市',
    430800: '张家界市',
    430900: '益阳市',
    431000: '郴州市',
    431100: '永州市',
    431200: '怀化市',
    431300: '娄底市',
    433100: '湘西土家族苗族自治州',
    440100: '广州市',
    440200: '韶关市',
    440300: '深圳市',
    440400: '珠海市',
    440500: '汕头市',
    440600: '佛山市',
    440700: '江门市',
    440800: '湛江市',
    440900: '茂名市',
    441200: '肇庆市',
    441300: '惠州市',
    441400: '梅州市',
    441500: '汕尾市',
    441600: '河源市',
    441700: '阳江市',
    441800: '清远市',
    441900: '东莞市',
    442000: '中山市',
    445100: '潮州市',
    445200: '揭阳市',
    445300: '云浮市',
    450100: '南宁市',
    450200: '柳州市',
    450300: '桂林市',
    450400: '梧州市',
    450500: '北海市',
    450600: '防城港市',
    450700: '钦州市',
    450800: '贵港市',
    450900: '玉林市',
    451000: '百色市',
    451100: '贺州市',
    451200: '河池市',
    451300: '来宾市',
    451400: '崇左市',
    460100: '海口市',
    460200: '三亚市',
    460300: '三沙市',
    460400: '儋州市',
    469000: '省直辖县',
    500100: '重庆市',
    510100: '成都市',
    510300: '自贡市',
    510400: '攀枝花市',
    510500: '泸州市',
    510600: '德阳市',
    510700: '绵阳市',
    510800: '广元市',
    510900: '遂宁市',
    511000: '内江市',
    511100: '乐山市',
    511300: '南充市',
    511400: '眉山市',
    511500: '宜宾市',
    511600: '广安市',
    511700: '达州市',
    511800: '雅安市',
    511900: '巴中市',
    512000: '资阳市',
    513200: '阿坝藏族羌族自治州',
    513300: '甘孜藏族自治州',
    513400: '凉山彝族自治州',
    520100: '贵阳市',
    520200: '六盘水市',
    520300: '遵义市',
    520400: '安顺市',
    520500: '毕节市',
    520600: '铜仁市',
    522300: '黔西南布依族苗族自治州',
    522600: '黔东南苗族侗族自治州',
    522700: '黔南布依族苗族自治州',
    530100: '昆明市',
    530300: '曲靖市',
    530400: '玉溪市',
    530500: '保山市',
    530600: '昭通市',
    530700: '丽江市',
    530800: '普洱市',
    530900: '临沧市',
    532300: '楚雄彝族自治州',
    532500: '红河哈尼族彝族自治州',
    532600: '文山壮族苗族自治州',
    532800: '西双版纳傣族自治州',
    532900: '大理白族自治州',
    533100: '德宏傣族景颇族自治州',
    533300: '怒江傈僳族自治州',
    533400: '迪庆藏族自治州',
    540100: '拉萨市',
    540200: '日喀则市',
    540300: '昌都市',
    540400: '林芝市',
    540500: '山南市',
    540600: '那曲市',
    542500: '阿里地区',
    610100: '西安市',
    610200: '铜川市',
    610300: '宝鸡市',
    610400: '咸阳市',
    610500: '渭南市',
    610600: '延安市',
    610700: '汉中市',
    610800: '榆林市',
    610900: '安康市',
    611000: '商洛市',
    620100: '兰州市',
    620200: '嘉峪关市',
    620300: '金昌市',
    620400: '白银市',
    620500: '天水市',
    620600: '武威市',
    620700: '张掖市',
    620800: '平凉市',
    620900: '酒泉市',
    621000: '庆阳市',
    621100: '定西市',
    621200: '陇南市',
    622900: '临夏回族自治州',
    623000: '甘南藏族自治州',
    630100: '西宁市',
    630200: '海东市',
    632200: '海北藏族自治州',
    632300: '黄南藏族自治州',
    632500: '海南藏族自治州',
    632600: '果洛藏族自治州',
    632700: '玉树藏族自治州',
    632800: '海西蒙古族藏族自治州',
    640100: '银川市',
    640200: '石嘴山市',
    640300: '吴忠市',
    640400: '固原市',
    640500: '中卫市',
    650100: '乌鲁木齐市',
    650200: '克拉玛依市',
    650400: '吐鲁番市',
    650500: '哈密市',
    652300: '昌吉回族自治州',
    652700: '博尔塔拉蒙古自治州',
    652800: '巴音郭楞蒙古自治州',
    652900: '阿克苏地区',
    653000: '克孜勒苏柯尔克孜自治州',
    653100: '喀什地区',
    653200: '和田地区',
    654000: '伊犁哈萨克自治州',
    654200: '塔城地区',
    654300: '阿勒泰地区',
    659000: '自治区直辖县级行政区划',
    710100: '台北市',
    710200: '高雄市',
    710300: '台南市',
    710400: '台中市',
    710500: '金门县',
    710600: '南投县',
    710700: '基隆市',
    710800: '新竹市',
    710900: '嘉义市',
    711100: '新北市',
    711200: '宜兰县',
    711300: '新竹县',
    711400: '桃园县',
    711500: '苗栗县',
    711700: '彰化县',
    711900: '嘉义县',
    712100: '云林县',
    712400: '屏东县',
    712500: '台东县',
    712600: '花莲县',
    712700: '澎湖县',
    712800: '连江县',
    810100: '香港岛',
    810200: '九龙',
    810300: '新界',
    820100: '澳门半岛',
    820200: '离岛',
  },
});
const customIndicatorStyle = ref('background: transparent;border-radius: 50rpx;width:30rpx;');
const permissionStore = usePermissionStore();

const gender = ref('');
const birthday = ref(1995);
const education = ref('');
const position = ref('');
const salaryIndex = ref(0);
const userHeight = ref(175);
const livingPlace = ref('');
const livingPlaceCodes = ref('');

const imgUrl = ref('https://static.hamu.site/mini/match_welcome_3.png');

const buttonText = computed(() => {
  return currentStep.value < maxStep.value ? '下一步' : '完成';
});

const convertAreaListToColumns = (areaList) => {
  const columns = [
    {
      text: '请选择',
      value: '00000',
      children: [],
    },
  ];

  const provinceList = areaList.province_list;
  const cityList = areaList.city_list;

  for (const [provinceCode, provinceName] of Object.entries(provinceList)) {
    const province = {
      text: provinceName,
      value: provinceCode,
      children: [],
    };

    // 查找属于该省的城市
    for (const [cityCode, cityName] of Object.entries(cityList)) {
      if (cityCode.startsWith(provinceCode.slice(0, 2))) {
        province.children.push({
          text: cityName,
          value: cityCode,
        });
      }
    }

    columns.push(province);
  }

  return columns;
};

const columns = convertAreaListToColumns(areaList.value);

const onGenderChange = (selection) => {
  gender.value = selection;
  // formStore.updateFormData({ gender: gender.value });
};

const onBirthChange = (e) => {
  // formStore.updateFormData({ birthday: e });
};

const onEduChange = (e) => {
  educationList.value.forEach((item) => {
    if (item.eduName === e) {
      item.selected = true;
    } else {
      item.selected = false;
    }
  });
  education.value = e;
  formStore.updateFormData({ education });
};

const onPositionChange = (e) => {
  position.value = e.detail.value;
  formStore.updateFormData({ position });
};

const onSalaryChange = (e) => {
  salaryIndex.value = e;
};

const onHeightChange = (e) => {};

const onLivingPlaceChange = (e) => {
  const [province, city] = e.selectedOptions;
  if (province.text === '请选择') {
    formStore.updateFormData({ livingPlace: [] });
    return;
  }
  updateLocation([province.value, city.value], [province.text, city.text]);
};

const setLocation = (e) => {
  const [province, city] = e.location;
  updateLocation([province.code, city.code], [province.name, city.name]);
};

const updateLocation = (codes, names) => {
  livingPlaceCodes.value = codes;
  handleLocation(names);
};

const handleLocation = (locationArr) => {
  const directControlledMunicipalities = new Set(['北京市', '天津市', '上海市', '重庆市']);
  const name = directControlledMunicipalities.has(locationArr[0]) ? [locationArr[0]] : locationArr;

  formStore.updateFormData({ livingPlace: name });
  console.log('formData:', formStore.form);
};

const next = debounce(async () => {
  if (currentStep.value < maxStep.value) {
    handleIntermediateStep();
    return;
  }
  if (currentStep.value === maxStep.value) {
    handleFinalStep();
  }
}, 300);

const handleIntermediateStep = () => {
  console.log('formData:', formStore.form);
  if (currentStep.value === 1 && !gender.value) {
    handleShake();
    return;
  }
  if (currentStep.value === 2 && !education.value) {
    handleShake();
    return;
  }
  if (currentStep.value === 1) {
    formStore.updateFormData({ gender, birthday });
  }
  if (currentStep.value === 2) {
    formStore.updateFormData({ education, position, salary: salaryList[salaryIndex.value], height: userHeight.value });
    handleLocationStep();
  }

  currentStep.value++;
};
const handleFinalStep = () => {
  if (formStore.form.livingPlace.length === 0) {
    Taro.showToast({
      title: '请选择地址',
      icon: 'none',
      duration: 2000,
    });
    return;
  }
  const detail = handleDetail();
  console.log('the detail: ', detail);

  // 将detail的值给接口
  let isDone = true;
  if (isDone) {
    permissionStore.updateRegister(true);
    Taro.reLaunch({
      url: '/pages/recommend/index',
      fail: (err) => {
        console.log(err);
      },
    });
  }
};
const handleDetail = () => {
  const { gender, birthday, education, position, salary, height, livingPlace } = formStore.form;
  const detail = {
    gender,
    birthday,
    education,
    position,
    income: salary.split('万')[0],
    height,
    livingPlace,
  };
  return detail;
};

let timer = ref(null);
const handleShake = () => {
  isShake.value = true;
  timer = setTimeout(() => {
    isShake.value = false;
  }, 2000);
};

const handleLocationStep = () => {
  // 接口获取地址 livingPlace
  // 模拟数据
  generateLocationList();
};

const generateCodes = (livingPlace) => {
  const { city_list } = areaList.value;
  let provinceCode;
  for (const [key, value] of Object.entries(areaList.value.province_list)) {
    if (value === livingPlace[0]) {
      provinceCode = key;
    }
  }
  for (const [key, value] of Object.entries(city_list)) {
    if (value === livingPlace[livingPlace.length - 1]) {
      return [provinceCode, key];
    }
  }
};

const generateLocationList = () => {
  const maleImageList = [
    'https://static.hamu.site/mini/perfect/people/male/5CFE6839-BB19-4909-AF52-BCAAD6C87180.png',
    'https://static.hamu.site/mini/perfect/people/male/3EF7DB78-E832-4553-9D71-3B09FCFDB37C.png',
    'https://static.hamu.site/mini/perfect/people/male/1F55D2D4-EAAF-4c63-8E98-112601B455E6.png',
    'https://static.hamu.site/mini/perfect/people/male/1DDAA339-4C51-43d9-9F7C-27302398C3A5.png',
    'https://static.hamu.site/mini/perfect/people/male/BF1D3B57-9BC8-49c3-B0EC-0A58C471505B.png',
    'https://static.hamu.site/mini/perfect/people/male/CDEE23A4-231C-46e4-AD1F-30A91F639B1E.png',
  ];
  const femaleImageList = [
    'https://static.hamu.site/mini/perfect/people/female/6BA9CC73-D9EE-4544-8F3D-B6463B7E6A52.png',
    'https://static.hamu.site/mini/perfect/people/female/67F79BB5-946A-4afd-8407-7FBAFF602B21.png',
    'https://static.hamu.site/mini/perfect/people/female/485FA5B2-DD20-4835-82EF-EE68D4AE59B2.png',
    'https://static.hamu.site/mini/perfect/people/female/576E7B8B-B694-4353-B867-FE23C32D5D5D.png',
    'https://static.hamu.site/mini/perfect/people/female/738E1CB8-2216-4a2e-9E12-A09A6A4D3712.png',
    'https://static.hamu.site/mini/perfect/people/female/967D8FA0-EB2B-46d6-91DA-CBC392A6E15B.png',
  ];
  const locationList = [
    [
      { code: '320000', name: '江苏省' },
      { code: '320100', name: '南京市' },
    ],
    [
      { code: '340000', name: '安徽省' },
      { code: '340100', name: '合肥市' },
    ],
    [
      { code: '410000', name: '河南省' },
      { code: '410100', name: '郑州市' },
    ],
    [
      { code: '430000', name: '湖南省' },
      { code: '430100', name: '长沙市' },
    ],
    [
      { code: '420000', name: '湖北省' },
      { code: '420100', name: '武汉市' },
    ],
    [
      { code: '310000', name: '上海市' },
      { code: '310100', name: '上海市' },
    ],
  ];
  photoList.value = locationList.map((location, index) => ({
    location,
    imageUrl: gender.value === 'female' ? maleImageList[index] : femaleImageList[index],
  }));
};

const generateIncome = (income) => {
  const formattedIncome = income + '万';
  return salaryList.findIndex((salary) => salary === formattedIncome);
};

const initData = () => {
  console.log('initData form', formStore.form);
  const { form } = formStore;
  const fieldsToUpdate = [
    { key: 'gender', ref: gender },
    { key: 'birthday', ref: birthday },
    { key: 'education', ref: education },
    { key: 'position', ref: position },
    { key: 'income', ref: salaryIndex },
    { key: 'height', ref: userHeight },
    { key: 'livingPlace', ref: livingPlace },
  ];

  fieldsToUpdate.forEach(({ key, ref }) => {
    if (form[key]) {
      ref.value = form[key];
    }
  });
  if (form.income) {
    salaryIndex.value = generateIncome(form.income);
  }
  if (form.livingPlace) {
    livingPlaceCodes.value = generateCodes(form.livingPlace);
  }
};

onMounted(() => {
  initData();
});
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<style lang="scss">
.registration-body {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;

  .steps {
    width: 100%;
    height: 12rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-evenly;
    .step,
    .green-step {
      width: 160rpx;
      height: 12rpx;
      border-radius: 6rpx;
    }

    .step {
      background: #dadada;
    }

    .green-step {
      background: #57b976;
    }
  }

  .basic-info {
    height: calc(100vh - 400rpx - 12rpx);
    overflow: scroll;
  }

  .welcome-box {
    width: 100%;
    margin-top: 10rpx;
    text-align: center;

    .welcome-title {
      font-size: 48rpx;
      font-weight: 600;
      color: var(--primary-color);
      width: 100%;
      // margin-top: 70rpx;
      text-align: center;
    }
    image {
      width: 546rpx;
      height: 142rpx;
    }
  }

  .block-title {
    .nut-animate {
      .nut-animate__container {
        width: 100%;
      }
    }
    .block-title-item {
      margin-top: 94rpx;
    }

    .block-title-text {
      margin-left: 64rpx;
      margin-bottom: 42rpx;
      font-size: 28rpx;
      color: #000;
      font-weight: 600;

      .text-custom {
        margin-left: 16rpx;
        color: var(--primary-color);
      }
    }

    .ml-34 {
      margin-left: 34rpx;
    }

    .block-title-content {
      display: flex;
      justify-content: space-evenly;

      .gender-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .block-title-content-pin {
          position: absolute;
          top: -20rpx;
          right: -4rpx;

          image {
            width: 36rpx;
            height: 36rpx;
          }
        }

        image {
          width: 176rpx;
          height: 176rpx;
          margin-bottom: 60rpx;
        }

        .gender-text,
        .gender-text_selected {
          font-size: 28rpx;
          font-weight: 400;
        }

        .gender-text {
          color: rgba(0, 0, 0, 0.4);
        }

        .gender-text_selected {
          color: #000;
        }
      }

      .edu-box {
        background: #f4f4f4;
        color: #000;
      }

      .edu-box_selected {
        background: var(--primary-color);
        color: #fff;
      }

      .edu-box,
      .edu-box_selected {
        width: 148rpx;
        height: 108rpx;
        border-radius: 22rpx;
        font-size: 32rpx;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      image {
        width: 176rpx;
        height: 176rpx;
        margin-bottom: 60rpx;
      }

      .range-box {
        width: 622rpx;
        padding: 0;
        .range-custom-button {
          background-color: #fff;
          width: 64rpx;
          height: 64rpx;
          border-radius: 16rpx;
          box-shadow: 0rpx 8rpx 14rpx 0rpx rgba(0, 0, 0, 0.08);
          &::before {
            content: ' ';
            width: 12rpx;
            height: 4rpx;
            background: var(--primary-color);
            border-radius: 2rpx;
            position: absolute;
            top: 26rpx;
            left: 50%;
            margin-left: -6rpx;
          }
          &::after {
            content: ' ';
            position: absolute;
            width: 12rpx;
            height: 4rpx;
            background: var(--primary-color);
            border-radius: 2rpx;
            top: 34rpx;
            left: 50%;
            margin-left: -6rpx;
          }
        }
      }

      .input-custom {
        width: 622rpx;
        .nut-input {
          background: transparent;
          padding: 0;
        }
      }
    }
  }

  .block-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .block-item-wrapper {
      margin-top: 0rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .block-item {
        width: 206rpx;
        height: 206rpx;
        border-radius: 28rpx;
        margin: 16rpx 0 0 16rpx;
        position: relative;

        .block-icon {
          position: absolute;
          left: 10rpx;
          bottom: 10rpx;
        }

        .location-text {
          color: #fff;
          font-size: 22rpx;
          font-weight: 400;
          margin-left: 6rpx;
        }
      }
    }

    .area-title {
      font-weight: 600;
      font-size: 28rpx;
      color: #000000;
      margin-top: 78rpx;
    }
    .address-box-wrapper {
      margin: 32rpx auto;
      width: 686rpx;
      background: transparent;
      border-radius: 50rpx;
      display: flex;
      flex-direction: column;

      .area-custom {
      }
    }
  }

  .shaking-border {
    border: 2rpx dashed var(--primary-color);
    border-radius: 28rpx;
    padding: 40rpx 10rpx;
    margin: 20rpx;
    color: var(--primary-color);
  }

  .shaking-border_transparent {
    border: 2rpx dashed var(--primary-color);
    border-radius: 28rpx;
    padding: 40rpx 10rpx;
    margin: 20rpx;
    color: var(--primary-color);
  }

  .registration-bottom {
    width: 100%;
    height: 90rpx;
    position: fixed;
    bottom: 100rpx;
    &-text {
      width: 100%;
      text-align: center;
      color: #999;
      font-size: 28rpx;
      line-height: 40rpx;
      position: fixed;
      bottom: 220rpx;
    }
    &-btn {
      width: 686rpx;
      height: 100%;
      background: var(--primary-btn-bg);
      box-shadow: 0px 10rpx 10rpx 0rpx rgba(227, 84, 80, 0.2);
      border-radius: 45rpx;
      text-align: center;
      line-height: 90rpx;
      color: #fff;
      font-size: 30rpx;
      font-weight: 500;
      margin: 0 auto;
    }
  }
}

.primary-color {
  color: var(--primary-color);
}
</style>
