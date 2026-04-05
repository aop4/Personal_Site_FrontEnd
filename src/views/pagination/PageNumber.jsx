import React, { Component } from 'react';
import './page-number.css';

export default class PageNumber extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    render() {
        return (
            <button className={"page-select-button " + (this.props.isSelected ? "page-select-button-active":"") }
                onClick={ () => this.props.switchToPage() }>
                { this.props.pageNum }
            </button>
        );
    }
}
