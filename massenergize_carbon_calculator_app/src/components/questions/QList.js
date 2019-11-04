//function library & react component
import React from 'react';
import { connect } from 'react-redux'
import { questionAnswered } from '../../actions'
import _ from 'lodash';

//style component
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';


class QDetail extends React.Component {

    onClickHandler = (response) => (event) => {
        if (!response) {
            this.props.questionAnswered(
                this.props.action.name,
                this.props.question.name,
                event.target.value)
            return;
        }
        const responseObj = response[event.target.value]
        this.props.questionAnswered(
            this.props.action.name,
            this.props.question.name,
            responseObj.text,
            responseObj.skip)
    }
    isAnswered(answered) {
        return (!answered || !answered[this.props.question.name]);
    }

    renderAnswer = () => {
        const { question, answered } = this.props;
        let value = (this.isAnswered(answered)) ? '' : answered[this.props.question.name];
        if (question.questionType === "Choice") {
            const response = _.mapKeys(Object.values(question.responses), 'text');
            return (
                <FormControl component="fieldset">
                    <RadioGroup aria-label="response"
                        value={value} onChange={this.onClickHandler(response)}>
                        {question.responses.map(response => {
                            return (
                                <FormControlLabel key={`${question.name}${response.text}`} value={response.text} control={<Radio />} label={response.text} />
                            );
                        })}
                    </RadioGroup>
                </FormControl>);
        } else {
            return <TextField value={value} placeholder="Please answer the above question" onChange={this.onClickHandler()} />
        }
    }

    render() {
        return (
            <>
                <ListItemText primary={this.props.question.questionText} />
                <List>
                    {this.renderAnswer()}
                </List >
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {

        answered: state.answered[ownProps.action.name],

    }
}

export default connect(mapStateToProps, { questionAnswered })(QDetail);