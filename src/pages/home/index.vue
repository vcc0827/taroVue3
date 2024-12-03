<template>
  <default-layout background="#fff">
    <view class="home-container">
      <swiper class="home-swiper" :autoplay="true" :interval="3000" :indicator-dots="true" @change="onSwiperChange">
        <block v-for="(item, index) in images" :key="item">
          <swiper-item>
            <image
              class="top__image"
              :show-menu-by-longpress="true"
              data-index="{{index}}"
              :src="`${item}?imageView2/1/w/650/h/230/q/100`"
              lazy-load
            ></image>
          </swiper-item>
        </block>
      </swiper>
      <view class="navbar" :style="{ top: navbarStore.navBarHeight + navbarStore.statusBarHeight + 'px' }">
        <view class="gender__tab">
          <view
            v-for="(item, index) in navbar"
            :key="index"
            @tap="navbarTap(index)"
            class="gender__filter"
            :class="currentTab === index ? 'active' : ''"
            >{{ item }}</view
          >
        </view>
        <view class="filter__btn" @tap="openFilter">
          <image src="https://static.hamu.site/mini/home/filter.png" />筛选
        </view>
      </view>
      <view class="empty_box" v-if="listData && listData.length === 0">
        <image class="empty" src="https://static.hamu.site/mini/empty.png?imageView2/1/w/119/h/119/q/100" lazy-load />
        <view class="">暂无相关嘉宾信息</view>
      </view>
      <view class="list__box" v-if="listData && listData.length > 0">
        <block v-if="gender !== 2">
          <view class="li__item" v-for="(user, index) in listData" :key="index" @tap="toDetail(user.id)">
            <image
              class="header__img"
              lazy-load
              mode="aspectFill"
              :src="user.avatar + '?imageView2/1/w/180/h/180/roundPic/radius/!50p'"
            />
            <view class="age_city">
              <view class="age">{{ user.age }}岁</view>
              <view class="city-list ellipsis-line">{{ user.city }}</view>
            </view>
            <view v-if="!user.common_tags.length" class="school ellipsis-line">{{ user.university }}</view>
            <view class="second__tag" v-else>
              <text
                :style="{
                  background: 'linear-gradient(158deg, #FF89F0 0%, #FB7798 100%)',
                  marginRight: `${user.common_tags.length >= 2 ? '10rpx' : '0'}`,
                }"
                >{{ user.common_tags[0] }}</text
              >
              <text
                v-if="user.common_tags.length >= 2"
                :style="{ background: 'linear-gradient(164deg, #ff9293 0%, #fc736f 100%)' }"
                >{{ user.common_tags[1] }}</text
              >
            </view>
            <view v-if="!(user.common_tags.length > 2)" class="education ellipsis-line">{{ user.education }}</view>
            <view class="third__tag" v-else>
              <text :style="{ background: 'linear-gradient(143deg, #8d92f8 0%, #8b8bfb 100%)' }">{{
                user.common_tags[2]
              }}</text>
            </view>
          </view>
        </block>
        <block v-if="gender === 2">
          <view class="unavailable" v-for="(user, index) in listData" :key="index">
            <view class="header__img--parent">
              <view
                class="header__img"
                mode="aspectFill"
                :style="{
                  filter: 'blur(8rpx)',
                  backgroundImage: `url(${user.avatar}?imageView2/1/w/180/h/180/roundPic/radius/!50p)`,
                }"
              ></view>
            </view>
            <view class="username ellipsis-line">{{ user.name }}</view>
            <view class="unavailable__info mb20">注册时间: {{ user.register_date }}</view>
            <view class="unavailable__info mb20">脱单时间: {{ user.success_date }}</view>
            <view class="unavailable__info">脱单方式: {{ user.type }}</view>
          </view>
        </block>
        <block v-if="gender !== 2 && !isOpenHome && moreArr.length > 0" class="footer__card" @tap="navigateMember">
          <view class="headers">
            <view class="img__box" v-for="(user, index) in moreArr" :key="index" :style="{ zIndex: 5 - index }">
              <view class="no__member" :style="{ backgroundImage: url(user.avatar) }"></view>
            </view>
          </view>
          <view class="view">
            <text>查看全部嘉宾</text>
          </view>
        </block>
      </view>
      <view class="button">
        <nut-button @tap="goAuth">goAuth</nut-button>
      </view>
    </view>

    <!-- 筛选页 -->
    <page-container
      :show="showPageContainer"
      overlay="true"
      position="right"
      onLeave="onClose"
      custom-style="overflow-y: scroll;"
    >
      <view class="fake-navbar" @tap="goBack">返回</view>
      <view class="filter__container">
        <view class="card">
          <view class="title">你希望Ta所在的城市</view>
          <view class="city__block" @tap="handleChooseCity">
            <view class="city__left">
              <image lazy-load src="https://static.hamu.site/mini/home/location.png" />
              <text>选择城市</text>
            </view>
            <view class="city__right">
              <text>{{ chooseCity[0] }} {{ chooseCity[1] ? chooseCity[1] : '' }}</text>
              <image src="https://static.hamu.site/mini/home/right-arrow.png" />
            </view>
          </view>
          <view class="title"
            >你希望Ta的年龄是<text>{{ ageRangeValues[0] }}-{{ ageRangeValues[1] }}岁</text></view
          >
          <view class="filter__age">
            <!-- <range-slider
              width="622"
              height="8"
              block-size="64"
              barHeight="8"
              activeColor="var(--primary-color)"
              min="18"
              max="45"
              values="{{ageRangeValues}}"
              bind:rangechange="onRangeChange"
            >
              <view slot="minBlock" class="range-slider-block"></view>
              <view slot="maxBlock" class="range-slider-block"></view>
            </range-slider> -->
          </view>
        </view>
      </view>
    </page-container>
  </default-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Taro, { useRouter } from '@tarojs/taro';
import DefaultLayout from '../../layout/index.vue';
import { useRouteStore } from '@/stores/common';
import { useNavbarStore } from '@/stores/common';
import { useRouterStore } from '@/stores/router';

const routeStore = useRouteStore();
const routerStore = useRouterStore();

const images = ref([
  'https://static.hamu.site/mini/home/match_group-swiper.png',
  'https://static.hamu.site/mini/home/official-account-swiper.png',
]);
const navbar = ref(['女嘉宾', '男嘉宾', '已脱单']);
const currentTab = ref(0);
const showPageContainer = ref(false);
const chooseCity = ref(['不限']);
const ageRangeValues = ref([18, 45]);
const listData = ref([]);
const gender = ref(1);
const start = ref(0);
const limit = ref(10);
const isMember = ref(false);
const isOpenHome = ref(false);
const moreArr = ref([]);

const navbarTap = (index) => {
  currentTab.value = index;
  if (index === 2) {
    this.fetchUnavailable(true);
    return;
  }
  this.getHomeList(true, index);
  if (!isMember) {
    this.fetchMore(index);
  }
};
const navigateMember = () => {
  console.log('navigateMember');
};
const openFilter = () => {
  showPageContainer.value = true;
};
const handleChooseCity = () => {
  console.log('chooseCity');
};
const toDetail = (id) => {
  console.log('点击了', id);
  routerStore.navigate('/sub-package/detail/index', { id });
};
const onSwiperChange = (e) => {
  // 留给事件上报使用
};
const onClose = (e) => {
  console.log({ e });
};
const goBack = () => {
  showPageContainer.value = false;
};

const handleSwiperClick = (index) => {
  console.log('handleSwiperClicked! ', index);
};

const goAuth = () => {
  const url = '/pages/auth/index';
  routerStore.navigate(url);
  // routerStore.goBackward();
};

const setOptions = () => {
  const router = useRouter();
  routeStore.setRouteOption(router.params);
};
const getListData = () => {
  listData.value = [
    {
      count: 19.2,
      id: '514d10b6-6a4d-4541-a8c7-7eba3340a175',
      name: '裴裴',
      birthday: 1003766400000,
      avatar: 'https://static.hamu.site/blind/e925309c051c4ecca643d43a725a3990/1721381430258.png',
      gender: '女',
      city: '杭州市',
      university: '四川师范大学',
      job: null,
      position: '["学生", "大学生"]',
      education: '本科',
      common_tags: ['20万', '170cm'],
      admin_set_tags: [],
      living_place: '["浙江省", "杭州市"]',
      age: 23,
    },
    {
      count: 13.3,
      id: '09002886-8511-4571-9904-d167d6893d0a',
      name: '02',
      birthday: 855504000000,
      avatar: 'https://static.hamu.site/blind/3de87459154d4a84bbeaa4b96a18435c/1671699571979.png',
      gender: '女',
      city: '杭州市',
      university: '西班牙巴塞罗那自治大学',
      job: null,
      position: '["公务员", "国企"]',
      education: '硕士',
      common_tags: ['有房', '168cm', '硕士', '公务员'],
      admin_set_tags: [],
      living_place: '["浙江省", "杭州市"]',
      age: 27,
    },
    {
      count: 12.7,
      id: '31048964-b549-4bee-b728-3272cb429e4d',
      name: '恬甜',
      birthday: 982972800000,
      avatar: 'https://static.hamu.site/blind/58622ca22ed949959738136b28ce1e97.png',
      gender: '女',
      city: '合肥市',
      university: '广州体育学院',
      job: '',
      position: '["学生", "大学生"]',
      education: '本科',
      common_tags: ['168cm'],
      admin_set_tags: [],
      living_place: '["安徽省", "合肥市"]',
      age: 23,
    },
    {
      count: 12.6,
      id: '76c421b6-5c45-4d52-abb1-94184c5c118c',
      name: '麋鹿',
      birthday: 837993600000,
      avatar: 'https://static.hamu.site/blind/d72969e6387840d99c60711d21bb0029/1692431352860.png',
      gender: '女',
      city: '北京市',
      university: '河北地质大学',
      job: '',
      position: '["人事/财务/行政", "财务"]',
      education: '本科',
      common_tags: ['有房', '20万', '165cm'],
      admin_set_tags: [],
      living_place: '["北京市"]',
      age: 28,
    },
    {
      count: 12.5,
      id: '2e78b475-7ec3-4e14-950b-73029dcaee89',
      name: 'Ting',
      birthday: 884448000000,
      avatar: 'https://static.hamu.site/blind/ae47d566a2074bada76bb07b0b00cad0/1708161771011.png',
      gender: '女',
      city: '上海市',
      university: '西南财经大学',
      job: null,
      position: '["人事/财务/行政", "行政"]',
      education: '专科',
      common_tags: ['170cm'],
      admin_set_tags: [],
      living_place: '["上海市"]',
      age: 26,
    },
    {
      count: 11.3,
      id: 'cb14c58a-7184-414d-b1ac-6b745c5a1712',
      name: 'Dva👑沐沐',
      birthday: 828662400000,
      avatar: 'https://static.hamu.site/blind/0676d2380a994489b796c95b30ca0095/1697790739200.png',
      gender: '女',
      city: '深圳市',
      university: '香港城市大学',
      job: '',
      position: '["市场", "市场/营销"]',
      education: '硕士',
      common_tags: ['有房', '50万', '168cm', '硕士', 'QS48'],
      admin_set_tags: ['QS48'],
      living_place: '["广东省", "深圳市"]',
      age: 28,
    },
    {
      count: 10.7,
      id: '56cecb1d-d8e0-41a4-a154-1164a10918de',
      name: 'Jessie',
      birthday: 901814400000,
      avatar: 'https://static.hamu.site/blind/a2cc6b1bb10845d889884c342601d13a/1680847844578.png',
      gender: '女',
      city: '上海市',
      university: '上海师范大学',
      job: null,
      position: '["老师", "幼教"]',
      education: '本科',
      common_tags: ['有房', '沪户', '20万', '170cm', '老师'],
      admin_set_tags: [],
      living_place: '["上海市"]',
      age: 26,
    },
    {
      count: 10,
      id: '89000122-a4ae-4209-822a-52bcdced0c47',
      name: '徐绘婷',
      birthday: 925516800000,
      avatar: 'https://static.hamu.site/blind/41c4713392e747c48b12a879de966db9.png',
      gender: '女',
      city: '杭州市',
      university: '浙江传媒学院',
      job: '',
      position: '["影视传媒", "模特"]',
      education: '本科',
      common_tags: ['有房', '170cm', '模特', '艺术院校'],
      admin_set_tags: ['模特', '艺术院校'],
      living_place: '["浙江省", "杭州市"]',
      age: 25,
    },
    {
      count: 10,
      id: '34ece53c-38b9-4c09-8b2e-2631e9459458',
      name: 'Lucy',
      birthday: 826934400000,
      avatar: 'https://static.hamu.site/blind/91798370ae854455bda7d39494e475de.png',
      gender: '女',
      city: '上海市',
      university: '上海师范大学',
      job: '',
      position: '["老师", "小学老师"]',
      education: '本科',
      common_tags: ['有房', '沪户', '20万', '老师'],
      admin_set_tags: [],
      living_place: '["上海市"]',
      age: 28,
    },
    {
      count: 9.9,
      id: '20495810-7e92-4010-a414-26594165e9a8',
      name: '刘璐',
      birthday: 765158400000,
      avatar: 'https://static.hamu.site/blind/60497463968e401695499160e52131d5/1663647306790.png',
      gender: '女',
      city: '上海市',
      university: '英国巴斯斯巴大学',
      job: '',
      position: '["老师", "初中老师"]',
      education: '硕士',
      common_tags: ['硕士', '老师'],
      admin_set_tags: [],
      living_place: '["上海市"]',
      age: 30,
    },
    {
      count: 8.6,
      id: '1dc19496-9435-4199-b8d8-b58c75721885',
      name: '马铭蔚',
      birthday: 671472000000,
      avatar: 'https://static.hamu.site/blind/5067484340374414821b102be7e61122/1665199447394.png',
      gender: '女',
      city: '深圳市',
      university: '北京师范大学珠海分校',
      job: '银行',
      position: '["金融", "互联网金融"]',
      education: '本科',
      common_tags: ['30万', '168cm'],
      admin_set_tags: [],
      living_place: '["广东省", "深圳市"]',
      age: 33,
    },
    {
      count: 8.5,
      id: 'bc1a1c94-68d7-488e-9a4a-3c211554c1b2',
      name: '刘牛牛',
      birthday: 815788800000,
      avatar: 'https://static.hamu.site/blind/2ea94997b927440182b9d08ac05ac347/1683881037169.png',
      gender: '女',
      city: '北京市',
      university: '首尔大学',
      job: '',
      position: '["运营", "运营"]',
      education: '硕士',
      common_tags: ['有房', '60万', '171cm', '硕士', 'QS29', '大厂'],
      admin_set_tags: ['QS29', '大厂'],
      living_place: '["北京市"]',
      age: 29,
    },
    {
      count: 8.5,
      id: '73687b47-e28c-4c44-9890-b0a8de53d7d1',
      name: '张雨薇',
      birthday: 915321600000,
      avatar: 'https://static.hamu.site/blind/8c99d21d5d2c431ab0e29868e0a2c636/1663926844101.png',
      gender: '女',
      city: '北京市',
      university: '北京师范大学',
      job: '',
      position: '["老师", "初中老师"]',
      education: '硕士',
      common_tags: ['硕士', '老师', '师范院校'],
      admin_set_tags: ['师范院校'],
      living_place: '["北京市"]',
      age: 25,
    },
    {
      count: 8,
      id: '11719709-7833-486c-92b7-54483a936803',
      name: '星星',
      birthday: 783820800000,
      avatar: 'https://static.hamu.site/blind/ce636a15c86d4882a2c10484a2bcab6a/1699343444031.png',
      gender: '女',
      city: '上海市',
      university: '上海交通大学',
      job: '',
      position: '["公务员", "央企"]',
      education: '硕士',
      common_tags: ['25万', '165cm', '硕士', '公务员'],
      admin_set_tags: [],
      living_place: '["上海市"]',
      age: 30,
    },
    {
      count: 7.9,
      id: '1890e911-11e0-4199-8992-151014d11706',
      name: '糯糯妹',
      birthday: 828144000000,
      avatar: 'https://static.hamu.site/blind/9d8354b8848e4ec5a9066ede09000ba0/1673409519971.png',
      gender: '女',
      city: '北京市',
      university: '北京师范大学',
      job: '',
      position: '["运营", "运营"]',
      education: '硕士',
      common_tags: ['30万', '168cm', '硕士'],
      admin_set_tags: [],
      living_place: '["北京市"]',
      age: 28,
    },
  ];
};

const navbarStore = useNavbarStore();

onMounted(() => {
  setOptions();
  getListData();
  console.info('navbar info:', navbarStore);
});
</script>

<style lang="scss">
.home-container {
  position: relative;
  width: 750rpx;
  padding-top: 30rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .home-swiper {
    margin: 0 auto;
    width: 650rpx;
    height: 230rpx;
    position: relative;

    .top__image {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
    }
  }

  .navbar {
    width: 720rpx;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 28rpx 20rpx 0 50rpx;
    margin-top: 12rpx;
    height: 88rpx;
    position: sticky;
    z-index: 2;
    background-color: #fff;
    .gender__tab {
      display: flex;
    }
    .gender__filter {
      color: #131313;
      position: relative;
      font-size: 30rpx;
      line-height: 30rpx;
      margin-right: 60rpx;
    }
    .active {
      color: #131313;
      font-size: 36rpx;
      font-weight: bold;
      line-height: 40rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -8rpx;
      &::after {
        content: ' ';
        background-color: var(--primary-color);
        border-radius: 8rpx;
        bottom: -8rpx;
        position: relative;
        width: 60rpx;
        height: 10rpx;
      }
    }
    .filter__btn {
      font-size: 30rpx;
      line-height: 30rpx;
      color: #383838;
      display: flex;
      align-items: center;
      padding: 12rpx 20rpx;
      margin: -16rpx -20rpx 0 0;
      image {
        width: 44rpx;
        height: 44rpx;
        padding: 8rpx;
        box-sizing: border-box;
      }
    }
  }

  .empty_box {
    width: 100%;
    text-align: center;
    color: #999;
    padding-top: 180rpx;
    font-size: 28rpx;
    .empty {
      width: 230rpx;
      height: 230rpx;
    }
  }

  .list__box {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    padding-left: 50rpx;
    .li__item {
      margin-right: 56rpx;
      margin-top: 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    .age_city {
      font-size: 26rpx;
      font-weight: 400;
      line-height: 26rpx;
      color: #6e6e6e;
      display: flex;
      justify-content: center;
      margin-bottom: 16rpx;
      .age {
        margin-right: 6rpx;
      }
      .city-list {
        text-align: right;
        padding-left: 6rpx;
        height: 30rpx;
        max-width: 120rpx;
      }
    }
    .school {
      margin-bottom: 8rpx;
    }
    .school,
    .education {
      font-size: 26rpx;
      font-weight: 400;
      line-height: 50rpx;
      color: #6e6e6e;
      text-align: center;
      width: 180rpx;
      height: 50rpx;
    }
  }

  .ellipsis-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header__img {
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
    margin-bottom: 28rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .second__tag,
  .third__tag {
    margin-bottom: 8rpx;
    width: 180rpx;
    display: flex;
    justify-content: center;
    text {
      color: #fff;
      padding: 0 18rpx;
      height: 50rpx;
      border-radius: 25rpx;
      font-size: 24rpx;
      white-space: nowrap;
      line-height: 50rpx;
    }
  }

  .third__tag {
    margin-bottom: 0;
  }
}
</style>
