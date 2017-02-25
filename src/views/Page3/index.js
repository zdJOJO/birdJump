import React,{PropTypes} from 'react'

import classnames from 'classnames';
import Tinymce from 'uxcore-tinymce';

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
        let me = this;
        const config = {
            menubar: false,
            toolbar1: 'fontselect fontsizeselect | bold italic underline strikethrough removeformat | forecolor backcolor',
            toolbar2: false,
            statusbar: false
        };
        return (
            <Tinymce
                onKeyup={me.handleKeyUp.bind(me)}
                onChange={me.handleChange.bind(me)}
                config={config} />
        );
    }
};