import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const formValues = {
            title: value,
        }
        onSubmit(formValues);
        setValue('');
    }
    function handleValueChange(e) {
        const changeValue = e.target.value;
        setValue(changeValue);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={value} onChange={handleValueChange} />
        </form>
    );
}

export default TodoForm;