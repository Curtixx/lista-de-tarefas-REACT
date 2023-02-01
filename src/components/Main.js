import React, { Component } from 'react';
import Form from'./Form';
import Tarefas from './Tarefas'
import './Main.css'

export default class Main extends Component{
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  }
  handleChange = () => {
    this.setState({
      novaTarefa: document.getElementById('input').value,
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    let input = document.getElementById('input').value
    if(input === ""){
      return
    }
    const { tarefas, index } = this.state
    let { novaTarefa } = this.state
    novaTarefa = novaTarefa.trim()

    if(tarefas.indexOf(novaTarefa) !== -1){
      return
    }
    const novasTarefas = [...tarefas]

    if(index === -1){
      this.setState({ tarefas: [...novasTarefas, novaTarefa], novaTarefa: '', })
    } else {
      novasTarefas[index] = novaTarefa
      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        novaTarefa: '',
      })
    }



  }
  handleDelete = (e, index) => {
    const {tarefas} = this.state
    const novasTarefas = [...tarefas]
    novasTarefas.splice(index, 1)
    this .setState({tarefas: [...novasTarefas]})
  }
  handleEdit = (e, index) => {
    const {tarefas} = this.state
    this.setState({
      index,
      novaTarefa: tarefas[index],
    })
  }
  componentDidMount(){
    const tarefas = JSON.parse(localStorage.getItem('tarefas'))
    if(!tarefas){
      return
    }
    this.setState({
      tarefas
    })
  }
  componentDidUpdate(prevProps, prevState){
    const { tarefas } = this.state
    if(tarefas === prevState.tarefas){
      return
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }

  render(){
    const { novaTarefa, tarefas } = this.state
    return (
      <div className='main'>
        <h1>Tarefas do dia:</h1>
        <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange} novaTarefa={novaTarefa} />
        <Tarefas handleDelete={this.handleDelete} handleEdit={this.handleEdit} tarefas={tarefas}/>
      </div>
    );
  }
}
