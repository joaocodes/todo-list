import React from 'react';
import Button from '@material-ui/core/Button';

class AddTodo extends React.Component {

    constructor() {
        super();
        this.state = {
            todo: ''
        };
    }

    render() {
        return(<div className='addTodoContainer'>
            <h1>Add your todo's below!</h1>
            <form onSubmit={(e) => this.submitTodo(e)}>
                <input onChange={(e) => this.updateInput(e)} type='text' id='addTodoInput'></input>
                <Button variant="contained" color="primary" type='submit'>Add Task</Button>
            </form>

        </div>
        );
    }

    updateInput = (e) => {
       this.setState({ todo: e.target.value });
    }
    
    submitTodo = (e) => {
        e.preventDefault();
        this.props.addTodoFn(this.state.todo);
        document.getElementById('addTodoInput').value = '';
    }

}

export default AddTodo;