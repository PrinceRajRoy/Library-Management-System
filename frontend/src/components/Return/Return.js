import React from 'react';
import './Return.css';

class Return extends React.Component {
    
    state = {
        header: <thead></thead>,
        books: [],
        name: ''
    };

    fetchData = () => {
        var sid = document.getElementById('sid').value;
        this.setState({header: <thead id="header">
                        <tr>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Semester No</th>
                            <th scope="col">Issue Date</th>
                            <th scope="col">Return Deadline</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>,
            books: []});

        fetch(`/api/getIssues/${sid}`)
            .then(res => res.json())
            .then(books => {
                if(books.length > 0) {
                    this.setState({...this.state, name: `Books Issued By ${books[0].sname}`});
                    books.forEach(
                        el => this.setState({
                            books: [...this.state.books, 
                                    <tr key={el.id}>
                                        <td>{el.name.toUpperCase()}</td>
                                        <td>{el.author}</td>
                                        <td>{el.semester}</td>
                                        <td>{el.date}</td>
                                        <td>{el.deadline}</td>
                                        <td><button className="btn btn-primary" onClick={() => this.returnIt(el)}>Return</button></td>
                                    </tr>]
                        }))
                }
                else{
                    this.setState({header: []});
                    this.setState({...this.state, name: "No Books Issued By The Student"});
                }
                });
    }

    returnIt = el => {
        fetch('/api/return', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    ...el,
                    sid: parseInt(document.getElementById('sid').value)
                })
           });

    }

    render() {
        return (
            <div id='return' className="text-center">
                <div>
                    <input className="form-control sel" type="number" placeholder="Enter Student ID" id="sid" min="1"></input>
                    <button className="btn btn-success" onClick={this.fetchData}>Submit</button>
                </div><br/>
                {this.state.name}
                <table id="rResults" className="table table-hover">
                    {this.state.header}
                    <tbody>
                        {this.state.books}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Return;