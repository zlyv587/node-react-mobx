import React, { Component} from 'react';
import { observer } from 'mobx-react';
import Store from './store';

const store = new Store();

@observer
class Home extends  Component {

    componentWillMount() {
        store.initData();
    }


    render() {
        return (
            <div>
                <div>home页面罗</div>
                <div>{store.homeData.title}</div>
                <div>{store.homeData.content}</div>
                <div　onClick={store.goDetail}>跳转</div>
            </div>
        )
    }
}

export default Home;