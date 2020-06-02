import React from "react";
import { Form, Button, Container, FormControlProps } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type FlyoutSearchContentsProps = {
  results: any;
  error: Error | undefined;
  hide: () => void;
  dispatchSubmitSearch: (searchTerm: string) => void;
  dispatchClearSearch: () => void;
};

export const FlyoutSearchContents: React.FC<FlyoutSearchContentsProps> = ({
  dispatchSubmitSearch,
  dispatchClearSearch,
  results,
  error,
  hide,
}) => {
  const [keyWord, setKeyWord] = React.useState("");
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchSubmitSearch(keyWord);
  };
  return (
    <div className='text-center contents'>
      <Container>
        <Form onSubmit={submitSearch}>
          <Form.Control
            type='text'
            placeholder='Search'
            value={keyWord}
            // onChange={(event: React.FormEvent<FormControlProps>) => {
            //   setKeyWord(
            //     event.currentTarget.value ? event.currentTarget.value : ""
            //   );
            // }}
          />
          {error && (
            <Form.Text className='text-muted'>
              Error submitting search. Please try again.
            </Form.Text>
          )}
          <Button variant='light' type='submit'>
            Submit
          </Button>
        </Form>

        <div className='search-results'>
          {results && results[0] && !results[0].id && (
            <div> No Results for search term: '${keyWord}'</div>
          )}

          {results && results[0] && results[0].id && (
            <div>
              {results.map((result: any, i: number) => {
                return (
                  <LinkContainer key={i} to={`/detail/${result.symbol}`}>
                    <Button
                      onClick={() => {
                        hide();
                        dispatchClearSearch();
                      }}
                      variant='link'
                    >
                      {result.name}
                    </Button>
                  </LinkContainer>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
