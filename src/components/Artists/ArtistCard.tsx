import React from "react";
import { Card } from "react-bootstrap";

type ArtistProps = {
  artist?: any;
};
export const Artist: React.FC<ArtistProps> = ({ artist }) => {
  if (!artist) return <div />;
  const {
    address,
    name,
    owner,
    genre,
    bio,
    location,
    imageHash,
    merchCount,
    projectCount,
  } = artist;
  return (
    <Card style={{ fontSize: "8px" }}>
      <Card.Body>
        <Card.Text>Name: {name}</Card.Text>
        <Card.Text>Address: {address}</Card.Text>
        <Card.Text>Owner: {owner}</Card.Text>
        <Card.Text>Genre: {genre}</Card.Text>
        <Card.Text>Bio: {bio}</Card.Text>
        <Card.Text>Location: {location}</Card.Text>
        <Card.Text>Image: {imageHash}</Card.Text>
        <Card.Text>merchCount: {merchCount}</Card.Text>
        <Card.Text>project count: {projectCount}</Card.Text>
      </Card.Body>
    </Card>
  );
};
