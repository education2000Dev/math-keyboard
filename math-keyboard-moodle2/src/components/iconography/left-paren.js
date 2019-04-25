/**
 * An autogenerated component that renders the LEFT_PAREN iconograpy in SVG.
 *
 * Generated with: https://gist.github.com/crm416/3c7abc88e520eaed72347af240b32590.
 */
const React = require('react');
const PropTypes = require('prop-types');

class LeftParen extends React.Component {
    static propTypes = {
        color: PropTypes.string.isRequired,
    };

    render() {
        return <svg width="40" height="40" viewBox="0 0 48 48"><g fill="none" fillRule="evenodd"><path fill="none" d="M0 0h48v48H0z"/><path fill="none" d="M12 12h24v24H12z"/><path d="M26 14c-4 6-4 14 0 20" stroke={this.props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>;
    }
}

module.exports = LeftParen;
