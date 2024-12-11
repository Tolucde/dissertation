import styled from 'styled-components'

const Container = styled.div `
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
`

const FormWrapper = styled.div `
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

const Title = styled.h1 `
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`

const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input `
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #0066ff;
  }
`

const Button = styled.button `
  padding: 0.8rem;
  background-color: #0066ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0052cc;
  }
`

const ToggleText = styled.p `
  text-align: center;
  margin-top: 1rem;
`

const ToggleButton = styled.button `
  background: none;
  border: none;
  color: #0066ff;
  cursor: pointer;
  text-decoration: underline;
`

export {
    Container,
    FormWrapper,
    Title,
    Form,
    Input,
    Button,
    ToggleText,
    ToggleButton,
}