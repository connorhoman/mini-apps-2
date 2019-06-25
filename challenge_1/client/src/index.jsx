import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            data: []
        }
    }

    componentDidMount() {
        $.ajax({
            url: '/events',
            success: (data) => {
                this.setState({data: data.slice(0,10)});
            },
            error: (err) =>  {
                console.log(err);
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Historical Events Finder</h1>
                <form>
                    <input placeholder='Search' onChange={(e) => this.setState({search: e.target.value})}></input>
                    <button>Go!</button>
                </form>
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
