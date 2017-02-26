import React,{PropTypes} from 'react'

import classnames from 'classnames';

export default class Page3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleKeyUp(e, editor) {
        console.log(editor.getContent());
    }

    handleChange(e, editor) {
        console.log(editor.getContent());
    }

    render() {
        return (
            <div>
                这是PAGE3 !!!!
            </div>
        );
    }
};