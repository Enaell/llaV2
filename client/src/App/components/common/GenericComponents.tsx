import React from 'react';
import { Column, Row } from './Flexbox';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import translate from 'counterpart';


const styles = {
  pageTitle:{
    margin: '50px',
    marginTop: '65px'
  },
  pageDescription:{
    maxWidth: '1140px'
  },
  filter: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    marginRight: '40px',
    width: '100%',
  },
  filterTitle: {
    height: '14px',
    width: '32px',
    color: '#595959',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '14px',
  },
  filterInput: {
    height: '30px',
    width: '200px',
    border: '1px solid #cccccc',
    borderRadius: '18px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingLeft: '10px',
    paddingRight: '10px',
    margin: '10px',
  }
};

export const PageTitle = ({ title } : { title: string }) => {
  return (
    <Column horizontal='center'>
      <Typography style={styles.pageTitle} variant="h3" color={'primary'} >{title}</Typography>
    </Column>
  );
}

// description must be string[]
export const PageDescription = ({ descriptions } : { descriptions: string[] }) => {
  return (
    <Column horizontal='center' style={styles.pageDescription}>
      {descriptions.map((description) => (
          <Typography key={description} variant="subtitle1" color={'textSecondary'} >{description}</Typography>
        )
      )}
    </Column>
  )
}

export const Filter = ({ filter, setFilter }: { filter: string, setFilter: (s : string) => void}) => {
  return (
    <div style={styles.filter}>
      <p style={styles.filterTitle}>{translate('dictionaryPage.filter')}</p>
      <InputBase
        style={styles.filterInput}
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  )
}

export const DualSwitch =  ({
    values, 
    changeSelectedValue
  }: { values: string[], changeSelectedValue: (s : string) => void }) => {

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event : any) => {
    setChecked( event.target.checked );
    event.target.checked ? changeSelectedValue(values[0]) : changeSelectedValue(values[1]);
  };

  return (
    <Row>
      {values[0]}
      <Switch
        checked={checked}
        onChange={handleChange}
        value={values[1]}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      {values[1]}
    </Row>
  )
}