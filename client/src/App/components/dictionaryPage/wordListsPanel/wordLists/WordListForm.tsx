import React from 'react';
import { WordListType, VisibilityType, LanguageType, RoleType } from '../../../common/types';
import { subjects, visibilities } from '../../../common/utils';
import { Column, Row } from '../../../common/Flexbox';
import { Button, TextField, FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText, Chip, Typography, Switch, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import translate from 'counterpart';
import { useWordListFormFields } from './wordListFormhooks';

const styles = {
  title: {width: '80%', maxWidth: '800px'},
  row: {width: '80%', maxWidth: '800px'},
  column: {width: '44%'},
  width100: { width: '100%'},
  formInput: { width: '100%', minWidth: '130px', paddingBottom: '15px'},
  commentsRow: { width: '80%', maxWidth: '800px', minWidth: '130px', paddingTop: '25px'},
  button: { marginTop: '30px' }
}

export const WordListForm = ({ 
  adminRole=false,
  wordList= undefined,
  create= false,
  canModify=false,
  onSave,
  language,
  targetLanguage
}: {
  adminRole?: boolean,
  wordList?: WordListType, 
  create?: boolean,
  canModify?: boolean,
  onSave: 
    (wordList: WordListType, wordListOldName?: string ) => Promise<{
      success: boolean;
      message: any;
    }>,
  language: LanguageType,
  targetLanguage: LanguageType
}) => 
{
  const localListForm = 'dictionaryPage.wordList';

  const {fields, errors, canSave, checkError, setCheckError, setFields } = useWordListFormFields({
    name: wordList?.name || '',
    subject: wordList?.subject || [],
    level: wordList?.level || 0,
    rank: wordList?.rank || 0,
    validated: wordList?.validated || adminRole,
    visibility: wordList?.visibility || "owner" as VisibilityType,
    comments: wordList?.comments || ''
  })

  return (
    <form style={styles.width100}>
      <Column horizontal='center' style={styles.width100}>
        <div style={styles.title}>
          <Typography variant={'h5'}>{fields.name || translate('dictionaryPage.wordListPanel.newList')}</Typography>
        </div>
        <Row horizontal='space-between' style={styles.row}>
          <Column horizontal='center' style={styles.column}>
            <TextField
              disabled={!(create || canModify)}
              style={styles.formInput}
              label={translate(`${localListForm}.name`)} 
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setFields('name', event.target.value as string);
                }}
              value={fields.name}
              error={(create || canModify) && checkError && errors.name}
            />
            <div style={styles.formInput}>
            <Autocomplete
              disabled={!(create || canModify)}
              multiple
              limitTags={8}
              options={subjects}
              getOptionLabel={(subject: string) => translate(`subjects.${subject}`)}
              value={fields.subject}
              filterSelectedOptions
              disableCloseOnSelect
              onChange={(_event, values) => {setFields('subject', values)}}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={translate(`${localListForm}.subject`)}
                  placeholder={translate(`${localListForm}.subject`)}
                  error={(create || canModify) && checkError && errors.subject}
                />
              )}
            />
            </div>
          </Column>
          <Column horizontal='center' style={styles.column}>
            <TextField
              disabled={!(create || canModify )}
              style={styles.formInput}
              type='number'
              inputProps={{ min: "0", max: "6", step: "1" }} 
              label={translate(`${localListForm}.level`)}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setFields('level', event.target.value as number);
              }}
              value={fields.level}
              error={(create || canModify)  && checkError && errors.level}
            />
            <TextField
              disabled={!(create || canModify )}
              style={styles.formInput}
              type='number'
              inputProps={{ min: "0", max: "9", step: "1" }} 
              label={translate(`${localListForm}.rank`)}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setFields('rank', event.target.value as number);
              }}
              value={fields.rank}
              error={(create || canModify) && checkError && errors.rank}
            />
            { (create || canModify) &&
            <div style={styles.formInput}>
              <Autocomplete
                disabled={!(create || canModify )}
                options={visibilities}
                getOptionLabel={(visibility: string) => translate(`visibility.${visibility}`)}
                value={fields.visibility}
                filterSelectedOptions
                openOnFocus
                onChange={(_event: React.ChangeEvent<{}>, value: string | null) => setFields('visibility', value as VisibilityType)}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={translate(`${localListForm}.visibility`)}
                    placeholder={translate(`${localListForm}.visibility`)}
                    error={(create || canModify) && checkError && errors.visibility}
                  />
                )}
              />
            </div>}
            {!create && <FormControlLabel
              style={styles.formInput}
              control={
                <Switch
                  disabled={!adminRole}
                  checked={fields.validated}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFields('validated', event.target.checked)}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label={translate(`${localListForm}.validation`)}
            />}
          </Column>
        </Row>
        <TextField
          disabled={!(create || canModify )}
          style={styles.commentsRow} 
          multiline
          rowsMax={4}
          label={translate(`${localListForm}.comments`)}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setFields('comments', event.target.value as string);
          }}
          value={fields.comments}
        />
        { (create || canModify) &&
        <Button
          style={styles.button}
          color="primary"
          onClick={(e)=> {
            e.preventDefault();
            setCheckError(true);
            if (canSave)
              onSave({
                ...fields,
                id: wordList?.id,
                owner: wordList?.owner,
                words: wordList?.words || {},
                language,
                targetLanguage
              }, wordList?.name)
          }}
        >
          { create ? translate(`dictionaryPage.wordListPanel.add`) : translate(`dictionaryPage.wordListPanel.save`)}
        </Button>}
      </Column>
    </form>
  );
}