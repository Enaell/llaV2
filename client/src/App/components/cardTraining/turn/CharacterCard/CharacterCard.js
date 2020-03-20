import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent } from '@material-ui/core';


function CharacterCard({character, pinying}) {
  return(
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Caractère
        </Typography>
        <Typography component="h2" variant="h1" gutterBottom>
          {character}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Pinying
        </Typography>
        <Typography variant="h6" gutterBottom>
          {pinying}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;