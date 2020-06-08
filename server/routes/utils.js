const formatter = {
    formatGrid : (grid) => {
        return Object.keys(grid).map((key => {
            return (
                {
                    name: key,
                    lg: grid[key].lg,
                    md: grid[key].md,
                    sm: grid[key].sm,
                    xs: grid[key].xs
                }
            )
        }))
    },
    formatUserBoard : (array, key) => {
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: {
              lg: item.lg, 
              md: item.md, 
              sm: item.sm, 
              xs: item.xs
            }
          };
        }, {});
    },
    formatWordLists : (array, key, language) => {
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: {
             id: item._id,
             owner: item.owner && item.owner.username,
             name: item.name,
             words: item.words.reduce((o, i) => {
               return {
                 ...o,
                 [i[key]]:
                 {
                   owner: i.owner && item.owner.username,
                   name: i.name,
                   internationalName: i.internationalName,
                   subject: i.subject,
                   level: i.level,
                   translations: i.translations.filter(translation => {console.log(translation.language) ;return translation.language === language}),
                   validated: i.validated,
                   visibility: i.visibility
                 }
                }}, {}),
             subject: item.subject,
             level: item.level,
             rank: item.rank,
             validated: item.validated,
             visibility: item.visibility,
             comments: item.comments
          }
        }
      }, {})
    },
    formatWordListUpdates: (wordlist, isAdmin) => {
      let wordlistUpdates = {...wordlist};
      delete wordlistUpdates.owner;
      delete wordlistUpdates.id;
      delete wordlistUpdates.words;
      delete wordlistUpdates.language;
      delete wordlistUpdates.targetLanguage;
      if (!isAdmin)
        delete wordlistUpdates.validated;
      return wordlistUpdates;
    }
}

module.exports = formatter
 