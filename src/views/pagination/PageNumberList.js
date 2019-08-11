import React, { Component } from 'react';
import './page-number-list.css';
import PageNumber from './PageNumber';

export default class PageNumberList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNums: [1],
            currentPage: 1
        };
    }

    refreshPageNumbers() {
        // no widely supported 'range' function in js
        let pageNums = Array(this.props.numPages);
        for (let i = 0; i < this.props.numPages; i++) {
            pageNums[i] = i + 1;
        }
        this.setState({
            pageNums: pageNums
        });
    }

    render() {
        return (
            <div className="page-list-container">
                {this.state.pageNums.map((pageNumber) => 
                    <PageNumber pageNum={ pageNumber }
                        key={ pageNumber }
                        isSelected = { this.props.currentPage == pageNumber }
                        switchToPage={ () => this.props.switchToPage(pageNumber) } />
                )}
            </div>
        );
    }
    
}
