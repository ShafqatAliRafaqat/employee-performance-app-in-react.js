import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import React from "react";


const SimplePagination = (props) => {
  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink previous tag="button" onClick={props.previous}>
          Prev
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next tag="button" onClick={props.next}>
          Next
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default SimplePagination;
