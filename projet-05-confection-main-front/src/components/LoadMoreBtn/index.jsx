import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

function LoadMoreButton({ onClick, buttonText }) {
  return (
    <Grid>
      <Grid.Column textAlign="center">
        <Button
          primary
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Grid.Column>
    </Grid>
  );
}

export default LoadMoreButton;
