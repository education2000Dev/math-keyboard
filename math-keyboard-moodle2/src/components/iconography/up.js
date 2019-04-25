/**
 * A component that renders the UP iconograpy in SVG.
 */
const React = require('react');

const Arrow = require('./arrow');

const Up = () => {
    return <svg width="40" height="40" viewBox="0 0 48 48">
        <Arrow transform="rotate(90 24 24)" />
    </svg>;
};

module.exports = Up;
