import React from 'react';

const ReactI18next = jest.genMockFromModule('react-i18next');

const translate = () => (Component) => (props) => <Component t={(str) => str} {...props} />;

ReactI18next.translate = translate;

module.exports = ReactI18next;
