import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};
Pagination.defaulProps = {
    onPageChange: null
}

function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { _page, _limit, _totalRows } = pagination;
    //Tính tổng số trang
    const totalPages = Math.ceil(_totalRows / _limit);

    const handleClickPage = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }
    return (
        <div>
            <button
                disabled={_page <= 1}
                onClick={() => handleClickPage(_page - 1)}
            >
                Prev
            </button>
            <button
                disabled={_page >= totalPages}
                onClick={() => handleClickPage(_page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;