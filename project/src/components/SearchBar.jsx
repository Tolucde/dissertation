import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../sharedStyles';

const SearchContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 70%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ResultItem = styled.div`
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 1rem;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }
`;

const ViewMoreButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
`;

const SearchBar = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(8);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search term
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setFilteredCourses([]);
    } else {
      const lowercasedSearchTerm = searchTerm.trim().toLowerCase();
      const filtered = courses.filter((course) =>
        course['Course Name'].toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredCourses(filtered);
      setVisibleCourses(8); // Reset visible courses to the first batch
    }
  }, [searchTerm, courses]);

  // Handle input changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Load more results
  const handleViewMore = () => {
    setVisibleCourses((prev) => prev + 8);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for courses..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm.trim().length >= 2 && (
        filteredCourses.length > 0 ? (
          <ResultsContainer>
            {filteredCourses.slice(0, visibleCourses).map((course, index) => (
              <ResultItem key={index}>{course['Course Name']}</ResultItem>
            ))}
            {visibleCourses < filteredCourses.length && (
              <ViewMoreButton onClick={handleViewMore}>View More</ViewMoreButton>
            )}
          </ResultsContainer>
        ) : (
          <ResultsContainer>No courses found for "{searchTerm}"</ResultsContainer>
        )
      )}
    </SearchContainer>
  );
};

export default SearchBar;
