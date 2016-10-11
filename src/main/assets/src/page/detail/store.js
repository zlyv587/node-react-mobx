import { observable, action } from 'mobx';

export default class detail {

    @observable detailData = {
         title: '美好时光'
    };

    @action
    initData = () => {
        this.detailData.content = '机械键盘适合桥代码，敲代码很爽　啊';
    };


}