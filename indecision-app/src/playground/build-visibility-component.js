class VisibilitToggle extends React.Component {
  constructor(props) {
    super(props);
    this.onVisibilityToggle = this.onVisibilityToggle.bind(this);
    this.state = {
      visible: false
    };
  }

  onVisibilityToggle() {
    setState((prevState) => {
      return {
        visible: !prevState.visible
      }
    })
  };

  render() {
    return (
      <div>
        <h1>Visibility toggle</h1>
        <button onClick={onVisibilityToggle}>{this.state.visible ? 'Hide details' : 'Show details'}</button>
        {this.state.visible && <p>Here are the details</p>}
      </div>
    );
  }
}

ReactDOM.render(<VisibilitToggle />, appRoot);
