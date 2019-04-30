/**
 * An autogenerated component that renders the EXP_2 iconograpy in SVG.
 *
 * Generated with: https://gist.github.com/crm416/3c7abc88e520eaed72347af240b32590.
 */
const React = require('react');

class NumberButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'number-button'
        }
    }
    onTouchStart = () => {
        this.setState({ClassName: 'number-button number-button-on-touch'});
    };
    onTouchEnd = (e) => {
        this.setState({ClassName: 'number-button'});
        this.props.handleClick(this.props.value);
        e.preventDefault();
    };
    render() {
        return (
            <div className={this.state.ClassName} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={(e) => {this.onTouchEnd(e)}}>{this.props.value}</div>
        )
    }
}

module.exports = NumberButton;
