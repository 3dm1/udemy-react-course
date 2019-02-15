import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
  state = {
    options : [],
    selectedOption : undefined
  };

  componentDidMount() {
    try {
      const options = JSON.parse(localStorage.getItem('options'));
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      console.log(e);
      //do nothing
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length != this.state.options.length) {
      localStorage.setItem('options', JSON.stringify(this.state.options));
    }
  }

  handleDeleteOption = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((item) => item !== option)
    }))
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleAction = () => {
    const options = this.state.options;
    const selection = Math.floor(Math.random() * options.length);
    this.setState(() => ({
      selectedOption : options[selection]
    }));
  }

  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if(this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({ options: [...prevState.options, option] }))
  };

  handleConfirmOption = () => {
    this.setState(() => ({ selectedOption : undefined }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle}/>
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handleAction={this.handleAction}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOption={this.handleDeleteOption}
              handleDeleteOptions={this.handleDeleteOptions}
            />
            <AddOption handleAddOption={this.handleAddOption}/>
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleConfirmOption={this.handleConfirmOption}
        />
      </div>
    );
  }
}
