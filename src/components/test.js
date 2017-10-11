import React, { Component } from "react";

import Child from "./child";

class Test extends Component {
    constructor(props){
        super(props);

        this.state = {
            test: 123
        };

        this.changeState = this.changeState.bind(this);
    }

    changeState(){
        this.setState({
            test: Math.random() * 100
        });
    }

    render(){
        return(
            <div>
                Hello World! {this.state.test}

                <Child handleClick={this.changeState} />
            </div>
        );
    }
}

export default Test;