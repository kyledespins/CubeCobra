import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import DynamicFlash from 'components/DynamicFlash';
import ErrorBoundary from 'components/ErrorBoundary';
import FilterCollapse from 'components/FilterCollapse';
import TopCardsTable from 'components/TopCardsTable';
import { Row, Col } from 'reactstrap';
import ButtonLink from 'components/ButtonLink';

import Query from 'utils/Query';

const TopCards = ({ data, numResults }) => {
  const [filter, setFilter] = useState(Query.get('f') || '');
  const [count, setCount] = useState(numResults);

  const updateFilter = (_, filterInput) => {
    setFilter(filterInput);
  };

  return (
    <>
      <div className="usercontrols pt-3 mb-3">
        <Row className="pb-3 mr-1">
          <Col xs="6">
            <h3 className="mx-3">Top Cards</h3>
          </Col>
          <Col xs="6">
            <div className="text-right">
              <ButtonLink outline color="success" href="/tool/searchcards">
                Search All Cards
              </ButtonLink>
            </div>
          </Col>
        </Row>
        <FilterCollapse
          isOpen
          defaultFilterText=""
          filter={filter}
          setFilter={updateFilter}
          numCards={count}
          numShown={Math.min(count, 100)}
        />
      </div>
      <DynamicFlash />
      <TopCardsTable filter={filter} setCount={setCount} count={count} cards={data} />
    </>
  );
};

TopCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  numResults: PropTypes.number.isRequired,
};

const wrapper = document.getElementById('react-root');
const element = (
  <ErrorBoundary className="mt-3">
    <TopCards {...window.reactProps} />
  </ErrorBoundary>
);
if (wrapper) {
  ReactDOM.render(element, wrapper);
}
