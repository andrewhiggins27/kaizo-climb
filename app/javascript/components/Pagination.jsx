import React from 'react'
import { Link } from "react-router-dom";

export const Pagination = (props) => {
  const emptyArray = new Array(props.totalPage).fill(null)
  
  const pageLinks = emptyArray.map((currentValue, index) => {
    if (props.currentPage === index + 1) {
      return (
        <li className="page-item active" key={index}>
          <Link className="page-link" to="#">
            {index + 1}
          </Link>
        </li>
      )
    } else {
      let linkRef = `/${props.url}/${index + 1}`
      return (
        <li className="page-item" key={index}>
          <Link className="page-link" to={linkRef}>
            {index + 1}
          </Link>
        </li>
      )
    }
  })

  let backRef = `/${props.url}/${props.currentPage - 1}`
  let backLink
  if (props.currentPage === 1) {
    backLink = <></>
  } else {
    backLink = <li className="page-item">
        <Link className="page-link" to={backRef}>
          Back
        </Link>
      </li>
  }

  let nextRef = `/${props.url}/${props.currentPage + 1}`
  let nextLink
  if (props.currentPage === props.totalPage) {
    nextLink = <></>
  } else {
    nextLink = <li className="page-item">
        <Link className="page-link" to={nextRef}>
          Next
        </Link>
      </li>
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {backLink}
        {pageLinks}
        {nextLink}
      </ul>
    </nav>
  )
}

export default Pagination