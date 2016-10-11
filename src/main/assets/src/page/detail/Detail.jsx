import React, { Component} from 'react';
import { observer } from 'mobx-react';
import Store from './store';

const store = new Store();

@observer
class Detail extends  Component {

    componentWillMount() {
        store.initData();
    }

    render() {
        return (
            <div>
                <div>Detail页面罗</div>
                <div>{store.detailData.title}</div>
                <div>{store.detailData.content}</div>
            </div>
        )
    }
}

export default Detail;