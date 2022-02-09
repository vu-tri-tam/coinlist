import React from 'react'
import ReactPaginate from 'react-paginate';


export default function Pagination({ usePage, totalPage, setIndexFirt }) {
    const celiPage = Math.ceil(totalPage / usePage);//chỉ số chỉ định cho hiện : 4 
    const onPageChange = ({ selected }) => {
        setIndexFirt(selected);
    }

    return (
        <ReactPaginate
            previousLabel={"Trước"}
            nextLabel={"Sau"}
            pageCount={celiPage}
            onPageChange={onPageChange}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={"page-item"}
            containerClassName={"pagination "}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
            disabledClassName={"disabled"}
            activeClassName={"active"}

        />

    )
}
