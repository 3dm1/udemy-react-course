let visible = false;

const onClick = () => {
  visible = !visible;
  render();
}

const render = () => {
  const template = (
    <div>
      <h1>Visibility toggle</h1>
      <button onClick={onVisibilityToggle}>{visible ? 'Hide details' : 'Show details'}</button>
      {visible && <p>Here are the details</p>}
    </div>
  );
  ReactDOM.render(template, appRoot);
}
render();
