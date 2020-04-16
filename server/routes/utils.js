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
    formatWordLists : (array, key) => {
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: {
             name: item.name,
             words: item.words,
             subject: item.subject,
             level: item.level,
             rank: item.rank,
             validated: item.validated,
             visibility: item.visibility,
             comments: item.comments
          }
        }
      }, {})
    }
}

module.exports = formatter
 