import React, { useState } from 'react';
import { WordListType, VisibilityType } from '../../../common/types';
import { subjects, visibilities } from '../../../common/utils';
import { Column, Row } from '../../../common/Flexbox';
import { Button, TextField, FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText, Chip, Typography } from '@material-ui/core';
import translate from 'counterpart';

const styles = {
  title: {width: '80%', maxWidth: '758px'},
  row: {width: '100%', maxWidth: '800px'},
  width100: { width: '100%'},
  formInput: { width: '44%', minWidth: '130px', paddingBottom: '15px'},
  commentsRow: { width: '92%', maxWidth: '730px', minWidth: '130px', height: '200px', paddingTop: '25px'}
}

export const WordListForm = ({ wordList=undefined, modify=false, onSave }: { wordList?: WordListType, modify?: boolean, onSave: ( )=> void }) => 
{
  const localListForm = 'dictionaryPage.wordListPanel.wordListForm';

  const [name, setName] = useState('');
  const [subject, setSubject] = useState([] as string[]);
  const [level, setLevel] = useState(0);
  const [rank, setRank] = useState(0);
  const [validated, setValidated] = useState(false);
  const [visibility, setVisibility] = useState("Owner" as VisibilityType)
  const [comments, setComments] = useState('');

  return (
    <Column horizontal='center' style={styles.width100}>
      <div style={styles.title}>
        <Typography variant={'h5'}>{name || translate('dictionaryPage.wordListPanel.newList')}</Typography>
      </div>
      <Row horizontal='space-around' style={styles.row}>
        <TextField
          style={styles.formInput}
          label={translate(`${localListForm}.name`)} 
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setName(event.target.value as string);
            }}
          value={name}
        />
        <FormControl style={styles.formInput}>
          <InputLabel>{translate(`${localListForm}.subject`)}</InputLabel>
          <Select
            multiple
            value={subject}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setSubject(event.target.value as string[]);
            }}
            input={<Input />}
            renderValue={(selected) => (
              <Row wrap>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} style={{margin:2}}/>
                ))}
              </Row>
            )}
          >
            {subjects.map((sub) => (
              <MenuItem key={sub} value={sub}>
                <Checkbox color='primary' checked={subject.indexOf(sub) > -1} />
                <ListItemText primary={translate(`subjects.${sub}`)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Row>
      <Row horizontal='space-around' style={styles.row}>
        <TextField
          style={styles.formInput}
          label={translate(`${localListForm}.level`)}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setLevel(event.target.value as number);
          }}
          value={level}
       />
        <TextField
          style={styles.formInput}
          label={translate(`${localListForm}.rank`)}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setRank(event.target.value as number);
          }}
          value={rank}
        />
      </Row>
      <Row horizontal='space-around' style={styles.row}>
        <TextField
          style={styles.formInput}
          label={translate(`${localListForm}.status`)}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setValidated(event.target.value as boolean);
          }}
          value={validated}
        />
        <FormControl style={styles.formInput}>
          <InputLabel>{translate(`${localListForm}.visibility`)}</InputLabel>
          <Select
            value={visibility}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setVisibility(event.target.value as VisibilityType);
            }}
            input={<Input />}
          >
            {visibilities.map((v) => (
              <MenuItem key={v} value={v}>
                <ListItemText primary={translate(`visibility.${v}`)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Row>
      <TextField
        style={styles.commentsRow} 
        multiline
        label={translate(`${localListForm}.comments`)}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setComments(event.target.value as string);
        }}
        value={comments}
      />
      <Button
          type="submit"
          disabled
          color="primary"
          onClick={()=> onSave()}
        >
          Sign Up
        </Button>
    </Column>
  );
}