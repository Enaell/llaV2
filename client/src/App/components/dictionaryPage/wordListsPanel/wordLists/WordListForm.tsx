import React, { useState, useEffect } from 'react';
import { WordListType, VisibilityType } from '../../../common/types';
import { subjects, visibilities } from '../../../common/utils';
import { Column, Row } from '../../../common/Flexbox';
import { Button, TextField, FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText, Chip, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import translate from 'counterpart';

const styles = {
  title: {width: '80%', maxWidth: '800px'},
  row: {width: '80%', maxWidth: '800px'},
  column: {width: '44%'},
  width100: { width: '100%'},
  formInput: { width: '100%', minWidth: '130px', paddingBottom: '15px'},
  commentsRow: { width: '80%', maxWidth: '800px', minWidth: '130px', paddingTop: '25px'},
  button: { marginTop: '30px' }
}

export const WordListForm = ({ wordList=undefined, create=false, canModify=false, onSave }: { wordList?: WordListType, create?: boolean,  canModify?: boolean, onSave: () => void }) => 
{

  console.log(`create : ${create}`);
  console.log(`canModify : ${canModify}`);

  const localListForm = 'dictionaryPage.wordListPanel.wordListForm';

  const [name, setName] = useState(wordList?.name || '');
  const [subject, setSubject] = useState(wordList?.subject || []);
  const [level, setLevel] = useState(wordList?.level || 0);
  const [rank, setRank] = useState(wordList?.rank || 0);
  const [validated, setValidated] = useState(wordList?.validated || false);
  const [visibility, setVisibility] = useState(wordList?.visibility || "owner" as VisibilityType)
  const [comments, setComments] = useState(wordList?.comments || '');

  return (
    <form style={styles.width100}>
      <Column horizontal='center' style={styles.width100}>
        <div style={styles.title}>
          <Typography variant={'h5'}>{name || translate('dictionaryPage.wordListPanel.newList')}</Typography>
        </div>
        <Row horizontal='space-between' style={styles.row}>
          <Column horizontal='center' style={styles.column}>
            <TextField
              style={styles.formInput}
              label={translate(`${localListForm}.name`)} 
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setName(event.target.value as string);
                }}
              value={name}
            />
            <div style={styles.formInput}>
            <Autocomplete
              multiple
              options={subjects}
              getOptionLabel={(subject: string) => translate(`subjects.${subject}`)}
              value={subject}
              filterSelectedOptions
              disableCloseOnSelect
              onChange={(_event, values) => {setSubject(values)}}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={translate(`${localListForm}.subject`)}
                  placeholder={translate(`${localListForm}.subject`)}
                />
              )}
            />
            </div>
          </Column>
          <Column horizontal='center' style={styles.column}>
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
            <TextField
              style={styles.formInput}
              label={translate(`${localListForm}.status`)}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setValidated(event.target.value as boolean);
              }}
              value={validated}
            />
            <div style={styles.formInput}>
              <Autocomplete 
                options={visibilities}
                getOptionLabel={(visibility: string) => translate(`visibility.${visibility}`)}
                value={visibility}
                filterSelectedOptions
                openOnFocus
                onChange={(_event: React.ChangeEvent<{}>, value: string | null) => setVisibility(value as VisibilityType)}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={translate(`${localListForm}.visibility`)}
                    placeholder={translate(`${localListForm}.visibility`)}
                  />
                )}
              />
            </div>
          </Column>
        </Row>
        <TextField
          style={styles.commentsRow} 
          multiline
          rowsMax={4}
          label={translate(`${localListForm}.comments`)}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setComments(event.target.value as string);
          }}
          value={comments}
        />
        { (create || canModify) &&
        <Button
          style={styles.button}
          type="submit"
          color="primary"
          onClick={(e)=> {e.preventDefault(); onSave()}}
        >
          { create ? translate(`dictionaryPage.wordListPanel.add`) : translate(`dictionaryPage.wordListPanel.save`)}
        </Button>}
      </Column>
    </form>
  );
}