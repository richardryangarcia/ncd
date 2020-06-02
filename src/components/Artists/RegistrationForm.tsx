import React from "react";
import {
  Card,
  Button,
  Image,
  Spinner,
  Form,
  FormControlProps,
} from "react-bootstrap";
import ipfs from "../../configs/ipfs";
import { useWeb3Context } from "web3-react";
import { useFactoryContract } from "../../contexts/contractEffects";

type RegistrationFormProps = {
  createArtist: any;
};
export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  createArtist,
}) => {
  const { updateImage } = useFactoryContract();
  const [buffer, setBuffer] = React.useState<any>("");
  const [sending, setSending] = React.useState<boolean>(false);
  const [ipfsHash, setIpfsHash] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [symbol, setSymbol] = React.useState<string>("");
  const [genre, setGenre] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");

  const previewSrc = ipfsHash
    ? `https://ipfs.infura.io/ipfs/${ipfsHash}`
    : "holder.svg";

  const onImageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    ipfs.add(buffer, async (error: Error, result: any) => {
      if (!error) setIpfsHash(result[0].hash);
      setSending(false);
    });
  };

  const captureFile = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buff = Buffer.from(reader.result as ArrayBuffer);
      setBuffer(buff);
    };
  };

  const onImageSave = () => {
    updateImage(ipfsHash);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArtist({ name, symbol, genre, bio, location, ipfsHash });
  };

  return (
    <div className='edit-profile'>
      <Card className='text-center' style={{ border: "none" }}>
        <Card.Body>
          <div>
            <Card.Title>Artist Image</Card.Title>
            <Image src={previewSrc} roundedCircle />
            <form onSubmit={onImageSubmit}>
              <input id='imageInput' type='file' onChange={captureFile} />
              {ipfsHash ? (
                <Button variant='success' onClick={onImageSave}>
                  Update Profile
                </Button>
              ) : (
                <Button type='submit' variant='primary' disabled={sending}>
                  {sending ? (
                    <div>
                      <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />
                      Going Interplanetary...
                    </div>
                  ) : (
                    "Upload Image"
                  )}
                </Button>
              )}
            </form>
          </div>

          <div>
            <Card.Title>Artist Details</Card.Title>
            <Form onSubmit={onFormSubmit}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setName(e.currentTarget.value ? e.currentTarget.value : "");
                  }}
                />
              </Form.Group>
              <Form.Group controlId='symbol'>
                <Form.Label>Symbol</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter symbol'
                  value={symbol}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setSymbol(
                      e.currentTarget.value ? e.currentTarget.value : ""
                    );
                  }}
                />
              </Form.Group>
              <Form.Group controlId='genre'>
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter genre'
                  value={genre}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setGenre(
                      e.currentTarget.value ? e.currentTarget.value : ""
                    );
                  }}
                />
              </Form.Group>
              <Form.Group controlId='location'>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter location'
                  value={location}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setLocation(
                      e.currentTarget.value ? e.currentTarget.value : ""
                    );
                  }}
                />
              </Form.Group>
              <Form.Group controlId='bio'>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter bio'
                  value={bio}
                  onChange={(e: any) => {
                    e.preventDefault();
                    setBio(e.currentTarget.value ? e.currentTarget.value : "");
                  }}
                />
              </Form.Group>

              <Button
                className='submit-btn'
                style={{ float: "right" }}
                variant='success'
                type='submit'
              >
                Submit
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
