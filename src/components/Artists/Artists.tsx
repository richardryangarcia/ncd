import React from "react";
import { useFactoryContract } from "../../contexts/contractEffects";
import { ArtistContext } from "../../contexts/artistProvider";
import { Grid } from "./Grid";
import { RegistrationForm } from "./RegistrationForm";
import { Jumbotron, Button } from "react-bootstrap";

export const Artists: React.FC = () => {
  const { createArtist, getLatestArtists } = useFactoryContract();
  const [showRegister, setShowRegistration] = React.useState<boolean>(false);
  const artistContext = React.useContext(ArtistContext);
  const artists =
    artistContext.state.artists && Object.values(artistContext.state.artists);

  React.useEffect(() => {
    getLatestArtists();
  }, []);

  return (
    <div>
      <Jumbotron>
        <h1>8trac Artists</h1>
        <p>
          Below is a list of artists who have recently joined the 8trac
          platform. Start exploring to see what projects these great artists are
          working on.
        </p>
        <p>
          <Button
            type='submit'
            onClick={() => {
              setShowRegistration(!showRegister);
            }}
          >
            Register as Artist
          </Button>
        </p>
      </Jumbotron>
      {showRegister && <RegistrationForm createArtist={createArtist} />}
      <Grid collection={artists} />
    </div>
  );
};
