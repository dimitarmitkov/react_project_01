import React from "react";

export default class Hello extends React.Component<any> {
    name: string;
    constructor(props: any) {
        super(props);
        this.state = {
            someStateName: 'name of the state'
        };
        this.name = "Mitko";
    }
    render(){
        return <h2>Hello!, {this.props.name}</h2>
    }
}

