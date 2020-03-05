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
        const initialValue = {};
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
        }, initialValue);
    }
}

module.exports = formatter
 