import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            data: [],
            begin: 1,
            end: 10
        }
    }

    getData() {
        $.ajax({
            type: 'GET',
            url: `/events?q=${this.state.search}&_start=${this.state.begin}&_end=${this.state.end}`,
            success: (data) => {
                this.setState({data: data});
            },
            error: (err) =>  {
                throw err;
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Historical Events Finder</h1>
                <input placeholder='Search' onChange={(e) => this.setState({search: e.target.value})}></input>
                <button onClick={this.getData.bind(this)}>Go!</button>
                <div>
                    {this.state.data.map((item, index) => {
                        return <div key={index}><span style={{fontWeight: '900', marginRight: '10px'}}>{item.date}</span>{item.description}</div>
                    })}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
