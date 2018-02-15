import React, {Component} from 'react';

import Note from './note'

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            notes:[]
        }
        this.eachNote = this.eachNote.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
    }

    update(newText,i){
        console.log('this calls second')
        this.setState(prevState => ({
            notes:prevState.notes.map(
                note=>(note.id!==i) ? note : {...note, note:newText}
            )
        }))
    }

    add(text){
        this.setState(prevState =>({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: text
                }
            ]
        }))
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++
    }

    remove(id){
        this.setState(prevState => ({
            notes: prevState.notes.filter(note=>note.id!==id)
        }))
    }

    eachNote(note,i){
        return(
            <Note key={i}index={i} onChange={this.update}
                onRemove={this.remove}>{note.note}</Note>
        )
    }

    render(){
        return(
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button id="add" onClick={this.add.bind(null, "New Note")}>+</button>
            </div>
        )
    }
}

export default Board;
