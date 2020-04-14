import React from 'react';
import { TranslationType, WordListType, WordType } from '../../common/types';
import { Column, Row } from '../../common/Flexbox';
import { Typography } from '@material-ui/core';
import translate from 'counterpart';
import { Route } from 'react-router-dom';
import { WordLists } from './wordLists';
import { Words } from './words';


type WordListsPanelType = {
  wordLists: {[key: string]: WordListType};
  history?: any;
  match?: any;
}

const translationsToString = (translations: TranslationType[]) => {
  let s = '';
  translations.forEach((translation, i, translations) => {
    if (Object.is(translations.length - 1, i))
      s += translation.name;
    else
      s += (translation.name + ', ');
  })
  return s;
}

export const WordListsPanel = ({ wordLists, history, ...props}: WordListsPanelType) => {

  const { url } = props.match;

  function getWordsFromWordListName(wordListName: string) {
    return [] as WordType[];
  }

  return(
    <div style={{ paddingLeft: '20px'}}>
    <Column>
        <Typography variant='h2'>{translate('title')}</Typography>
      <Row>
        <WordLists
          path={url && `${url}/wordlists`}
          wordLists={wordLists}
          onAddWordList={() => history.replace(`${url}/wordlist-create`)}
          onDeleteWordList={name => {}}
          onSortEnd={()=>{}}
        />
        <Route
          path={`${url}/wordlists/:wordlistname`}
          render={({ match }) => {
            const wordListName = String(match.params.wordlistname);
            return (
              <Words
                path={`${url}/wordlists/${wordListName}/words`}
                words={wordLists[wordListName].words}
                onAddWord={() => history.replace(`${url}/wordlists/${wordListName}/word-create`)}
                onDeleteWord={(name: string | undefined) => {
                  history.replace(`${url}/wordlists/${wordListName}`);
                }}
                onSortEnd={() => {}}
              />
            );
          }}
        />
        {/* <div style={{ display: 'flex', width: '100%', marginLeft: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Route
              exact
              path={`${url}/categories-create`}
              render={() => {
                const initCatCreated = getCatagoryToAdd();
                return <FormCategory category={initCatCreated} onSave={createCategory} />;
              }}
            />
            <Route
              path={`${url}/categories/:idCat/subcategories-create`}
              render={({ match }) => {
                const catId = Number(match.params.idCat);
                const initCatCreated = getCatagoryToAdd(catId);
                return <FormCategory category={initCatCreated} onSave={createCategory} />;
              }}
            />
            <Route
              exact
              path={`${url}/categories/:idCat`}
              render={({ match }) => {
                const catId = Number(match.params.idCat);
                const catSelected = getCategoryById(catId);
                return <FormCategory category={catSelected} onSave={saveCategory} />;
              }}
            />
            <Route
              path={`${url}/categories/:idCat/subCat/:idSubCat`}
              render={({ match }) => {
                const subcatId = Number(match.params.idSubCat);
                const subcategorySelected = getCategoryById(subcatId);
                return <FormCategory key={subcatId} category={subcategorySelected} onSave={saveCategory} />;
              }}
            />
          </div>
        </div> */}
      </Row>
    </Column>
  </div>
)
}
