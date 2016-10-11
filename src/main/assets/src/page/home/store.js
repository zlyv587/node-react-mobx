import { observable, action } from 'mobx';
import { browserHistory  } from 'react-router';

export default class detail {

    @observable homeData = {
         title: '主页面'
    };

    @action
    initData = () => {
        this.homeData.content = '肝胆啊　的的ededeed';
    };

    @action
    goDetail = () => {
        browserHistory.push('/detail');
    };
}