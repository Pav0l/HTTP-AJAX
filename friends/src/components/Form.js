import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class Form extends React.Component {
  // const [formObj, setFormObj] = useState({id: null, name: '', age: null, email: ''});
  state = {
    formObj: {
      name: '',
      age: '',
      email: '',
    }
  }

  // useEffect(() => {

  // });

  formSubmit = event => {
    event.preventDefault();
    // setFormObj({
    //   ...formObj,
    //   [event.target.name]: event.target.value,
    // })
    this.setState({
      formObj: {
        ...this.state.formObj,
        [event.target.name]: event.target.value,
      }
    })
  }

  clearInputs = () => {
    this.setState({
      formObj: {
        name: '',
        age: '',
        email: '',
      }
    })
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const { name, age, email } = this.state.formObj;
    const friend = {name: name, age: Number(age), email: email};
    this.props.postFriend(friend);
    this.clearInputs();
  }
  
  render () {

    return (
      <FriendForm onSubmit={this.onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter Friends Name"
          name="name"
          autoComplete="off"
          value={this.state.formObj.name}
          onChange={this.formSubmit}
          required />

        <label htmlFor="age">Age</label>
        <input
          type="text"
          placeholder="Enter Friends Age"
          name="age"
          autoComplete="off"
          value={this.state.formObj.age}
          onChange={this.formSubmit}
          required />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Friends Email"
          name="email"
          autoComplete="off"
          value={this.state.formObj.email}
          onChange={this.formSubmit}
          required />

        <button type="submit">Add Friend</button>
      </FriendForm>
    );
  }
}

Form.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  })),
}

const FriendForm = styled.form`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 20%;

  label {
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid navy;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem;
    background-color: navy;
    border: 1px solid navy;
    color: white;
    border-radius: 4px;
    :hover {
      background-color: white;
      color: navy;
    }
  }
`;
