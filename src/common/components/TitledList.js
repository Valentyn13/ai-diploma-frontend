import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.View`
  align-items: flex-start;
`;

const TitledList = ({ render }) => <ListContainer>{render()}</ListContainer>;

TitledList.propTypes = {
  render: PropTypes.func.isRequired,
};
export default TitledList;
