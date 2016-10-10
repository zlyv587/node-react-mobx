import React, { Component} from 'react';
class App extends  Component {

    render() {
        return (
            <div>
                <div>头部</div>
                {this.props.children}
            </div>
        )
    }
}

export default App;