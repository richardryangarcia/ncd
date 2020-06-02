import React from "react";
import { Artist } from "./ArtistCard";
import { groupBy } from "../../utils/display";
import { Container, Row, Col } from "react-bootstrap";

type GridProps = {
  collection: any;
};
export const Grid: React.FC<GridProps> = ({ collection }) => {
  const groupedCollection = groupBy(4, collection);
  return (
    <Container>
      {groupedCollection.map((set: any[], index: number) => {
        return (
          <Row key={index}>
            {set.map((element: any, index: number) => {
              return (
                <Col xs={6} md={6} lg={3} key={index}>
                  <Artist artist={element} />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
};
