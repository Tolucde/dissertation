import styled from 'styled-components';


const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #34495e;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InterestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InterestOption = styled.div`
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#3498db' : '#bdc3c7'};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  background-color: ${props => props.selected ? '#ebf5fb' : 'white'};
  transition: all 0.3s ease;

  &:hover {
    border-color: #3498db;
  }
`;

const DifficultySelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 2rem;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

 const CustomInterestForm = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
  width: 100%;
  max-width: 500px;
`;

 const CustomInterestInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &::placeholder {
    color: #999;
  }
`;

 const AddInterestButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

export {
    Container,
    Title,
    Form,
    Section,
    SectionTitle,
    InterestGrid,
    InterestOption,
    DifficultySelect,
    SubmitButton,
    CustomInterestInput,
    AddInterestButton,
    CustomInterestForm
  };