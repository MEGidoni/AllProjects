import React, { useState } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

const EmployeeCardWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to next line */
  align-items: center;
`;

const EmployeeDetail = styled.div`
  flex: 1; /* Take up remaining space */
  margin-bottom: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex: 0 0 auto; /* Prevent buttons from taking up extra space */
`;

const EmpCard = ({ id, name, position, salary, onDeleteClick, onUpdateClick }) => {
  const [showFullId, setShowFullId] = useState(false);

  const truncatedId = id.substring(0, 4);

  return (
    <EmployeeCardWrapper>
      <EmployeeInfo>
        <EmployeeDetail>
          <div className="text-xl font-bold">Name: <span>{name}</span></div>
          <span
            className="font-semibold cursor-default"
            onMouseEnter={() => setShowFullId(true)}
            onMouseLeave={() => setShowFullId(false)}
          >
            ID: {showFullId ? id : `${truncatedId}...`}
          </span>
          <div className="text-xl">Position: <strong>{position}</strong></div>
          <div className="text-xl">Salary: <strong>{salary}</strong></div>
        </EmployeeDetail>
        <ButtonsContainer>
          <FaRegEdit cursor="pointer" color="green" size={24} onClick={onUpdateClick} />
          <MdDelete cursor="pointer" color="red" size={24} onClick={onDeleteClick} />
        </ButtonsContainer>
      </EmployeeInfo>
    </EmployeeCardWrapper>
  );
};

export default EmpCard;
