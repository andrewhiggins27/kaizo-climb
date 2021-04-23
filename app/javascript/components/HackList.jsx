import React, { useState, useEffect } from "react";
import HackTile from "./HackTile";
import Pagination from "./Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import HackSearch from "./HackSearch";

const HackList = (props) => {
  const [hacks, setHacks] = useState([]);
  const [pageData, setPageData] = useState({ page: null, totalPage: null });
  const [userLists, setUserLists] = useState([])

  useEffect(() => {
    let pageId = props.match.params.id;
    fetch(`/api/v1/hacklist/${pageId}`, {
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        setHacks(body.hacks);
        setPageData({ page: body.page_number, totalPage: body.total_pages });
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [props.match.params.id]);


  useEffect(() => {
    if (props.user.id !== undefined) {
      let userId = props.user.id
      
      fetch(`/api/v1/users/${userId}/lists`, {
        credentials: "same-origin",
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then((response) => response.json())
        .then((body) => {
          setUserLists(body.lists);
        })
        .catch((error) => console.error(`Error in fetch: ${error.message}`));
    }
  }, [props.user]);

  const handleSearchQuery = (query) => {
    fetch(`/api/v1/hacks/search/${query}`)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then((response) => response.json())
    .then((body) => {
      setPageData({ page: null, totalPage: null })
      setHacks(body.hacks)
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const HackTiles = hacks.map((hack) => {
    return (
      <HackTile
        key={hack.id}
        hack={hack}
        allowAddToList={true}
        user={props.user}
        lists={userLists}
      ></HackTile>
    );
  });

  return (
    <Container>
    <HackSearch handleSearchQuery={handleSearchQuery}/>
      <Row className="justify-content-md-center">{HackTiles}</Row>
      <Row>
        <Pagination
          currentPage={pageData.page}
          totalPage={pageData.totalPage}
          url="hacklist"
        />
      </Row>
    </Container>
  );
};

export default HackList;
