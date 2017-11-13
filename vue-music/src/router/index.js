import Vue from 'vue';
import Router from 'vue-router';
// import Recommend from 'components/recommend/recommend';
// import Rank from 'components/rank/rank';
// import Search from 'components/search/search';
// import Singer from 'components/singer/singer';
// import SingerDetail from 'components/singer-detail/singer-detail';
// import Disc from 'components/disc/disc';
// import TopList from 'components/top-list/top-list';
// import UserCenter from 'components/user-center/user-center';

Vue.use(Router);

/* 路由懒加载 */
const Recommend = (resolve) => {
  import('components/recommend/recommend').then((modeule) => {
    resolve(modeule);
  });
};

const Singer = (resolve) => {
  import('components/singer/singer').then((modeule) => {
    resolve(modeule);
  });
};

const Rank = (resolve) => {
  import('components/rank/rank').then((modeule) => {
    resolve(modeule);
  });
};

const Search = (resolve) => {
  import('components/search/search').then((modeule) => {
    resolve(modeule);
  });
};

const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((modeule) => {
    resolve(modeule);
  });
};

const TopList = (resolve) => {
  import('components/top-list/top-list').then((modeule) => {
    resolve(modeule);
  });
};

const Disc = (resolve) => {
  import('components/singer-detail/singer-detail').then((modeule) => {
    resolve(modeule);
  });
};

const UserCenter = (resolve) => {
  import('components/user-center/user-center').then((modeule) => {
    resolve(modeule);
  });
};

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ],
  linkActiveClass: 'active'
});
